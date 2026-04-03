"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MymyLogo } from "../components/mymy-logo";
import { Navbar } from "../components/navbar";
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

  const remove = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f0e8] text-text-dark">
      <Navbar />

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
