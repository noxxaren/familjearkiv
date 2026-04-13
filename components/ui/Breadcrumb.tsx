import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Brödsmulor"
      className={cn("flex items-center flex-wrap gap-1 text-sm", className)}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && (
              <ChevronRight className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-text-muted hover:text-primary transition-colors"
              >
                {i === 0 ? (
                  <span className="flex items-center gap-1">
                    <Home className="w-3.5 h-3.5" />
                    {item.label !== "Hem" && item.label}
                  </span>
                ) : (
                  item.label
                )}
              </Link>
            ) : (
              <span
                className={cn(
                  isLast ? "text-text-primary font-medium" : "text-text-muted"
                )}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
