// lib/storage.ts
import { supabase } from "./supabase";
import type { Person } from "@/types/person";
import type { GalleryItem } from "@/types/gallery";

// ─── Read ─────────────────────────────────────────────────────────────────────

export async function getPersonOverrides(personId: string): Promise<Partial<Person>> {
  const { data, error } = await supabase
    .from("person_overrides")
    .select("field, value")
    .eq("person_id", personId);

  if (error || !data) return {};

  const overrides: Partial<Person> = {};
  for (const row of data) {
    (overrides as Record<string, unknown>)[row.field] = row.value;
  }
  return overrides;
}

export async function getGalleryItems(personId: string): Promise<GalleryItem[]> {
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("person_id", personId)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return data as GalleryItem[];
}

// ─── Write ────────────────────────────────────────────────────────────────────

export async function setPersonOverride(
  personId: string,
  field: string,
  value: unknown
): Promise<void> {
  const { error } = await supabase
    .from("person_overrides")
    .upsert({ person_id: personId, field, value, updated_at: new Date().toISOString() });

  if (error) throw new Error(error.message);
}

export async function uploadProfileImage(personId: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `people/${personId}.${ext}`;

  const { error } = await supabase.storage
    .from("family-media")
    .upload(path, file, { upsert: true });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("family-media").getPublicUrl(path);
  // Bust cache with timestamp so the browser fetches the new image
  return `${data.publicUrl}?t=${Date.now()}`;
}

export async function addGalleryImage(personId: string, file: File): Promise<GalleryItem> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const uuid = crypto.randomUUID();
  const path = `gallery/${personId}/${uuid}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("family-media")
    .upload(path, file);

  if (uploadError) throw new Error(uploadError.message);

  const { data: urlData } = supabase.storage.from("family-media").getPublicUrl(path);

  const { data: row, error: dbError } = await supabase
    .from("gallery_items")
    .insert({
      person_id: personId,
      url: urlData.publicUrl,
      caption: "",
      sort_order: Date.now(),
    })
    .select()
    .single();

  if (dbError || !row) throw new Error(dbError?.message ?? "Insert failed");
  return row as GalleryItem;
}

export async function deleteGalleryImage(item: GalleryItem): Promise<void> {
  // Remove the storage object first (best-effort — ignore storage errors)
  const urlObj = new URL(item.url);
  // Path is everything after /object/public/family-media/
  const storagePath = urlObj.pathname.split("/object/public/family-media/")[1];
  if (storagePath) {
    await supabase.storage.from("family-media").remove([storagePath]);
  }

  await supabase.from("gallery_items").delete().eq("id", item.id);
}

export async function updateGallerySortOrder(items: GalleryItem[]): Promise<void> {
  const updates = items.map((item, i) => ({
    id: item.id,
    person_id: item.person_id,
    url: item.url,
    caption: item.caption,
    sort_order: i,
  }));

  await supabase.from("gallery_items").upsert(updates);
}
