// components/layout/AppShell.tsx
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";

interface AppShellProps {
  children: React.ReactNode;
  /** Override the right column. Defaults to <RightSidebar />. */
  rightSlot?: React.ReactNode;
}

export function AppShell({ children, rightSlot }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1200px] mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-[220px_1fr_220px] gap-4 items-start">
        <aside className="hidden md:block sticky top-[72px]">
          <LeftSidebar />
        </aside>
        <main className="min-w-0">{children}</main>
        <aside className="hidden md:block sticky top-[72px]">
          {rightSlot ?? <RightSidebar />}
        </aside>
      </div>
    </div>
  );
}
