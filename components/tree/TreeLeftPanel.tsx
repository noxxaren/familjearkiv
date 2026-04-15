"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, TreePine, Users } from "lucide-react";
import { PersonPicker } from "./PersonPicker";
import type { Person } from "@/types/person";

const NAV_LINKS = [
  { href: "/",       label: "Hem",         icon: Home },
  { href: "/tree",   label: "Släktträd",   icon: TreePine },
  { href: "/people", label: "Alla personer", icon: Users },
];

const GEN_ROWS = [
  { gen: -1, label: "Urfäder",            period: "ca 1820–1905",  color: "#a09a94" },
  { gen:  0, label: "Äldre generation",   period: "ca 1858–1957",  color: "#7a7570" },
  { gen:  1, label: "Mor-/farföräldrar",  period: "ca 1896–2022",  color: "#5c5650" },
  { gen:  2, label: "Föräldrar",          period: "1956–",         color: "#4a7c59" },
  { gen:  3, label: "Barn",               period: "1981–",         color: "#6b8f5a" },
  { gen:  4, label: "Barnbarn",           period: "2012–",         color: "#9a7d2e" },
];

interface Props {
  livingPersons: Person[];
  rootPerson: string | null;
  onSelect: (id: string | null) => void;
}

export function TreeLeftPanel({ livingPersons, rootPerson, onSelect }: Props) {
  const pathname = usePathname();

  return (
    <div
      style={{
        width: 220,
        flexShrink: 0,
        background: "#fff",
        borderRight: "1px solid #e8e4de",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {/* ── App nav ──────────────────────────────────────────── */}
      <div style={{ padding: "14px 12px 10px", borderBottom: "1px solid #f0ece6" }}>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#b5b0aa", margin: "0 0 8px 4px" }}>
          Navigation
        </p>
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 10px",
                borderRadius: 8,
                marginBottom: 2,
                textDecoration: "none",
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                color: active ? "#4a7c59" : "#6b6358",
                background: active ? "#f0f5ed" : "transparent",
                transition: "all 0.12s",
              }}
            >
              <Icon size={14} style={{ flexShrink: 0, opacity: active ? 1 : 0.6 }} />
              {label}
            </Link>
          );
        })}
      </div>

      {/* ── Person picker ─────────────────────────────────────── */}
      <div style={{ padding: "14px 12px 10px", borderBottom: "1px solid #f0ece6" }}>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#b5b0aa", margin: "0 0 10px 4px" }}>
          Vem är du?
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {/* "Alla" pill */}
          <button
            onClick={() => onSelect(null)}
            style={{
              padding: "4px 10px",
              borderRadius: 20,
              border: `1.5px solid ${rootPerson === null ? "#2c2925" : "#ddd8d2"}`,
              background: rootPerson === null ? "#2c2925" : "#faf8f5",
              color: rootPerson === null ? "#fff" : "#6b6358",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.12s",
            }}
          >
            Alla
          </button>
          {livingPersons.map((p) => {
            const isActive = rootPerson === p.id;
            const isJan = p.side === "Jans sida";
            const isKarin = p.side === "Karins sida";
            const accent = isJan ? "#4a7c59" : isKarin ? "#9a7d2e" : "#7a736a";
            return (
              <button
                key={p.id}
                onClick={() => onSelect(isActive ? null : p.id)}
                title={p.fullName}
                style={{
                  padding: "4px 10px",
                  borderRadius: 20,
                  border: `1.5px solid ${isActive ? accent : "#ddd8d2"}`,
                  background: isActive ? (isJan ? "#f0f5ed" : isKarin ? "#faf6e8" : "#f5f2ee") : "#faf8f5",
                  color: isActive ? accent : "#6b6358",
                  fontSize: 11,
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  boxShadow: isActive ? `0 0 0 2px ${accent}25` : "none",
                  transition: "all 0.12s",
                  whiteSpace: "nowrap",
                }}
              >
                {p.firstName}
              </button>
            );
          })}
        </div>
        {rootPerson && (
          <p style={{ fontSize: 10, color: "#9a9590", marginTop: 8 }}>
            Fokus:{" "}
            <strong style={{ color: "#4a7c59" }}>
              {livingPersons.find((p) => p.id === rootPerson)?.fullName}
            </strong>
          </p>
        )}
      </div>

      {/* ── Generation guide ──────────────────────────────────── */}
      <div style={{ padding: "14px 12px", flex: 1 }}>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#b5b0aa", margin: "0 0 12px 4px" }}>
          Generationer
        </p>
        <div style={{ position: "relative", paddingLeft: 16 }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: 5, top: 6, bottom: 6, width: 1, background: "linear-gradient(to bottom, #d0ccc6, #e8e4de)" }} />
          {GEN_ROWS.map(({ gen, label, period, color }, i) => (
            <div key={gen} style={{ position: "relative", marginBottom: i < GEN_ROWS.length - 1 ? 18 : 0 }}>
              {/* Dot */}
              <div style={{ position: "absolute", left: -12, top: 4, width: 7, height: 7, borderRadius: "50%", background: color, border: "1.5px solid #fff", boxShadow: `0 0 0 1px ${color}` }} />
              <p style={{ fontFamily: "Georgia, serif", fontSize: 11, fontWeight: 600, color, margin: 0, lineHeight: 1.3 }}>{label}</p>
              <p style={{ fontSize: 10, color: "#a09a94", margin: "1px 0 0" }}>{period}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
