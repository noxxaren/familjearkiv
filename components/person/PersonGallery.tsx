"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

interface PersonGalleryProps {
  // Raw gallery array from data — local Windows paths are filtered automatically
  gallery: string[];
  personName: string;
}

export function PersonGallery({ gallery, personName }: PersonGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  // Track per-image error state so broken files are hidden gracefully
  const [failedIndexes, setFailedIndexes] = useState<Set<number>>(new Set());

  // Only show paths that can actually be served (/images/... or https://...)
  const visibleGallery = gallery.filter(
    (src) => src.startsWith("/images/") || src.startsWith("https://")
  );

  if (visibleGallery.length === 0) return null;

  const handleImgError = (i: number) =>
    setFailedIndexes((prev) => new Set(prev).add(i));

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + visibleGallery.length) % visibleGallery.length);
  };

  const next = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % visibleGallery.length);
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-6 card-shadow">
        <div className="mb-5">
          <p className="text-xs font-medium text-text-muted tracking-[0.15em] uppercase mb-1">
            Bilder
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="font-serif font-semibold text-lg text-text-primary">Bildgalleri</h3>
            <span className="text-text-muted text-xs">({visibleGallery.length})</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {visibleGallery.map((src, i) => {
            if (failedIndexes.has(i)) return null;
            return (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openLightbox(i)}
                className="aspect-square rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/30"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
              >
                <Image
                  src={src}
                  alt={`${personName} bild ${i + 1}`}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  onError={() => handleImgError(i)}
                />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white/60 hover:text-white p-2 transition-colors"
              onClick={closeLightbox}
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
                src={visibleGallery[lightboxIndex]}
                alt={`${personName} bild ${lightboxIndex + 1}`}
                width={900}
                height={600}
                className="w-full h-auto rounded-xl object-contain max-h-[80vh]"
              />
              <p className="text-white/35 text-center text-xs mt-3">
                {lightboxIndex + 1} / {visibleGallery.length}
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
