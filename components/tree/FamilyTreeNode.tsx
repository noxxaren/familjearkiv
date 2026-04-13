"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";
import { cn, resolveImageSrc, getAvatarUrl, formatLifespan } from "@/lib/utils";
import type { Person } from "@/types/person";

export type NodeRole =
  | "viewer"     // This IS the selected person — "Du är här"
  | "ancestor"   // Direct ancestor of the viewer
  | "descendant" // Direct descendant of the viewer
  | "partner"    // Partner of the viewer
  | "default";   // No special relation to current viewer

interface FamilyTreeNodeProps {
  person: Person;
  index?: number;
  compact?: boolean;
  role?: NodeRole;
}

export function FamilyTreeNode({
  person,
  index = 0,
  compact = false,
  role = "default",
}: FamilyTreeNodeProps) {
  const isJan = person.side === "Jans sida";
  const isKarin = person.side === "Karins sida";
  const lifespan = formatLifespan(person.birthYear, person.deathYear);
  const [imgSrc, setImgSrc] = useState(() =>
    resolveImageSrc(person.image, person.id, person.gender)
  );

  const isViewer = role === "viewer";
  const isAncestor = role === "ancestor";
  const isDescendant = role === "descendant";
  const isPartner = role === "partner";
  const isRelated = isViewer || isAncestor || isDescendant || isPartner;

  // Left border color based on side
  const borderLeftColor = isJan
    ? "#B8D4B0"
    : isKarin
    ? "#D9C07A"
    : "#E4E0DA";

  // Background tint
  const bgClass = isJan
    ? "bg-jan-tint"
    : isKarin
    ? "bg-karin-tint"
    : "bg-white";

  const containerClass = cn(
    "rounded-xl transition-all duration-200 cursor-pointer group relative",
    "hover:shadow-md hover:-translate-y-0.5",
    compact ? "p-3" : "p-3",
    bgClass,
    // Viewer gets ring
    isViewer && [
      "ring-2 ring-offset-2",
      isKarin ? "ring-accent" : "ring-primary",
    ],
    // Default (unrelated): slightly muted
    !isRelated && "opacity-80 hover:opacity-100",
    // Ancestor/descendant: shadow to distinguish
    (isAncestor || isDescendant) && !isViewer && "shadow-sm",
  );

  const avatarSize = compact ? 36 : isViewer ? 44 : 40;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="relative"
    >
      {/* "Du är här" badge */}
      {isViewer && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className={cn(
            "absolute -top-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none",
            "flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white shadow-sm whitespace-nowrap",
            isKarin ? "bg-accent" : "bg-primary"
          )}
        >
          <Star className="w-2.5 h-2.5 fill-white" />
          Du är här
        </motion.div>
      )}

      <Link href={`/people/${person.id}`}>
        <div
          className={containerClass}
          style={{ borderLeft: `3px solid ${borderLeftColor}` }}
        >
          <div className="flex items-center gap-2.5">
            {/* Portrait */}
            <div
              className="rounded-full overflow-hidden flex-shrink-0"
              style={{ width: avatarSize, height: avatarSize }}
            >
              <Image
                src={imgSrc}
                alt={person.fullName}
                width={avatarSize}
                height={avatarSize}
                className="w-full h-full object-cover"
                onError={() => setImgSrc(getAvatarUrl(person.id, person.gender))}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  "font-serif font-semibold leading-tight truncate transition-colors text-sm",
                  isViewer
                    ? isKarin
                      ? "text-accent"
                      : "text-primary"
                    : isRelated
                    ? "text-text-primary"
                    : "text-text-secondary",
                  isKarin
                    ? "group-hover:text-accent"
                    : "group-hover:text-primary"
                )}
              >
                {person.fullName}
              </p>
              {lifespan && (
                <p className="text-text-muted text-xs mt-0.5 truncate">{lifespan}</p>
              )}
              {!compact && person.role && (
                <p
                  className={cn(
                    "text-xs mt-0.5 truncate",
                    isJan
                      ? "text-primary/60"
                      : isKarin
                      ? "text-accent/60"
                      : "text-text-muted"
                  )}
                >
                  {person.role}
                </p>
              )}
            </div>
          </div>

          {!compact && person.birthPlace && (
            <div className="flex items-center gap-1 mt-2 pl-[calc(40px+10px)]">
              <MapPin className="w-2.5 h-2.5 text-text-muted flex-shrink-0" />
              <p className="text-xs text-text-muted truncate">{person.birthPlace}</p>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
