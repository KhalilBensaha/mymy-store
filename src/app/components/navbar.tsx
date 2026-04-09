"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { MymyLogo } from "./mymy-logo";
import { LanguageSwitcher } from "./language-switcher";
import { useI18n } from "../i18n/provider";
import { useCart } from "@/lib/cart-context";

/**
 * Shared navigation bar across all user-facing routes.
 * @param variant "dark" (default, for light backgrounds) | "light" (for dark backgrounds, not used yet)
 */
export function Navbar({ variant = "dark" }: { variant?: "dark" | "light" } = {}) {
  const { t } = useI18n();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.shop, href: "/shop" },
    { label: t.nav.categories, href: "/shop/categories" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/shop") return pathname === "/shop";
    return pathname.startsWith(href.split("#")[0]);
  };

  const accent = variant === "dark" ? "text-[#8b6914]" : "text-gold";
  const accentHover = variant === "dark" ? "hover:text-[#8b6914]" : "hover:text-gold";
  const textColor = variant === "dark" ? "text-text-dark" : "text-cream-dark";
  const mutedColor = variant === "dark" ? "text-text-muted" : "text-cream-dark/70";
  const switcherVariant = variant === "dark" ? "gold" as const : undefined;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cream-dark/40 bg-warm-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Logo */}
        <Link href="/" aria-label="Mymy home">
          <MymyLogo className="text-[1.6rem]" />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-montserrat text-[11px] font-medium tracking-[0.18em] uppercase transition-colors ${
                isActive(l.href)
                  ? `${accent} border-b border-current pb-0.5`
                  : `${mutedColor} ${accentHover}`
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop action icons */}
        <div className="hidden items-center gap-5 md:flex">
          <LanguageSwitcher variant={switcherVariant} />
          {/* Wishlist */}
          <Link href="/wishlist" aria-label={t.nav.wishlist} className={`${accent} transition-colors ${accentHover}`}>
            <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </Link>
          {/* Cart */}
          <Link href="/cart" aria-label={t.nav.cart} className={`relative ${accent} transition-colors ${accentHover}`}>
            <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#8b6914] font-montserrat text-[0.5rem] font-bold text-white">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>
          {/* Admin */}
          <Link href="/admin" aria-label={t.nav.admin} className={`${accent} transition-colors ${accentHover}`}>
            <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </Link>
        </div>

        {/* Mobile: language switcher + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher variant={switcherVariant} />
          <button
            className={accent}
            aria-label={mobileOpen ? t.nav.close : t.nav.menu}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="border-t border-cream-dark/30 bg-warm-white px-6 pb-6 pt-4">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`font-montserrat text-[0.82rem] font-medium tracking-[0.12em] uppercase transition-colors ${
                  isActive(l.href) ? accent : `${textColor} ${accentHover}`
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-5 border-t border-cream-dark/30 pt-5">
            <Link href="/wishlist" aria-label={t.nav.wishlist} className={`${accent} transition-colors ${accentHover}`} onClick={() => setMobileOpen(false)}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </Link>
            <Link href="/cart" aria-label={t.nav.cart} className={`relative ${accent} transition-colors ${accentHover}`} onClick={() => setMobileOpen(false)}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#8b6914] font-montserrat text-[0.5rem] font-bold text-white">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
            <Link href="/admin" aria-label={t.nav.admin} className={`${accent} transition-colors ${accentHover}`} onClick={() => setMobileOpen(false)}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
