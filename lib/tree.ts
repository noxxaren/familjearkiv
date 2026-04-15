/**
 * lib/tree.ts
 *
 * Builds React Flow-compatible nodes and edges for the family tree.
 *
 * Layout strategy:
 *  - Each generation occupies a fixed Y row.
 *  - Each couple gets an invisible "couple node" at the midpoint between partners.
 *  - Person → CoupleNode edges run horizontally.
 *  - CoupleNode → Child edges run vertically downward.
 *  - X positions are computed per-generation using a simple left-to-right spread.
 */

import { familyData } from "@/data/family";
import type { Person } from "@/types/person";

// ─── Layout constants ─────────────────────────────────────────────────────────

export const NODE_W = 176;
export const NODE_H = 84;
const X_MARGIN = 24;
const Y_SPACING = 180; // px between generation rows

// ─── Node types ───────────────────────────────────────────────────────────────

export interface PersonNodeData {
  person: Person;
  isRoot?: boolean;
}

export interface CoupleNodeData {
  coupleId: string;
}

export type FamilyNode =
  | { id: string; type: "person"; data: PersonNodeData; position: { x: number; y: number }; zIndex?: number }
  | { id: string; type: "couple"; data: CoupleNodeData; position: { x: number; y: number }; zIndex?: number };

export interface FamilyEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  type: string;
  style?: Record<string, string | number>;
  animated?: boolean;
  markerEnd?: unknown;
}

// ─── Living persons (no deathYear/deathDate) ─────────────────────────────────

export function getLivingPersons(): Person[] {
  return familyData.filter((p) => !p.deathYear && !p.deathDate);
}

// ─── Couple ID ────────────────────────────────────────────────────────────────

function coupleId(a: string, b: string): string {
  return "couple:" + [a, b].sort().join("+");
}

// ─── Build full tree graph ────────────────────────────────────────────────────

/**
 * Build the complete family tree graph.
 * Returns nodes (person + couple) and edges for React Flow.
 *
 * @param rootPersonId  — if supplied, that person's node gets `isRoot: true`
 */
export function buildFullTree(rootPersonId?: string): {
  nodes: FamilyNode[];
  edges: FamilyEdge[];
} {
  // ── 1. Collect all couples ────────────────────────────────────────────────
  // A couple = any pair (A, B) where A lists B as a partner (and B lists A).
  // We only add a couple node once (deduped via coupleId).
  const coupleSet = new Map<string, { a: string; b: string }>();

  for (const person of familyData) {
    for (const partnerId of person.partner ?? []) {
      const cid = coupleId(person.id, partnerId);
      if (!coupleSet.has(cid)) {
        coupleSet.set(cid, { a: person.id, b: partnerId });
      }
    }
  }

  // ── 2. Assign X positions per generation ─────────────────────────────────
  // Strategy: group persons by generation, spread them evenly.
  // Couples are placed between their two partner nodes (averaged X).
  // We iterate until stable (couple X depends on person X, person X
  // may be shifted by couple arrangement — one pass is enough here).

  const byGen = new Map<number, Person[]>();
  for (const p of familyData) {
    const g = p.generation ?? 0;
    if (!byGen.has(g)) byGen.set(g, []);
    byGen.get(g)!.push(p);
  }

  const sortedGens = Array.from(byGen.keys()).sort((a, b) => a - b);
  const genY = new Map<number, number>();
  sortedGens.forEach((g, i) => {
    genY.set(g, i * Y_SPACING);
  });

  // Initial X assignment: equally spaced within generation
  const personX = new Map<string, number>();
  const personGenOrder = new Map<string, number>(); // index within generation

  Array.from(byGen.values()).forEach((persons) => {
    // Sort by: Jan side first, then Karin side, then by ID
    persons.sort((a: Person, b: Person) => {
      const sideOrder = (s?: string) =>
        s === "Jans sida" ? 0 : s === "Karins sida" ? 1 : 2;
      return sideOrder(a.side) - sideOrder(b.side) || a.id.localeCompare(b.id);
    });
    const total = persons.length;
    const totalWidth = total * NODE_W + (total - 1) * X_MARGIN * 2;
    const startX = -totalWidth / 2;
    persons.forEach((p: Person, i: number) => {
      const x = startX + i * (NODE_W + X_MARGIN * 2);
      personX.set(p.id, x);
      personGenOrder.set(p.id, i);
    });
  });

  // ── 3. Compute couple node positions ─────────────────────────────────────
  const coupleX = new Map<string, number>();
  const coupleY = new Map<string, number>();

  Array.from(coupleSet.entries()).forEach(([cid, { a, b }]) => {
    const pA = familyData.find((p) => p.id === a);
    const pB = familyData.find((p) => p.id === b);
    const gen = pA?.generation ?? pB?.generation ?? 0;
    const xA = personX.get(a) ?? 0;
    const xB = personX.get(b) ?? 0;
    coupleX.set(cid, (xA + xB) / 2 + NODE_W / 2);
    coupleY.set(cid, (genY.get(gen) ?? 0) + NODE_H / 2 - 6);
  });

  // ── 4. Build person nodes ─────────────────────────────────────────────────
  const nodes: FamilyNode[] = familyData.map((person) => ({
    id: person.id,
    type: "person" as const,
    data: {
      person,
      isRoot: person.id === rootPersonId,
    },
    position: {
      x: personX.get(person.id) ?? 0,
      y: genY.get(person.generation ?? 0) ?? 0,
    },
  }));

  // ── 5. Build couple nodes ─────────────────────────────────────────────────
  Array.from(coupleSet.keys()).forEach((cid) => {
    nodes.push({
      id: cid,
      type: "couple" as const,
      data: { coupleId: cid },
      position: {
        x: coupleX.get(cid) ?? 0,
        y: coupleY.get(cid) ?? 0,
      },
    });
  });

  // ── 6. Build edges ────────────────────────────────────────────────────────
  const edges: FamilyEdge[] = [];
  const seenEdges = new Set<string>();

  Array.from(coupleSet.entries()).forEach(([cid, { a, b }]) => {
    // Person A → couple
    const eA = `${a}→${cid}`;
    if (!seenEdges.has(eA)) {
      seenEdges.add(eA);
      edges.push({
        id: eA,
        source: a,
        target: cid,
        type: "smoothstep",
        style: { stroke: "#c8bfaf", strokeWidth: 1.5, strokeDasharray: "6 3" },
      });
    }
    // Person B → couple
    const eB = `${b}→${cid}`;
    if (!seenEdges.has(eB)) {
      seenEdges.add(eB);
      edges.push({
        id: eB,
        source: b,
        target: cid,
        type: "smoothstep",
        style: { stroke: "#c8bfaf", strokeWidth: 1.5, strokeDasharray: "6 3" },
      });
    }

    // Couple → children
    // Find children of this couple: persons whose parents array includes both a and b,
    // OR persons who list a or b as parent (single-parent entries)
    for (const person of familyData) {
      const parents = person.parents ?? [];
      const isChildOfCouple = parents.includes(a) || parents.includes(b);
      if (!isChildOfCouple) continue;

      // Only use the couple node when BOTH parents are listed and both are in the couple
      const hasBothParents = parents.includes(a) && parents.includes(b);
      const sourceNode = hasBothParents ? cid : parents.includes(a) ? a : b;

      const eChild = `${sourceNode}→child:${person.id}`;
      if (!seenEdges.has(eChild)) {
        seenEdges.add(eChild);
        const isJan = person.side === "Jans sida";
        const isKarin = person.side === "Karins sida";
        const strokeColor = isJan
          ? "#4a7c5980"
          : isKarin
          ? "#9a7d2e80"
          : "#8a8078";
        edges.push({
          id: eChild,
          source: sourceNode,
          target: person.id,
          type: "smoothstep",
          style: { stroke: strokeColor, strokeWidth: 2 },
        });
      }
    }
  });

  // Also handle persons with parents but whose parents have no partner entry
  for (const person of familyData) {
    const parents = person.parents ?? [];
    for (const parentId of parents) {
      // Check if this parent-child edge was already added via couple node
      const alreadyAdded = edges.some(
        (e) =>
          e.target === person.id &&
          (e.source === parentId ||
            coupleSet.get(e.source)?.a === parentId ||
            coupleSet.get(e.source)?.b === parentId)
      );
      if (!alreadyAdded) {
        const eid = `direct:${parentId}→${person.id}`;
        if (!seenEdges.has(eid)) {
          seenEdges.add(eid);
          const isJan = person.side === "Jans sida";
          const isKarin = person.side === "Karins sida";
          edges.push({
            id: eid,
            source: parentId,
            target: person.id,
            type: "smoothstep",
            style: {
              stroke: isJan ? "#4a7c5980" : isKarin ? "#9a7d2e80" : "#8a8078",
              strokeWidth: 2,
            },
          });
        }
      }
    }
  }

  return { nodes, edges };
}
