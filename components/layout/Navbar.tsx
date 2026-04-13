// components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TreePine, Search, X } from "lucide-react";
import { searchPersons } from "@/lib/data";
import { resolveImageSrc } from "@/lib/utils";
import type { Person } from "@/types/person";

export function Navbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Person[]>([]);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

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

      </nav>
    </header>
  );
}
