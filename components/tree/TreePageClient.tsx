"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { FamilyTreeView } from "./FamilyTreeView";
import { TreeLeftPanel } from "./TreeLeftPanel";
import { TreeRightPanel } from "./TreeRightPanel";
import { getLivingPersons } from "@/lib/tree";

export function TreePageClient() {
  const searchParams = useSearchParams();
  const initialPerson = searchParams.get("person");

  const [rootPerson, setRootPerson] = useState<string | null>(initialPerson);
  const livingPersons = useMemo(() => getLivingPersons(), []);

  // Sync if URL param changes (e.g. browser back/forward)
  useEffect(() => {
    setRootPerson(searchParams.get("person"));
  }, [searchParams]);

  return (
    <div
      style={{
        display: "flex",
        // Fill the viewport below the 56px navbar
        height: "calc(100vh - 56px)",
        overflow: "hidden",
        background: "#faf8f5",
      }}
    >
      <TreeLeftPanel
        livingPersons={livingPersons}
        rootPerson={rootPerson}
        onSelect={setRootPerson}
      />

      <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
        <FamilyTreeView rootPerson={rootPerson} />
      </div>

      <TreeRightPanel />
    </div>
  );
}
