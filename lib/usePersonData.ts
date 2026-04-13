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
