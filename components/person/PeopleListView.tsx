"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, Users } from "lucide-react";
import { getAllPersons, searchPersons } from "@/lib/data";
import { SearchBar } from "@/components/ui/SearchBar";
import { PersonCard } from "./PersonCard";
import { cn } from "@/lib/utils";
import type { FamilySide } from "@/types/person";

type ViewMode = "grid" | "list";
type SideFilter = "all" | FamilySide;

export function PeopleListView() {
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sideFilter, setSideFilter] = useState<SideFilter>("all");

  const allPersons = getAllPersons();

  const results = useMemo(() => {
    let persons = searchPersons(query);
    if (sideFilter !== "all") {
      persons = persons.filter((p) => p.side === sideFilter);
    }
    return persons;
  }, [query, sideFilter]);

  const sideOptions: { value: SideFilter; label: string }[] = [
    { value: "all", label: "Alla" },
    { value: "Jans sida", label: "Jans sida" },
    { value: "Karins sida", label: "Karins sida" },
    { value: "Gemensam", label: "Gemensam" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl py-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-medium text-text-muted tracking-[0.15em] uppercase mb-2">
              Familjearkivet
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-1">
              Alla personer
            </h1>
            <p className="text-text-secondary text-sm">
              {allPersons.length} personer i arkivet
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search & controls bar */}
      <div className="bg-white border-b border-border sticky top-14 z-40">
        <div className="container mx-auto px-4 max-w-6xl py-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1 max-w-xl">
              <SearchBar
                value={query}
                onChange={setQuery}
                placeholder="Sök på namn, plats, år, yrke..."
              />
            </div>

            {/* Side filter pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {sideOptions.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setSideFilter(value)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                    sideFilter === value
                      ? value === "Jans sida"
                        ? "bg-primary text-white"
                        : value === "Karins sida"
                        ? "bg-accent text-white"
                        : "bg-text-primary text-white"
                      : "bg-surface-subtle text-text-secondary hover:text-text-primary hover:bg-border"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 border border-border rounded-lg p-0.5 bg-surface-subtle">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  viewMode === "grid"
                    ? "bg-white text-text-primary shadow-sm"
                    : "text-text-muted hover:text-text-secondary"
                )}
                aria-label="Rutnätsvy"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  viewMode === "list"
                    ? "bg-white text-text-primary shadow-sm"
                    : "text-text-muted hover:text-text-secondary"
                )}
                aria-label="Listvy"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 max-w-6xl py-8">
        {/* Result count */}
        <p className="text-text-muted text-xs mb-5">
          {results.length === allPersons.length
            ? `Visar alla ${results.length} personer`
            : `${results.length} av ${allPersons.length} personer`}
        </p>

        <AnimatePresence mode="wait">
          {results.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <Users className="w-10 h-10 text-border mx-auto mb-4" />
              <h3 className="font-serif text-xl text-text-secondary mb-2">
                Inga personer hittades
              </h3>
              <p className="text-text-muted text-sm">
                Prova att söka på ett annat namn, plats eller år.
              </p>
            </motion.div>
          ) : viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {results.map((person, i) => (
                <PersonCard
                  key={person.id}
                  person={person}
                  index={i}
                  viewMode="grid"
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-2"
            >
              {results.map((person, i) => (
                <PersonCard
                  key={person.id}
                  person={person}
                  index={i}
                  viewMode="list"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
