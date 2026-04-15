"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  useReactFlow,
  useStore,
  type NodeTypes,
  type Node,
  type Edge,
  type NodeMouseHandler,
} from "@xyflow/react";

import { buildFullTree } from "@/lib/tree";
import { TreePersonNode } from "./TreePersonNode";
import { TreeCoupleNode } from "./TreeCoupleNode";
import { PersonDetailPanel } from "./PersonDetailPanel";

// ─── Node type registry ────────────────────────────────────────────────────────

const nodeTypes: NodeTypes = {
  person: TreePersonNode as never,
  couple: TreeCoupleNode as never,
};

// ─── Generation label metadata ─────────────────────────────────────────────────

const GEN_META: Record<number, string> = {
  "-1": "Urfäder  ·  ca 1820–1905",
   0:   "Äldre generation  ·  ca 1858–1957",
   1:   "Mor-/farföräldrar  ·  ca 1896–2022",
   2:   "Föräldrar  ·  1956–",
   3:   "Barn  ·  1981–",
   4:   "Barnbarn  ·  2012–",
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  rootPerson: string | null;
}

// ─── Main component ────────────────────────────────────────────────────────────

export function FamilyTreeView({ rootPerson }: Props) {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  const { nodes: rawNodes, edges: rawEdges, focusedIds } = useMemo(
    () => buildFullTree(rootPerson ?? undefined),
    [rootPerson]
  );

  const nodes = rawNodes as unknown as Node[];
  const edges = rawEdges as unknown as Edge[];

  const handleNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    if (node.type === "person") {
      setSelectedPerson((prev) => (prev === node.id ? null : node.id));
    }
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        minZoom={0.1}
        maxZoom={2.5}
        defaultEdgeOptions={{ type: "smoothstep" }}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#e0dbd4" />
        <Controls
          style={{
            background: "#fff",
            border: "1px solid #e8e4de",
            borderRadius: 10,
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          }}
        />
        <MiniMap
          style={{
            background: "#faf8f5",
            border: "1px solid #e8e4de",
            borderRadius: 10,
          }}
          nodeColor={(node) => {
            if (node.type === "couple") return "transparent";
            const nd = node.data as { dimmed?: boolean; person?: { side?: string } };
            if (nd?.dimmed) return "#e8e4de";
            if (nd?.person?.side === "Jans sida") return "#b8d4b0";
            if (nd?.person?.side === "Karins sida") return "#e8d88a";
            return "#ddd8d2";
          }}
          maskColor="rgba(250,248,245,0.75)"
        />

        {/* FitView controller — inside ReactFlow context */}
        <FocusFitter focusedIds={focusedIds} rootPerson={rootPerson} />

        {/* Generation labels overlay */}
        <GenLabels nodes={nodes} />
      </ReactFlow>

      {/* Detail panel slides in over the canvas */}
      <PersonDetailPanel
        personId={selectedPerson}
        onClose={() => setSelectedPerson(null)}
        onNavigate={(id) => setSelectedPerson(id)}
      />
    </div>
  );
}

// ─── FocusFitter ──────────────────────────────────────────────────────────────

function FocusFitter({
  focusedIds,
  rootPerson,
}: {
  focusedIds: Set<string> | null;
  rootPerson: string | null;
}) {
  const { fitView } = useReactFlow();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (focusedIds && focusedIds.size > 0) {
        fitView({
          nodes: Array.from(focusedIds).map((id) => ({ id })),
          duration: 650,
          padding: 0.22,
        });
      } else {
        fitView({ duration: 600, padding: 0.1 });
      }
    }, 80);
    return () => clearTimeout(timer);
  }, [focusedIds, rootPerson, fitView]);

  return null;
}

// ─── Generation labels ────────────────────────────────────────────────────────

function GenLabels({ nodes }: { nodes: Node[] }) {
  const transform = useStore((s) => s.transform);
  const [, ty, zoom] = transform;

  const genY = useMemo(() => {
    const map = new Map<number, number>();
    for (const n of nodes) {
      const nd = n.data as { person?: { generation?: number } };
      const gen = nd?.person?.generation;
      if (gen !== undefined && !map.has(gen)) {
        map.set(gen, n.position.y);
      }
    }
    return map;
  }, [nodes]);

  if (zoom < 0.28) return null;

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {Array.from(genY.entries()).map(([gen, y]) => {
        const label = GEN_META[gen];
        if (!label) return null;
        const screenY = y * zoom + ty;
        if (screenY < -20 || screenY > 3000) return null;
        return (
          <div
            key={gen}
            style={{
              position: "absolute",
              left: 8,
              top: screenY + 4,
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(4px)",
              border: "1px solid #e8e4de",
              borderRadius: 6,
              padding: "3px 8px",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: "#9a9590",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}
