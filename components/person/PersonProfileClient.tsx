// components/person/PersonProfileClient.tsx
"use client";

import { useState } from "react";
import { cn, getAvatarUrl, formatLifespan } from "@/lib/utils";
import { usePersonData } from "@/lib/usePersonData";
import { EditableAvatar } from "@/components/edit/EditableAvatar";
import { EditableGallery } from "@/components/edit/EditableGallery";
import { EditableStory } from "@/components/edit/EditableStory";
import { TimelineSection } from "./TimelineSection";
import { PersonRelations } from "./PersonRelations";
import Image from "next/image";
import type { Person } from "@/types/person";

type TabId = "story" | "gallery" | "timeline" | "relatives";

const TABS: { id: TabId; label: string }[] = [
  { id: "story", label: "Berättelse" },
  { id: "gallery", label: "Bilder" },
  { id: "timeline", label: "Tidslinje" },
  { id: "relatives", label: "Släktingar" },
];

export function PersonProfileClient({ person: staticPerson }: { person: Person }) {
  const { person, gallery, loading, refresh } = usePersonData(staticPerson);
  const [activeTab, setActiveTab] = useState<TabId>("story");
  const [coverSrc, setCoverSrc] = useState<string | null>(() =>
    person.coverImage ?? null
  );
  const isJan = person.side === "Jans sida";
  const isKarin = person.side === "Karins sida";
  const lifespan = formatLifespan(person.birthYear, person.deathYear);

  const coverGradient = isJan
    ? "linear-gradient(135deg, #1E3A1E 0%, #3D7034 100%)"
    : isKarin
    ? "linear-gradient(135deg, #6B4F0C 0%, #C9971E 100%)"
    : "linear-gradient(135deg, #1A1714 0%, #5A5450 100%)";

  return (
    <div className="bg-white rounded-xl card-shadow overflow-hidden">
      {/* Cover */}
      <div className="relative h-40">
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt={`${person.fullName} omslagsbild`}
            fill
            className="object-cover"
            onError={() => setCoverSrc(null)}
          />
        ) : (
          <div style={{ background: coverGradient, height: "100%" }} />
        )}

        {/* Editable avatar — overlapping cover */}
        <div className="absolute bottom-[-40px] left-6">
          <EditableAvatar
            personId={person.id}
            imgSrc={person.image ?? getAvatarUrl(person.id, person.gender)}
            personName={person.fullName}
            onUpdate={refresh}
          />
        </div>
      </div>

      {/* Profile header */}
      <div className="pt-14 px-6 pb-4 border-b border-border">
        <h1 className="font-serif text-2xl font-bold text-text-primary leading-tight">
          {person.fullName}
        </h1>
        <div className="flex flex-wrap items-center gap-3 mt-1">
          {lifespan && <span className="text-sm text-accent">{lifespan}</span>}
          {person.side && <span className="text-sm text-text-muted">{person.side}</span>}
          {person.occupation && <span className="text-sm text-text-muted">{person.occupation}</span>}
        </div>
        {person.bioShort && (
          <p className="text-sm text-text-secondary mt-2 leading-relaxed">{person.bioShort}</p>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border px-2 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-text-secondary hover:text-text-primary"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === "story" &&
          (person.storySections && person.storySections.length > 0 ? (
            <EditableStory
              personId={person.id}
              sections={person.storySections}
              onUpdate={refresh}
            />
          ) : (
            <p className="text-text-muted text-sm">Ingen berättelse tillagd ännu.</p>
          ))}

        {activeTab === "gallery" && (
          <EditableGallery
            personId={person.id}
            personName={person.fullName}
            items={gallery}
            onUpdate={() => refresh()}
          />
        )}

        {activeTab === "timeline" &&
          (person.timeline && person.timeline.length > 0 ? (
            <TimelineSection timeline={person.timeline} />
          ) : (
            <p className="text-text-muted text-sm">Ingen tidslinje tillagd ännu.</p>
          ))}

        {activeTab === "relatives" && <PersonRelations person={person} />}
      </div>
    </div>
  );
}
