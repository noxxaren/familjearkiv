// components/person/PersonRelationsSidebar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { getRelatives } from "@/lib/data";
import { resolveImageSrc, getAvatarUrl, formatLifespan } from "@/lib/utils";
import type { Person } from "@/types/person";

function RelationAvatar({ person }: { person: Person }) {
  const [imgSrc, setImgSrc] = useState(() =>
    resolveImageSrc(person.image, person.id, person.gender)
  );
  return (
    <Link href={`/people/${person.id}`} className="flex items-center gap-2 group">
      <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-border bg-surface-subtle">
        <Image
          src={imgSrc}
          alt={person.fullName}
          width={28}
          height={28}
          className="w-full h-full object-cover"
          onError={() => setImgSrc(getAvatarUrl(person.id, person.gender))}
        />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-medium text-text-primary group-hover:text-primary transition-colors truncate">
          {person.firstName}
        </div>
        {(person.birthYear ?? person.deathYear) && (
          <div className="text-[10px] text-text-muted leading-tight">
            {formatLifespan(person.birthYear, person.deathYear)}
          </div>
        )}
      </div>
    </Link>
  );
}

export function PersonRelationsSidebar({ person }: { person: Person }) {
  const parents = getRelatives(person, "parents");
  const partners = getRelatives(person, "partner");
  const children = getRelatives(person, "children");

  const sections = [
    { label: "Föräldrar", people: parents },
    { label: "Partner", people: partners },
    { label: "Barn", people: children },
  ].filter((s) => s.people.length > 0);

  if (sections.length === 0) return null;

  return (
    <div className="bg-white rounded-xl card-shadow p-4">
      <h3 className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-4">
        Närmaste
      </h3>
      <div className="space-y-5">
        {sections.map(({ label, people }) => (
          <div key={label}>
            <div className="text-xs text-text-muted mb-2">{label}</div>
            <div className="space-y-2">
              {people.map((p) => (
                <RelationAvatar key={p.id} person={p} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
