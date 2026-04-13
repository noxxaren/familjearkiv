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
  onUpdate: () => void;
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
      onUpdate();
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
          <button
            type="button"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-3 cursor-pointer transition-colors",
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
          </button>

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
