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
      {/* ── Legend ────────────────────────────────────────────── */}
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#b5b0aa", margin: "0 0 10px" }}>
          Förklaring
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <LegendRow>
            <div style={{ width: 28, height: 16, borderRadius: 5, background: "#f0f5ed", border: "1.5px solid #b8d4b0", flexShrink: 0 }} />
            <span>Jans sida</span>
          </LegendRow>
          <LegendRow>
            <div style={{ width: 28, height: 16, borderRadius: 5, background: "#faf6e8", border: "1.5px solid #d9c07a", flexShrink: 0 }} />
            <span>Karins sida</span>
          </LegendRow>
          <LegendRow>
            <HeartBadge />
            <span>Par / gifta</span>
          </LegendRow>
          <LegendRow>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: 24, height: 0, borderTop: "2px solid #4a7c5980" }} />
            </div>
            <span>Förälder–barn</span>
          </LegendRow>
          <LegendRow>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: 24, height: 0, borderTop: "1.5px solid #d4899a80" }} />
            </div>
            <span>Partnerkoppling</span>
          </LegendRow>
        </div>
      </div>

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

// ─── Small helper components ──────────────────────────────────────────────────

function LegendRow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {Array.isArray(children) ? (
        <>
          {children[0]}
          <span style={{ fontSize: 11, color: "#7a7570" }}>{children[1]}</span>
        </>
      ) : (
        children
      )}
    </div>
  );
}

function HeartBadge() {
  return (
    <div
      style={{
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: "#fff",
        border: "1.5px solid #e8c0c8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 0 2px rgba(232,192,200,0.25)",
        flexShrink: 0,
      }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="#c0566a">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
}
