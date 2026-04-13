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
