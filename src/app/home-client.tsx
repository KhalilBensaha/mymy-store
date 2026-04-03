"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ScrollReveal from "./scroll-reveal";
import { MymyLogo } from "./components/mymy-logo";
import { LanguageSwitcher } from "./components/language-switcher";
import { useI18n } from "./i18n/provider";
import { useCart } from "@/lib/cart-context";

/* ─── Props from server ─── */
export type CategoryData = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
};

export type BestSellerData = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type HomeClientProps = {
  allCategories: CategoryData[];
  featuredCategories: CategoryData[];
  bestSellers: BestSellerData[];
};

/* ─────────────── NAV ─────────────── */
function Navbar() {
  const { t } = useI18n();
  const { totalItems: cartTotal } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    { label: t.nav.shop, href: "/shop" },
    { label: t.nav.diamonds, href: "#diamonds" },
    { label: t.nav.gold, href: "#gold" },
    { label: t.nav.pearls, href: "#pearls" },
    { label: t.nav.collections, href: "#collections" },
    { label: t.nav.bridal, href: "#bridal" },
    { label: t.nav.contact, href: "/contact" },
  ];
  return (
    <header className="w-full bg-warm-white border-b border-cream-dark/40 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-4">
        <Link href="/" aria-label="Mymy home">
          <MymyLogo className="text-[1.55rem]" />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-montserrat text-[11px] font-medium tracking-[0.18em] uppercase text-text-muted hover:text-gold transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-5">
          <LanguageSwitcher />
          <button aria-label={t.nav.search} className="text-text-dark hover:text-gold transition-colors">
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
          <Link href="/cart" aria-label={t.nav.cart} className="relative text-text-dark hover:text-gold transition-colors">
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            {cartTotal > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#8b6914] font-montserrat text-[0.5rem] font-bold text-white">
                {cartTotal > 9 ? "9+" : cartTotal}
              </span>
            )}
          </Link>
          <Link href="/admin" aria-label={t.nav.admin} className="text-text-dark hover:text-gold transition-colors">
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <button
            className="text-text-dark"
            aria-label={mobileOpen ? t.nav.close : t.nav.menu}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="border-t border-cream-dark/30 bg-warm-white px-6 pb-6 pt-4">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="font-montserrat text-[0.82rem] font-medium tracking-[0.12em] uppercase text-text-dark transition-colors hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-5 border-t border-cream-dark/30 pt-5">
            <button aria-label={t.nav.search} className="text-text-dark hover:text-gold transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
            <Link href="/cart" aria-label={t.nav.cart} className="relative text-text-dark hover:text-gold transition-colors" onClick={() => setMobileOpen(false)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {cartTotal > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#8b6914] font-montserrat text-[0.5rem] font-bold text-white">
                  {cartTotal > 9 ? "9+" : cartTotal}
                </span>
              )}
            </Link>
            <Link href="/admin" aria-label={t.nav.admin} className="text-text-dark hover:text-gold transition-colors" onClick={() => setMobileOpen(false)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

/* ─────────────── HERO ─────────────── */
function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "90vh" }}>
      <Image
        src="/bg-image.jpg"
        alt="Luxury jewelry model"
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-[#f5f0e8]/80 lg:bg-linear-to-r lg:from-[#f5f0e8]/90 lg:via-[#f5f0e8]/65 lg:to-[#f5f0e8]/10" />
      <div className="relative z-10 flex min-h-[90vh] items-center">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-20">
          <div className="max-w-xl animate-fade-up">
            <p className="font-montserrat text-[0.58rem] uppercase tracking-[0.32em] text-[#8b6914] mb-5">
              Mymy Atelier · Luxury Jewelry
            </p>
            <h1 className="font-playfair text-[2.6rem] sm:text-[3.2rem] lg:text-[3.8rem] xl:text-[4.4rem] font-bold leading-[1.05] mb-7 uppercase">
              <span className="text-text-dark block">{t.hero.craftedFor}</span>
              <span className="text-text-dark block">{t.hero.eternity}</span>
              <span className="text-[#8b6914] italic font-light block mt-1">{t.hero.designedFor}</span>
              <span className="text-[#8b6914] italic font-light block">{t.hero.elegance}</span>
            </h1>
            <div className="h-px w-14 bg-[#c4a95a] mb-7" />
            <p className="font-montserrat text-[12px] sm:text-[13px] text-text-muted max-w-sm leading-relaxed mb-10">
              {t.hero.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="#diamonds" className="font-montserrat text-[10px] tracking-[0.14em] uppercase font-semibold bg-[#8b6914] text-white px-7 py-3.5 hover:bg-[#6f5110] transition-colors">
                {t.hero.exploreDiamonds}
              </Link>
              <Link href="#gold" className="font-montserrat text-[10px] tracking-[0.14em] uppercase font-semibold border border-text-dark/40 text-text-dark px-7 py-3.5 hover:bg-text-dark hover:text-white transition-colors">
                {t.hero.shopGoldPearl}
              </Link>
            </div>
            <div className="mt-14 flex gap-10">
              <div>
                <p className="font-playfair text-2xl text-text-dark">2,400+</p>
                <p className="mt-1 font-montserrat text-[0.58rem] uppercase tracking-[0.18em] text-[#a89c87]">Pieces Crafted</p>
              </div>
              <div className="border-s border-[#d9cfbe] ps-10">
                <p className="font-playfair text-2xl text-text-dark">18K</p>
                <p className="mt-1 font-montserrat text-[0.58rem] uppercase tracking-[0.18em] text-[#a89c87]">Pure Gold</p>
              </div>
              <div className="border-s border-[#d9cfbe] ps-10">
                <p className="font-playfair text-2xl text-text-dark">VS+</p>
                <p className="mt-1 font-montserrat text-[0.58rem] uppercase tracking-[0.18em] text-[#a89c87]">Diamonds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── CATEGORIES (styled like Best Sellers) ─────────────── */
function Categories({ allCategories }: { allCategories: CategoryData[] }) {
  const { t } = useI18n();

  /* Fallback static items when DB is empty */
  const fallback = [
    { id: 0, name: t.categories.diamondNecklace, slug: "necklaces", description: t.categories.certifiedBrilliance, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop" },
    { id: 1, name: t.categories.goldBridalSet, slug: "bracelets", description: t.categories.timelessBridal, image: "https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=400&h=400&fit=crop" },
    { id: 2, name: t.categories.pearlEarrings, slug: "earrings", description: t.categories.lustrousElegance, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop" },
    { id: 3, name: t.categories.solitaireRings, slug: "rings", description: t.categories.perfectStones, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop" },
  ];

  const items = allCategories.length > 0 ? allCategories : fallback;

  return (
    <section className="w-full bg-cream py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-center text-text-dark mb-12 tracking-wide">
          {t.categories.title}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((c) => (
            <Link
              key={c.id}
              href={`/shop/${c.slug}`}
              className="group text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative rounded-2xl overflow-hidden bg-warm-white aspect-square mb-3 shadow-sm">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <h4 className="font-montserrat text-sm font-semibold text-text-dark uppercase tracking-wide">{c.name}</h4>
              <p className="font-montserrat text-xs text-text-muted mt-0.5 line-clamp-1">{c.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── BEST SELLERS ─────────────── */
function BestSellers({ items }: { items: BestSellerData[] }) {
  const { t } = useI18n();

  const fallback = [
    { id: 0, name: "Diamond Eternity Band", price: 5560, image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop" },
    { id: 1, name: "Gold Kada Bracelet", price: 2200, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop" },
    { id: 2, name: "Pearl Strand Necklace", price: 1800, image: "https://images.unsplash.com/photo-1515562141589-67f0d569b6fc?w=400&h=400&fit=crop" },
    { id: 3, name: "Solitaire Stud Earrings", price: 3500, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop" },
  ];

  const display = items.length > 0 ? items : fallback;

  return (
    <section className="w-full bg-warm-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-center text-text-dark mb-12 tracking-wide">
          {t.bestSellers.title}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {display.map((p) => (
            <Link key={p.id} href={`/shop/product/${p.id}`} className="group text-center transition-transform duration-300 hover:-translate-y-1">
              <div className="relative rounded-2xl overflow-hidden bg-warm-white aspect-square mb-3 shadow-sm">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <h4 className="font-montserrat text-sm font-semibold text-text-dark">{p.name}</h4>
              <p className="font-montserrat text-sm text-gold font-bold">
                {new Intl.NumberFormat("fr-DZ", { style: "decimal", maximumFractionDigits: 0 }).format(p.price)} DA
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── CRAFTSMANSHIP ─────────────── */
function Craftsmanship() {
  const { t } = useI18n();
  const items = [
    { title: t.craftsmanship.handcrafted, sub: t.craftsmanship.masterArtisans, icon: <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg> },
    { title: t.craftsmanship.certifiedDiamonds, sub: t.craftsmanship.giaIgi, icon: <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
    { title: t.craftsmanship.pureGold, sub: t.craftsmanship.hallmarked, icon: <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { title: t.craftsmanship.premiumPearls, sub: t.craftsmanship.rareLustrous, icon: <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg> },
  ];
  return (
    <section className="w-full bg-cream py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-dark mb-4 tracking-wide">{t.craftsmanship.title}</h2>
        <div className="w-20 h-0.5 bg-gold mx-auto mb-12" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((c) => (
            <div key={c.title} className="flex flex-col items-center gap-3 transition-transform duration-300 hover:-translate-y-1">
              <div className="w-20 h-20 rounded-full bg-warm-white flex items-center justify-center">{c.icon}</div>
              <h4 className="font-montserrat text-xs font-bold tracking-[0.15em] uppercase text-text-dark">{c.title}</h4>
              <p className="font-montserrat text-xs text-text-muted">{c.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── SPECIAL COLLECTIONS (from DB featured categories) ─────────────── */
function SpecialCollections({ featuredCategories }: { featuredCategories: CategoryData[] }) {
  const { t } = useI18n();

  const fallback = [
    { id: 0, name: t.specialCollections.bridalDiamonds, slug: "#", image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=500&h=600&fit=crop", description: "" },
    { id: 1, name: t.specialCollections.royalGold, slug: "#", image: "https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=500&h=600&fit=crop", description: "" },
    { id: 2, name: t.specialCollections.pearlSignature, slug: "#", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&h=600&fit=crop", description: "" },
    { id: 3, name: t.specialCollections.modernFusion, slug: "#", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=600&fit=crop", description: "" },
  ];

  const items = featuredCategories.length > 0 ? featuredCategories.slice(0, 4) : fallback;

  return (
    <section className="w-full bg-warm-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-dark mb-12 tracking-wide">
          {t.specialCollections.title}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((c) => (
            <Link key={c.id} href={c.slug !== "#" ? `/shop/${c.slug}` : "#"} className="group relative rounded-2xl overflow-hidden aspect-3/4">
              <Image
                src={c.image}
                alt={c.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4">
                <h3 className="font-montserrat text-xs sm:text-sm font-bold tracking-[0.15em] uppercase text-white">{c.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── LIFESTYLE SHOWCASE ─────────────── */
const lifestyleImages = [
  "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500&h=700&fit=crop",
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=700&fit=crop",
  "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=500&h=700&fit=crop",
];

function LifestyleShowcase() {
  const { t } = useI18n();
  return (
    <section className="w-full bg-cream py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-gold mb-2">{t.lifestyle.eyebrow}</p>
        <div className="w-20 h-0.5 bg-gold mx-auto mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {lifestyleImages.map((src, i) => (
            <div key={i} className={`relative rounded-2xl overflow-hidden ${i === 1 ? "aspect-3/4 sm:-mt-6 sm:mb-6" : "aspect-3/4"} shadow-lg`}>
              <Image src={src} alt={`Lifestyle showcase ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── FOOTER ─────────────── */
function Footer() {
  const { t } = useI18n();
  return (
    <footer className="w-full bg-text-dark text-cream-dark py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <MymyLogo className="text-4xl" />
            <p className="font-montserrat text-sm leading-relaxed text-cream-dark/70 max-w-xs">{t.footer.brandDescription}</p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-cream-dark/60 hover:text-gold transition-colors" aria-label={t.footer.instagram}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href="#" className="text-cream-dark/60 hover:text-gold transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-montserrat text-xs font-bold tracking-[0.2em] uppercase text-warm-white mb-6">{t.footer.quickLinks}</h4>
            <ul className="space-y-3">
              {[t.footer.aboutUs, t.footer.diamondCollections, t.footer.goldJewelry, t.footer.pearlJewelry, t.footer.bridalCollections].map((l) => (
                <li key={l}><Link href="#" className="font-montserrat text-sm text-cream-dark/60 hover:text-gold transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-montserrat text-xs font-bold tracking-[0.2em] uppercase text-warm-white mb-6">{t.footer.customerCare}</h4>
            <ul className="space-y-3">
              {[t.footer.contactUs, t.footer.shippingReturns, t.footer.warrantyInfo, t.footer.ringSizeGuide, t.footer.careInstructions].map((l) => (
                <li key={l}><Link href="#" className="font-montserrat text-sm text-cream-dark/60 hover:text-gold transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-cream-dark/20 mt-12 pt-8 text-center">
          <p className="font-montserrat text-xs text-cream-dark/50">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────── PAGE ─────────────── */
export default function HomeClient({ allCategories, featuredCategories, bestSellers }: HomeClientProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollReveal />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="reveal"><Categories allCategories={allCategories} /></div>
        <div className="reveal"><BestSellers items={bestSellers} /></div>
        <div className="reveal"><Craftsmanship /></div>
        <div className="reveal"><SpecialCollections featuredCategories={featuredCategories} /></div>
        <div className="reveal"><LifestyleShowcase /></div>
      </main>
      <Footer />
    </div>
  );
}
