import type { Metadata } from "next";
import "./globals.css";
import "@xyflow/react/dist/style.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";

export const metadata: Metadata = {
  title: {
    default: "Lindoffs Familjearkiv",
    template: "%s | Lindoffs Familjearkiv",
  },
  description:
    "Utforska Lindoff-familjens historia från 1800-talets soldattorp till nutid. Berättelser om dragonryttare, bocktryckare, bönder och de platser som format vår familj.",
  keywords: ["Lindoff", "genealogi", "släktforskning", "familjehistoria", "Kyrkheddinge", "Nöbbelöv", "Skåne"],
  openGraph: {
    type: "website",
    locale: "sv_SE",
    siteName: "Lindoffs Familjearkiv",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col bg-background">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
