// components/tree/TreeRightPanel.tsx
// Static panel — no "use client" needed

import Link from "next/link";
import { getPersonCount, getPersonsBySide } from "@/lib/data";

export function TreeRightPanel() {
  const total = getPersonCount();
  const janCount = getPersonsBySide("Jans sida").length;
  const karinCount = getPersonsBySide("Karins sida").length;

  return (
    <div
      style={{
        width: 220,
        flexShrink: 0,
        background: "#fff",
        borderLeft: "1px solid #e8e4de",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        overflowX: "hidden",
        padding: "14px 14px 20px",
        gap: 0,
      }}
    >
      {/* ── Stats ─────────────────────────────────────────────── */}
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#b5b0aa", margin: "0 0 10px" }}>
          Statistik
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { label: "Totalt", value: total, color: "#5c5650" },
            { label: "Jans sida", value: janCount, color: "#4a7c59" },
            { label: "Karins sida", value: karinCount, color: "#9a7d2e" },
            { label: "Generationer", value: 6, color: "#7a736a" },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#7a7570" }}>{label}</span>
              <span style={{ fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 700, color }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Jan & Karin story snippets ─────────────────────────── */}
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            borderLeft: "3px solid #b8d4b0",
            padding: "8px 10px",
            background: "#f8faf7",
            borderRadius: "0 8px 8px 0",
            marginBottom: 10,
          }}
        >
          <p style={{ fontFamily: "Georgia, serif", fontSize: 10.5, fontWeight: 700, color: "#4a7c59", margin: "0 0 4px" }}>Jans sida</p>
          <p style={{ fontSize: 10, color: "#6a7a6a", lineHeight: 1.55, margin: 0 }}>
            Dragon Jöns Andersson Lindoff antog soldatnamnet 1883 vid Skånska Dragonregementet.
          </p>
        </div>
        <div
          style={{
            borderLeft: "3px solid #d9c07a",
            padding: "8px 10px",
            background: "#fdf9ee",
            borderRadius: "0 8px 8px 0",
          }}
        >
          <p style={{ fontFamily: "Georgia, serif", fontSize: 10.5, fontWeight: 700, color: "#9a7d2e", margin: "0 0 4px" }}>Karins sida</p>
          <p style={{ fontSize: 10, color: "#7a6a4a", lineHeight: 1.55, margin: 0 }}>
            Båtsman Gumme Olsson Bramstång (1847) ger namn åt en av Karins linjer via Sven-Elof Olsson.
          </p>
        </div>
      </div>

      {/* ── Tips ──────────────────────────────────────────────── */}
      <div>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#b5b0aa", margin: "0 0 10px" }}>
          Tips
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {[
            { icon: "👆", text: "Klicka en person för att se detaljer" },
            { icon: "🔍", text: "Scrolla eller nyp för att zooma" },
            { icon: "✋", text: "Dra för att panorera" },
            { icon: "🌿", text: "Välj vem du är för att fokusera trädet" },
          ].map(({ icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
              <span style={{ fontSize: 12, lineHeight: 1 }}>{icon}</span>
              <span style={{ fontSize: 10, color: "#8a8480", lineHeight: 1.5 }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer link ───────────────────────────────────────── */}
      <div style={{ marginTop: "auto", paddingTop: 20 }}>
        <Link
          href="/people"
          style={{
            display: "block",
            textAlign: "center",
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #e8e4de",
            fontSize: 11,
            fontWeight: 600,
            color: "#7a7570",
            textDecoration: "none",
            background: "#faf8f5",
            transition: "background 0.12s",
          }}
        >
          Visa alla personer →
        </Link>
      </div>
    </div>
  );
}

