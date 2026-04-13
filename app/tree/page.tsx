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
