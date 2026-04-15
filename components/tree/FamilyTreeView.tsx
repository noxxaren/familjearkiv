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

import { buildFullTree, getLivingPersons } from "@/lib/tree";
import { TreePersonNode } from "./TreePersonNode";
import { TreeCoupleNode } from "./TreeCoupleNode";
import { PersonPicker } from "./PersonPicker";
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

// ─── Main component ────────────────────────────────────────────────────────────

export function FamilyTreeView() {
  const [rootPerson, setRootPerson] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  const livingPersons = useMemo(() => getLivingPersons(), []);

  const { nodes: rawNodes, edges: rawEdges, focusedIds } = useMemo(
    () => buildFullTree(rootPerson ?? undefined),
    [rootPerson]
  );

  const nodes = rawNodes as unknown as Node[];
  const edges = rawEdges as unknown as Edge[];

  const handlePickerSelect = useCallback((id: string | null) => {
    setRootPerson(id);
    setSelectedPerson(null); // close panel when picking focus
  }, []);

  const handleNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    if (node.type === "person") {
      setSelectedPerson(node.id);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#faf8f5",
        overflow: "hidden",
      }}
    >
      {/* ── Header ───────────────────────────────────────────────── */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e8e4de",
          padding: "16px 24px 0",
          flexShrink: 0,
        }}
      >
        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9a9590", margin: "0 0 3px" }}>
          Familjearkivet Lindoff
        </p>
        <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 26, fontWeight: 700, color: "#2c2925", letterSpacing: "-0.02em", margin: "0 0 3px" }}>
          Släktträd
        </h1>
        <p style={{ fontSize: 11, color: "#7a7570", margin: "0 0 12px" }}>
          6 generationer · från 1820-talets Skåne till nutid · Klicka en person för detaljer
        </p>

        {/* Legend row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 18px", paddingBottom: 12 }}>
          {[
            { dot: { bg: "#b8d4b0", border: "#4a7c59" }, label: "Jans sida" },
            { dot: { bg: "#e8d88a", border: "#9a7d2e" }, label: "Karins sida" },
          ].map(({ dot, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: dot.bg, border: `1px solid ${dot.border}` }} />
              <span style={{ fontSize: 11, color: "#9a9590" }}>{label}</span>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 20, height: 0, borderTop: "1.5px dashed #c8bfaf" }} />
            <span style={{ fontSize: 11, color: "#9a9590" }}>Partner</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 20, height: 2, background: "#4a7c5980" }} />
            <span style={{ fontSize: 11, color: "#9a9590" }}>Förälder–barn</span>
          </div>
          {rootPerson && (
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4a7c59", boxShadow: "0 0 0 2.5px #4a7c5930" }} />
              <span style={{ fontSize: 11, color: "#7a7570" }}>
                Fokus: <strong style={{ color: "#2c2925" }}>
                  {livingPersons.find((p) => p.id === rootPerson)?.fullName ?? rootPerson}
                </strong>
              </span>
              <button
                onClick={() => setRootPerson(null)}
                style={{ fontSize: 10, color: "#9a9590", background: "none", border: "none", cursor: "pointer", padding: "1px 5px", borderRadius: 5 }}
              >
                × Rensa
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Person picker ─────────────────────────────────────────── */}
      <PersonPicker
        persons={livingPersons}
        selected={rootPerson}
        onSelect={handlePickerSelect}
      />

      {/* ── React Flow canvas + detail panel ─────────────────────── */}
      <div style={{ flex: 1, position: "relative" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={handleNodeClick}
          fitView
          fitViewOptions={{ padding: 0.14 }}
          minZoom={0.12}
          maxZoom={2.2}
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

          {/* FitView controller — must be inside ReactFlow to use its context */}
          <FocusFitter
            focusedIds={focusedIds}
            rootPerson={rootPerson}
          />

          {/* Generation labels overlay */}
          <GenLabels nodes={nodes} />
        </ReactFlow>

        {/* Detail panel — absolutely positioned over canvas */}
        <PersonDetailPanel
          personId={selectedPerson}
          onClose={() => setSelectedPerson(null)}
          onNavigate={(id) => {
            setSelectedPerson(id);
          }}
        />
      </div>
    </div>
  );
}

// ─── FocusFitter — calls fitView inside ReactFlow context ─────────────────────

function FocusFitter({
  focusedIds,
  rootPerson,
}: {
  focusedIds: Set<string> | null;
  rootPerson: string | null;
}) {
  const { fitView } = useReactFlow();

  useEffect(() => {
    // Delay so React Flow has time to lay out the nodes
    const timer = setTimeout(() => {
      if (focusedIds && focusedIds.size > 0) {
        fitView({
          nodes: Array.from(focusedIds).map((id) => ({ id })),
          duration: 650,
          padding: 0.22,
        });
      } else {
        fitView({ duration: 600, padding: 0.14 });
      }
    }, 80);
    return () => clearTimeout(timer);
  }, [focusedIds, rootPerson, fitView]);

  return null;
}

// ─── Generation labels overlay ─────────────────────────────────────────────────

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
        if (screenY < -20 || screenY > 2000) return null;
        return (
          <div
            key={gen}
            style={{
              position: "absolute",
              left: 8,
              top: screenY + 4,
              background: "rgba(255,255,255,0.88)",
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
