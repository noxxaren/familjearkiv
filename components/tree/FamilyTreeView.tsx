"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { resolveImageSrc, getAvatarUrl, formatLifespan } from "@/lib/utils";
import { getAvailableGenerations, getPersonsByGeneration } from "@/lib/data";
import type { Person } from "@/types/person";

// ─── Generation metadata ───────────────────────────────────────────────────

const GEN_META: Record<number, { label: string; period: string }> = {
  "-1": { label: "Urfäder",            period: "ca 1820–1905" },
   0:   { label: "Äldre generation",   period: "ca 1858–1957" },
   1:   { label: "Mor-/farföräldrar",  period: "ca 1896–2022" },
   2:   { label: "Föräldrar",          period: "1956–" },
   3:   { label: "Barn",               period: "1981–" },
   4:   { label: "Barnbarn",           period: "2012–" },
};

// ─── Single person card ────────────────────────────────────────────────────

function PersonCard({ person, index = 0 }: { person: Person; index?: number }) {
  const isJan   = person.side === "Jans sida";
  const isKarin = person.side === "Karins sida";
  const lifespan = formatLifespan(person.birthYear, person.deathYear);
  const [imgSrc, setImgSrc] = useState(() =>
    resolveImageSrc(person.image, person.id, person.gender)
  );

  const accentColor = isJan ? "#4a7c59" : isKarin ? "#9a7d2e" : "#6b6358";
  const bgColor     = isJan ? "#f0f5ed" : isKarin ? "#faf6e8" : "#f5f2ee";
  const borderColor = isJan ? "#b8d4b0" : isKarin ? "#d9c07a" : "#ddd8d2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35, ease: "easeOut" }}
    >
      <Link href={`/people/${person.id}`}>
        <div
          className="group flex items-center gap-2.5 rounded-xl p-2.5 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          style={{
            background: bgColor,
            border: `1px solid ${borderColor}`,
            boxShadow: `0 1px 3px rgba(0,0,0,0.06), 0 0 0 0 ${accentColor}`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow =
              `0 4px 12px rgba(0,0,0,0.10), 0 0 0 1.5px ${accentColor}40`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow =
              `0 1px 3px rgba(0,0,0,0.06), 0 0 0 0 ${accentColor}`;
          }}
        >
          {/* Avatar */}
          <div
            className="flex-shrink-0 rounded-full overflow-hidden"
            style={{
              width: 38, height: 38,
              border: `2px solid ${borderColor}`,
              boxShadow: `inset 0 0 0 1px rgba(0,0,0,0.06)`,
            }}
          >
            <Image
              src={imgSrc}
              alt={person.fullName}
              width={38}
              height={38}
              className="w-full h-full object-cover"
              onError={() => setImgSrc(getAvatarUrl(person.id, person.gender))}
            />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p
              className="font-serif text-sm font-semibold leading-tight truncate transition-colors"
              style={{ color: accentColor }}
            >
              {person.fullName}
            </p>
            {lifespan && (
              <p className="text-xs mt-0.5 truncate" style={{ color: "#9a9590" }}>
                {lifespan}
              </p>
            )}
            {person.birthPlace && (
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin className="w-2.5 h-2.5 flex-shrink-0" style={{ color: "#b5b0aa" }} />
                <p className="text-xs truncate" style={{ color: "#b5b0aa" }}>
                  {person.birthPlace}
                </p>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Generation row ────────────────────────────────────────────────────────

function GenerationRow({
  generation,
  persons,
  isLast,
}: {
  generation: number;
  persons: Person[];
  isLast: boolean;
}) {
  const meta   = GEN_META[generation] ?? { label: `Generation ${generation}`, period: "" };
  const janSide   = persons.filter(p => p.side === "Jans sida");
  const karinSide = persons.filter(p => p.side === "Karins sida");

  // For the merge generations (2+), center the cards
  const isMerged = generation >= 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Generation header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #d8d3cc)" }} />
        <div className="flex-shrink-0 text-center">
          <p className="font-serif text-sm font-semibold tracking-wide" style={{ color: "#5c5650" }}>
            {meta.label}
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#a09a94" }}>{meta.period}</p>
        </div>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #d8d3cc)" }} />
      </div>

      {isMerged ? (
        /* Merged layout — centered cards */
        <div className="flex flex-wrap justify-center gap-3">
          {persons.map((p, i) => (
            <div key={p.id} className="w-full sm:w-64">
              <PersonCard person={p} index={i} />
            </div>
          ))}
        </div>
      ) : (
        /* Split layout — Jans sida left, Karins sida right */
        <div className="grid grid-cols-2 gap-4">
          {/* Left: Jans sida */}
          <div className="space-y-2">
            <p
              className="text-xs font-medium tracking-[0.12em] uppercase mb-2 pl-1"
              style={{ color: "#4a7c59" }}
            >
              Jans sida
            </p>
            {janSide.length > 0 ? (
              janSide.map((p, i) => <PersonCard key={p.id} person={p} index={i} />)
            ) : (
              <div
                className="rounded-xl p-3 text-xs italic"
                style={{ background: "#f5f8f4", color: "#b0bdb0", border: "1px dashed #cdd8cc" }}
              >
                Inga kända förfäder
              </div>
            )}
          </div>

          {/* Right: Karins sida */}
          <div className="space-y-2">
            <p
              className="text-xs font-medium tracking-[0.12em] uppercase mb-2 pl-1"
              style={{ color: "#9a7d2e" }}
            >
              Karins sida
            </p>
            {karinSide.length > 0 ? (
              karinSide.map((p, i) => <PersonCard key={p.id} person={p} index={i} />)
            ) : (
              <div
                className="rounded-xl p-3 text-xs italic"
                style={{ background: "#fdf9ee", color: "#c0b878", border: "1px dashed #d9c07a" }}
              >
                Inga kända förfäder
              </div>
            )}
          </div>
        </div>
      )}

      {/* Connector arrow between generations */}
      {!isLast && (
        <div className="flex justify-center mt-5 mb-1">
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-px h-5" style={{ background: "#d0ccc6" }} />
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M5 6L0 0h10L5 6z" fill="#c8c4be" />
            </svg>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

export function FamilyTreeView() {
  const [filter, setFilter] = useState<"all" | "Jans sida" | "Karins sida">("all");

  // All generations present in data, sorted oldest → newest
  const allGenerations = getAvailableGenerations();

  const filteredPersonsForGen = (gen: number): Person[] => {
    const persons = getPersonsByGeneration(gen);
    if (filter === "all") return persons;
    return persons.filter(p => p.side === filter || (p.side !== "Jans sida" && p.side !== "Karins sida"));
  };

  const totalCount = allGenerations.reduce(
    (sum, g) => sum + getPersonsByGeneration(g).length, 0
  );

  return (
    <div className="min-h-screen" style={{ background: "#faf8f5" }}>

      {/* ── Page header ─────────────────────────────────────── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e8e4de" }}>
        <div className="container mx-auto px-4 max-w-4xl py-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <p
              className="text-xs font-medium tracking-[0.18em] uppercase mb-2"
              style={{ color: "#9a9590" }}
            >
              Familjearkivet Lindoff
            </p>
            <h1
              className="font-serif text-3xl md:text-4xl font-bold mb-2"
              style={{ color: "#2c2925", letterSpacing: "-0.02em" }}
            >
              Släktträd
            </h1>
            <p className="text-sm mb-6" style={{ color: "#7a7570" }}>
              {allGenerations.length} generationer · {totalCount} personer · från 1820-talets
              Skåne till nutid
            </p>

            {/* Filter pills */}
            <div className="flex items-center gap-2">
              {(["all", "Jans sida", "Karins sida"] as const).map((side) => (
                <button
                  key={side}
                  onClick={() => setFilter(side)}
                  className="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                  style={{
                    background:
                      filter === side
                        ? side === "Jans sida"
                          ? "#4a7c59"
                          : side === "Karins sida"
                          ? "#9a7d2e"
                          : "#2c2925"
                        : "#f0ece6",
                    color: filter === side ? "#fff" : "#6b6358",
                    border: `1px solid ${
                      filter === side
                        ? "transparent"
                        : "#ddd8d2"
                    }`,
                  }}
                >
                  {side === "all" ? "Alla" : side}
                </button>
              ))}

              {/* Legend */}
              <div className="ml-auto flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#b8d4b0", border: "1px solid #4a7c59" }} />
                  <span className="text-xs" style={{ color: "#9a9590" }}>Jans sida</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#e8d88a", border: "1px solid #9a7d2e" }} />
                  <span className="text-xs" style={{ color: "#9a9590" }}>Karins sida</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Tree content — oldest (top) → newest (bottom) ── */}
      <div className="container mx-auto px-4 max-w-4xl py-10 space-y-8">

        {/* Decorative top label */}
        <div className="flex items-center justify-center mb-2">
          <div
            className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide"
            style={{
              background: "#ede8e0",
              color: "#7a7570",
              border: "1px solid #ddd8d2",
            }}
          >
            Äldst överst · Yngst nederst
          </div>
        </div>

        {allGenerations.map((gen, idx) => {
          const persons = filteredPersonsForGen(gen);
          if (persons.length === 0) return null;
          return (
            <GenerationRow
              key={gen}
              generation={gen}
              persons={persons}
              isLast={idx === allGenerations.length - 1}
            />
          );
        })}
      </div>

      {/* ── Bottom note ─────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid #e8e4de", background: "#fff" }}>
        <div className="container mx-auto px-4 max-w-4xl py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div
              className="rounded-2xl p-5"
              style={{
                background: "#f0f5ed",
                borderLeft: "3px solid #b8d4b0",
              }}
            >
              <h3 className="font-serif font-semibold mb-2" style={{ color: "#4a7c59" }}>
                Jans sida
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6a7a6a" }}>
                Familjenamnet Lindoff härstammar från dragon Jöns Andersson Lindoff (1863–1948)
                som antog soldatnamnet vid Skånska Dragonregementet 1883. Han köpte huset
                Kyrkheddinge 8:36 år 1936 — samma plats som Jan Lindoff köpte 1977.
              </p>
            </div>
            <div
              className="rounded-2xl p-5"
              style={{
                background: "#fdf9ee",
                borderLeft: "3px solid #d9c07a",
              }}
            >
              <h3 className="font-serif font-semibold mb-2" style={{ color: "#9a7d2e" }}>
                Karins sida
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#7a6a4a" }}>
                Karins linje rymmer soldatnamnet Bramstång (Gumme Olsson Bramstång, båtsman 1847),
                stilgjutaren Hans Waldemar Hansson vid Håkan Ohlssons boktryckeri i Lund — och
                Maj-Britt Hansson som avled 1957 och vars barn Knut och Hilma tog hand om.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
