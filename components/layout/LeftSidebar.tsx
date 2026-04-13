// components/layout/LeftSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, TreePine, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Hem", icon: Home },
  { href: "/tree", label: "Släktträd", icon: TreePine },
  { href: "/people", label: "Alla personer", icon: Users },
];

export function LeftSidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-white rounded-xl card-shadow p-4 space-y-0.5">
      {NAV_LINKS.map(({ href, label, icon: Icon }) => {
        const active =
          pathname === href || (href !== "/" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
              active
                ? "bg-jan-tint text-primary font-medium"
                : "text-text-secondary hover:bg-surface-subtle hover:text-text-primary"
            )}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
          </Link>
        );
      })}
    </div>
  );
}
