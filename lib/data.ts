/**
 * lib/data.ts — CMS-ready data access layer
 *
 * All pages and components should import persons through this module
 * instead of importing directly from data/family.ts. This creates a
 * single seam where the data source can later be swapped.
 *
 * ─── HOW TO SWITCH DATA SOURCE ────────────────────────────────────────────
 *
 *  Today:  Local TypeScript file (data/family.ts)
 *  Later:  Notion, Sanity, or a JSON API
 *
 *  To switch, replace the implementations below — the call sites in pages
 *  and components stay unchanged.
 *
 *  Example: Sanity
 *    import { client } from "@/sanity/client";
 *    export async function getAllPersons() {
 *      return client.fetch(`*[_type == "person"]`);
 *    }
 *
 *  Example: JSON file / REST API
 *    export async function getAllPersons() {
 *      const res = await fetch("/api/persons", { cache: "force-cache" });
 *      return res.json();
 *    }
 *
 *  Example: Notion database
 *    import { Client } from "@notionhq/client";
 *    const notion = new Client({ auth: process.env.NOTION_TOKEN });
 *    export async function getAllPersons() {
 *      const { results } = await notion.databases.query({
 *        database_id: process.env.NOTION_DB_ID!,
 *      });
 *      return results.map(mapNotionPageToPerson);
 *    }
 *
 * ─────────────────────────────────────────────────────────────────────────
 */

import {
  familyData,
  featuredPersonIds,
  getPersonById as _getById,
  getPersonsByGeneration as _getByGeneration,
  getPersonsBySide as _getBySide,
  getRelatives as _getRelatives,
  searchPersons as _search,
} from "@/data/family";
import type { Person } from "@/types/person";

// ─── Read operations ──────────────────────────────────────────────────────────

/** Return every person in the archive. */
export function getAllPersons(): Person[] {
  return familyData;
}

/** Return a single person by id, or undefined if not found. */
export function getPersonById(id: string): Person | undefined {
  return _getById(id);
}

/** Return all persons belonging to a generation level (0 = oldest). */
export function getPersonsByGeneration(generation: number): Person[] {
  return _getByGeneration(generation);
}

/** Return all persons on one side of the family ("Jans sida" | "Karins sida"). */
export function getPersonsBySide(side: string): Person[] {
  return _getBySide(side);
}

/**
 * Return related persons for a given relation type.
 * Safely returns [] when the person has no relations of that type.
 */
export function getRelatives(
  person: Person,
  relation: "parents" | "children" | "partner" | "siblings"
): Person[] {
  return _getRelatives(person, relation);
}

/**
 * Full-text search across name, place, year, occupation and bio.
 * Returns all persons when query is empty.
 */
export function searchPersons(query: string): Person[] {
  return _search(query);
}

/**
 * Return the persons highlighted on the home page.
 * To change the selection, update featuredPersonIds in data/family.ts.
 */
export function getFeaturedPersons(): Person[] {
  return featuredPersonIds
    .map((id) => _getById(id))
    .filter((p): p is Person => p !== undefined);
}

/**
 * Return static params for generateStaticParams() in /people/[id]/page.tsx.
 * Maps to { id: string }[] as required by Next.js App Router.
 */
export function getAllPersonStaticParams(): { id: string }[] {
  return familyData.map((p) => ({ id: p.id }));
}

// ─── Generation helpers ───────────────────────────────────────────────────────

/** Return the distinct generation numbers present in the archive. */
export function getAvailableGenerations(): number[] {
  const gens = new Set(familyData.map((p) => p.generation ?? 0));
  return Array.from(gens).sort((a, b) => a - b);
}

/** Return total number of persons in the archive. */
export function getPersonCount(): number {
  return familyData.length;
}
