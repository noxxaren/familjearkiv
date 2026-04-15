"use client";

import { useState, memo } from "react";
import { Handle, Position } from "@xyflow/react";
import Image from "next/image";
import { resolveImageSrc, getAvatarUrl, formatLifespan } from "@/lib/utils";
import { NODE_W, NODE_H } from "@/lib/tree";
import type { PersonNodeData } from "@/lib/tree";

function TreePersonNodeInner({ data }: { data: PersonNodeData }) {
  const { person, isRoot, dimmed } = data;
  const isJan = person.side === "Jans sida";
  const isKarin = person.side === "Karins sida";

  const accentColor = isJan ? "#4a7c59" : isKarin ? "#9a7d2e" : "#7a736a";
  const bgColor = isJan ? "#f0f5ed" : isKarin ? "#faf6e8" : "#f5f2ee";
  const borderColor = isRoot
    ? accentColor
    : isJan
    ? "#b8d4b0"
    : isKarin
    ? "#d9c07a"
    : "#ddd8d2";

  const [imgSrc, setImgSrc] = useState(() =>
    resolveImageSrc(person.image, person.id, person.gender)
  );
  const lifespan = formatLifespan(person.birthYear, person.deathYear);
  const isDeceased = !!(person.deathYear || person.deathDate);

  return (
    <div
      style={{
        width: NODE_W,
        height: NODE_H,
        background: dimmed ? "#f5f2ee" : bgColor,
        border: `${isRoot ? 2.5 : 1.5}px solid ${dimmed ? "#e4dfd8" : borderColor}`,
        borderRadius: 14,
        boxShadow: isRoot
          ? `0 0 0 4px ${accentColor}28, 0 4px 20px rgba(0,0,0,0.14)`
          : dimmed
          ? "none"
          : "0 2px 8px rgba(0,0,0,0.07)",
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "8px 10px",
        cursor: "pointer",
        opacity: dimmed ? 0.22 : isDeceased ? 0.84 : 1,
        position: "relative",
        overflow: "hidden",
        transition: "opacity 0.25s ease, box-shadow 0.15s ease",
        // Pointer events disabled when dimmed so clicks fall through to canvas
        pointerEvents: dimmed ? "none" : "auto",
      }}
    >
      {/* React Flow handles */}
      <Handle type="target" position={Position.Top}
        style={{ background: "transparent", border: "none", top: -1 }} />
      <Handle type="source" position={Position.Bottom}
        style={{ background: "transparent", border: "none", bottom: -1 }} />
      <Handle type="source" position={Position.Right} id="right"
        style={{ background: "transparent", border: "none", right: -1 }} />
      <Handle type="target" position={Position.Left} id="left"
        style={{ background: "transparent", border: "none", left: -1 }} />

      {/* Side accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: 3,
          background: dimmed ? "#ccc8c2" : accentColor,
          borderRadius: "14px 0 0 14px",
          opacity: dimmed ? 0.4 : 0.8,
        }}
      />

      {/* Avatar */}
      <div
        style={{
          flexShrink: 0,
          width: 44, height: 44,
          borderRadius: "50%",
          overflow: "hidden",
          border: `2px solid ${dimmed ? "#ddd8d2" : borderColor}`,
          marginLeft: 6,
          filter: dimmed ? "grayscale(1)" : undefined,
        }}
      >
        <Image
          src={imgSrc}
          alt={person.fullName}
          width={44}
          height={44}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={() => setImgSrc(getAvatarUrl(person.id, person.gender))}
        />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 12,
            fontWeight: 700,
            color: dimmed ? "#aaa8a4" : accentColor,
            lineHeight: 1.25,
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {person.firstName}
        </p>
        <p
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 11,
            fontWeight: 600,
            color: dimmed ? "#aaa8a4" : accentColor,
            lineHeight: 1.2,
            margin: "1px 0 0",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            opacity: 0.85,
          }}
        >
          {person.lastName}
        </p>
        {lifespan && (
          <p
            style={{
              fontSize: 10,
              color: dimmed ? "#c0bbb6" : "#9a9590",
              margin: "3px 0 0",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {lifespan}
          </p>
        )}
        {isDeceased && !dimmed && (
          <p style={{ fontSize: 9, color: "#b5b0aa", margin: "1px 0 0", fontStyle: "italic" }}>
            †
          </p>
        )}
      </div>
    </div>
  );
}

export const TreePersonNode = memo(TreePersonNodeInner);
