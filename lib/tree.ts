/**
 * lib/tree.ts — Family tree graph builder
 *
 * Layout: dagre (top-to-bottom hierarchical layout)
 * Couple nodes: invisible midpoints between partners, used to route
 *               parent→child edges through a clean Y-junction.
 *
 * Focus mode: when rootPersonId is provided, every node NOT in the
 *             selected person's ancestor+descendant+partner set gets
 *             `dimmed: true` so the component can fade it out.
 */

import Dagre from "@dagrejs/dagre";
import { familyData } from "@/data/family";
import type { Person } from "@/types/person";

// ─── Layout constants ─────────────────────────────────────────────────────────

export const NODE_W = 180;
export const NODE_H = 88;
export const HEART_NODE_SIZE = 28; // keep in sync with TreeCoupleNode.tsx

// ─── Node / Edge types ────────────────────────────────────────────────────────

export interface PersonNodeData {
  person: Person;
  isRoot?: boolean;
  dimmed?: boolean;
}

export interface CoupleNodeData {
  coupleId: string;
  dimmed?: boolean;
}

export type FamilyNode =
  | { id: string; type: "person"; data: PersonNodeData; position: { x: number; y: number } }
  | { id: string; type: "couple"; data: CoupleNodeData; position: { x: number; y: number } };

export interface FamilyEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  style?: Record<string, string | number>;
  animated?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getLivingPersons(): Person[] {
  return familyData.filter((p) => !p.deathYear && !p.deathDate);
}

export function getPersonById(id: string): Person | undefined {
  return familyData.find((p) => p.id === id);
}

function coupleId(a: string, b: string): string {
  return "couple:" + [a, b].sort().join("+");
}

// ─── Focus set ────────────────────────────────────────────────────────────────

/**
 * Returns the set of person IDs that are "in focus" when rootPersonId is
 * selected. Includes: the person themselves, all ancestors, all descendants,
 * and all partners of everyone in that set.
 */
export function getFocusedPersonIds(rootPersonId: string): Set<string> {
  const focused = new Set<string>();

  function addAncestors(id: string): void {
    if (focused.has(id)) return;
    focused.add(id);
    const p = getPersonById(id);
    for (const parentId of p?.parents ?? []) addAncestors(parentId);
  }

  function addDescendants(id: string): void {
    if (focused.has(id)) return;
    focused.add(id);
    const p = getPersonById(id);
    for (const childId of p?.children ?? []) addDescendants(childId);
  }

  addAncestors(rootPersonId);
  addDescendants(rootPersonId);

  // Partners of everyone in the focused set
  Array.from(focused).forEach((id) => {
    const p = getPersonById(id);
    for (const partnerId of p?.partner ?? []) focused.add(partnerId);
  });

  return focused;
}

// ─── Dagre layout ─────────────────────────────────────────────────────────────

/**
 * Run dagre on person nodes only (couple nodes are positioned manually).
 * Returns a map of personId → { x, y } (top-left corner coordinates).
 */
function computeDagreLayout(): Map<string, { x: number; y: number }> {
  const g = new Dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir: "TB",
    nodesep: 52,   // horizontal gap between nodes in the same rank
    ranksep: 110,  // vertical gap between ranks
    marginx: 60,
    marginy: 40,
  });

  // Add all person nodes
  for (const person of familyData) {
    g.setNode(person.id, { width: NODE_W, height: NODE_H });
  }

  // Add parent→child edges (dagre uses these for ranking)
  for (const person of familyData) {
    for (const parentId of person.parents ?? []) {
      if (getPersonById(parentId)) {
        g.setEdge(parentId, person.id);
      }
    }
  }

  Dagre.layout(g);

  const positions = new Map<string, { x: number; y: number }>();
  for (const person of familyData) {
    const node = g.node(person.id);
    if (node) {
      // dagre gives center coordinates — convert to top-left
      positions.set(person.id, {
        x: node.x - NODE_W / 2,
        y: node.y - NODE_H / 2,
      });
    }
  }
  return positions;
}

// ─── Build full tree ──────────────────────────────────────────────────────────

/**
 * Build the complete family tree for React Flow.
 *
 * @param rootPersonId — when set, marks that person as root and dims
 *                       everyone outside their ancestor/descendant set.
 */
export function buildFullTree(rootPersonId?: string): {
  nodes: FamilyNode[];
  edges: FamilyEdge[];
  focusedIds: Set<string> | null;
} {
  // ── Layout ────────────────────────────────────────────────────────────────
  const personPos = computeDagreLayout();

  // ── Focused set ───────────────────────────────────────────────────────────
  const focusedIds = rootPersonId
    ? getFocusedPersonIds(rootPersonId)
    : null;

  // ── Couples ───────────────────────────────────────────────────────────────
  const coupleSet = new Map<string, { a: string; b: string }>();
  for (const person of familyData) {
    for (const partnerId of person.partner ?? []) {
      const cid = coupleId(person.id, partnerId);
      if (!coupleSet.has(cid)) {
        coupleSet.set(cid, { a: person.id, b: partnerId });
      }
    }
  }

  // ── Person nodes ──────────────────────────────────────────────────────────
  const nodes: FamilyNode[] = familyData.map((person) => {
    const pos = personPos.get(person.id) ?? { x: 0, y: 0 };
    const dimmed = focusedIds !== null && !focusedIds.has(person.id);
    return {
      id: person.id,
      type: "person" as const,
      data: {
        person,
        isRoot: person.id === rootPersonId,
        dimmed,
      },
      position: pos,
    };
  });

  // ── Couple nodes (positioned at midpoint between partners) ────────────────
  Array.from(coupleSet.entries()).forEach(([cid, { a, b }]) => {
    const posA = personPos.get(a);
    const posB = personPos.get(b);
    if (!posA || !posB) return;
    // Center of person A and B (dagre gives top-left corners)
    const centerAx = posA.x + NODE_W / 2;
    const centerBx = posB.x + NODE_W / 2;
    const centerAy = posA.y + NODE_H / 2;
    const centerBy = posB.y + NODE_H / 2;
    // Heart badge goes at the midpoint between the two person centers,
    // offset by half the badge size so the badge itself is centered there.
    const mx = (centerAx + centerBx) / 2 - HEART_NODE_SIZE / 2;
    const my = (centerAy + centerBy) / 2 - HEART_NODE_SIZE / 2;
    const dimmed =
      focusedIds !== null &&
      !focusedIds.has(a) &&
      !focusedIds.has(b);
    nodes.push({
      id: cid,
      type: "couple" as const,
      data: { coupleId: cid, dimmed },
      position: { x: mx, y: my },
    });
  });

  // ── Edges ─────────────────────────────────────────────────────────────────
  const edges: FamilyEdge[] = [];
  const seen = new Set<string>();

  const isDimmedEdge = (
    sourceId: string,
    targetId: string
  ): boolean => {
    if (!focusedIds) return false;
    // An edge is dimmed if BOTH endpoints are not in focused set
    const srcPerson = sourceId.startsWith("couple:")
      ? (() => {
          const c = coupleSet.get(sourceId);
          return c ? (focusedIds.has(c.a) || focusedIds.has(c.b)) : false;
        })()
      : focusedIds.has(sourceId);
    const tgtPerson = targetId.startsWith("couple:")
      ? (() => {
          const c = coupleSet.get(targetId);
          return c ? (focusedIds.has(c.a) || focusedIds.has(c.b)) : false;
        })()
      : focusedIds.has(targetId);
    return !srcPerson && !tgtPerson;
  };

  Array.from(coupleSet.entries()).forEach(([cid, { a, b }]) => {
    const dimmed = isDimmedEdge(a, cid);

    // Partner A → couple midpoint (heart badge)
    const eA = `${a}→${cid}`;
    if (!seen.has(eA)) {
      seen.add(eA);
      edges.push({
        id: eA,
        source: a,
        target: cid,
        type: "straight",
        style: {
          stroke: dimmed ? "#e4dfd8" : "#d4899a",
          strokeWidth: dimmed ? 1 : 1.5,
          opacity: dimmed ? 0.2 : 0.55,
        },
      });
    }

    // Partner B → couple midpoint (heart badge)
    const eB = `${b}→${cid}`;
    if (!seen.has(eB)) {
      seen.add(eB);
      edges.push({
        id: eB,
        source: b,
        target: cid,
        type: "straight",
        style: {
          stroke: dimmed ? "#e4dfd8" : "#d4899a",
          strokeWidth: dimmed ? 1 : 1.5,
          opacity: dimmed ? 0.2 : 0.55,
        },
      });
    }

    // Couple midpoint → children
    for (const person of familyData) {
      const parents = person.parents ?? [];
      const hasBothParents = parents.includes(a) && parents.includes(b);
      const isChildOfEither = parents.includes(a) || parents.includes(b);
      if (!isChildOfEither) continue;

      const sourceNode = hasBothParents ? cid : parents.includes(a) ? a : b;
      const eChild = `${sourceNode}→child:${person.id}`;
      if (!seen.has(eChild)) {
        seen.add(eChild);
        const childDimmed = isDimmedEdge(sourceNode, person.id);
        const isJan = person.side === "Jans sida";
        const isKarin = person.side === "Karins sida";
        const strokeColor = childDimmed
          ? "#ddd8d2"
          : isJan
          ? "#4a7c59"
          : isKarin
          ? "#9a7d2e"
          : "#8a8078";
        edges.push({
          id: eChild,
          source: sourceNode,
          target: person.id,
          type: "smoothstep",
          style: {
            stroke: strokeColor,
            strokeWidth: childDimmed ? 1 : 2,
            opacity: childDimmed ? 0.2 : 0.75,
          },
        });
      }
    }
  });

  // Direct parent→child edges where no couple node exists
  for (const person of familyData) {
    for (const parentId of person.parents ?? []) {
      const alreadyCovered = edges.some(
        (e) =>
          e.target === person.id &&
          (e.source === parentId ||
            coupleSet.get(e.source)?.a === parentId ||
            coupleSet.get(e.source)?.b === parentId)
      );
      if (!alreadyCovered) {
        const eid = `direct:${parentId}→${person.id}`;
        if (!seen.has(eid)) {
          seen.add(eid);
          const childDimmed = isDimmedEdge(parentId, person.id);
          const isJan = person.side === "Jans sida";
          const isKarin = person.side === "Karins sida";
          edges.push({
            id: eid,
            source: parentId,
            target: person.id,
            type: "smoothstep",
            style: {
              stroke: childDimmed
                ? "#ddd8d2"
                : isJan
                ? "#4a7c59"
                : isKarin
                ? "#9a7d2e"
                : "#8a8078",
              strokeWidth: childDimmed ? 1 : 2,
              opacity: childDimmed ? 0.2 : 0.75,
            },
          });
        }
      }
    }
  }

  return { nodes, edges, focusedIds };
}
