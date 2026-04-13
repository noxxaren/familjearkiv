/**
 * POST /api/login
 * Validates the family password and sets the auth cookie.
 */

import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "family-auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = (await request.json()) as { password?: string };
  const submitted = body.password ?? "";
  const expected = process.env.FAMILY_SITE_PASSWORD ?? "";

  if (!expected) {
    // Password protection is not configured — always succeed
    return NextResponse.json({ ok: true });
  }

  if (submitted !== expected) {
    return NextResponse.json(
      { ok: false, error: "Fel lösenord" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE, submitted, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
    // secure: true when deployed to HTTPS
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
