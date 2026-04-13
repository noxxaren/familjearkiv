"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Sök...",
  className,
}: SearchBarProps) {
  return (
    <div className={cn("relative flex-1", className)}>
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full h-11 pl-10 pr-10 rounded-xl border border-border",
          "bg-surface-subtle text-text-primary placeholder:text-text-muted",
          "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 focus:bg-white",
          "transition-all text-sm"
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
          aria-label="Rensa sökning"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
