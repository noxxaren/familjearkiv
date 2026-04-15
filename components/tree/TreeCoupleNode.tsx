"use client";

import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import type { CoupleNodeData } from "@/lib/tree";

export const HEART_SIZE = 28;

function HeartIcon({ color, size = 14 }: { color: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function TreeCoupleNodeInner({ data }: { data: CoupleNodeData }) {
  const { dimmed } = data;

  return (
    <div
      style={{
        width: HEART_SIZE,
        height: HEART_SIZE,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // The outer circle badge
        borderRadius: "50%",
        background: dimmed
          ? "rgba(240,237,232,0.7)"
          : "rgba(255,255,255,0.95)",
        border: `1.5px solid ${dimmed ? "#e0dbd4" : "#e8c0c8"}`,
        boxShadow: dimmed
          ? "none"
          : "0 1px 4px rgba(180,60,80,0.12), 0 0 0 3px rgba(232,192,200,0.25)",
        opacity: dimmed ? 0.18 : 1,
        transition: "opacity 0.25s ease",
        pointerEvents: "none",
      }}
    >
      <HeartIcon
        color={dimmed ? "#c8c4be" : "#c0566a"}
        size={14}
      />

      {/* React Flow handles — invisible but required for edge routing */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{
          background: "transparent",
          border: "none",
          opacity: 0,
          width: 1,
          height: 1,
          left: -1,
        }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right"
        style={{
          background: "transparent",
          border: "none",
          opacity: 0,
          width: 1,
          height: 1,
          right: -1,
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: "transparent",
          border: "none",
          opacity: 0,
          width: 1,
          height: 1,
          bottom: -1,
        }}
      />
    </div>
  );
}

export const TreeCoupleNode = memo(TreeCoupleNodeInner);
