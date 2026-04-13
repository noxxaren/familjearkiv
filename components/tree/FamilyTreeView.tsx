/**
 * FamilyTreeView.tsx — Current: generational columns (MVP).
 *
 * ─── UPGRADING TO REACT FLOW (interactive pan/zoom graph) ────────────────
 *
 *   1.  npm install @xyflow/react
 *   2.  Import from lib/tree.ts:
 *         import { buildFamilyGraph } from "@/lib/tree";
 *         const { nodes, edges } = buildFamilyGraph();
 *   3.  Replace the <GenerationRow> / column layout with:
 *         <ReactFlow nodes={nodes} edges={edges}
 *           nodeTypes={{ person: FamilyTreeNode }} fitView>
 *           <Background /><Controls /><MiniMap />
 *         </ReactFlow>
 *
 *   Full guide with dagre/elk auto-layout options in lib/tree.ts.
 * ─────────────────────────────────────────────────────────────────────────
 */

"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TreePine } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllPersons, getPersonsByGeneration } from "@/lib/data";
import { FamilyTreeNode } from "./FamilyTreeNode";
import type { NodeRole } from "./FamilyTreeNode";
import type { Person, FamilySide } from "@/types/person";

const generationLabels: Record<number, string> = {
  0: "Äldre generation — Ur-ätt",
  1: "Far-/morföräldrar",
  2: "Föräldrar",
  3: "Nutid",
};

const generationDescriptions: Record<number, string> = {
  0: "Stora Uppåkra, Fjelie, Hötofta, Lund, Södra Sandsjö, Virestad m.fl. — ca 1820–1956",
  1: "Lund, Nöbbelöv — ca 1876–1957",
  2: "Kyrkheddinge, Nöbbelöv — nutida",
  3: "Nutid",
};

type SideFilter = "all" | "Jans sida" | "Karins sida";

function GenerationRow({
  generation,
  persons,
  filter,
  roleMap,
}: {
  generation: number;
  persons: Person[];
  filter: SideFilter;
  roleMap: Map<string, NodeRole>;
}) {
  const filtered =
    filter === "all"
      ? persons
      : persons.filter((p) => p.side === filter || p.side === "Gemensam");

  if (filtered.length === 0) return null;

  const label = generationLabels[generation] ?? `Generation ${generation}`;
  const description = generationDescriptions[generation] ?? "";

  // Sort: viewer first, then ancestors, then rest
  const sorted = [...filtered].sort((a, b) => {
    const order: Record<NodeRole, number> = {
      viewer: 0, ancestor: 1, descendant: 2, partner: 3, default: 4,
    };
    return (order[roleMap.get(a.id) ?? "default"]) - (order[roleMap.get(b.id) ?? "default"]);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      {/* Generation header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs font-medium text-text-muted">{label}</span>
          {description && (
            <span className="hidden sm:inline text-xs text-text-muted/60">— {description}</span>
          )}
        </div>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Persons grid — viewer nodes need extra top padding for the badge */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-2">
        {sorted.map((person, i) => {
          const role = roleMap.get(person.id) ?? "default";
          return (
            <div key={person.id} className={cn(role === "viewer" ? "mt-4" : "")}>
              <FamilyTreeNode person={person} index={i} role={role} />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function FamilyTreeView() {
  const [filter, setFilter] = useState<SideFilter>("all");
  const allPersons = getAllPersons();
  const roleMap = useMemo(() => new Map<string, NodeRole>(), []);

  const generations = [3, 2, 1, 0];

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl py-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-medium text-text-muted tracking-[0.15em] uppercase mb-2">
              Familjearkivet
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-1">
              Lindoffs Släktträd
            </h1>
            <p className="text-text-secondary text-sm max-w-xl">
              Fyra generationer av Lindoff-familjen, från 1820-talets Skåne till nutid.
            </p>

          </motion.div>
        </div>
      </div>

      {/* Filter + Legend bar */}
      <div className="bg-white border-b border-border sticky top-14 z-40">
        <div className="container mx-auto px-4 max-w-6xl py-2.5 flex flex-wrap items-center gap-3">
          {/* Filter pills */}
          <div className="flex items-center gap-1.5">
            {(["all", "Jans sida", "Karins sida"] as const).map((side) => (
              <button
                key={side}
                onClick={() => setFilter(side)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition-all",
                  filter === side
                    ? side === "Jans sida"
                      ? "bg-primary text-white"
                      : side === "Karins sida"
                      ? "bg-accent text-white"
                      : "bg-text-primary text-white"
                    : "bg-surface-subtle text-text-secondary hover:text-text-primary"
                )}
              >
                {side === "all" ? "Alla" : side}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-jan-tint border border-jan-border" />
              <span className="text-xs text-text-muted">Jans sida</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-karin-tint border border-karin-border" />
              <span className="text-xs text-text-muted">Karins sida</span>
            </div>
            <span className="text-xs text-text-muted hidden sm:inline">
              {getAllPersons().length} personer
            </span>
          </div>
        </div>
      </div>

      {/* Tree content — newest generation at top */}
      <div className="container mx-auto px-4 max-w-6xl pt-8 pb-16 space-y-10">
        {generations.map((gen) => {
          const persons = getPersonsByGeneration(gen);
          return (
            <GenerationRow
              key={gen}
              generation={gen}
              persons={persons}
              filter={filter}
              roleMap={roleMap}
            />
          );
        })}
      </div>

      {/* Relationship note */}
      <div className="border-t border-border bg-white py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-xs font-medium text-text-muted tracking-[0.15em] uppercase mb-4">
            Viktiga familjeband
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div
              className="rounded-2xl p-5 card-shadow"
              style={{ borderLeft: "3px solid #B8D4B0", backgroundColor: "#EFF5EC" }}
            >
              <h3 className="font-serif font-semibold text-primary mb-2">Jans sida</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Familjenamnet Lindoff härstammar från dragon Jöns Andersson Lindoff (1863–1948)
                som antog soldatnamnet vid intagning i Skånska Dragonregementet 1883 vid Tygelsjö.
                Han köpte huset Kyrkheddinge 8:36 år 1936 — samma plats som Jan Lindoff köpte 1977.
              </p>
            </div>
            <div
              className="rounded-2xl p-5 card-shadow"
              style={{ borderLeft: "3px solid #D9C07A", backgroundColor: "#FBF7EC" }}
            >
              <h3 className="font-serif font-semibold text-accent mb-2">Karins sida</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Karins linje rymmer soldatnamnet Bramstång (Gumme Olsson Bramstång, båtsman 1847),
                stilgjutaren Hans Waldemar Hansson vid Håkan Ohlssons boktryckeri i Lund —
                och den tragiska historien om Maj-Britt Hansson som avled 1957 och lämnade
                sina barn till Hilma Larsson och Knut Hansson.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
