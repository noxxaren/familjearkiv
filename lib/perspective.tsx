"use client";

/**
 * lib/perspective.tsx
 *
 * Provides a React context that tracks which family member the current
 * visitor has identified themselves as. The choice is persisted to
 * localStorage so it survives page reloads.
 *
 * Usage in any client component:
 *   const { viewer, setViewer, resetViewer, showPicker } = usePerspective();
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getPersonById } from "@/lib/data";
import type { Person } from "@/types/person";

const STORAGE_KEY = "family-viewer-id";
const GUEST_VALUE = "__guest__";

// ─── Context shape ─────────────────────────────────────────────────────────────

interface PerspectiveState {
  /** The person the visitor has chosen, or null for guest/unset. */
  viewer: Person | null;
  /** Raw id stored in localStorage (includes "__guest__"). */
  viewerId: string | null;
  /** True once the user has made a choice (person OR guest). */
  hasChosen: boolean;
  /** True while waiting for localStorage to load (avoid flash). */
  loading: boolean;
  /** Open the PersonPicker overlay programmatically. */
  openPicker: () => void;
  /** Close the PersonPicker overlay without changing the selection. */
  closePicker: () => void;
  /** True when the picker overlay should be visible. */
  pickerOpen: boolean;
  /** Persist a person choice and close the picker. */
  setViewer: (id: string) => void;
  /** Continue as a guest (no person selected). */
  setGuestMode: () => void;
  /** Wipe the stored choice and re-open the picker. */
  resetViewer: () => void;
}

const PerspectiveContext = createContext<PerspectiveState | null>(null);

// ─── Provider ──────────────────────────────────────────────────────────────────

export function PerspectiveProvider({ children }: { children: React.ReactNode }) {
  const [viewerId, setViewerId] = useState<string | null>(null);
  const [hasChosen, setHasChosen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pickerOpen, setPickerOpen] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setViewerId(stored);
      setHasChosen(true);
    } else {
      // First visit — show the picker
      setPickerOpen(true);
    }
    setLoading(false);
  }, []);

  const persist = useCallback((id: string) => {
    localStorage.setItem(STORAGE_KEY, id);
    setViewerId(id);
    setHasChosen(true);
    setPickerOpen(false);
  }, []);

  const setViewer = useCallback((id: string) => persist(id), [persist]);
  const setGuestMode = useCallback(() => persist(GUEST_VALUE), [persist]);

  const resetViewer = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setViewerId(null);
    setHasChosen(false);
    setPickerOpen(true);
  }, []);

  const openPicker = useCallback(() => setPickerOpen(true), []);
  const closePicker = useCallback(() => {
    // Only allow closing if the user has already made a choice
    if (hasChosen) setPickerOpen(false);
  }, [hasChosen]);

  // Resolve the Person object from the stored id
  const viewer: Person | null =
    viewerId && viewerId !== GUEST_VALUE
      ? (getPersonById(viewerId) ?? null)
      : null;

  return (
    <PerspectiveContext.Provider
      value={{
        viewer,
        viewerId,
        hasChosen,
        loading,
        pickerOpen,
        openPicker,
        closePicker,
        setViewer,
        setGuestMode,
        resetViewer,
      }}
    >
      {children}
    </PerspectiveContext.Provider>
  );
}

// ─── Hook ──────────────────────────────────────────────────────────────────────

export function usePerspective(): PerspectiveState {
  const ctx = useContext(PerspectiveContext);
  if (!ctx) throw new Error("usePerspective must be used inside PerspectiveProvider");
  return ctx;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Given a viewer person and all family data, return the set of ancestor ids
 * (parents, grandparents, ...) up to maxDepth generations back.
 */
export function getAncestorIds(
  viewerId: string,
  allPersons: Person[],
  maxDepth = 6
): Set<string> {
  const result = new Set<string>();
  const personMap = new Map(allPersons.map((p) => [p.id, p]));

  function walk(id: string, depth: number) {
    if (depth > maxDepth) return;
    const person = personMap.get(id);
    if (!person) return;
    for (const parentId of person.parents ?? []) {
      if (!result.has(parentId)) {
        result.add(parentId);
        walk(parentId, depth + 1);
      }
    }
  }

  walk(viewerId, 0);
  return result;
}

/**
 * Return the set of descendant ids (children, grandchildren, ...).
 */
export function getDescendantIds(
  viewerId: string,
  allPersons: Person[],
  maxDepth = 6
): Set<string> {
  const result = new Set<string>();
  const personMap = new Map(allPersons.map((p) => [p.id, p]));

  function walk(id: string, depth: number) {
    if (depth > maxDepth) return;
    const person = personMap.get(id);
    if (!person) return;
    for (const childId of person.children ?? []) {
      if (!result.has(childId)) {
        result.add(childId);
        walk(childId, depth + 1);
      }
    }
  }

  walk(viewerId, 0);
  return result;
}
