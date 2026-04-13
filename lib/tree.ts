/**
 * lib/tree.ts
 *
 * Graph data builder for the family tree.
 *
 * This module converts the flat familyData array into a graph structure
 * with nodes and edges. The output format is intentionally close to
 * React Flow's expected input so that upgrading is straightforward.
 *
 * ─── HOW TO UPGRADE TO REACT FLOW ────────────────────────────────────────
 *
 *  1. Install:  npm install @xyflow/react
 *
 *  2. In FamilyTreeView.tsx, replace the generational-columns render with:
 *
 *     import ReactFlow, { Background, Controls } from "@xyflow/react";
 *     import "@xyflow/react/dist/style.css";
 *     import { buildFamilyGraph } from "@/lib/tree";
 *     import { FamilyTreeNode as TreeNodeComponent } from "./FamilyTreeNode";
 *
 *     const { nodes, edges } = buildFamilyGraph();
 *
 *     return (
 *       <div style={{ height: "80vh" }}>
 *         <ReactFlow
 *           nodes={nodes}
 *           edges={edges}
 *           nodeTypes={{ person: TreeNodeComponent }}
 *           fitView
 *         >
 *           <Background />
 *           <Controls />
 *         </ReactFlow>
 *       </div>
 *     );
 *
 *  3. FamilyTreeNode already receives `person` as data — no changes needed
 *     to the node component itself.
 *
 *  4. Fine-tune layout using an auto-layout library such as:
 *     - @dagrejs/dagre  (hierarchical / top-down)
 *     - elkjs           (more sophisticated, handles overlaps well)
 *
 * ─────────────────────────────────────────────────────────────────────────
 */

import { familyData } from "@/data/family";
import type { Person } from "@/types/person";

// ─── Node & Edge types (compatible with React Flow) ───────────────────────────

export interface TreeNodeData {
  person: Person;
}

export interface TreeNode {
  id: string;
  type: "person"; // matches nodeTypes key in React Flow
  data: TreeNodeData;
  position: { x: number; y: number };
}

export interface TreeEdge {
  id: string;
  source: string;
  target: string;
  /** "parent-child" | "partner" — use for styling edge lines */
  label: "parent-child" | "partner";
  animated: boolean;
  style?: Record<string, string | number>;
}

// ─── Layout constants ─────────────────────────────────────────────────────────

const NODE_WIDTH = 200;
const NODE_HEIGHT = 100;
const X_GAP = 40;
const Y_GAP = 120;

/**
 * Assign rough x/y positions based on generation and horizontal index.
 * This produces a simple top-down layout good enough for a quick render.
 * Replace with dagre/elk for production-quality auto-layout.
 */
function computePositions(): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>();

  // Group persons by generation (higher generation = lower on canvas)
  const byGeneration = new Map<number, Person[]>();
  for (const person of familyData) {
    const gen = person.generation ?? 0;
    if (!byGeneration.has(gen)) byGeneration.set(gen, []);
    byGeneration.get(gen)!.push(person);
  }

  // Sort generations: 0 (oldest) at top, 3 (present) at bottom
  const sortedGens = Array.from(byGeneration.keys()).sort((a, b) => a - b);

  sortedGens.forEach((gen, rowIndex) => {
    const persons = byGeneration.get(gen)!;
    const totalWidth = persons.length * (NODE_WIDTH + X_GAP) - X_GAP;
    const startX = -totalWidth / 2;

    persons.forEach((person, colIndex) => {
      positions.set(person.id, {
        x: startX + colIndex * (NODE_WIDTH + X_GAP),
        y: rowIndex * (NODE_HEIGHT + Y_GAP),
      });
    });
  });

  return positions;
}

/**
 * Build the full family graph as React Flow-compatible nodes and edges.
 *
 * Call this once and pass the result to <ReactFlow nodes={nodes} edges={edges} />.
 */
export function buildFamilyGraph(): { nodes: TreeNode[]; edges: TreeEdge[] } {
  const positions = computePositions();

  const nodes: TreeNode[] = familyData.map((person) => ({
    id: person.id,
    type: "person",
    data: { person },
    position: positions.get(person.id) ?? { x: 0, y: 0 },
  }));

  const edges: TreeEdge[] = [];
  const seenEdges = new Set<string>();

  for (const person of familyData) {
    // Parent → child edges
    for (const childId of person.children ?? []) {
      const edgeId = `pc-${person.id}-${childId}`;
      if (!seenEdges.has(edgeId)) {
        seenEdges.add(edgeId);
        edges.push({
          id: edgeId,
          source: person.id,
          target: childId,
          label: "parent-child",
          animated: false,
          style: { stroke: "#2D5016", strokeWidth: 2 },
        });
      }
    }

    // Partner edges (deduplicated — only add A↔B once)
    for (const partnerId of person.partner ?? []) {
      const edgeId = [person.id, partnerId].sort().join("-partner-");
      if (!seenEdges.has(edgeId)) {
        seenEdges.add(edgeId);
        edges.push({
          id: edgeId,
          source: person.id,
          target: partnerId,
          label: "partner",
          animated: false,
          style: { stroke: "#8B6914", strokeWidth: 1.5, strokeDasharray: "5 3" },
        });
      }
    }
  }

  return { nodes, edges };
}

/**
 * Return just the ancestors of a given person (for a focused sub-tree view).
 * Useful for showing a person's lineage without rendering the full graph.
 */
export function buildAncestorGraph(
  personId: string,
  maxDepth = 4
): { nodes: TreeNode[]; edges: TreeEdge[] } {
  const positions = computePositions();
  const visited = new Set<string>();

  function collectAncestors(id: string, depth: number): void {
    if (depth > maxDepth || visited.has(id)) return;
    visited.add(id);
    const person = familyData.find((p) => p.id === id);
    if (!person) return;
    for (const parentId of person.parents ?? []) {
      collectAncestors(parentId, depth + 1);
    }
  }

  collectAncestors(personId, 0);

  const persons = familyData.filter((p) => visited.has(p.id));

  const nodes: TreeNode[] = persons.map((person) => ({
    id: person.id,
    type: "person",
    data: { person },
    position: positions.get(person.id) ?? { x: 0, y: 0 },
  }));

  const edges: TreeEdge[] = [];
  const seenEdges = new Set<string>();

  for (const person of persons) {
    for (const childId of person.children ?? []) {
      if (!visited.has(childId)) continue;
      const edgeId = `pc-${person.id}-${childId}`;
      if (!seenEdges.has(edgeId)) {
        seenEdges.add(edgeId);
        edges.push({
          id: edgeId,
          source: person.id,
          target: childId,
          label: "parent-child",
          animated: false,
        });
      }
    }
  }

  return { nodes, edges };
}
