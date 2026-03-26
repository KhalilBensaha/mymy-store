"use client";

import Link from "next/link";
import { useState } from "react";
import { MymyLogo } from "../components/mymy-logo";
import { LanguageSwitcher } from "../components/language-switcher";
import { useI18n } from "../i18n/provider";

export default function ShopLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-warm-white text-text-dark">
      <header className="sticky top-0 z-50 border-b border-cream-dark/40 bg-warm-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/" aria-label="Mymy home">
            <MymyLogo className="text-[1.7rem]" />
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            <Link href="/shop" className="border-b border-[#8b6914] pb-1 font-montserrat text-sm text-[#8b6914]">
              {t.nav.shop}
            </Link>
            <Link href="/#collections" className="font-montserrat text-sm text-text-dark transition-colors hover:text-[#8b6914]">
              {t.nav.collections}
            </Link>
            <Link href="/#our-story" className="font-montserrat text-sm text-text-dark transition-colors hover:text-[#8b6914]">
              {t.nav.ourStory}
            </Link>
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            <LanguageSwitcher variant="gold" />
            <button aria-label={t.nav.search} className="text-[#8b6914] transition-colors hover:text-[#6f5110]">
              <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
            <button aria-label={t.nav.account} className="text-[#8b6914] transition-colors hover:text-[#6f5110]">
              <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" />
              </svg>
            </button>
            <Link href="/wishlist" aria-label={t.nav.cart} className="text-[#8b6914] transition-colors hover:text-[#6f5110]">
              <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1l.4 2M7 13h7l3-8H5.4m1.6 8L5.4 5m1.6 8l-1.35 2.7A1 1 0 006.55 17h8.9a1 1 0 100-2H7.42l.93-2zM7 18a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            </Link>
          </div>

          {/* Mobile: language switcher + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher variant="gold" />
            <button
              className="text-[#8b6914]"
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
              <Link href="/shop" onClick={() => setMobileOpen(false)} className="font-montserrat text-[0.82rem] font-medium tracking-[0.12em] uppercase text-[#8b6914]">
                {t.nav.shop}
              </Link>
              <Link href="/#collections" onClick={() => setMobileOpen(false)} className="font-montserrat text-[0.82rem] font-medium tracking-[0.12em] uppercase text-text-dark transition-colors hover:text-[#8b6914]">
                {t.nav.collections}
              </Link>
              <Link href="/#our-story" onClick={() => setMobileOpen(false)} className="font-montserrat text-[0.82rem] font-medium tracking-[0.12em] uppercase text-text-dark transition-colors hover:text-[#8b6914]">
                {t.nav.ourStory}
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-5 border-t border-cream-dark/30 pt-5">
              <button aria-label={t.nav.search} className="text-[#8b6914] transition-colors hover:text-[#6f5110]">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
              <Link href="/wishlist" aria-label={t.nav.cart} className="text-[#8b6914] transition-colors hover:text-[#6f5110]" onClick={() => setMobileOpen(false)}>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-cream-dark/40 bg-[#f7f3ec]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-10">
          <div>
            <MymyLogo className="text-3xl" />
            <p className="mt-4 max-w-xs font-montserrat text-sm leading-7 text-[#7a7065]">
              {t.shop.atelierDesc}
            </p>
          </div>

          <div>
            <p className="font-montserrat text-[0.66rem] uppercase tracking-[0.22em] text-[#a89c87]">{t.nav.shop}</p>
            <ul className="mt-4 space-y-3 font-montserrat text-sm text-[#6c6257]">
              <li><Link href="/shop">{t.nav.shop}</Link></li>
              <li><Link href="/#collections">{t.nav.collections}</Link></li>
              <li><Link href="/#our-story">{t.nav.ourStory}</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-montserrat text-[0.66rem] uppercase tracking-[0.22em] text-[#a89c87]">{t.footer.service}</p>
            <ul className="mt-4 space-y-3 font-montserrat text-sm text-[#6c6257]">
              <li><Link href="#">{t.footer.shipping}</Link></li>
              <li><Link href="#">{t.footer.returns}</Link></li>
              <li><Link href="#">{t.footer.contactUs}</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-montserrat text-[0.66rem] uppercase tracking-[0.22em] text-[#a89c87]">{t.footer.follow}</p>
            <ul className="mt-4 space-y-3 font-montserrat text-sm text-[#6c6257]">
              <li><Link href="#">{t.footer.instagram}</Link></li>
              <li><Link href="#">{t.footer.pinterest}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-10">
          <p className="font-montserrat text-[0.62rem] uppercase tracking-[0.24em] text-[#b3a897]">
            {t.footer.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
}
