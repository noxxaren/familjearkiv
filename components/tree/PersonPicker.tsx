"use client";

import { useState } from "react";
import Image from "next/image";
import { resolveImageSrc, getAvatarUrl } from "@/lib/utils";
import type { Person } from "@/types/person";

interface Props {
  persons: Person[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}

function PickerCard({
  person,
  selected,
  onSelect,
}: {
  person: Person;
  selected: boolean;
  onSelect: () => void;
}) {
  const isJan = person.side === "Jans sida";
  const isKarin = person.side === "Karins sida";
  const accentColor = isJan ? "#4a7c59" : isKarin ? "#9a7d2e" : "#7a736a";
  const bgColor = isJan ? "#f0f5ed" : isKarin ? "#faf6e8" : "#f5f2ee";
  const borderColor = selected
    ? accentColor
    : isJan
    ? "#b8d4b0"
    : isKarin
    ? "#d9c07a"
    : "#ddd8d2";

  const [imgSrc, setImgSrc] = useState(() =>
    resolveImageSrc(person.image, person.id, person.gender)
  );

  return (
    <button
      onClick={onSelect}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        padding: "10px 8px",
        borderRadius: 12,
        border: `${selected ? 2 : 1.5}px solid ${borderColor}`,
        background: selected ? bgColor : "#faf8f5",
        cursor: "pointer",
        width: 80,
        transition: "all 0.15s ease",
        boxShadow: selected
          ? `0 0 0 3px ${accentColor}25, 0 2px 8px rgba(0,0,0,0.08)`
          : "none",
        outline: "none",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          overflow: "hidden",
          border: `2px solid ${borderColor}`,
          flexShrink: 0,
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
      <span
        style={{
          fontFamily: "Georgia, serif",
          fontSize: 10,
          fontWeight: 600,
          color: selected ? accentColor : "#6b6358",
          lineHeight: 1.3,
          textAlign: "center",
          wordBreak: "break-word",
        }}
      >
        {person.firstName}
      </span>
    </button>
  );
}

export function PersonPicker({ persons, selected, onSelect }: Props) {
  return (
    <div
      style={{
        background: "#fff",
        borderBottom: "1px solid #e8e4de",
        padding: "14px 20px",
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#9a9590",
          margin: "0 0 10px 2px",
        }}
      >
        Vem är du?
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          alignItems: "flex-start",
        }}
      >
        {/* "All" option */}
        <button
          onClick={() => onSelect(null)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            padding: "10px 8px",
            borderRadius: 12,
            border: `${selected === null ? 2 : 1.5}px solid ${
              selected === null ? "#2c2925" : "#ddd8d2"
            }`,
            background: selected === null ? "#f5f2ee" : "#faf8f5",
            cursor: "pointer",
            width: 80,
            boxShadow:
              selected === null
                ? "0 0 0 3px #2c292520, 0 2px 8px rgba(0,0,0,0.08)"
                : "none",
            outline: "none",
            transition: "all 0.15s ease",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: selected === null ? "#2c2925" : "#e8e4de",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            🌳
          </div>
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 10,
              fontWeight: 600,
              color: selected === null ? "#2c2925" : "#6b6358",
              textAlign: "center",
            }}
          >
            Alla
          </span>
        </button>

        {persons.map((p) => (
          <PickerCard
            key={p.id}
            person={p}
            selected={selected === p.id}
            onSelect={() => onSelect(selected === p.id ? null : p.id)}
          />
        ))}
      </div>
    </div>
  );
}
