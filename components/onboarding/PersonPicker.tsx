"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TreePine, UserRound, ChevronDown, ChevronUp, Check } from "lucide-react";
import { usePerspective } from "@/lib/perspective";
import { getAllPersons } from "@/lib/data";
import { cn, resolveImageSrc, getAvatarUrl, formatLifespan } from "@/lib/utils";
import type { Person } from "@/types/person";

// Generation config

const GENERATION_CONFIG: Record<
  number,
  { label: string; description: string; prominent: boolean }
> = {
  3: {
    label: "Nutid",
    description: "Du och din närmaste generation",
    prominent: true,
  },
  2: {
    label: "Föräldrar",
    description: "Din mammas och pappas generation",
    prominent: true,
  },
  1: {
    label: "Mor- och farföräldrar",
    description: "Den generation som kom före föräldrarna",
    prominent: false,
  },
  0: {
    label: "Äldre generationer",
    description: "Förfäder från 1800- och tidigt 1900-tal",
    prominent: false,
  },
};

// Person card inside the picker

function PickerCard({
  person,
  selected,
  onSelect,
}: {
  person: Person;
  selected: boolean;
  onSelect: () => void;
}) {
  const isJan = person.side === "Jans sida";
  const isKarin = person.side === "Karins sida";
  const lifespan = formatLifespan(person.birthYear, person.deathYear);
  const [imgSrc, setImgSrc] = useState(() =>
    resolveImageSrc(person.image, person.id, person.gender)
  );

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={cn(
        "relative w-full text-left rounded-2xl p-4 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        "card-shadow",
        selected
          ? isJan
            ? "bg-jan-tint ring-2 ring-primary/40"
            : isKarin
            ? "bg-karin-tint ring-2 ring-accent/40"
            : "bg-surface-subtle ring-2 ring-primary/40"
          : "bg-white hover:bg-surface-subtle",
        "border-l-[3px]",
        isJan ? "border-l-jan-border" : isKarin ? "border-l-karin-border" : "border-l-border"
      )}
    >
      {/* Selected check */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center",
              isKarin ? "bg-accent" : "bg-primary"
            )}
          >
            <Check className="w-3 h-3 text-white" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={imgSrc}
            alt={person.fullName}
            width={44}
            height={44}
            className="w-full h-full object-cover"
            onError={() => setImgSrc(getAvatarUrl(person.id, person.gender))}
          />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0 pr-6">
          <p
            className={cn(
              "font-serif font-semibold text-sm leading-snug truncate",
              selected
                ? isKarin
                  ? "text-accent"
                  : "text-primary"
                : "text-text-primary"
            )}
          >
            {person.fullName}
          </p>
          {lifespan && (
            <p className="text-text-muted text-xs mt-0.5 truncate">{lifespan}</p>
          )}
          {person.role && (
            <p className="text-text-muted text-xs mt-0.5 truncate">
              {person.role}
            </p>
          )}
        </div>
      </div>
    </motion.button>
  );
}

// Generation section

function GenerationSection({
  generation,
  persons,
  selectedId,
  onSelect,
  initiallyOpen,
}: {
  generation: number;
  persons: Person[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  initiallyOpen: boolean;
}) {
  const [open, setOpen] = useState(initiallyOpen);
  const config = GENERATION_CONFIG[generation] ?? {
    label: `Generation ${generation}`,
    description: "",
    prominent: false,
  };
  const hasSelection = persons.some((p) => p.id === selectedId);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      {/* Section header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-surface-subtle transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-left">
            <div className="flex items-center gap-2">
              <p
                className={cn(
                  "font-serif font-semibold text-sm",
                  config.prominent ? "text-text-primary" : "text-text-secondary"
                )}
              >
                {config.label}
              </p>
              <span className="text-xs text-text-muted">({persons.length})</span>
              {hasSelection && (
                <span className="text-xs font-medium text-primary bg-jan-tint px-2 py-0.5 rounded-full">
                  Vald
                </span>
              )}
            </div>
            <p className="text-text-muted text-xs mt-0.5">{config.description}</p>
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-text-muted flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-text-muted flex-shrink-0" />
        )}
      </button>

      {/* Cards grid */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-border/50"
          >
            <div className="px-4 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {persons.map((person) => (
                <PickerCard
                  key={person.id}
                  person={person}
                  selected={person.id === selectedId}
                  onSelect={() => onSelect(person.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Main PersonPicker overlay

export function PersonPicker() {
  const { pickerOpen, setViewer, setGuestMode, closePicker, hasChosen } =
    usePerspective();

  const allPersons = getAllPersons();
  const [pendingId, setPendingId] = useState<string | null>(null);

  // Group persons by generation, sorted newest → oldest
  const generations = [3, 2, 1, 0].filter((g) =>
    allPersons.some((p) => (p.generation ?? 0) === g)
  );

  function confirm() {
    if (pendingId) setViewer(pendingId);
  }

  function handleGuest() {
    setGuestMode();
  }

  return (
    <AnimatePresence>
      {pickerOpen && (
        <motion.div
          key="picker-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 overflow-y-auto"
          style={{ backgroundColor: "rgba(249,246,241,0.98)" }}
        >
          <div className="min-h-screen flex flex-col">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.3 }}
              className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-border"
            >
              <div className="container mx-auto px-4 max-w-3xl py-5">
                <div className="flex items-center gap-3 mb-1">
                  <TreePine className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-[0.15em] font-medium">
                      Lindoffs Familjearkiv
                    </p>
                    <h1 className="font-serif text-xl font-bold text-text-primary leading-tight">
                      Vem är du i familjen?
                    </h1>
                  </div>
                </div>
                <p className="text-text-secondary text-sm mt-1.5 pl-8">
                  Välj din person — arkivet anpassas efter ditt perspektiv.
                </p>
              </div>
            </motion.div>

            {/* Sections */}
            <div className="flex-1 container mx-auto px-4 max-w-3xl py-6 space-y-3">
              {generations.map((gen, i) => {
                const persons = allPersons
                  .filter((p) => (p.generation ?? 0) === gen)
                  .sort((a, b) => a.fullName.localeCompare(b.fullName, "sv"));
                return (
                  <motion.div
                    key={gen}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
                  >
                    <GenerationSection
                      generation={gen}
                      persons={persons}
                      selectedId={pendingId}
                      onSelect={setPendingId}
                      initiallyOpen={gen >= 2}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Sticky footer */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-border"
            >
              <div className="container mx-auto px-4 max-w-3xl py-4 flex flex-col sm:flex-row items-center gap-3">
                {/* Confirm button */}
                <button
                  onClick={confirm}
                  disabled={!pendingId}
                  className={cn(
                    "flex-1 sm:flex-none flex items-center justify-center gap-2 px-7 py-2.5 rounded-full font-semibold text-sm transition-all",
                    pendingId
                      ? "bg-primary hover:bg-primary-hover text-white shadow-sm hover:shadow-md hover:-translate-y-0.5"
                      : "bg-border text-text-muted cursor-not-allowed"
                  )}
                >
                  <UserRound className="w-4 h-4" />
                  {pendingId ? "Välj den här personen" : "Välj en person ovan"}
                </button>

                <div className="hidden sm:block w-px h-5 bg-border" />

                {/* Guest / close button */}
                {hasChosen ? (
                  <button
                    onClick={closePicker}
                    className="text-sm text-text-muted hover:text-text-secondary transition-colors underline underline-offset-2"
                  >
                    Avbryt
                  </button>
                ) : (
                  <button
                    onClick={handleGuest}
                    className="text-sm text-text-muted hover:text-text-secondary transition-colors"
                  >
                    Bläddra som gäst →
                  </button>
                )}
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
