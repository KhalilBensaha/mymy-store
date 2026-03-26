"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./scroll-reveal";
import { MymyLogo } from "./components/mymy-logo";
import { LanguageSwitcher } from "./components/language-switcher";
import { useI18n } from "./i18n/provider";

/* ─────────────── NAV ─────────────── */
function Navbar() {
  const { t } = useI18n();
  const links = [
    { label: t.nav.diamonds, href: "#diamonds" },
    { label: t.nav.gold, href: "#gold" },
    { label: t.nav.pearls, href: "#pearls" },
    { label: t.nav.collections, href: "#collections" },
    { label: t.nav.bridal, href: "#bridal" },
    { label: t.nav.contact, href: "#contact" },
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
          {/* Search */}
          <button aria-label={t.nav.search} className="text-text-dark hover:text-gold transition-colors">
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
          {/* Wishlist */}
          <Link href="/wishlist" aria-label={t.nav.wishlist} className="text-text-dark hover:text-gold transition-colors">
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </Link>
          {/* Cart */}
          <button aria-label={t.nav.cart} className="text-text-dark hover:text-gold transition-colors">
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </button>
        </div>
        {/* Mobile menu button */}
        <button className="md:hidden text-text-dark" aria-label={t.nav.menu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}

/* ─────────────── HERO ─────────────── */
function Hero() {
  const { t } = useI18n();
  return (
    <section className="w-full bg-warm-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 items-center py-12 lg:py-16 min-h-[85vh]">
        {/* Left – Copy */}
        <div className="relative z-10 animate-fade-up">
          <h1 className="font-playfair text-[2.5rem] sm:text-[3rem] lg:text-[3.4rem] xl:text-[4rem] font-bold leading-[1.05] mb-6 uppercase">
            <span className="text-text-dark block">{t.hero.craftedFor}</span>
            <span className="text-text-dark block">{t.hero.eternity}</span>
            <span className="text-gold italic font-light block mt-1">{t.hero.designedFor}</span>
            <span className="text-gold italic font-light block">{t.hero.elegance}</span>
          </h1>
          <p className="font-montserrat text-[12px] sm:text-[13px] text-text-muted max-w-sm leading-relaxed mb-8">
            {t.hero.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="#diamonds"
              className="font-montserrat text-[10px] tracking-[0.14em] uppercase font-semibold bg-gold text-white px-6 py-3 rounded-full hover:bg-gold-dark transition-colors"
            >
              {t.hero.exploreDiamonds}
            </Link>
            <Link
              href="#gold"
              className="font-montserrat text-[10px] tracking-[0.14em] uppercase font-semibold border border-text-dark/30 text-text-dark px-6 py-3 rounded-full hover:bg-text-dark hover:text-white transition-colors"
            >
              {t.hero.shopGoldPearl}
            </Link>
          </div>
        </div>

        {/* Right – Overlapping image collage */}
        <div className="hidden lg:block relative h-[540px] xl:h-[600px]">
          <div className="absolute -top-2 end-4 w-[260px] h-[260px] xl:w-[300px] xl:h-[300px] rounded-full overflow-hidden shadow-2xl z-10 animate-float ring-4 ring-cream-dark/20">
            <Image
              src="/images/hero-ring.jpg"
              alt="Diamond ring on display"
              fill
              className="object-cover scale-110"
              sizes="300px"
              priority
            />
          </div>

          <div className="absolute top-[130px] start-[5%] w-[210px] h-[310px] xl:w-[230px] xl:h-[340px] rounded-2xl overflow-hidden shadow-2xl z-20 animate-float-slow">
            <Image
              src="/images/hero-model.jpg"
              alt="Model wearing luxury jewelry"
              fill
              className="object-cover object-top"
              sizes="230px"
            />
          </div>

          <div className="absolute bottom-8 end-[8%] w-[190px] h-[190px] xl:w-[210px] xl:h-[210px] rounded-2xl bg-white shadow-xl z-10 flex flex-col items-start justify-end p-5 animate-fade-up delay-300">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden mb-2">
              <Image
                src="/images/hero-product.jpg"
                alt="Jewelry detail"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <p className="font-playfair text-[13px] italic text-text-dark">Jewelry Detail</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── CATEGORIES ─────────────── */
function Categories() {
  const { t } = useI18n();
  const categories = [
    { name: t.categories.diamondNecklace, sub: t.categories.certifiedBrilliance, img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=500&fit=crop", href: "/shop/necklaces" },
    { name: t.categories.goldBridalSet, sub: t.categories.timelessBridal, img: "https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=600&h=500&fit=crop", href: "/shop/bracelets" },
    { name: t.categories.pearlEarrings, sub: t.categories.lustrousElegance, img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=500&fit=crop", href: "/shop/earrings" },
    { name: t.categories.solitaireRings, sub: t.categories.perfectStones, img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=500&fit=crop", href: "/shop/rings" },
  ];

  return (
    <section className="w-full bg-warm-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-center text-text-dark mb-14 tracking-wide">
          {t.categories.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
          {categories.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative w-full rounded-2xl overflow-hidden bg-cream-dark/30 aspect-4/3 mb-5">
                <Image
                  src={c.img}
                  alt={c.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="font-playfair text-lg sm:text-xl font-bold text-text-dark tracking-wide uppercase">
                {c.name}
              </h3>
              <p className="font-montserrat text-xs text-text-muted mt-1">{c.sub}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── BEST SELLERS ─────────────── */
const bestSellers = [
  { name: "Diamond Eternity Band", price: "$5,560", img: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop" },
  { name: "Gold Kada Bracelet", price: "$2,200", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop" },
  { name: "Pearl Strand Necklace", price: "$1,800", img: "https://images.unsplash.com/photo-1515562141589-67f0d569b6fc?w=400&h=400&fit=crop" },
  { name: "Solitaire Stud Earrings", price: "$3,500", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop" },
  { name: "Gold Pendant with Diamond", price: "$1,200", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop" },
  { name: "Tahitian Pearl Ring", price: "$4,000", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop" },
  { name: "Diamond Tennis Bracelet", price: "$7,800", img: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop" },
  { name: "22K Gold Jhumka Earrings", price: "$2,600", img: "https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=400&h=400&fit=crop" },
];

function BestSellers() {
  const { t } = useI18n();
  return (
    <section className="w-full bg-cream py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-center text-text-dark mb-12 tracking-wide">
          {t.bestSellers.title}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSellers.map((p) => (
            <Link key={p.name} href="#" className="group text-center transition-transform duration-300 hover:-translate-y-1">
              <div className="relative rounded-2xl overflow-hidden bg-warm-white aspect-square mb-3 shadow-sm">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <h4 className="font-montserrat text-sm font-semibold text-text-dark">{p.name}</h4>
              <p className="font-montserrat text-sm text-gold font-bold">{p.price}</p>
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
  const craftsmanshipItems = [
    {
      title: t.craftsmanship.handcrafted,
      sub: t.craftsmanship.masterArtisans,
      icon: (
        <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: t.craftsmanship.certifiedDiamonds,
      sub: t.craftsmanship.giaIgi,
      icon: (
        <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: t.craftsmanship.pureGold,
      sub: t.craftsmanship.hallmarked,
      icon: (
        <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: t.craftsmanship.premiumPearls,
      sub: t.craftsmanship.rareLustrous,
      icon: (
        <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-warm-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-dark mb-4 tracking-wide">
          {t.craftsmanship.title}
        </h2>
        <div className="w-20 h-0.5 bg-gold mx-auto mb-12" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {craftsmanshipItems.map((c) => (
            <div key={c.title} className="flex flex-col items-center gap-3 transition-transform duration-300 hover:-translate-y-1">
              <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center">
                {c.icon}
              </div>
              <h4 className="font-montserrat text-xs font-bold tracking-[0.15em] uppercase text-text-dark">
                {c.title}
              </h4>
              <p className="font-montserrat text-xs text-text-muted">{c.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── SPECIAL COLLECTIONS ─────────────── */
function SpecialCollections() {
  const { t } = useI18n();
  const specialCollections = [
    { name: t.specialCollections.bridalDiamonds, img: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=500&h=600&fit=crop" },
    { name: t.specialCollections.royalGold, img: "https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=500&h=600&fit=crop" },
    { name: t.specialCollections.pearlSignature, img: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&h=600&fit=crop" },
    { name: t.specialCollections.modernFusion, img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=600&fit=crop" },
  ];

  return (
    <section className="w-full bg-cream py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-dark mb-12 tracking-wide">
          {t.specialCollections.title}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {specialCollections.map((c) => (
            <Link key={c.name} href="#" className="group relative rounded-2xl overflow-hidden aspect-3/4">
              <Image
                src={c.img}
                alt={c.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4">
                <h3 className="font-montserrat text-xs sm:text-sm font-bold tracking-[0.15em] uppercase text-white">
                  {c.name}
                </h3>
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
    <section className="w-full bg-warm-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-gold mb-2">
          {t.lifestyle.eyebrow}
        </p>
        <div className="w-20 h-0.5 bg-gold mx-auto mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {lifestyleImages.map((src, i) => (
            <div
              key={i}
              className={`relative rounded-2xl overflow-hidden ${
                i === 1 ? "aspect-3/4 sm:-mt-6 sm:mb-6" : "aspect-3/4"
              } shadow-lg`}
            >
              <Image
                src={src}
                alt={`Lifestyle showcase ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── TESTIMONIALS ─────────────── */
const testimonials = [
  {
    name: "Sophia L.",
    location: "New York",
    avatar: "https://i.pravatar.cc/100?img=47",
    text: "The diamond necklace from Mymy is simply breathtaking. The quality and sparkle are an absolute 5 stars!",
  },
  {
    name: "Priya R.",
    location: "Dubai",
    avatar: "https://i.pravatar.cc/100?img=45",
    text: "I purchased my bridal set and the workmanship... The intricate detailing and shine make it truly special.",
  },
  {
    name: "Isabella M.",
    location: "London",
    avatar: "https://i.pravatar.cc/100?img=44",
    text: "Mymy's pearl collection is exquisite. The pieces are all of elegance and beauty. I'm a fan!",
  },
];

function Stars() {
  return (
    <div className="flex items-center justify-center gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Testimonials() {
  const { t } = useI18n();
  return (
    <section className="w-full bg-cream py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-dark mb-12 tracking-wide">
          {t.testimonials.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((tm) => (
            <div
              key={tm.name}
              className="bg-warm-white rounded-2xl p-8 shadow-sm flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4 ring-2 ring-gold/30">
                <Image src={tm.avatar} alt={tm.name} fill className="object-cover" sizes="64px" />
              </div>
              <Stars />
              <p className="font-cormorant text-base italic text-text-muted leading-relaxed mb-6">
                &ldquo;{tm.text}&rdquo;
              </p>
              <p className="font-montserrat text-xs font-bold tracking-[0.15em] uppercase text-text-dark">
                {tm.name}, {tm.location}
              </p>
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
          {/* Brand */}
          <div>
            <MymyLogo className="text-4xl" />
            <p className="font-montserrat text-sm leading-relaxed text-cream-dark/70 max-w-xs">
              {t.footer.brandDescription}
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-cream-dark/60 hover:text-gold transition-colors" aria-label={t.footer.instagram}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="#" className="text-cream-dark/60 hover:text-gold transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-montserrat text-xs font-bold tracking-[0.2em] uppercase text-warm-white mb-6">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-3">
              {[t.footer.aboutUs, t.footer.diamondCollections, t.footer.goldJewelry, t.footer.pearlJewelry, t.footer.bridalCollections].map((l) => (
                <li key={l}>
                  <Link href="#" className="font-montserrat text-sm text-cream-dark/60 hover:text-gold transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-montserrat text-xs font-bold tracking-[0.2em] uppercase text-warm-white mb-6">
              {t.footer.customerCare}
            </h4>
            <ul className="space-y-3">
              {[t.footer.contactUs, t.footer.shippingReturns, t.footer.warrantyInfo, t.footer.ringSizeGuide, t.footer.careInstructions].map((l) => (
                <li key={l}>
                  <Link href="#" className="font-montserrat text-sm text-cream-dark/60 hover:text-gold transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-cream-dark/20 mt-12 pt-8 text-center">
          <p className="font-montserrat text-xs text-cream-dark/50">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────── PAGE ─────────────── */
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollReveal />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="reveal"><Categories /></div>
        <div className="reveal"><BestSellers /></div>
        <div className="reveal"><Craftsmanship /></div>
        <div className="reveal"><SpecialCollections /></div>
        <div className="reveal"><LifestyleShowcase /></div>
        <div className="reveal"><Testimonials /></div>
      </main>
      <Footer />
    </div>
  );
}
