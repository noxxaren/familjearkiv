// app/tree/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import { TreePageClient } from "@/components/tree/TreePageClient";

export const metadata: Metadata = {
  title: "Släktträd",
  description: "Utforska Lindoff-familjens släktträd med alla generationer.",
};

export default function TreePage() {
  return (
    <Suspense>
      <TreePageClient />
    </Suspense>
  );
}
