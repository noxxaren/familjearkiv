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
