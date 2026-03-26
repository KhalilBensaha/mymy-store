"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/provider";
import type { Locale } from "../i18n/types";

const locales: { id: Locale; flag: string; label: string }[] = [
  { id: "en", flag: "🇬🇧", label: "EN" },
  { id: "fr", flag: "🇫🇷", label: "FR" },
  { id: "ar", flag: "🇸🇦", label: "AR" },
];

export function LanguageSwitcher({ variant = "dark" }: { variant?: "dark" | "gold" }) {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on escape
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const current = locales.find((l) => l.id === locale) ?? locales[0];

  const textColor = variant === "gold" ? "text-[#8b6914]" : "text-text-dark";
  const hoverColor = variant === "gold" ? "hover:text-[#6f5110]" : "hover:text-gold";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={t.lang.label}
        aria-expanded={open}
        className={`flex items-center gap-1.5 font-montserrat text-[0.7rem] font-medium tracking-wide transition-colors ${textColor} ${hoverColor}`}
      >
        {/* Globe icon */}
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9 15.3 15.3 0 014-9z"
          />
        </svg>
        <span>{current.label}</span>
        {/* Chevron */}
        <svg
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute inset-e-0 top-full z-100 mt-2.5 w-40 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5"
          role="menu"
        >
          {/* Gold top bar */}
          <div className="h-0.5 bg-linear-to-r from-[#c4a95a] via-[#e8d5a0] to-[#c4a95a]" />

          {locales.map((l) => (
            <button
              key={l.id}
              type="button"
              role="menuitem"
              onClick={() => {
                setLocale(l.id);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 px-4 py-3 text-start font-montserrat text-sm transition-colors hover:bg-[#f5f0e8] ${
                locale === l.id ? "bg-[#fdf9f0] text-[#8b6914]" : "text-text-dark"
              }`}
            >
              <span className="text-base leading-none">{l.flag}</span>
              <span className="flex-1">
                {l.id === "en" ? t.lang.en : l.id === "fr" ? t.lang.fr : t.lang.ar}
              </span>
              {locale === l.id && (
                <span className="ms-auto h-1.5 w-1.5 rounded-full bg-[#8b6914]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
