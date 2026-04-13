# Edit Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add profile image upload, gallery management, and in-place story editing to each person's profile page, persisted permanently in Supabase.

**Architecture:** PersonProfileClient continues to receive static Person data from the server for fast initial render. A new `usePersonData` hook fetches Supabase overrides on the client and merges them with static data. Three new edit components (EditableAvatar, EditableGallery, EditableStory) replace their read-only counterparts inside PersonProfileClient. All Supabase I/O is isolated in `lib/storage.ts`.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, @supabase/supabase-js, Radix UI (Dialog already installed), lucide-react

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `lib/supabase.ts` | Create | Singleton Supabase client |
| `types/gallery.ts` | Create | `GalleryItem` type |
| `lib/storage.ts` | Create | All Supabase read/write operations |
| `lib/usePersonData.ts` | Create | Hook: merge static Person + Supabase overrides |
| `components/edit/EditableAvatar.tsx` | Create | Avatar with hover overlay + upload modal |
| `components/edit/EditableGallery.tsx` | Create | Gallery grid with upload + delete + lightbox |
| `components/edit/EditableStory.tsx` | Create | In-place per-section story editor |
| `components/person/PersonProfileClient.tsx` | Modify | Use usePersonData + new edit components |
| `.env.example` | Modify | Add Supabase env var keys |

---

## Task 0: Manual Supabase Setup (user action — no code)

> **This task is performed by the developer in the Supabase dashboard, not by a code subagent.**

- [ ] **Step 1: Create a Supabase project**

  Go to https://supabase.com → New project. Note the Project URL and anon key (Settings → API).

- [ ] **Step 2: Run the following SQL in the Supabase SQL Editor**

```sql
-- Person overrides table
CREATE TABLE person_overrides (
  person_id  TEXT NOT NULL,
  field      TEXT NOT NULL,
  value      JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (person_id, field)
);

ALTER TABLE person_overrides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "open" ON person_overrides FOR ALL USING (true) WITH CHECK (true);

-- Gallery items table
CREATE TABLE gallery_items (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id  TEXT NOT NULL,
  url        TEXT NOT NULL,
  caption    TEXT DEFAULT '',
  sort_order INT  DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX ON gallery_items (person_id, sort_order);

ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "open" ON gallery_items FOR ALL USING (true) WITH CHECK (true);
```

- [ ] **Step 3: Create the Storage bucket**

  In the Supabase dashboard → Storage → New bucket:
  - Name: `family-media`
  - Public: ✅ enabled
  - No file size limit needed (or set 10 MB if desired)

- [ ] **Step 4: Create `.env.local` in the project root**

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

  Replace the values with the ones from Supabase Settings → API.

---

## Task 1: Install Supabase Client + Create `lib/supabase.ts`

**Files:**
- Create: `lib/supabase.ts`
- Modify: `.env.example`

- [ ] **Step 1: Install the Supabase client library**

```bash
cd "C:/Users/matti/Git/Släktforskning" && npm install @supabase/supabase-js
```

Expected output: `added N packages` (no errors)

- [ ] **Step 2: Create `lib/supabase.ts`**

```typescript
// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

- [ ] **Step 3: Update `.env.example`**

  Append these two lines to `.env.example`:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

- [ ] **Step 4: Type-check**

```bash
cd "C:/Users/matti/Git/Släktforskning" && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 5: Commit**

```bash
cd "C:/Users/matti/Git/Släktforskning" && git add lib/supabase.ts .env.example package.json package-lock.json && git commit -m "feat: install supabase client and create singleton"
```

---

## Task 2: Define `GalleryItem` Type

**Files:**
- Create: `types/gallery.ts`

- [ ] **Step 1: Create `types/gallery.ts`**

```typescript
// types/gallery.ts
export interface GalleryItem {
  id: string;
  person_id: string;
  url: string;
  caption: string;
  sort_order: number;
}
```

- [ ] **Step 2: Type-check**

```bash
cd "C:/Users/matti/Git/Släktforskning" && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/matti/Git/Släktforskning" && git add types/gallery.ts && git commit -m "feat: add GalleryItem type"
```

---

## Task 3: Create `lib/storage.ts`

**Files:**
- Create: `lib/storage.ts`

- [ ] **Step 1: Create `lib/storage.ts`**

```typescript
// lib/storage.ts
import { supabase } from "./supabase";
import type { Person, StorySection } from "@/types/person";
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
  await supabase
    .from("person_overrides")
    .upsert({ person_id: personId, field, value, updated_at: new Date().toISOString() });
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
```

- [ ] **Step 2: Type-check**

```bash
cd "C:/Users/matti/Git/Släktforskning" && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/matti/Git/Släktforskning" && git add lib/storage.ts && git commit -m "feat: add storage.ts with all Supabase operations"
```

---

## Task 4: Create `lib/usePersonData.ts`

**Files:**
- Create: `lib/usePersonData.ts`

- [ ] **Step 1: Create `lib/usePersonData.ts`**

```typescript
// lib/usePersonData.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { getPersonOverrides, getGalleryItems } from "./storage";
import type { Person } from "@/types/person";
import type { GalleryItem } from "@/types/gallery";

export function usePersonData(staticPerson: Person): {
  person: Person;
  gallery: GalleryItem[];
  loading: boolean;
  refresh: () => void;
} {
  const [overrides, setOverrides] = useState<Partial<Person>>({});
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    Promise.all([
      getPersonOverrides(staticPerson.id),
      getGalleryItems(staticPerson.id),
    ])
      .then(([ov, gal]) => {
        if (cancelled) return;
        setOverrides(ov);
        setGallery(gal);
      })
      .catch(() => {
        // Supabase unavailable — show static data without error
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [staticPerson.id, tick]);

  // Supabase values win over static data
  const person: Person = { ...staticPerson, ...overrides };

  return { person, gallery, loading, refresh };
}
```

- [ ] **Step 2: Type-check**

```bash
cd "C:/Users/matti/Git/Släktforskning" && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/matti/Git/Släktforskning" && git add lib/usePersonData.ts && git commit -m "feat: add usePersonData hook (static + Supabase merge)"
```

---

## Task 5: Create `components/edit/EditableAvatar.tsx`

**Files:**
- Create: `components/edit/EditableAvatar.tsx`

- [ ] **Step 1: Create `components/edit/EditableAvatar.tsx`**

```typescript
// components/edit/EditableAvatar.tsx
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { Camera, X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadProfileImage, setPersonOverride } from "@/lib/storage";

interface EditableAvatarProps {
  personId: string;
  imgSrc: string;
  personName: string;
  onUpdate: (newSrc: string) => void;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export function EditableAvatar({ personId, imgSrc, personName, onUpdate }: EditableAvatarProps) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(file: File) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Endast JPG, PNG och WebP stöds.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Filen är för stor (max 5 MB).");
      return;
    }
    setError(null);
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }

  async function handleSave() {
    if (!selectedFile) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadProfileImage(personId, selectedFile);
      await setPersonOverride(personId, "image", url);
      onUpdate(url);
      setOpen(false);
      setPreview(null);
      setSelectedFile(null);
    } catch {
      setError("Uppladdning misslyckades. Försök igen.");
    } finally {
      setUploading(false);
    }
  }

  function handleClose() {
    if (uploading) return;
    setOpen(false);
    setPreview(null);
    setSelectedFile(null);
    setError(null);
  }

  return (
    <Dialog.Root open={open} onOpenChange={(v) => { if (!v) handleClose(); else setOpen(true); }}>
      <Dialog.Trigger asChild>
        <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer group">
          <Image
            src={imgSrc}
            alt={personName}
            fill
            className="object-cover"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-0.5">
            <Camera className="w-4 h-4 text-white" />
            <span className="text-white text-[9px] font-medium leading-none">Byt bild</span>
          </div>
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content
          className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl w-full max-w-sm p-6"
          onPointerDownOutside={(e) => { if (uploading) e.preventDefault(); }}
        >
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="font-serif font-semibold text-lg text-text-primary">
              Byt profilbild
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-text-muted hover:text-text-primary transition-colors" onClick={handleClose}>
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Drop zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-3 cursor-pointer transition-colors",
              preview ? "border-primary/40 bg-primary/5" : "border-border hover:border-primary/40 hover:bg-surface-subtle"
            )}
          >
            {preview ? (
              <Image
                src={preview}
                alt="Förhandsvisning"
                width={120}
                height={120}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <>
                <Upload className="w-8 h-8 text-text-muted" />
                <div className="text-center">
                  <p className="text-sm font-medium text-text-secondary">Dra och släpp en bild här</p>
                  <p className="text-xs text-text-muted mt-0.5">eller klicka för att välja fil</p>
                </div>
                <p className="text-xs text-text-muted">JPG, PNG, WebP · max 5 MB</p>
              </>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); }}
          />

          {error && <p className="text-sm text-red-500 mt-3">{error}</p>}

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleClose}
              disabled={uploading}
              className="flex-1 py-2 px-4 rounded-xl border border-border text-sm font-medium text-text-secondary hover:bg-surface-subtle transition-colors disabled:opacity-50"
            >
              Avbryt
            </button>
            <button
              onClick={handleSave}
              disabled={!selectedFile || uploading}
              className="flex-1 py-2 px-4 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Laddar upp...
                </>
              ) : "Spara"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
cd "C:/Users/matti/Git/Släktforskning" && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/matti/Git/Släktforskning" && git add components/edit/EditableAvatar.tsx && git commit -m "feat: add EditableAvatar with upload modal"
```

---

## Task 6: Create `components/edit/EditableGallery.tsx`

**Files:**
- Create: `components/edit/EditableGallery.tsx`

This component wraps the lightbox from `PersonGallery` inside an editable shell. The lightbox logic is reproduced here (not re-imported) so the original `PersonGallery` is not changed.

- [ ] **Step 1: Create `components/edit/EditableGallery.tsx`**

```typescript
// components/edit/EditableGallery.tsx
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { addGalleryImage, deleteGalleryImage } from "@/lib/storage";
import type { GalleryItem } from "@/types/gallery";

interface EditableGalleryProps {
  personId: string;
  personName: string;
  items: GalleryItem[];
  onUpdate: (items: GalleryItem[]) => void;
}

export function EditableGallery({ personId, personName, items, onUpdate }: EditableGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Upload ──────────────────────────────────────────────────────────────────

  async function handleFiles(files: FileList) {
    setUploading(true);
    const newItems: GalleryItem[] = [];
    for (const file of Array.from(files)) {
      try {
        const item = await addGalleryImage(personId, file);
        newItems.push(item);
      } catch {
        // Skip files that fail
      }
    }
    if (newItems.length > 0) {
      onUpdate([...items, ...newItems]);
    }
    setUploading(false);
  }

  // ── Delete ──────────────────────────────────────────────────────────────────

  async function handleDelete(item: GalleryItem) {
    setDeletingId(item.id);
    try {
      await deleteGalleryImage(item);
      onUpdate(items.filter((i) => i.id !== item.id));
    } catch {
      // Ignore
    }
    setDeletingId(null);
    setConfirmDeleteId(null);
    // Close lightbox if the deleted item was open
    setLightboxIndex(null);
  }

  // ── Lightbox ─────────────────────────────────────────────────────────────────

  const prev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + items.length) % items.length);
  };
  const next = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % items.length);
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-6 card-shadow">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-xs font-medium text-text-muted tracking-[0.15em] uppercase mb-1">
              Bilder
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="font-serif font-semibold text-lg text-text-primary">Bildgalleri</h3>
              {items.length > 0 && (
                <span className="text-text-muted text-xs">({items.length})</span>
              )}
            </div>
          </div>
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
              "bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-50"
            )}
          >
            {uploading ? (
              <>
                <div className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                Laddar upp...
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                Lägg till
              </>
            )}
          </button>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => { if (e.target.files?.length) handleFiles(e.target.files); e.target.value = ""; }}
        />

        {items.length === 0 ? (
          <button
            onClick={() => inputRef.current?.click()}
            className="w-full py-12 border-2 border-dashed border-border rounded-xl flex flex-col items-center gap-2 hover:border-primary/40 hover:bg-surface-subtle transition-colors"
          >
            <Plus className="w-8 h-8 text-text-muted" />
            <span className="text-sm text-text-muted">Lägg till bilder</span>
          </button>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {items.map((item, i) => (
              <div key={item.id} className="relative group aspect-square">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setLightboxIndex(i)}
                  className="w-full h-full rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/30"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
                >
                  <Image
                    src={item.url}
                    alt={item.caption || `${personName} bild ${i + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </motion.button>

                {/* Delete button */}
                <button
                  onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(item.id); }}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  aria-label="Ta bort bild"
                >
                  <Trash2 className="w-3 h-3" />
                </button>

                {/* Deleting spinner overlay */}
                {deletingId === item.id && (
                  <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirm delete dialog */}
      <AnimatePresence>
        {confirmDeleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setConfirmDeleteId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-xs w-full shadow-xl"
            >
              <h3 className="font-serif font-semibold text-lg text-text-primary mb-2">Ta bort bild?</h3>
              <p className="text-sm text-text-secondary mb-5">Bilden tas bort permanent och kan inte återställas.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="flex-1 py-2 px-4 rounded-xl border border-border text-sm font-medium text-text-secondary hover:bg-surface-subtle transition-colors"
                >
                  Avbryt
                </button>
                <button
                  onClick={() => { const item = items.find((i) => i.id === confirmDeleteId); if (item) handleDelete(item); }}
                  className="flex-1 py-2 px-4 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  Ta bort
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/60 hover:text-white p-2 transition-colors"
              onClick={() => setLightboxIndex(null)}
              aria-label="Stäng"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3 bg-white/10 rounded-full transition-colors"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Föregående"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full"
            >
              <Image
                src={items[lightboxIndex].url}
                alt={items[lightboxIndex].caption || `${personName} bild ${lightboxIndex + 1}`}
                width={900}
                height={600}
                className="w-full h-auto rounded-xl object-contain max-h-[80vh]"
              />
              <p className="text-white/35 text-center text-xs mt-3">
                {lightboxIndex + 1} / {items.length}
              </p>
            </motion.div>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3 bg-white/10 rounded-full transition-colors"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Nästa"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
cd "C:/Users/matti/Git/Släktforskning" && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/matti/Git/Släktforskning" && git add components/edit/EditableGallery.tsx && git commit -m "feat: add EditableGallery with upload, delete, lightbox"
```

---

## Task 7: Create `components/edit/EditableStory.tsx`

**Files:**
- Create: `components/edit/EditableStory.tsx`

- [ ] **Step 1: Create `components/edit/EditableStory.tsx`**

```typescript
// components/edit/EditableStory.tsx
"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Pencil, X, Check } from "lucide-react";
import { setPersonOverride } from "@/lib/storage";
import type { StorySection } from "@/types/person";

interface EditableStoryProps {
  personId: string;
  sections: StorySection[];
  onUpdate: (sections: StorySection[]) => void;
}

interface SectionEditorProps {
  section: StorySection;
  index: number;
  inView: boolean;
  onSave: (index: number, updated: StorySection) => void;
}

function SectionEditor({ section, index, inView, onSave }: SectionEditorProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(section.title);
  const [text, setText] = useState(section.text);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    await onSave(index, { title, text });
    setSaving(false);
    setEditing(false);
  }

  function handleCancel() {
    setTitle(section.title);
    setText(section.text);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="relative">
        <div className="space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full font-serif font-semibold text-lg text-text-primary border-b-2 border-primary/40 focus:border-primary outline-none pb-1 bg-transparent transition-colors"
            placeholder="Rubrik"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            className="w-full text-text-secondary leading-[1.8] text-[0.95rem] border border-border rounded-lg p-3 focus:border-primary/40 focus:outline-none resize-none transition-colors"
            placeholder="Text..."
            style={{ letterSpacing: "0.005em" }}
          />
        </div>
        <div className="flex gap-2 mt-3 justify-end">
          <button
            onClick={handleCancel}
            disabled={saving}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary border border-border hover:bg-surface-subtle transition-colors disabled:opacity-50"
          >
            <X className="w-3.5 h-3.5" />
            Avbryt
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-primary hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Check className="w-3.5 h-3.5" />
            )}
            Spara
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay: index * 0.08 + 0.15, duration: 0.4 }}
      className="relative group"
    >
      <button
        onClick={() => setEditing(true)}
        className="absolute -right-1 -top-1 p-1.5 rounded-lg bg-surface-subtle opacity-0 group-hover:opacity-100 transition-opacity hover:bg-border text-text-muted hover:text-text-primary"
        aria-label="Redigera sektion"
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>
      <h3 className="font-serif font-semibold text-lg text-text-primary mb-3 leading-snug">
        {section.title}
      </h3>
      <p
        className="text-text-secondary leading-[1.8] text-[0.95rem]"
        style={{ letterSpacing: "0.005em" }}
      >
        {section.text}
      </p>
    </motion.div>
  );
}

export function EditableStory({ personId, sections, onUpdate }: EditableStoryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  async function handleSaveSection(index: number, updated: StorySection) {
    const next = sections.map((s, i) => (i === index ? updated : s));
    await setPersonOverride(personId, "storySections", next);
    onUpdate(next);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl p-6 md:p-10 card-shadow"
    >
      <div className="mb-8">
        <p className="text-xs font-medium text-text-muted tracking-[0.15em] uppercase mb-2">
          Berättelse
        </p>
        <h2 className="font-serif text-2xl font-bold text-text-primary">
          Livets berättelse
        </h2>
      </div>

      <div className="space-y-8 max-w-prose">
        {sections.map((section, i) => (
          <SectionEditor
            key={i}
            section={section}
            index={i}
            inView={inView}
            onSave={handleSaveSection}
          />
        ))}
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
cd "C:/Users/matti/Git/Släktforskning" && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/matti/Git/Släktforskning" && git add components/edit/EditableStory.tsx && git commit -m "feat: add EditableStory with in-place section editing"
```

---

## Task 8: Refactor `PersonProfileClient` to Use Edit Components

**Files:**
- Modify: `components/person/PersonProfileClient.tsx`

Replace the entire file. The new version:
- Uses `usePersonData` for live-merged data + gallery
- Replaces the static avatar div with `<EditableAvatar>`
- Replaces `<PersonGallery>` with `<EditableGallery>`
- Replaces `<PersonStorySection>` with `<EditableStory>`

- [ ] **Step 1: Replace `components/person/PersonProfileClient.tsx`**

```typescript
// components/person/PersonProfileClient.tsx
"use client";

import { useState } from "react";
import { cn, getAvatarUrl, formatLifespan } from "@/lib/utils";
import { usePersonData } from "@/lib/usePersonData";
import { EditableAvatar } from "@/components/edit/EditableAvatar";
import { EditableGallery } from "@/components/edit/EditableGallery";
import { EditableStory } from "@/components/edit/EditableStory";
import { TimelineSection } from "./TimelineSection";
import { PersonRelations } from "./PersonRelations";
import Image from "next/image";
import type { Person } from "@/types/person";

type TabId = "story" | "gallery" | "timeline" | "relatives";

const TABS: { id: TabId; label: string }[] = [
  { id: "story", label: "Berättelse" },
  { id: "gallery", label: "Bilder" },
  { id: "timeline", label: "Tidslinje" },
  { id: "relatives", label: "Släktingar" },
];

export function PersonProfileClient({ person: staticPerson }: { person: Person }) {
  const { person, gallery, loading, refresh } = usePersonData(staticPerson);
  const [activeTab, setActiveTab] = useState<TabId>("story");
  const [coverSrc, setCoverSrc] = useState<string | null>(() =>
    person.coverImage ?? null
  );
  // Controlled avatar src so EditableAvatar can update it immediately on upload
  const [avatarSrc, setAvatarSrc] = useState<string>(() =>
    person.image ?? getAvatarUrl(staticPerson.id, staticPerson.gender)
  );

  // Keep avatarSrc in sync when Supabase overrides load
  // (only update if Supabase returned a different value)
  const resolvedAvatar = person.image ?? getAvatarUrl(person.id, person.gender);

  const isJan = person.side === "Jans sida";
  const isKarin = person.side === "Karins sida";
  const lifespan = formatLifespan(person.birthYear, person.deathYear);

  const coverGradient = isJan
    ? "linear-gradient(135deg, #1E3A1E 0%, #3D7034 100%)"
    : isKarin
    ? "linear-gradient(135deg, #6B4F0C 0%, #C9971E 100%)"
    : "linear-gradient(135deg, #1A1714 0%, #5A5450 100%)";

  return (
    <div className="bg-white rounded-xl card-shadow overflow-hidden">
      {/* Cover */}
      <div className="relative h-40">
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt={`${person.fullName} omslagsbild`}
            fill
            className="object-cover"
            onError={() => setCoverSrc(null)}
          />
        ) : (
          <div style={{ background: coverGradient, height: "100%" }} />
        )}

        {/* Editable avatar — overlapping cover */}
        <div className="absolute bottom-[-40px] left-6">
          <EditableAvatar
            personId={person.id}
            imgSrc={loading ? resolvedAvatar : (person.image ?? getAvatarUrl(person.id, person.gender))}
            personName={person.fullName}
            onUpdate={(url) => { setAvatarSrc(url); refresh(); }}
          />
        </div>
      </div>

      {/* Profile header */}
      <div className="pt-14 px-6 pb-4 border-b border-border">
        <h1 className="font-serif text-2xl font-bold text-text-primary leading-tight">
          {person.fullName}
        </h1>
        <div className="flex flex-wrap items-center gap-3 mt-1">
          {lifespan && <span className="text-sm text-accent">{lifespan}</span>}
          {person.side && <span className="text-sm text-text-muted">{person.side}</span>}
          {person.occupation && <span className="text-sm text-text-muted">{person.occupation}</span>}
        </div>
        {person.bioShort && (
          <p className="text-sm text-text-secondary mt-2 leading-relaxed">{person.bioShort}</p>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border px-2 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-text-secondary hover:text-text-primary"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === "story" &&
          (person.storySections && person.storySections.length > 0 ? (
            <EditableStory
              personId={person.id}
              sections={person.storySections}
              onUpdate={refresh}
            />
          ) : (
            <p className="text-text-muted text-sm">Ingen berättelse tillagd ännu.</p>
          ))}

        {activeTab === "gallery" && (
          <EditableGallery
            personId={person.id}
            personName={person.fullName}
            items={gallery}
            onUpdate={(updated) => refresh()}
          />
        )}

        {activeTab === "timeline" &&
          (person.timeline && person.timeline.length > 0 ? (
            <TimelineSection timeline={person.timeline} />
          ) : (
            <p className="text-text-muted text-sm">Ingen tidslinje tillagd ännu.</p>
          ))}

        {activeTab === "relatives" && <PersonRelations person={person} />}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
cd "C:/Users/matti/Git/Släktforskning" && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Manual smoke test**

  1. `npm run dev` → open http://localhost:3000
  2. Navigate to any person profile
  3. Hover over the avatar — verify camera overlay appears
  4. Click avatar → verify upload modal opens with drag-drop zone
  5. Switch to Bilder tab → verify "Lägg till" button and empty state appear
  6. Switch to Berättelse tab (a person with story sections) → verify pencil icon appears on hover per section

- [ ] **Step 4: Commit**

```bash
cd "C:/Users/matti/Git/Släktforskning" && git add components/person/PersonProfileClient.tsx && git commit -m "feat: refactor PersonProfileClient to use edit components and usePersonData"
```

---

## Spec Coverage Self-Review

| Spec requirement | Covered by |
|-----------------|------------|
| `person_overrides` table + RLS | Task 0 |
| `gallery_items` table + index + RLS | Task 0 |
| `family-media` storage bucket | Task 0 |
| `lib/storage.ts` — all 7 functions | Task 3 |
| `lib/usePersonData.ts` hook | Task 4 |
| Static-first, Supabase merges async | Task 4 |
| Supabase down → static data, no error | Task 4 |
| EditableAvatar — hover overlay, modal, preview, upload | Task 5 |
| Supported formats: jpg/png/webp, max 5 MB | Task 5 |
| Loading spinner during upload | Task 5 |
| EditableGallery — upload, delete, confirm dialog | Task 6 |
| Lightbox preserved | Task 6 |
| Empty state upload button | Task 6 |
| EditableStory — pencil per section, title+text edit | Task 7 |
| Avbryt / Spara buttons | Task 7 |
| PersonProfileClient uses usePersonData + edit components | Task 8 |
| `.env.example` updated | Task 1 |
| GalleryItem type | Task 2 |
