export type FamilySide = "Jans sida" | "Karins sida" | "Gemensam";
export type Gender = "male" | "female" | "other";

export interface StorySection {
  title: string;
  text: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: "birth" | "death" | "marriage" | "move" | "military" | "work" | "other";
}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender?: Gender;
  birthDate?: string;
  deathDate?: string;
  birthYear?: number;
  deathYear?: number;
  birthPlace?: string;
  deathPlace?: string;
  bioShort?: string;
  bioLong?: string;
  image?: string;
  gallery?: string[];
  coverImage?: string;
  parents?: string[];
  partner?: string[];
  children?: string[];
  siblings?: string[];
  generation?: number;
  occupation?: string;
  side?: FamilySide;
  role?: string;
  notes?: string[];
  storySections?: StorySection[];
  timeline?: TimelineEvent[];
}
