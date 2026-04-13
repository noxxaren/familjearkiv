// components/layout/Providers.tsx
"use client";

import { BottomTabBar } from "@/components/layout/BottomTabBar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BottomTabBar />
      {children}
    </>
  );
}
