/**
 * middleware.ts — Optional password protection for the family site.
 *
 * ─── HOW TO ENABLE ────────────────────────────────────────────────────────
 *
 *  1. Copy .env.example → .env.local
 *  2. Set:  FAMILY_SITE_PASSWORD=ditt-hemliga-lösenord
 *  3. Restart the dev server: npm run dev
 *
 *  The middleware is completely inactive when FAMILY_SITE_PASSWORD is unset,
 *  so development is never blocked by the login gate.
 *
 * ─── HOW IT WORKS ─────────────────────────────────────────────────────────
 *
 *  - On first visit, the user is redirected to /login
 *  - After entering the correct password, a cookie "family-auth" is set
 *  - Subsequent requests read the cookie — no database needed
 *  - The cookie expires after 30 days
 *
 *  This is suitable for a private family site. It is NOT a replacement for
 *  proper authentication (NextAuth, Clerk, etc.) if you need user accounts.
 *
 * ─────────────────────────────────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "family-auth";
const LOGIN_PATH = "/login";

/** Paths that are always public, even when password protection is active. */
const PUBLIC_PATHS = new Set([LOGIN_PATH, "/api/login"]);

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // ── Auth is disabled for static exports (GitHub Pages) ──────────────────
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") return NextResponse.next();

  // ── Auth is disabled unless FAMILY_SITE_PASSWORD is configured ──────────
  const password = process.env.FAMILY_SITE_PASSWORD;
  if (!password) return NextResponse.next();

  // ── Always allow public paths and static assets ──────────────────────────
  if (
    PUBLIC_PATHS.has(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // ── Check auth cookie ─────────────────────────────────────────────────────
  const authCookie = request.cookies.get(AUTH_COOKIE)?.value;
  if (authCookie === password) return NextResponse.next();

  // ── Redirect unauthenticated requests to /login ───────────────────────────
  const loginUrl = new URL(LOGIN_PATH, request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  // Run on all routes except static files and Next internals
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
