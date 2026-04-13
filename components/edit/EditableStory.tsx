// components/edit/EditableStory.tsx
"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (!editing) {
      setTitle(section.title);
      setText(section.text);
    }
  }, [section.title, section.text, editing]);

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
