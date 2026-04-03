"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MymyLogo } from "../components/mymy-logo";
import { LanguageSwitcher } from "../components/language-switcher";
import { useI18n } from "../i18n/provider";

type WishlistItem = {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  image: string;
};

const INITIAL_ITEMS: WishlistItem[] = [
  {
    id: 1,
    name: "Aurelia Band",
    subtitle: "18K Yellow Gold",
    price: 1250,
    image: "/images/cat-rings.jpg",
  },
  {
    id: 3,
    name: "Eos Drop Earrings",
    subtitle: "18K Yellow Gold",
    price: 2100,
    image: "/images/cat-earrings.jpg",
  },
  {
    id: 2,
    name: "Lunar Pendant",
    subtitle: "Sterling Silver",
    price: 890,
    image: "/images/best2.jpg",
  },
  {
    id: 4,
    name: "Starlight Bracelet",
    subtitle: "VS Diamonds",
    price: 4500,
    image: "/images/hero-bracelet.jpg",
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("fr-DZ", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(price) + " DA";
}

export default function WishlistPage() {
  const { t } = useI18n();
  const [items, setItems] = useState<WishlistItem[]>(INITIAL_ITEMS);
  const [email, setEmail] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const remove = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f0e8] text-text-dark">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 border-b border-[#e5ddd0]/60 bg-[#f5f0e8]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/" aria-label="Mymy home">
            <MymyLogo className="text-[1.7rem]" />
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            <Link
              href="/shop"
              className="font-montserrat text-sm text-text-dark transition-colors hover:text-[#8b6914]"
            >
              {t.nav.shop}
            </Link>
            <Link
              href="/#collections"
              className="font-montserrat text-sm text-text-dark transition-colors hover:text-[#8b6914]"
            >
              {t.nav.collections}
            </Link>
            <Link
              href="/#our-story"
              className="font-montserrat text-sm text-text-dark transition-colors hover:text-[#8b6914]"
            >
              {t.nav.ourStory}
            </Link>
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            <LanguageSwitcher variant="gold" />
            {/* Search */}
            <button aria-label={t.nav.search} className="text-[#8b6914] transition-colors hover:text-[#6f5110]">
              <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
            {/* Account */}
            <button aria-label={t.nav.account} className="text-[#8b6914] transition-colors hover:text-[#6f5110]">
              <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" />
              </svg>
            </button>
            {/* Cart / Bag → cart */}
            <Link href="/cart" aria-label={t.nav.cart} className="text-[#8b6914] transition-colors hover:text-[#6f5110]">
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
          <nav className="border-t border-[#e5ddd0]/60 bg-[#f5f0e8] px-6 pb-6 pt-4">
            <div className="flex flex-col gap-4">
              <Link href="/shop" onClick={() => setMobileOpen(false)} className="font-montserrat text-[0.82rem] font-medium tracking-[0.12em] uppercase text-text-dark transition-colors hover:text-[#8b6914]">
                {t.nav.shop}
              </Link>
              <Link href="/#collections" onClick={() => setMobileOpen(false)} className="font-montserrat text-[0.82rem] font-medium tracking-[0.12em] uppercase text-text-dark transition-colors hover:text-[#8b6914]">
                {t.nav.collections}
              </Link>
              <Link href="/#our-story" onClick={() => setMobileOpen(false)} className="font-montserrat text-[0.82rem] font-medium tracking-[0.12em] uppercase text-text-dark transition-colors hover:text-[#8b6914]">
                {t.nav.ourStory}
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-5 border-t border-[#e5ddd0]/60 pt-5">
              <button aria-label={t.nav.search} className="text-[#8b6914] transition-colors hover:text-[#6f5110]">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
              <Link href="/cart" aria-label={t.nav.cart} className="text-[#8b6914] transition-colors hover:text-[#6f5110]" onClick={() => setMobileOpen(false)}>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12 lg:px-10 lg:py-14">
        {/* Title */}
        <div className="mb-12">
          <p className="font-montserrat text-[0.58rem] uppercase tracking-[0.24em] text-[#8b6914]">
            {t.wishlist.privateCollection}
          </p>
          <h1 className="mt-2 font-playfair text-5xl text-text-dark">{t.wishlist.myWishlist}</h1>
          <div className="mt-3 h-px w-12 bg-[#8b6914]" />
        </div>

        {items.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#d9cfbe] bg-[#fdfbf7]">
            <svg
              className="h-10 w-10 text-[#c4a95a]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <p className="font-playfair text-2xl text-text-dark">{t.wishlist.emptyTitle}</p>
            <Link
              href="/shop"
              className="font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-[#8b6914] underline underline-offset-4"
            >
              {t.wishlist.exploreCollection}
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col">
                {/* Image */}
                <div className="relative">
                  <Link href={`/shop/product/${item.id}`}>
                    <div className="relative aspect-square overflow-hidden bg-[#ece7dc]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  </Link>
                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    aria-label={`${t.wishlist.removeFromWishlist} ${item.name}`}
                    className="absolute inset-e-2.5 top-2.5 flex h-6 w-6 items-center justify-center bg-white/90 text-[#5e564d] shadow-sm transition-colors hover:bg-white hover:text-[#c0392b]"
                  >
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Info */}
                <div className="mt-4 flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-montserrat text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-text-dark">
                      {item.name}
                    </h2>
                    <p className="mt-1 font-cormorant text-sm italic text-[#9f937e]">
                      {item.subtitle}
                    </p>
                  </div>
                  <span className="shrink-0 font-montserrat text-sm font-medium text-text-dark">
                    {formatPrice(item.price)}
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="mt-auto border-t border-[#e0d8cc] bg-[#f5f0e8]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] lg:px-10">
          {/* Brand */}
          <div>
            <MymyLogo className="text-3xl" />
            <p className="mt-4 max-w-xs font-montserrat text-sm leading-7 text-[#7a7065]">
              {t.shop.atelierDesc}
            </p>
          </div>

          {/* Shop */}
          <div>
            <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.24em] text-[#a89c87]">
              {t.nav.shop}
            </p>
            <ul className="mt-5 space-y-3.5 font-montserrat text-sm text-[#6c6257]">
              <li><Link href="/shop" className="transition-colors hover:text-[#8b6914]">{t.shop.newArrivals}</Link></li>
              <li><Link href="/shop" className="transition-colors hover:text-[#8b6914]">{t.shop.bestSellers}</Link></li>
              <li><Link href="/#collections" className="transition-colors hover:text-[#8b6914]">{t.nav.collections}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.24em] text-[#a89c87]">
              {t.shop.support}
            </p>
            <ul className="mt-5 space-y-3.5 font-montserrat text-sm text-[#6c6257]">
              <li><Link href="#" className="transition-colors hover:text-[#8b6914]">{t.footer.shipping}</Link></li>
              <li><Link href="#" className="transition-colors hover:text-[#8b6914]">{t.footer.returns}</Link></li>
              <li><Link href="#" className="transition-colors hover:text-[#8b6914]">{t.footer.contactUs}</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.24em] text-[#a89c87]">
              {t.shop.newsletter}
            </p>
            <form
              className="mt-5 flex items-stretch border-b border-[#c4b99a]"
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.shop.emailPlaceholder}
                className="flex-1 bg-transparent py-2 font-montserrat text-sm text-text-dark placeholder-[#b3a897] outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex items-center justify-center px-2 text-[#8b6914] transition-opacity hover:opacity-70"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </form>
            <div className="mt-6 flex gap-5 font-montserrat text-[0.6rem] uppercase tracking-[0.2em] text-[#a89c87]">
              <Link href="#" className="transition-colors hover:text-[#8b6914]">{t.footer.instagram}</Link>
              <Link href="#" className="transition-colors hover:text-[#8b6914]">{t.footer.pinterest}</Link>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-10">
          <p className="font-montserrat text-[0.58rem] uppercase tracking-[0.24em] text-[#b3a897]">
            {t.footer.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
}
