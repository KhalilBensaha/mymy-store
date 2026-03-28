"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useI18n } from "../i18n/provider";
import { MymyLogo } from "../components/mymy-logo";
import { LanguageSwitcher } from "../components/language-switcher";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CartPage() {
  const { t } = useI18n();
  const { items, removeItem, updateQty, totalItems, totalPrice } = useCart();

  return (
    <div className="min-h-screen bg-warm-white text-text-dark">
      {/* Minimal nav */}
      <header className="sticky top-0 z-40 border-b border-cream-dark/40 bg-warm-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/" aria-label="Mymy home">
            <MymyLogo className="text-[1.7rem]" />
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="gold" />
            <Link
              href="/shop"
              className="font-montserrat text-[0.62rem] uppercase tracking-[0.18em] text-[#8b6914] transition-opacity hover:opacity-70"
            >
              {t.cart.continueShopping}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* Title */}
        <div className="mb-10">
          <p className="font-montserrat text-[0.58rem] uppercase tracking-[0.3em] text-[#a89c87]">
            Mymy Atelier
          </p>
          <h1 className="mt-2 font-playfair text-4xl text-text-dark">
            {t.cart.title}
          </h1>
          {items.length > 0 && (
            <p className="mt-2 font-montserrat text-sm text-[#a89c87]">
              {totalItems} {t.cart.items}
            </p>
          )}
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            {/* Cart icon */}
            <svg className="mb-6 h-16 w-16 text-[#d9cfbe]" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <h2 className="font-playfair text-3xl text-text-dark">{t.cart.empty}</h2>
            <p className="mt-3 font-montserrat text-sm text-[#a89c87]">{t.cart.emptyDesc}</p>
            <Link
              href="/shop"
              className="mt-8 inline-block bg-[#4a3a16] px-8 py-3.5 font-montserrat text-[0.65rem] uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#3b2e12]"
            >
              {t.cart.continueShopping}
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
            {/* ── Items list ── */}
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.variant}`}
                  className="flex gap-5 border-b border-[#ede7dd] pb-6"
                >
                  {/* Image */}
                  <Link
                    href={`/shop/product/${item.id}`}
                    className="relative h-28 w-28 shrink-0 overflow-hidden bg-[#f2ede5] sm:h-32 sm:w-32"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/shop/product/${item.id}`}
                          className="font-playfair text-lg text-text-dark hover:text-[#8b6914]"
                        >
                          {item.name}
                        </Link>
                        <p className="font-montserrat text-[0.65rem] uppercase tracking-[0.15em] text-[#a89c87]">
                          {item.categoryName}
                        </p>
                        {item.variant && (
                          <p className="mt-0.5 font-montserrat text-[0.72rem] text-[#7a6d5e]">
                            {item.variant}
                          </p>
                        )}
                      </div>
                      <span className="font-playfair text-lg text-text-dark">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                    {/* Qty + remove */}
                    <div className="mt-auto flex items-center gap-4">
                      {/* Qty control */}
                      <div className="flex items-stretch border border-[#d9cfbe]">
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.variant, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                          className="flex w-8 items-center justify-center font-montserrat text-sm text-text-dark transition-colors hover:bg-[#f5f0e8] disabled:opacity-30"
                        >
                          −
                        </button>
                        <span className="flex w-8 items-center justify-center border-x border-[#d9cfbe] font-montserrat text-xs text-text-dark">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.variant, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="flex w-8 items-center justify-center font-montserrat text-sm text-text-dark transition-colors hover:bg-[#f5f0e8]"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id, item.variant)}
                        className="font-montserrat text-[0.62rem] uppercase tracking-[0.15em] text-[#b3a897] underline underline-offset-2 transition-colors hover:text-[#8b6914]"
                      >
                        {t.cart.remove}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Order summary ── */}
            <aside className="h-fit border border-[#ede7dd] bg-[#faf8f5] p-8">
              <h2 className="mb-6 font-montserrat text-[0.62rem] uppercase tracking-[0.22em] text-[#a89c87]">
                {t.cart.orderSummary}
              </h2>

              <div className="space-y-3 border-b border-[#ede7dd] pb-5">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.variant}`}
                    className="flex justify-between gap-2"
                  >
                    <span className="font-montserrat text-[0.78rem] text-[#7a6d5e]">
                      {item.name}
                      {item.variant ? ` — ${item.variant}` : ""} × {item.quantity}
                    </span>
                    <span className="shrink-0 font-montserrat text-[0.78rem] text-text-dark">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex justify-between">
                <span className="font-montserrat text-[0.78rem] uppercase tracking-[0.15em] text-[#a89c87]">
                  {t.cart.total}
                </span>
                <span className="font-playfair text-xl text-text-dark">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="mt-8 block w-full bg-[#4a3a16] py-4 text-center font-montserrat text-[0.65rem] uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#3b2e12]"
              >
                {t.cart.proceedToOrder}
              </Link>

              <Link
                href="/shop"
                className="mt-4 block text-center font-montserrat text-[0.62rem] uppercase tracking-[0.18em] text-[#a89c87] transition-colors hover:text-[#8b6914]"
              >
                {t.cart.continueShopping}
              </Link>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
