"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./scroll-reveal";
import { useI18n } from "./i18n/provider";
import { Navbar } from "./components/navbar";

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
  lifestyleImages: string[];
};

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
              <Link href="#shop" className="font-montserrat text-[10px] tracking-[0.14em] uppercase font-semibold border border-text-dark/40 text-text-dark px-7 py-3.5 hover:bg-text-dark hover:text-white transition-colors">
                {t.hero.shopCollection}
              </Link>
            </div>
            <div className="mt-14 flex gap-10">
              <div>
                <p className="font-playfair text-2xl text-text-dark">2,400+</p>
                <p className="mt-1 font-montserrat text-[0.58rem] uppercase tracking-[0.18em] text-[#a89c87]">Pieces Crafted</p>
              </div>
              <div className="border-s border-[#d9cfbe] ps-10">
                <p className="font-playfair text-2xl text-text-dark">925</p>
                <p className="mt-1 font-montserrat text-[0.58rem] uppercase tracking-[0.18em] text-[#a89c87]">Sterling Silver</p>
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
  if (allCategories.length === 0) return null;

  return (
    <section className="w-full bg-cream py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-center text-text-dark mb-12 tracking-wide">
          {t.categories.title}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {allCategories.map((c) => (
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

  if (items.length === 0) return null;

  return (
    <section className="w-full bg-warm-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-center text-text-dark mb-12 tracking-wide">
          {t.bestSellers.title}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((p) => (
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
    { title: t.craftsmanship.sterlingSilver, sub: t.craftsmanship.hallmarked, icon: <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
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
  if (featuredCategories.length === 0) return null;

  return (
    <section className="w-full bg-warm-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-dark mb-12 tracking-wide">
          {t.specialCollections.title}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.slice(0, 4).map((c) => (
            <Link key={c.id} href={`/shop/${c.slug}`} className="group relative rounded-2xl overflow-hidden aspect-3/4">
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
function LifestyleShowcase({ images }: { images: string[] }) {
  const { t } = useI18n();

  if (images.length === 0) return null;

  return (
    <section className="w-full bg-cream py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-gold mb-2">{t.lifestyle.eyebrow}</p>
        <div className="w-20 h-0.5 bg-gold mx-auto mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {images.map((src, i) => (
            <div key={i} className={`relative rounded-2xl overflow-hidden ${i === 1 ? "aspect-3/4 sm:-mt-6 sm:mb-6" : "aspect-3/4"} shadow-lg`}>
              <Image src={src} alt={`Lifestyle showcase ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── PAGE ─────────────── */
export default function HomeClient({ allCategories, featuredCategories, bestSellers, lifestyleImages }: HomeClientProps) {
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
        <div className="reveal"><LifestyleShowcase images={lifestyleImages} /></div>
      </main>
    </div>
  );
}
