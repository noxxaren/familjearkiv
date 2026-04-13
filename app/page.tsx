// app/page.tsx
import { AppShell } from "@/components/layout/AppShell";
import { HomeHero } from "@/components/home/HomeHero";

export default function HomePage() {
  return (
    <AppShell>
      <HomeHero />
    </AppShell>
  );
}
