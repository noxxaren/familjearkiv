// components/home/HomeHero.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TreePine, ArrowRight, Users, BookOpen, Calendar } from "lucide-react";
import { getPersonCount, getPersonsBySide } from "@/lib/data";
import { resolveImageSrc, getAvatarUrl } from "@/lib/utils";
import { getLivingPersons } from "@/lib/tree";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function HomeHero() {
  const count = getPersonCount();
  const janCount = getPersonsBySide("Jans sida").length;
  const karinCount = getPersonsBySide("Karins sida").length;
  const livingPersons = getLivingPersons();
  const router = useRouter();

  return (
    <div className="space-y-4">

      {/* ── Hero banner ───────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl"
        style={{ background: "linear-gradient(150deg, #1E3A1E 0%, #2A5020 45%, #4A3800 100%)" }}
      >
        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px",
          }}
        />

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(201,151,30,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative px-8 py-10 md:py-14">
          {/* Eyebrow */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex items-center gap-2 mb-5"
          >
            <TreePine className="w-4 h-4 text-white/40" />
            <span className="text-white/40 text-xs tracking-[0.2em] uppercase font-medium">
              Lindoffs Familjearkiv
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="font-serif font-bold text-white leading-[1.0] mb-5"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", letterSpacing: "-0.025em" }}
          >
            Välkommen till{" "}
            <em className="not-italic" style={{ color: "#C9971E" }}>
              vår families
            </em>
            <br />
            historia
          </motion.h1>

          {/* Thin ornamental divider */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex items-center gap-3 mb-5"
          >
            <div className="h-px w-8 bg-white/20" />
            <span style={{ color: "#C9971E", fontSize: "1.1rem" }}>✦</span>
            <div className="h-px w-8 bg-white/20" />
          </motion.div>

          {/* Description */}
          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-white/65 leading-relaxed mb-8 max-w-md"
            style={{ fontSize: "0.95rem" }}
          >
            Fyra generationer, från 1800-talets soldattorp i Skåne till nutid.
            Utforska berättelserna om dragonryttare, bönder och de platser som format familjen Lindoff.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/tree"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: "#C9971E",
                color: "#1A1714",
              }}
            >
              <TreePine className="w-4 h-4" />
              Utforska trädet
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/people"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white/80 hover:text-white border border-white/20 hover:border-white/40 transition-all"
            >
              <Users className="w-4 h-4" />
              Alla personer
            </Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex gap-6 mt-10 pt-8 border-t border-white/10"
          >
            {[
              { icon: Users, value: count, label: "personer" },
              { icon: BookOpen, value: "4", label: "generationer" },
              { icon: Calendar, value: "200+", label: "år historia" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-3.5 h-3.5 text-white/30" />
                <span className="font-serif font-bold text-white text-lg leading-none">{value}</span>
                <span className="text-white/40 text-xs leading-none">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Two family lines ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3">
        {[
          {
            side: "Jans sida",
            count: janCount,
            bg: "#EFF5EC",
            border: "#B8D4B0",
            accent: "#1E3A1E",
            label: "Jans linje",
            desc: "Soldater, bönder och lantbrukare i norra Skåne",
            delay: 6,
          },
          {
            side: "Karins sida",
            count: karinCount,
            bg: "#FBF7EC",
            border: "#D9C07A",
            accent: "#8B6A10",
            label: "Karins linje",
            desc: "Hantverkare och handelsmän längs den skånska kusten",
            delay: 7,
          },
        ].map(({ side, count: sideCount, bg, border, accent, label, desc, delay }) => (
          <motion.div
            key={side}
            custom={delay}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <Link
              href={`/people?side=${encodeURIComponent(side)}`}
              className="block p-4 rounded-2xl border transition-all hover:-translate-y-0.5 group"
              style={{ background: bg, borderColor: border }}
            >
              <div
                className="text-xs font-semibold uppercase tracking-[0.15em] mb-1"
                style={{ color: accent }}
              >
                {label}
              </div>
              <div
                className="font-serif font-bold text-2xl leading-none mb-2"
                style={{ color: accent }}
              >
                {sideCount}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: `${accent}99` }}>
                {desc}
              </p>
              <div
                className="flex items-center gap-1 mt-3 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: accent }}
              >
                Utforska <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* ── "Vem är du?" — person picker navigating to /tree ─────────────── */}
      <motion.div
        custom={8}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="bg-white rounded-2xl p-5 card-shadow"
      >
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-xs font-medium text-text-muted tracking-[0.15em] uppercase mb-0.5">
              Utforska trädet
            </p>
            <h2 className="font-serif font-semibold text-lg text-text-primary">
              Vem är du?
            </h2>
          </div>
          <Link
            href="/tree"
            className="text-xs text-text-muted hover:text-primary transition-colors flex items-center gap-1"
          >
            Öppna trädet <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <p className="text-xs text-text-muted mb-4">
          Välj din plats i familjen — trädet öppnas med fokus på dig och dina förfäder.
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {livingPersons.map((person, i) => {
            const isJan = person.side === "Jans sida";
            const isKarin = person.side === "Karins sida";
            const accent = isJan ? "#1E3A1E" : isKarin ? "#8B6A10" : "#1A1714";
            const bg = isJan ? "#EFF5EC" : isKarin ? "#FBF7EC" : "#F4F0EB";
            const border = isJan ? "#B8D4B0" : isKarin ? "#D9C07A" : "#E4E0DA";
            return (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.06, duration: 0.35 }}
              >
                <button
                  onClick={() => router.push(`/tree?person=${person.id}`)}
                  className="w-full flex flex-col items-center gap-2 p-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-md group cursor-pointer"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <div
                    className="w-12 h-12 rounded-full overflow-hidden border-2 flex-shrink-0"
                    style={{ borderColor: border }}
                  >
                    <Image
                      src={resolveImageSrc(person.image, person.id, person.gender)}
                      alt={person.fullName}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = getAvatarUrl(person.id, person.gender);
                      }}
                    />
                  </div>
                  <div className="text-center min-w-0 w-full">
                    <p
                      className="text-xs font-semibold leading-tight truncate group-hover:underline"
                      style={{ color: accent }}
                    >
                      {person.firstName}
                    </p>
                    {person.birthYear && (
                      <p className="text-xs text-text-muted mt-0.5">
                        f. {person.birthYear}
                      </p>
                    )}
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* "Visa hela trädet" fallback */}
        <div className="mt-3 pt-3 border-t border-border">
          <Link
            href="/tree"
            className="flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium transition-all"
            style={{ color: "#5c5650", background: "#f5f2ee" }}
          >
            <TreePine className="w-3.5 h-3.5" />
            Visa hela trädet utan fokus
          </Link>
        </div>
      </motion.div>

      {/* ── Ancestor tree teaser ──────────────────────────────────────────── */}
      <motion.div
        custom={9}
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <Link
          href="/tree"
          className="block rounded-2xl p-5 border border-dashed border-border hover:border-primary/40 hover:bg-jan-tint transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <TreePine className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-text-primary text-sm">Interaktivt släktträd</p>
                <p className="text-xs text-text-muted mt-0.5">
                  Se hela familjen över fyra generationer
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
      </motion.div>

    </div>
  );
}
