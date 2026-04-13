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
