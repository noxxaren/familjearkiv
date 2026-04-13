// components/tree/AncestorTreeView.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllPersons, getFeaturedPersons } from "@/lib/data";
import { resolveImageSrc, getAvatarUrl, formatLifespan } from "@/lib/utils";
import type { Person } from "@/types/person";

const MAX_DEPTH = 3; // 4 rows total: viewer + parents + grandparents + great-grandparents

function buildAncestorRows(
  startId: string,
  personMap: Map<string, Person>
): Person[][] {
  const rows: Person[][] = [];
  const start = personMap.get(startId);
  if (!start) return rows;

  const seen = new Set<string>([startId]);
  let current: Person[] = [start];

  for (let depth = 0; depth <= MAX_DEPTH && current.length > 0; depth++) {
    rows.push(current);
    const next: Person[] = [];
    for (const p of current) {
      for (const pid of p.parents ?? []) {
        if (!seen.has(pid)) {
          const parent = personMap.get(pid);
          if (parent) {
            seen.add(pid);
            next.push(parent);
          }
        }
      }
    }
    current = next;
  }

  return rows;
}

function PersonNode({
  person,
  isViewer,
}: {
  person: Person;
  isViewer: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(() =>
    resolveImageSrc(person.image, person.id, person.gender)
  );
  const isJan = person.side === "Jans sida";
  const borderColor = isJan ? "#B8D4B0" : "#D9C07A";
  const bgColor = isJan ? "#EFF5EC" : "#FBF7EC";
  const lifespan = formatLifespan(person.birthYear, person.deathYear);
  const size = isViewer ? 56 : 40;

  return (
    <Link
      href={`/people/${person.id}`}
      className="flex flex-col items-center gap-1 group"
      title={person.fullName}
    >
      <div
        className="relative rounded-full overflow-hidden flex-shrink-0"
        style={{
          width: size,
          height: size,
          background: isViewer ? "#1E3A1E" : bgColor,
          border: `2px solid ${isViewer ? "#1E3A1E" : borderColor}`,
          outline: isViewer ? "3px solid #EFF5EC" : undefined,
          outlineOffset: isViewer ? "2px" : undefined,
        }}
      >
        <Image
          src={imgSrc}
          alt={person.fullName}
          fill
          className="object-cover"
          onError={() => setImgSrc(getAvatarUrl(person.id, person.gender))}
        />
        {isViewer && (
          <div className="absolute inset-0 flex items-end justify-center pb-1 bg-primary/30">
            <span className="text-[8px] font-bold text-white leading-none">Du</span>
          </div>
        )}
      </div>
      <div className="text-center" style={{ maxWidth: 72 }}>
        <div className="text-xs font-medium text-text-primary leading-tight truncate group-hover:text-primary transition-colors">
          {person.firstName}
        </div>
        {lifespan && (
          <div className="text-[10px] text-text-muted leading-tight">{lifespan}</div>
        )}
      </div>
    </Link>
  );
}

export function AncestorTreeView() {
  const allPersons = useMemo(() => getAllPersons(), []);
  const personMap = useMemo(
    () => new Map(allPersons.map((p) => [p.id, p])),
    [allPersons]
  );

  const startId = useMemo(() => {
    const featured = getFeaturedPersons();
    return featured[0]?.id ?? allPersons[0]?.id ?? "";
  }, [allPersons]);

  const startPerson = useMemo(() => personMap.get(startId), [startId, personMap]);

  const rows = useMemo(
    () => buildAncestorRows(startId, personMap),
    [startId, personMap]
  );

  if (rows.length === 0) {
    return (
      <div className="bg-white rounded-xl card-shadow p-6 flex items-center justify-center h-48 text-text-muted text-sm">
        Inga personer hittades.
      </div>
    );
  }

  // rows[0] = start, rows[1] = parents, etc. Render top-to-bottom (reversed).
  const reversed = [...rows].reverse();

  return (
    <div className="bg-white rounded-xl card-shadow p-6 overflow-x-auto">
      <h2 className="font-serif text-lg font-semibold text-text-primary mb-6">
        {startPerson ? `${startPerson.firstName}s förfäder` : "Familjeträdet"}
      </h2>

      <div className="flex flex-col items-center gap-0 w-full">
        {reversed.map((row, reversedIdx) => {
          const depth = reversed.length - 1 - reversedIdx;
          const isViewerRow = depth === 0;

          return (
            <div key={depth} className="flex flex-col items-center w-full">
              {/* Connector line between rows */}
              {reversedIdx > 0 && (
                <div className="w-px h-6 bg-border my-0" />
              )}

              {/* Row */}
              <div className="flex items-end justify-center gap-4 sm:gap-6 flex-wrap">
                {row.map((person) => (
                  <PersonNode
                    key={person.id}
                    person={person}
                    isViewer={isViewerRow && person.id === startId}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
