"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, MapPin, Briefcase, Calendar, Users, ExternalLink } from "lucide-react";
import { resolveImageSrc, getAvatarUrl, formatDate, formatLifespan } from "@/lib/utils";
import { getPersonById } from "@/lib/tree";
import type { Person } from "@/types/person";

interface Props {
  personId: string | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

const EVENT_ICONS: Record<string, string> = {
  birth: "◎",
  death: "†",
  marriage: "♡",
  move: "→",
  military: "⚔",
  work: "⚙",
  other: "·",
};

function FamilyChip({
  label,
  person,
  onClick,
}: {
  label: string;
  person: Person;
  onClick: () => void;
}) {
  const isJan = person.side === "Jans sida";
  const isKarin = person.side === "Karins sida";
  const accent = isJan ? "#4a7c59" : isKarin ? "#9a7d2e" : "#7a736a";
  const bg = isJan ? "#f0f5ed" : isKarin ? "#faf6e8" : "#f5f2ee";

  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 10px 5px 5px",
        borderRadius: 20,
        border: `1px solid ${isJan ? "#b8d4b0" : isKarin ? "#d9c07a" : "#ddd8d2"}`,
        background: bg,
        cursor: "pointer",
        transition: "all 0.15s",
        textAlign: "left",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 0 2px ${accent}40`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
      }}
    >
      <span style={{ fontSize: 9, color: "#9a9590", letterSpacing: "0.1em", textTransform: "uppercase", minWidth: 40 }}>
        {label}
      </span>
      <span style={{ fontFamily: "Georgia, serif", fontSize: 11, fontWeight: 600, color: accent }}>
        {person.firstName} {person.lastName}
      </span>
    </button>
  );
}

export function PersonDetailPanel({ personId, onClose, onNavigate }: Props) {
  const person = personId ? getPersonById(personId) : null;
  const [imgSrc, setImgSrc] = useState<string>("");

  useEffect(() => {
    if (person) {
      setImgSrc(resolveImageSrc(person.image, person.id, person.gender));
    }
  }, [person]);

  const isJan = person?.side === "Jans sida";
  const isKarin = person?.side === "Karins sida";
  const accent = isJan ? "#4a7c59" : isKarin ? "#9a7d2e" : "#7a736a";
  const bgStripe = isJan ? "#f0f5ed" : isKarin ? "#faf6e8" : "#f5f2ee";

  const parents = (person?.parents ?? [])
    .map((id) => getPersonById(id))
    .filter(Boolean) as Person[];
  const partners = (person?.partner ?? [])
    .map((id) => getPersonById(id))
    .filter(Boolean) as Person[];
  const children = (person?.children ?? [])
    .map((id) => getPersonById(id))
    .filter(Boolean) as Person[];

  return (
    <AnimatePresence>
      {person && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(44,41,37,0.18)",
              zIndex: 10,
              cursor: "pointer",
            }}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: 360,
              background: "#fdf9f3",
              borderLeft: "1px solid #e8e4de",
              boxShadow: "-4px 0 32px rgba(44,41,37,0.12), -1px 0 0 rgba(44,41,37,0.06)",
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* ── Hero ───────────────────────────────────────────────── */}
            <div
              style={{
                position: "relative",
                height: 200,
                flexShrink: 0,
                background: bgStripe,
                overflow: "hidden",
              }}
            >
              {/* Photo */}
              <div style={{ position: "absolute", inset: 0 }}>
                <Image
                  src={imgSrc || getAvatarUrl(person.id, person.gender)}
                  alt={person.fullName}
                  fill
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                  onError={() =>
                    setImgSrc(getAvatarUrl(person.id, person.gender))
                  }
                />
              </div>

              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(44,41,37,0.72) 0%, rgba(44,41,37,0.1) 50%, transparent 100%)",
                }}
              />

              {/* Accent top bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: 3,
                  background: accent,
                  opacity: 0.9,
                }}
              />

              {/* Close button */}
              <button
                onClick={onClose}
                style={{
                  position: "absolute",
                  top: 12, right: 12,
                  width: 28, height: 28,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.9)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                }}
              >
                <X size={14} color="#2c2925" />
              </button>

              {/* Name overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 14, left: 16, right: 16,
                }}
              >
                <h2
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#fff",
                    margin: 0,
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                    textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                  }}
                >
                  {person.fullName}
                </h2>
                {(person.birthYear || person.deathYear) && (
                  <p
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.82)",
                      margin: "2px 0 0",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {formatLifespan(person.birthYear, person.deathYear)}
                  </p>
                )}
              </div>
            </div>

            {/* ── Scrollable body ────────────────────────────────────── */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px 18px 24px",
              }}
            >
              {/* Quick facts */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  marginBottom: 16,
                  padding: "12px 14px",
                  background: bgStripe,
                  borderRadius: 10,
                  border: `1px solid ${isJan ? "#cde3c5" : isKarin ? "#e4d08a" : "#e4dfd8"}`,
                }}
              >
                {person.birthPlace && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <MapPin size={12} color={accent} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "#5a5550" }}>
                      Född i {person.birthPlace}
                      {person.birthDate && ` · ${formatDate(person.birthDate)}`}
                    </span>
                  </div>
                )}
                {!person.birthPlace && person.birthDate && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Calendar size={12} color={accent} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "#5a5550" }}>
                      {formatDate(person.birthDate)}
                    </span>
                  </div>
                )}
                {person.deathDate && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 11, color: "#9a9590", width: 12, textAlign: "center" }}>†</span>
                    <span style={{ fontSize: 12, color: "#5a5550" }}>
                      {formatDate(person.deathDate)}
                      {person.deathPlace && ` i ${person.deathPlace}`}
                    </span>
                  </div>
                )}
                {person.occupation && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Briefcase size={12} color={accent} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "#5a5550" }}>
                      {person.occupation}
                    </span>
                  </div>
                )}
                {person.role && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Users size={12} color={accent} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "#5a5550" }}>
                      {person.role}
                    </span>
                  </div>
                )}
              </div>

              {/* Biography */}
              {(person.bioLong ?? person.bioShort) && (
                <div style={{ marginBottom: 18 }}>
                  <SectionHeading accent={accent} label="Biografi" />
                  <p
                    style={{
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      fontSize: 12.5,
                      lineHeight: 1.75,
                      color: "#4a4642",
                      margin: 0,
                    }}
                  >
                    {person.bioLong ?? person.bioShort}
                  </p>
                </div>
              )}

              {/* Story sections */}
              {(person.storySections ?? []).length > 0 && (
                <div style={{ marginBottom: 18 }}>
                  {person.storySections!.map((s, i) => (
                    <div key={i} style={{ marginBottom: 12 }}>
                      <p
                        style={{
                          fontFamily: "Georgia, serif",
                          fontSize: 12,
                          fontWeight: 700,
                          color: accent,
                          margin: "0 0 4px",
                        }}
                      >
                        {s.title}
                      </p>
                      <p
                        style={{
                          fontSize: 12,
                          lineHeight: 1.7,
                          color: "#5a5550",
                          margin: 0,
                        }}
                      >
                        {s.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Timeline */}
              {(person.timeline ?? []).length > 0 && (
                <div style={{ marginBottom: 18 }}>
                  <SectionHeading accent={accent} label="Tidslinje" />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 0,
                      position: "relative",
                      paddingLeft: 20,
                    }}
                  >
                    {/* Vertical line */}
                    <div
                      style={{
                        position: "absolute",
                        left: 7,
                        top: 8,
                        bottom: 8,
                        width: 1,
                        background: `linear-gradient(to bottom, ${accent}60, ${accent}20)`,
                      }}
                    />
                    {person.timeline!.map((ev, i) => (
                      <div
                        key={i}
                        style={{
                          position: "relative",
                          paddingBottom: 12,
                          paddingLeft: 12,
                        }}
                      >
                        {/* Dot */}
                        <div
                          style={{
                            position: "absolute",
                            left: -13,
                            top: 3,
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            background:
                              ev.type === "birth" || ev.type === "death"
                                ? accent
                                : "#c8bfaf",
                            border: `1.5px solid ${accent}`,
                            boxShadow:
                              ev.type === "birth" || ev.type === "death"
                                ? `0 0 0 2px ${accent}25`
                                : "none",
                          }}
                        />
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: accent,
                            display: "block",
                            marginBottom: 1,
                          }}
                        >
                          {EVENT_ICONS[ev.type] || "·"} {ev.year} — {ev.title}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            color: "#7a7570",
                            lineHeight: 1.5,
                          }}
                        >
                          {ev.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Family */}
              {(parents.length > 0 ||
                partners.length > 0 ||
                children.length > 0) && (
                <div style={{ marginBottom: 16 }}>
                  <SectionHeading accent={accent} label="Familj" />
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {parents.map((p) => (
                      <FamilyChip
                        key={p.id}
                        label="Förälder"
                        person={p}
                        onClick={() => onNavigate(p.id)}
                      />
                    ))}
                    {partners.map((p) => (
                      <FamilyChip
                        key={p.id}
                        label="Partner"
                        person={p}
                        onClick={() => onNavigate(p.id)}
                      />
                    ))}
                    {children.map((p) => (
                      <FamilyChip
                        key={p.id}
                        label="Barn"
                        person={p}
                        onClick={() => onNavigate(p.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Full profile link */}
              <Link
                href={`/people/${person.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  padding: "9px 16px",
                  borderRadius: 10,
                  background: bgStripe,
                  border: `1px solid ${isJan ? "#b8d4b0" : isKarin ? "#d9c07a" : "#ddd8d2"}`,
                  textDecoration: "none",
                  fontSize: 12,
                  fontWeight: 600,
                  color: accent,
                  fontFamily: "Georgia, serif",
                  transition: "background 0.15s",
                  marginTop: 4,
                }}
              >
                <ExternalLink size={12} />
                Öppna full profil
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SectionHeading({
  accent,
  label,
}: {
  accent: string;
  label: string;
}) {
  return (
    <p
      style={{
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: accent,
        margin: "0 0 8px",
        opacity: 0.7,
      }}
    >
      {label}
    </p>
  );
}
