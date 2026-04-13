"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Heart, Baby, UserSquare } from "lucide-react";
import { cn, getAvatarUrl, formatLifespan } from "@/lib/utils";
import { getRelatives } from "@/lib/data";
import type { Person } from "@/types/person";

interface RelationGroupProps {
  title: string;
  persons: Person[];
  icon: React.ElementType;
  color: "primary" | "accent";
}

function RelationGroup({ title, persons, icon: Icon, color }: RelationGroupProps) {
  if (persons.length === 0) return null;

  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-3">
        <Icon
          className={cn(
            "w-3.5 h-3.5",
            color === "primary" ? "text-primary" : "text-accent"
          )}
        />
        <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          {title}
        </h4>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {persons.map((p) => {
          const isJan = p.side === "Jans sida";
          const isKarin = p.side === "Karins sida";
          return (
            <Link key={p.id} href={`/people/${p.id}`}>
              <div
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-all hover:-translate-y-0.5 group",
                  "border-l-[3px]",
                  isJan
                    ? "bg-jan-tint border-l-jan-border"
                    : isKarin
                    ? "bg-karin-tint border-l-karin-border"
                    : "bg-surface-subtle border-l-border"
                )}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={getAvatarUrl(p.id, p.gender)}
                    alt={p.fullName}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors truncate">
                    {p.fullName}
                  </p>
                  {(p.birthYear || p.deathYear) && (
                    <p className="text-xs text-text-muted">
                      {formatLifespan(p.birthYear, p.deathYear)}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

interface PersonRelationsProps {
  person: Person;
}

export function PersonRelations({ person }: PersonRelationsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const parents = getRelatives(person, "parents");
  const partners = getRelatives(person, "partner");
  const children = getRelatives(person, "children");
  const siblings = getRelatives(person, "siblings");

  const hasRelations =
    parents.length + partners.length + children.length + siblings.length > 0;

  if (!hasRelations) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl p-5 card-shadow"
    >
      <div className="mb-5">
        <p className="text-xs font-medium text-text-muted tracking-[0.15em] uppercase mb-1">
          Familjeband
        </p>
        <h3 className="font-serif font-semibold text-lg text-text-primary">
          Relationer
        </h3>
      </div>

      <RelationGroup
        title="Föräldrar"
        persons={parents}
        icon={UserSquare}
        color="primary"
      />
      <RelationGroup
        title="Partner"
        persons={partners}
        icon={Heart}
        color="accent"
      />
      <RelationGroup
        title="Barn"
        persons={children}
        icon={Baby}
        color="primary"
      />
      <RelationGroup
        title="Syskon"
        persons={siblings}
        icon={Users}
        color="accent"
      />
    </motion.div>
  );
}
