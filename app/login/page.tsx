"use client";

/**
 * /login — Family site password gate.
 *
 * Only shown when FAMILY_SITE_PASSWORD is set in .env.local.
 * In development (no password set) this page is never reached.
 */

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, TreePine, Loader2, AlertCircle } from "lucide-react";

// Isolated component that uses useSearchParams — wrapped in Suspense below
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (data.ok) {
        router.replace(from);
      } else {
        setError(data.error ?? "Fel lösenord — försök igen.");
      }
    } catch {
      setError("Något gick fel. Försök igen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo / brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-lg">
            <TreePine className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-text-primary">
            Lindoffs Familjearkiv
          </h1>
          <p className="text-text-muted mt-2 text-sm">
            En privat plats för familjens historia
          </p>
        </div>

        {/* Login card */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-text-muted" />
            <h2 className="font-serif text-xl font-semibold text-text-primary">
              Logga in
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-secondary mb-1.5"
              >
                Lösenord
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ange familjens lösenord"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                required
                autoFocus
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loggar in…
                </>
              ) : (
                "Gå in i arkivet"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-text-muted text-xs mt-6">
          Kontakta familjearkivets administratör om du behöver lösenordet.
        </p>
      </motion.div>
    </div>
  );
}

// Page export — wraps LoginForm in Suspense as required by Next.js 14
// when useSearchParams() is used inside a client component.
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <LoginForm />
    </Suspense>
  );
}
