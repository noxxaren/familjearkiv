"use client";

import { useState, useMemo, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  type NodeTypes,
  type Node,
  type Edge,
} from "@xyflow/react";

import { buildFullTree, getLivingPersons } from "@/lib/tree";
import { TreePersonNode } from "./TreePersonNode";
import { TreeCoupleNode } from "./TreeCoupleNode";
import { PersonPicker } from "./PersonPicker";

// ─── React Flow node type registry ────────────────────────────────────────────

const nodeTypes: NodeTypes = {
  person: TreePersonNode as never,
  couple: TreeCoupleNode as never,
};

// ─── Generation swim-lane backgrounds ─────────────────────────────────────────

const GEN_META: Record<number, { label: string; color: string }> = {
  "-1": { label: "Urfäder  ·  ca 1820–1905",   color: "rgba(100,90,80,0.04)" },
   0:   { label: "Äldre generation  ·  ca 1858–1957", color: "rgba(90,110,80,0.04)" },
   1:   { label: "Mor-/farföräldrar  ·  ca 1896–2022", color: "rgba(80,120,90,0.04)" },
   2:   { label: "Föräldrar  ·  1956–",          color: "rgba(74,124,89,0.06)" },
   3:   { label: "Barn  ·  1981–",               color: "rgba(154,125,46,0.05)" },
   4:   { label: "Barnbarn  ·  2012–",           color: "rgba(154,125,46,0.07)" },
};

// ─── Main component ────────────────────────────────────────────────────────────

export function FamilyTreeView() {
  const [rootPerson, setRootPerson] = useState<string | null>(null);

  const livingPersons = useMemo(() => getLivingPersons(), []);

  const { nodes: rawNodes, edges: rawEdges } = useMemo(
    () => buildFullTree(rootPerson ?? undefined),
    [rootPerson]
  );

  // Cast to React Flow types
  const nodes = rawNodes as unknown as Node[];
  const edges = rawEdges as unknown as Edge[];

  const handlePickerSelect = useCallback((id: string | null) => {
    setRootPerson(id);
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
      {/* ── Page header ──────────────────────────────────────── */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e8e4de",
          padding: "20px 24px 0",
          flexShrink: 0,
        }}
      >
        <p
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#9a9590",
            margin: "0 0 4px",
          }}
        >
          Familjearkivet Lindoff
        </p>
        <h1
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 28,
            fontWeight: 700,
            color: "#2c2925",
            letterSpacing: "-0.02em",
            margin: "0 0 4px",
          }}
        >
          Släktträd
        </h1>
        <p
          style={{
            fontSize: 12,
            color: "#7a7570",
            margin: "0 0 16px",
          }}
        >
          6 generationer · från 1820-talets Skåne till nutid · Dra för att panorera, scrolla för att zooma
        </p>

        {/* Legend */}
        <div style={{ display: "flex", gap: 20, paddingBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#b8d4b0",
                border: "1px solid #4a7c59",
              }}
            />
            <span style={{ fontSize: 11, color: "#9a9590" }}>Jans sida</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#e8d88a",
                border: "1px solid #9a7d2e",
              }}
            />
            <span style={{ fontSize: 11, color: "#9a9590" }}>Karins sida</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 24,
                height: 1.5,
                background: "#c8bfaf",
                borderTop: "1.5px dashed #c8bfaf",
              }}
            />
            <span style={{ fontSize: 11, color: "#9a9590" }}>Partner</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 24,
                height: 2,
                background: "#4a7c5980",
              }}
            />
            <span style={{ fontSize: 11, color: "#9a9590" }}>Förälder–barn</span>
          </div>
        </div>
      </div>

      {/* ── Person picker ─────────────────────────────────────── */}
      <PersonPicker
        persons={livingPersons}
        selected={rootPerson}
        onSelect={handlePickerSelect}
      />

      {/* ── React Flow canvas ─────────────────────────────────── */}
      <div style={{ flex: 1, position: "relative" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          minZoom={0.15}
          maxZoom={2}
          defaultEdgeOptions={{
            type: "smoothstep",
          }}
          proOptions={{ hideAttribution: true }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={24}
            size={1}
            color="#e0dbd4"
          />
          <Controls
            style={{
              background: "#fff",
              border: "1px solid #e8e4de",
              borderRadius: 10,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
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
              const data = node.data as { person?: { side?: string } };
              if (data?.person?.side === "Jans sida") return "#b8d4b0";
              if (data?.person?.side === "Karins sida") return "#e8d88a";
              return "#ddd8d2";
            }}
            maskColor="rgba(250,248,245,0.75)"
          />

          {/* Generation swim-lane labels — rendered as SVG foreignObject via overlay */}
          <GenLabels nodes={nodes} />
        </ReactFlow>
      </div>

      {/* ── Bottom note about selected person ─────────────────── */}
      {rootPerson && (
        <div
          style={{
            background: "#fff",
            borderTop: "1px solid #e8e4de",
            padding: "10px 24px",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#4a7c59",
              boxShadow: "0 0 0 3px #4a7c5930",
            }}
          />
          <span style={{ fontSize: 12, color: "#7a7570" }}>
            Trädet visas med{" "}
            <strong style={{ color: "#2c2925" }}>
              {livingPersons.find((p) => p.id === rootPerson)?.fullName ?? rootPerson}
            </strong>{" "}
            markerad som rot
          </span>
          <button
            onClick={() => setRootPerson(null)}
            style={{
              marginLeft: "auto",
              fontSize: 11,
              color: "#9a9590",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px 6px",
              borderRadius: 6,
            }}
          >
            Rensa
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Generation labels overlay ─────────────────────────────────────────────────

/**
 * Floating labels at the left edge of each generation row.
 * Uses React Flow's useStore to read viewport transform so labels
 * stay in sync when the user pans/zooms.
 */
import { useStore } from "@xyflow/react";

function GenLabels({ nodes }: { nodes: Node[] }) {
  const transform = useStore((s) => s.transform);
  const [, ty, zoom] = transform;

  // Compute Y per generation from the person nodes
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

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {Array.from(genY.entries()).map(([gen, y]) => {
        const meta = GEN_META[gen];
        if (!meta) return null;
        const screenY = y * zoom + ty;
        return (
          <div
            key={gen}
            style={{
              position: "absolute",
              left: 8,
              top: screenY + 4,
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(4px)",
              border: "1px solid #e8e4de",
              borderRadius: 6,
              padding: "3px 8px",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: "#9a9590",
              whiteSpace: "nowrap",
              maxWidth: 220,
              overflow: "hidden",
              textOverflow: "ellipsis",
              opacity: zoom < 0.3 ? 0 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {meta.label}
          </div>
        );
      })}
    </div>
  );
}
