import Link from "next/link";
import { TreePine } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#1A1714" }}>
      <div className="container mx-auto px-4 max-w-6xl py-8">
        {/* Desktop: single row */}
        <div className="hidden md:flex items-center justify-between gap-8">
          {/* Logo left */}
          <div className="flex items-center gap-2">
            <TreePine className="w-4 h-4 text-white/40" />
            <span className="font-serif text-sm text-white/70 tracking-tight">
              Lindoffs Familjearkiv
            </span>
          </div>

          {/* Nav center */}
          <nav className="flex items-center gap-6">
            {[
              { href: "/", label: "Hem" },
              { href: "/tree", label: "Släktträd" },
              { href: "/people", label: "Personer" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Copyright right */}
          <p className="text-xs text-white/30">
            © {year} Lindoffs Familjearkiv
          </p>
        </div>

        {/* Mobile: stacked centered */}
        <div className="md:hidden flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <TreePine className="w-4 h-4 text-white/40" />
            <span className="font-serif text-sm text-white/70">Lindoffs Familjearkiv</span>
          </div>

          <nav className="flex items-center gap-5">
            {[
              { href: "/", label: "Hem" },
              { href: "/tree", label: "Släktträd" },
              { href: "/people", label: "Personer" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          <p className="text-xs text-white/25">© {year} Lindoffs Familjearkiv</p>
        </div>
      </div>
    </footer>
  );
}
