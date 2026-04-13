"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase, ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn, resolveImageSrc, getAvatarUrl, formatLifespan } from "@/lib/utils";
import type { Person } from "@/types/person";

interface PersonCardProps {
  person: Person;
  index?: number;
  viewMode?: "grid" | "list";
}

export function PersonCard({ person, index = 0, viewMode = "grid" }: PersonCardProps) {
  const isJan = person.side === "Jans sida";
  const isKarin = person.side === "Karins sida";
  const lifespan = formatLifespan(person.birthYear, person.deathYear);
  const [imgSrc, setImgSrc] = useState(() =>
    resolveImageSrc(person.image, person.id, person.gender)
  );

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.04, duration: 0.3 }}
      >
        <Link href={`/people/${person.id}`}>
          <div
            className={cn(
              "flex items-center gap-4 p-4 bg-white rounded-2xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer group card-shadow",
              "border-l-[3px]",
              isJan ? "border-l-jan-border" : isKarin ? "border-l-karin-border" : "border-l-border"
            )}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={imgSrc}
                onError={() => setImgSrc(getAvatarUrl(person.id, person.gender))}
                alt={person.fullName}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif font-semibold text-text-primary group-hover:text-primary transition-colors truncate text-base">
                {person.fullName}
              </h3>
              <div className="flex flex-wrap gap-3 mt-0.5">
                {lifespan && (
                  <span className="flex items-center gap-1 text-xs text-text-muted">
                    <Calendar className="w-3 h-3" />
                    {lifespan}
                  </span>
                )}
                {person.birthPlace && (
                  <span className="flex items-center gap-1 text-xs text-text-muted truncate">
                    <MapPin className="w-3 h-3" />
                    {person.birthPlace}
                  </span>
                )}
                {person.occupation && (
                  <span className="flex items-center gap-1 text-xs text-text-muted truncate">
                    <Briefcase className="w-3 h-3" />
                    {person.occupation}
                  </span>
                )}
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors flex-shrink-0" />
          </div>
        </Link>
      </motion.div>
    );
  }

  // Grid view
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="h-full"
    >
      <Link href={`/people/${person.id}`} className="h-full block">
        <div
          className={cn(
            "bg-white rounded-2xl p-5 card-shadow transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer group h-full flex flex-col",
            "border-l-[3px]",
            isJan ? "border-l-jan-border" : isKarin ? "border-l-karin-border" : "border-l-border"
          )}
        >
          {/* Avatar + name */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={imgSrc}
                onError={() => setImgSrc(getAvatarUrl(person.id, person.gender))}
                alt={person.fullName}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif font-semibold text-text-primary group-hover:text-primary transition-colors leading-tight text-base">
                {person.fullName}
              </h3>
              {lifespan && (
                <p className="text-text-muted text-xs mt-0.5">{lifespan}</p>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-1 mb-3 flex-1">
            {person.birthPlace && (
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3 h-3 text-text-muted flex-shrink-0 mt-0.5" />
                <span className="text-xs text-text-secondary">{person.birthPlace}</span>
              </div>
            )}
            {person.occupation && (
              <div className="flex items-start gap-1.5">
                <Briefcase className="w-3 h-3 text-text-muted flex-shrink-0 mt-0.5" />
                <span className="text-xs text-text-secondary">{person.occupation}</span>
              </div>
            )}
          </div>

          {person.bioShort && (
            <p className="text-xs text-text-secondary line-clamp-2 mb-3 leading-relaxed">
              {person.bioShort}
            </p>
          )}

          <div className="mt-auto flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
            Läs mer <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
