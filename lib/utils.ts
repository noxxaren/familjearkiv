import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Gender } from "@/types/person";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ─── Avatar fallback ──────────────────────────────────────────────────────────

/** Returns a local default avatar based on gender. */
export function getAvatarUrl(_id: string, gender?: Gender): string {
  if (gender === "male") return "/images/default-male.svg";
  if (gender === "female") return "/images/default-female.svg";
  return "/images/default-person.svg";
}

// ─── Image resolution ─────────────────────────────────────────────────────────
//
// Images in data/family.ts may be one of four kinds:
//
//   A) undefined / null               → falls back to DiceBear avatar
//   B) Local Windows path (C:\...)    → falls back to DiceBear avatar
//   C) Public path (/images/...)      → returned as-is (Next.js static file)
//   D) Remote URL (https://...)       → returned as-is
//
// How to add a real photo for a person:
//   1. Copy the photo to  public/images/people/<person-id>.jpg
//   2. Set  image: "/images/people/<person-id>.jpg"  in data/family.ts
//
// The <img onError> fallback in each component calls getAvatarUrl() when the
// file is missing, so partial migrations never break the UI.

export function isLocalWindowsPath(path: string): boolean {
  return /^[A-Za-z]:[/\\]/.test(path);
}

export function resolveImageSrc(
  imagePath: string | undefined,
  personId: string,
  gender?: Gender
): string {
  if (!imagePath) return getAvatarUrl(personId, gender);
  if (isLocalWindowsPath(imagePath)) return getAvatarUrl(personId, gender);
  // /images/... paths are public-directory static files — always valid
  if (imagePath.startsWith("/images/")) return imagePath;
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://"))
    return imagePath;
  // Relative paths pass through
  return imagePath;
}

/**
 * Resolve an array of gallery images.
 * Filters out local Windows paths and avatar fallbacks so galleries only
 * contain real images. Returns an empty array when no real images exist.
 */
export function resolveGallery(
  gallery: string[] | undefined,
  personId: string
): string[] {
  if (!gallery || gallery.length === 0) return [];
  return gallery.filter((src) => !isLocalWindowsPath(src));
}

// ─── Formatting helpers ───────────────────────────────────────────────────────

export function formatLifespan(
  birthYear?: number,
  deathYear?: number
): string {
  if (!birthYear && !deathYear) return "";
  if (birthYear && deathYear) return `${birthYear}–${deathYear}`;
  if (birthYear) return `f. ${birthYear}`;
  if (deathYear) return `d. ${deathYear}`;
  return "";
}

export function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getGenerationLabel(generation?: number): string {
  switch (generation) {
    case 0:
      return "Äldre generation";
    case 1:
      return "Mor-/farföräldrar";
    case 2:
      return "Föräldrar";
    case 3:
      return "Nutid";
    default:
      return "Okänd generation";
  }
}

export function getSideColor(
  side?: string
): "jan" | "karin" | "gemensam" {
  switch (side) {
    case "Jans sida":
      return "jan";
    case "Karins sida":
      return "karin";
    default:
      return "gemensam";
  }
}
