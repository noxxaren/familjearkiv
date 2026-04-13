# Facebook-layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current editorial/Apple-style layout with a three-column Facebook-inspired layout: dark green top navbar, left sidebar with viewer card + nav, center content, right sidebar with stats + featured persons. Homepage center shows a bottom-up ancestor tree. Person profile pages get Facebook-style cover photo + overlapping avatar + tabs.

**Architecture:** Each page wraps its content in a new `AppShell` component that renders the 3-column grid. `LeftSidebar` and `RightSidebar` are standalone components rendered inside AppShell by default; profile pages pass a custom `rightSlot`. The homepage center uses a new `AncestorTreeView` client component that reads from the perspective context. A `BottomTabBar` client component is added to `Providers.tsx` for mobile nav.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, lucide-react

---

## File Map

| Action | File |
|--------|------|
| Modify | `types/person.ts` — add `coverImage?: string` |
| Create | `components/layout/AppShell.tsx` — 3-col grid wrapper |
| Create | `components/layout/LeftSidebar.tsx` — viewer card + nav links |
| Create | `components/layout/RightSidebar.tsx` — stats + featured persons |
| Create | `components/layout/BottomTabBar.tsx` — mobile bottom tab bar |
| Rewrite | `components/layout/Navbar.tsx` — dark green top bar with search |
| Create | `components/tree/AncestorTreeView.tsx` — bottom-up ancestor tree |
| Create | `components/person/PersonProfileClient.tsx` — cover + tabs |
| Create | `components/person/PersonRelationsSidebar.tsx` — compact relations |
| Rewrite | `app/page.tsx` — AppShell + AncestorTreeView, no hero |
| Rewrite | `app/people/[id]/page.tsx` — AppShell + PersonProfileClient |
| Modify | `app/people/page.tsx` — wrap in AppShell |
| Modify | `app/tree/page.tsx` — wrap in AppShell |
| Modify | `components/layout/Providers.tsx` — add BottomTabBar |
| Delete | `components/home/HeroSection.tsx` |
| Delete | `components/home/HowItWorks.tsx` |
| Delete | `components/home/StoriesSection.tsx` |
| Delete | `components/home/FeaturedPeopleSection.tsx` |

---

## Task 1: Add coverImage to Person type

**Files:**
- Modify: `types/person.ts`

- [ ] **Step 1: Add field**

Open `types/person.ts`. After the `gallery?: string[];` line, add:

```typescript
  coverImage?: string;
```

The `Person` interface `image` block should now read:
```typescript
  image?: string;
  gallery?: string[];
  coverImage?: string;
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd "C:/Users/matti/Git/Släktforskning" && npx tsc --noEmit
```
Expected: no output (zero errors).

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/matti/Git/Släktforskning" && git add types/person.ts && git commit -m "feat: add coverImage field to Person type"
```

---

## Task 2: Create AppShell

**Files:**
- Create: `components/layout/AppShell.tsx`

- [ ] **Step 1: Create component**

```tsx
// components/layout/AppShell.tsx
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";

interface AppShellProps {
  children: React.ReactNode;
  /** Override the right column. Defaults to <RightSidebar />. */
  rightSlot?: React.ReactNode;
}

export function AppShell({ children, rightSlot }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1200px] mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-[220px_1fr_220px] gap-4 items-start">
        <aside className="hidden md:block sticky top-[72px]">
          <LeftSidebar />
        </aside>
        <main className="min-w-0">{children}</main>
        <aside className="hidden md:block sticky top-[72px]">
          {rightSlot ?? <RightSidebar />}
        </aside>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd "C:/Users/matti/Git/Släktforskning" && npx tsc --noEmit
```
Expected: no output. (LeftSidebar and RightSidebar don't exist yet — TypeScript will error. That's OK; fix it after creating them in Tasks 3–4.)

Actually skip the tsc check here — run it after Task 4.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/matti/Git/Släktforskning" && git add components/layout/AppShell.tsx && git commit -m "feat: add AppShell 3-column grid layout"
```

---

## Task 3: Create LeftSidebar

**Files:**
- Create: `components/layout/LeftSidebar.tsx`

- [ ] **Step 1: Create component**

```tsx
// components/layout/LeftSidebar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Home, TreePine, Users } from "lucide-react";
import { cn, resolveImageSrc, getAvatarUrl } from "@/lib/utils";
import { usePerspective } from "@/lib/perspective";

const NAV_LINKS = [
  { href: "/", label: "Hem", icon: Home },
  { href: "/tree", label: "Släktträd", icon: TreePine },
  { href: "/people", label: "Alla personer", icon: Users },
];

export function LeftSidebar() {
  const pathname = usePathname();
  const { viewer, openPicker, loading } = usePerspective();
  const [imgSrc, setImgSrc] = useState(
    viewer ? resolveImageSrc(viewer.image, viewer.id) : ""
  );

  useEffect(() => {
    setImgSrc(viewer ? resolveImageSrc(viewer.image, viewer.id) : "");
  }, [viewer]);

  return (
    <div className="bg-white rounded-xl card-shadow p-4 space-y-1">
      {/* Viewer card */}
      {!loading && (
        <button
          onClick={openPicker}
          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-surface-subtle transition-colors mb-3 text-left"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-border">
            {viewer && imgSrc ? (
              <Image
                src={imgSrc}
                alt={viewer.fullName}
                width={40}
                height={40}
                className="w-full h-full object-cover"
                onError={() => setImgSrc(getAvatarUrl(viewer.id))}
              />
            ) : (
              <div className="w-full h-full bg-surface-subtle flex items-center justify-center">
                <Users className="w-4 h-4 text-text-muted" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium text-text-primary truncate">
              {viewer ? viewer.firstName : "Välj person"}
            </div>
            <div className="text-xs text-text-muted">
              {viewer ? "Du ser som dig" : "Klicka för att välja"}
            </div>
          </div>
        </button>
      )}

      <div className="border-t border-border pt-3 space-y-0.5">
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                active
                  ? "bg-jan-tint text-primary font-medium"
                  : "text-text-secondary hover:bg-surface-subtle hover:text-text-primary"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd "C:/Users/matti/Git/Släktforskning" && git add components/layout/LeftSidebar.tsx && git commit -m "feat: add LeftSidebar with viewer card and nav links"
```

---

## Task 4: Create RightSidebar

**Files:**
- Create: `components/layout/RightSidebar.tsx`

- [ ] **Step 1: Create component**

```tsx
// components/layout/RightSidebar.tsx
import Link from "next/link";
import { getFeaturedPersons, getPersonCount } from "@/lib/data";
import { resolveImageSrc } from "@/lib/utils";

export function RightSidebar() {
  const featured = getFeaturedPersons().slice(0, 4);
  const count = getPersonCount();

  return (
    <div className="space-y-3">
      {/* Stats card */}
      <div className="bg-white rounded-xl card-shadow p-4">
        <h3 className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-3">
          Familjen
        </h3>
        <div className="space-y-2">
          {[
            { label: "Personer", value: count },
            { label: "Generationer", value: 4 },
            { label: "År historia", value: "200+" },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">{label}</span>
              <span className="text-sm font-semibold text-text-primary">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured persons card */}
      {featured.length > 0 && (
        <div className="bg-white rounded-xl card-shadow p-4">
          <h3 className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-3">
            Kända personer
          </h3>
          <div className="space-y-3">
            {featured.map((person) => {
              const isKarin = person.side === "Karins sida";
              return (
                <Link
                  key={person.id}
                  href={`/people/${person.id}`}
                  className="flex items-center gap-2.5 group"
                >
                  <div
                    className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border"
                    style={{
                      borderColor: isKarin ? "#D9C07A" : "#B8D4B0",
                      background: isKarin ? "#FBF7EC" : "#EFF5EC",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resolveImageSrc(person.image, person.id)}
                      alt={person.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span
                    className="text-sm font-medium group-hover:underline"
                    style={{ color: isKarin ? "#8B6A10" : "#1E3A1E" }}
                  >
                    {person.firstName}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd "C:/Users/matti/Git/Släktforskning" && npx tsc --noEmit
```
Expected: no output (zero errors).

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/matti/Git/Släktforskning" && git add components/layout/RightSidebar.tsx && git commit -m "feat: add RightSidebar with family stats and featured persons"
```

---

## Task 5: Create BottomTabBar and add to Providers

**Files:**
- Create: `components/layout/BottomTabBar.tsx`
- Modify: `components/layout/Providers.tsx`

- [ ] **Step 1: Create BottomTabBar**

```tsx
// components/layout/BottomTabBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, TreePine, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/", label: "Hem", icon: Home },
  { href: "/tree", label: "Träd", icon: TreePine },
  { href: "/people", label: "Personer", icon: Users },
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border">
      <div className="flex">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 py-2.5 text-xs transition-colors",
                active
                  ? "text-primary font-medium"
                  : "text-text-muted hover:text-text-secondary"
              )}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Read Providers.tsx to see current content**

```bash
cat "C:/Users/matti/Git/Släktforskning/components/layout/Providers.tsx"
```

- [ ] **Step 3: Add BottomTabBar to Providers**

The current `Providers.tsx` wraps children in `PerspectiveProvider` with `PersonPicker`. Add `BottomTabBar` alongside `PersonPicker`:

```tsx
// components/layout/Providers.tsx
"use client";

import { PerspectiveProvider } from "@/lib/perspective";
import { PersonPicker } from "@/components/onboarding/PersonPicker";
import { BottomTabBar } from "@/components/layout/BottomTabBar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PerspectiveProvider>
      <PersonPicker />
      <BottomTabBar />
      {children}
    </PerspectiveProvider>
  );
}
```

- [ ] **Step 4: Add bottom padding to body so content isn't hidden under tab bar**

Open `app/globals.css`. Find the `body` or `main` styles and ensure mobile content isn't hidden behind the tab bar. Add to globals.css:

```css
@media (max-width: 768px) {
  body {
    padding-bottom: 60px;
  }
}
```

- [ ] **Step 5: Commit**

```bash
cd "C:/Users/matti/Git/Släktforskning" && git add components/layout/BottomTabBar.tsx components/layout/Providers.tsx app/globals.css && git commit -m "feat: add mobile BottomTabBar"
```

---

## Task 6: Rewrite Navbar

**Files:**
- Rewrite: `components/layout/Navbar.tsx`

The new Navbar is a dark green top bar with logo left, search center, viewer avatar right. It replaces the current white navbar entirely.

- [ ] **Step 1: Rewrite Navbar.tsx**

```tsx
// components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TreePine, Search, X } from "lucide-react";
import { usePerspective } from "@/lib/perspective";
import { searchPersons } from "@/lib/data";
import { resolveImageSrc, getAvatarUrl } from "@/lib/utils";
import type { Person } from "@/types/person";

export function Navbar() {
  const { viewer, openPicker, loading } = usePerspective();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Person[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState("");
  const router = useRouter();

  useEffect(() => {
    setAvatarSrc(viewer ? resolveImageSrc(viewer.image, viewer.id) : "");
  }, [viewer]);

  function handleSearch(q: string) {
    setQuery(q);
    if (q.trim().length >= 2) {
      setResults(searchPersons(q).slice(0, 5));
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }

  function handleSelectResult(person: Person) {
    setQuery("");
    setResults([]);
    setShowResults(false);
    router.push(`/people/${person.id}`);
  }

  function handleClear() {
    setQuery("");
    setResults([]);
    setShowResults(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-primary">
      <nav className="max-w-[1200px] mx-auto px-4 h-14 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
          <TreePine className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
          <span className="font-serif font-semibold text-white text-base hidden sm:block">
            Lindoffs
          </span>
        </Link>

        {/* Search */}
        <div className="flex-1 relative max-w-sm mx-auto hidden sm:block">
          <div className="flex items-center gap-2 bg-white/15 hover:bg-white/20 transition-colors rounded-full px-3 py-1.5">
            <Search className="w-4 h-4 text-white/60 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => query.length >= 2 && setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 150)}
              placeholder="Sök person..."
              className="bg-transparent text-white placeholder-white/40 text-sm outline-none flex-1 min-w-0"
            />
            {query && (
              <button onClick={handleClear} aria-label="Rensa">
                <X className="w-3.5 h-3.5 text-white/60 hover:text-white transition-colors" />
              </button>
            )}
          </div>

          {showResults && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl overflow-hidden z-50">
              {results.map((p) => (
                <button
                  key={p.id}
                  onMouseDown={() => handleSelectResult(p)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-surface-subtle text-left transition-colors"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-surface-subtle">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resolveImageSrc(p.image, p.id)}
                      alt={p.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text-primary">
                      {p.fullName}
                    </div>
                    <div className="text-xs text-text-muted">{p.side}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Viewer avatar */}
        <div className="ml-auto flex-shrink-0">
          {!loading && (
            <button
              onClick={openPicker}
              title={viewer ? `${viewer.fullName} — Byt person` : "Välj din person"}
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/30 hover:border-white/70 transition-colors block"
            >
              {viewer && avatarSrc ? (
                <Image
                  src={avatarSrc}
                  alt={viewer.fullName}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                  onError={() => setAvatarSrc(getAvatarUrl(viewer.id))}
                />
              ) : (
                <div className="w-full h-full bg-white/20 flex items-center justify-center">
                  <span className="text-white/60 text-xs font-bold">?</span>
                </div>
              )}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd "C:/Users/matti/Git/Släktforskning" && npx tsc --noEmit
```
Expected: no output.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/matti/Git/Släktforskning" && git add components/layout/Navbar.tsx && git commit -m "feat: rewrite Navbar as dark green top bar with search"
```

---

## Task 7: Create AncestorTreeView

**Files:**
- Create: `components/tree/AncestorTreeView.tsx`

This is a client component that builds a bottom-up ancestor tree from the perspective viewer.

- [ ] **Step 1: Create the component**

```tsx
// components/tree/AncestorTreeView.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePerspective } from "@/lib/perspective";
import { getAllPersons, getFeaturedPersons } from "@/lib/data";
import { resolveImageSrc, getAvatarUrl, formatLifespan } from "@/lib/utils";
import type { Person } from "@/types/person";

const MAX_DEPTH = 3; // 4 rows total: viewer + parents + grandparents + great-grandparents

function buildAncestorRows(
  startId: string,
  personMap: Map<string, Person>
): Person[][] {
  const rows: Person[][] = [];
  const start = personMap.get(startId);
  if (!start) return rows;

  let current: Person[] = [start];

  for (let depth = 0; depth <= MAX_DEPTH && current.length > 0; depth++) {
    rows.push(current);
    const next: Person[] = [];
    for (const p of current) {
      for (const pid of p.parents ?? []) {
        const parent = personMap.get(pid);
        if (parent) next.push(parent);
      }
    }
    current = next;
  }

  return rows;
}

function PersonNode({
  person,
  isViewer,
}: {
  person: Person;
  isViewer: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(() =>
    resolveImageSrc(person.image, person.id)
  );
  const isJan = person.side === "Jans sida";
  const borderColor = isJan ? "#B8D4B0" : "#D9C07A";
  const bgColor = isJan ? "#EFF5EC" : "#FBF7EC";
  const lifespan = formatLifespan(person.birthYear, person.deathYear);
  const size = isViewer ? 56 : 40;

  return (
    <Link
      href={`/people/${person.id}`}
      className="flex flex-col items-center gap-1 group"
      title={person.fullName}
    >
      <div
        className="relative rounded-full overflow-hidden flex-shrink-0"
        style={{
          width: size,
          height: size,
          background: isViewer ? "#1E3A1E" : bgColor,
          border: `2px solid ${isViewer ? "#1E3A1E" : borderColor}`,
          outline: isViewer ? "3px solid #EFF5EC" : undefined,
          outlineOffset: isViewer ? "2px" : undefined,
        }}
      >
        <Image
          src={imgSrc}
          alt={person.fullName}
          fill
          className="object-cover"
          onError={() => setImgSrc(getAvatarUrl(person.id))}
        />
        {isViewer && (
          <div className="absolute inset-0 flex items-end justify-center pb-1 bg-primary/30">
            <span className="text-[8px] font-bold text-white leading-none">Du</span>
          </div>
        )}
      </div>
      <div className="text-center" style={{ maxWidth: 72 }}>
        <div className="text-xs font-medium text-text-primary leading-tight truncate group-hover:text-primary transition-colors">
          {person.firstName}
        </div>
        {lifespan && (
          <div className="text-[10px] text-text-muted leading-tight">{lifespan}</div>
        )}
      </div>
    </Link>
  );
}

export function AncestorTreeView() {
  const { viewer, loading } = usePerspective();
  const allPersons = useMemo(() => getAllPersons(), []);
  const personMap = useMemo(
    () => new Map(allPersons.map((p) => [p.id, p])),
    [allPersons]
  );

  const startId = useMemo(() => {
    if (viewer) return viewer.id;
    const featured = getFeaturedPersons();
    return featured[0]?.id ?? allPersons[0]?.id ?? "";
  }, [viewer, allPersons]);

  const rows = useMemo(
    () => buildAncestorRows(startId, personMap),
    [startId, personMap]
  );

  if (loading) {
    return (
      <div className="bg-white rounded-xl card-shadow p-6 flex items-center justify-center h-48 text-text-muted text-sm">
        Laddar...
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="bg-white rounded-xl card-shadow p-6 flex items-center justify-center h-48 text-text-muted text-sm">
        Välj en person för att se ditt träd.
      </div>
    );
  }

  // rows[0] = viewer, rows[1] = parents, etc. Render top-to-bottom (reversed).
  const reversed = [...rows].reverse();

  return (
    <div className="bg-white rounded-xl card-shadow p-6 overflow-x-auto">
      <h2 className="font-serif text-lg font-semibold text-text-primary mb-6">
        {viewer ? `${viewer.firstName}s förfäder` : "Familjeträdet"}
      </h2>

      <div className="flex flex-col items-center gap-0 w-full">
        {reversed.map((row, reversedIdx) => {
          const depth = reversed.length - 1 - reversedIdx;
          const isViewerRow = depth === 0;

          return (
            <div key={depth} className="flex flex-col items-center w-full">
              {/* Connector line between rows */}
              {reversedIdx > 0 && (
                <div className="w-px h-6 bg-border my-0" />
              )}

              {/* Row */}
              <div className="flex items-end justify-center gap-4 sm:gap-6 flex-wrap">
                {row.map((person) => (
                  <PersonNode
                    key={person.id}
                    person={person}
                    isViewer={isViewerRow && person.id === startId}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd "C:/Users/matti/Git/Släktforskning" && npx tsc --noEmit
```
Expected: no output.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/matti/Git/Släktforskning" && git add components/tree/AncestorTreeView.tsx && git commit -m "feat: add AncestorTreeView bottom-up ancestor tree"
```

---

## Task 8: Rewrite homepage

**Files:**
- Rewrite: `app/page.tsx`

- [ ] **Step 1: Replace page content**

```tsx
// app/page.tsx
import { AppShell } from "@/components/layout/AppShell";
import { AncestorTreeView } from "@/components/tree/AncestorTreeView";

export default function HomePage() {
  return (
    <AppShell>
      <AncestorTreeView />
    </AppShell>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd "C:/Users/matti/Git/Släktforskning" && npx tsc --noEmit
```
Expected: no output.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/matti/Git/Släktforskning" && git add app/page.tsx && git commit -m "feat: replace homepage hero with AppShell + AncestorTreeView"
```

---

## Task 9: Create PersonProfileClient and PersonRelationsSidebar

**Files:**
- Create: `components/person/PersonProfileClient.tsx`
- Create: `components/person/PersonRelationsSidebar.tsx`

- [ ] **Step 1: Create PersonRelationsSidebar**

```tsx
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
    resolveImageSrc(person.image, person.id)
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
          onError={() => setImgSrc(getAvatarUrl(person.id))}
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
```

- [ ] **Step 2: Create PersonProfileClient**

```tsx
// components/person/PersonProfileClient.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { cn, resolveImageSrc, getAvatarUrl, formatLifespan } from "@/lib/utils";
import { PersonStorySection } from "./PersonStorySection";
import { PersonGallery } from "./PersonGallery";
import { TimelineSection } from "./TimelineSection";
import { PersonRelations } from "./PersonRelations";
import type { Person } from "@/types/person";

type TabId = "story" | "gallery" | "timeline" | "relatives";

const TABS: { id: TabId; label: string }[] = [
  { id: "story", label: "Berättelse" },
  { id: "gallery", label: "Bilder" },
  { id: "timeline", label: "Tidslinje" },
  { id: "relatives", label: "Släktingar" },
];

export function PersonProfileClient({ person }: { person: Person }) {
  const [activeTab, setActiveTab] = useState<TabId>("story");
  const [imgSrc, setImgSrc] = useState(() =>
    resolveImageSrc(person.image, person.id)
  );
  const [coverSrc, setCoverSrc] = useState<string | null>(() =>
    person.coverImage ? resolveImageSrc(person.coverImage, person.id) : null
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

        {/* Overlapping avatar */}
        <div
          className="absolute rounded-full overflow-hidden border-4 border-white shadow-lg"
          style={{ width: 80, height: 80, bottom: -40, left: 24 }}
        >
          <Image
            src={imgSrc}
            alt={person.fullName}
            fill
            className="object-cover"
            onError={() => setImgSrc(getAvatarUrl(person.id))}
          />
        </div>
      </div>

      {/* Profile header */}
      <div className="pt-14 px-6 pb-4 border-b border-border">
        <h1 className="font-serif text-2xl font-bold text-text-primary leading-tight">
          {person.fullName}
        </h1>
        <div className="flex flex-wrap items-center gap-3 mt-1">
          {lifespan && (
            <span className="text-sm text-accent">{lifespan}</span>
          )}
          {person.side && (
            <span className="text-sm text-text-muted">{person.side}</span>
          )}
          {person.occupation && (
            <span className="text-sm text-text-muted">{person.occupation}</span>
          )}
        </div>
        {person.bioShort && (
          <p className="text-sm text-text-secondary mt-2 leading-relaxed">
            {person.bioShort}
          </p>
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
            <PersonStorySection sections={person.storySections} />
          ) : (
            <p className="text-text-muted text-sm">Ingen berättelse tillagd ännu.</p>
          ))}

        {activeTab === "gallery" &&
          (person.gallery && person.gallery.length > 0 ? (
            <PersonGallery gallery={person.gallery} personName={person.fullName} />
          ) : (
            <p className="text-text-muted text-sm">Inga bilder tillagda ännu.</p>
          ))}

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
```

- [ ] **Step 3: Verify TypeScript**

```bash
cd "C:/Users/matti/Git/Släktforskning" && npx tsc --noEmit
```
Expected: no output.

- [ ] **Step 4: Commit**

```bash
cd "C:/Users/matti/Git/Släktforskning" && git add components/person/PersonProfileClient.tsx components/person/PersonRelationsSidebar.tsx && git commit -m "feat: add PersonProfileClient with cover+tabs and PersonRelationsSidebar"
```

---

## Task 10: Rewrite person profile page

**Files:**
- Rewrite: `app/people/[id]/page.tsx`

- [ ] **Step 1: Rewrite the page**

```tsx
// app/people/[id]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPersonById, getAllPersonStaticParams } from "@/lib/data";
import { AppShell } from "@/components/layout/AppShell";
import { PersonProfileClient } from "@/components/person/PersonProfileClient";
import { PersonRelationsSidebar } from "@/components/person/PersonRelationsSidebar";

interface PersonPageProps {
  params: { id: string };
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  return getAllPersonStaticParams();
}

export async function generateMetadata({
  params,
}: PersonPageProps): Promise<Metadata> {
  const person = getPersonById(params.id);
  if (!person) return { title: "Person hittades inte" };
  return {
    title: person.fullName,
    description:
      person.bioShort ??
      `Utforska ${person.fullName}s historia i Lindoff-familjens arkiv.`,
  };
}

export default function PersonPage({ params }: PersonPageProps) {
  const person = getPersonById(params.id);
  if (!person) notFound();

  return (
    <AppShell rightSlot={<PersonRelationsSidebar person={person} />}>
      <PersonProfileClient person={person} />
    </AppShell>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd "C:/Users/matti/Git/Släktforskning" && npx tsc --noEmit
```
Expected: no output.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/matti/Git/Släktforskning" && git add "app/people/[id]/page.tsx" && git commit -m "feat: rewrite person profile page with cover photo and tabs"
```

---

## Task 11: Wrap people list page in AppShell

**Files:**
- Modify: `app/people/page.tsx`

- [ ] **Step 1: Update page**

```tsx
// app/people/page.tsx
import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { PeopleListView } from "@/components/person/PeopleListView";

export const metadata: Metadata = {
  title: "Alla personer",
  description: "Sök och bläddra bland alla personer i Lindoff-familjens arkiv.",
};

export default function PeoplePage() {
  return (
    <AppShell>
      <PeopleListView />
    </AppShell>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd "C:/Users/matti/Git/Släktforskning" && git add app/people/page.tsx && git commit -m "feat: wrap people list page in AppShell"
```

---

## Task 12: Wrap tree page in AppShell

**Files:**
- Modify: `app/tree/page.tsx`

- [ ] **Step 1: Update page**

```tsx
// app/tree/page.tsx
import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { FamilyTreeView } from "@/components/tree/FamilyTreeView";

export const metadata: Metadata = {
  title: "Släktträd",
  description: "Utforska Lindoff-familjens släktträd med alla generationer.",
};

export default function TreePage() {
  return (
    <AppShell>
      <FamilyTreeView />
    </AppShell>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd "C:/Users/matti/Git/Släktforskning" && git add app/tree/page.tsx && git commit -m "feat: wrap tree page in AppShell"
```

---

## Task 13: Delete old home components

**Files:**
- Delete: `components/home/HeroSection.tsx`
- Delete: `components/home/HowItWorks.tsx`
- Delete: `components/home/StoriesSection.tsx`
- Delete: `components/home/FeaturedPeopleSection.tsx`
- Delete: `components/person/PersonHero.tsx` (replaced by PersonProfileClient cover section)

- [ ] **Step 1: Delete the files**

```bash
cd "C:/Users/matti/Git/Släktforskning" && rm components/home/HeroSection.tsx components/home/HowItWorks.tsx components/home/StoriesSection.tsx components/home/FeaturedPeopleSection.tsx components/person/PersonHero.tsx
```

- [ ] **Step 2: Check nothing else imports them**

```bash
cd "C:/Users/matti/Git/Släktforskning" && grep -r "HeroSection\|HowItWorks\|StoriesSection\|FeaturedPeopleSection" --include="*.tsx" --include="*.ts" .
```
Expected: no output (zero matches).

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/matti/Git/Släktforskning" && git add -A && git commit -m "chore: delete obsolete home section components"
```

---

## Task 14: Final build verification

- [ ] **Step 1: Full TypeScript check**

```bash
cd "C:/Users/matti/Git/Släktforskning" && npx tsc --noEmit
```
Expected: no output (zero errors).

- [ ] **Step 2: Production build**

```bash
cd "C:/Users/matti/Git/Släktforskning" && npm run build 2>&1 | tail -30
```
Expected: output ends with something like:
```
Route (app)                              Size     First Load JS
...
✓ Generating static pages (31/31)
✓ Finalizing page optimization
```
Zero errors. If any TypeScript or import errors appear, fix them before proceeding.

- [ ] **Step 3: Fix any build errors**

Common issues to watch for:
- Missing `"use client"` on components that use hooks → add directive at top of file
- `next/image` domain errors for DiceBear → add `api.dicebear.com` to `next.config.js` `images.remotePatterns` if not already present
- Unused imports left from deleted components → remove them

To add DiceBear to next.config.js if needed:
```js
// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },
};
module.exports = nextConfig;
```

- [ ] **Step 4: Final commit**

```bash
cd "C:/Users/matti/Git/Släktforskning" && git add -A && git commit -m "feat: complete Facebook-layout redesign"
```
