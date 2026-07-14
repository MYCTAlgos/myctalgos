"use client";

import { useActionState } from "react";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { signIn } from "./actions";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors duration-200 focus:border-blue-400";

const labelClass =
  "mb-2 block text-xs font-medium uppercase tracking-wider text-white/50";

export default function AdminLoginPage() {
  const [error, formAction, isPending] = useActionState(signIn, null);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-950 px-6">
      <BlueprintGrid tone="dark" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(47,111,237,0.18),transparent_55%)]" />

      <form
        action={formAction}
        className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-navy-900 p-8"
      >
        <p className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-sky-300">
          {"// Admin"}
        </p>
        <h1 className="mb-8 text-2xl font-medium text-white">Sign in</h1>

        <div className="mb-4">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className={labelClass}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className={inputClass}
          />
        </div>

        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400 px-6 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
