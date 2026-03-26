"use client";

import { useActionState } from "react";
import { authenticate } from "@/lib/actions/auth";

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1e1e2d] px-4 font-montserrat">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="mb-10 text-center">
          <h1 className="font-playfair text-3xl tracking-wider text-[#c4a95a]">MYMY</h1>
          <p className="mt-1 text-xs tracking-[0.2em] text-white/40">ATELIER ADMIN</p>
        </div>

        {/* Card */}
        <form action={formAction} className="rounded-2xl bg-white/5 p-8 backdrop-blur-sm border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-6">Sign in to your account</h2>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-[12px] font-medium text-white/60 mb-1.5">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="admin@mymyatelier.com"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-white placeholder:text-white/30 outline-none focus:border-[#c4a95a]/60 focus:ring-1 focus:ring-[#c4a95a]/30 transition-colors"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-[12px] font-medium text-white/60 mb-1.5">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-white placeholder:text-white/30 outline-none focus:border-[#c4a95a]/60 focus:ring-1 focus:ring-[#c4a95a]/30 transition-colors"
            />
          </div>

          {/* Error */}
          {errorMessage && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-[12px] text-red-400">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              {errorMessage}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-[#c4a95a] py-2.5 text-[13px] font-semibold text-white hover:bg-[#b09845] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <span className="inline-flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Signing in…
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-[11px] text-white/20">
          &copy; {new Date().getFullYear()} Mymy Atelier. All rights reserved.
        </p>
      </div>
    </div>
  );
}
