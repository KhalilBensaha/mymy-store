"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "../../product-data";
import { useI18n } from "../../../i18n/provider";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function StarRating({ score, count }: { score: number; count: number }) {
  const { t } = useI18n();
  const rounded = Math.round(score * 2) / 2;
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`h-3.5 w-3.5 ${star <= rounded ? "text-[#c4982a]" : "text-[#d9cfbe]"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="font-montserrat text-xs text-[#7d7267]">({count} {t.product.reviews})</span>
    </div>
  );
}

type Tab = "description" | "reviews" | "care";

export default function ProductDetailClient({
  product,
  recommended,
}: {
  product: Product;
  recommended: Product[];
}) {
  const { t } = useI18n();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeVariant, setActiveVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const [wishlisted, setWishlisted] = useState(false);

  const gallery = product.gallery.length > 0 ? product.gallery : [product.image];

  const tabs: { id: Tab; label: string }[] = [
    { id: "description", label: t.product.descriptionTab },
    { id: "reviews", label: t.product.reviewsTab },
    { id: "care", label: t.product.careTab },
  ];

  return (
    <div className="bg-warm-white min-h-screen">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-7 lg:px-10">
        <nav className="flex items-center gap-2.5 font-montserrat text-[0.6rem] uppercase tracking-[0.16em] text-[#b3a897]">
          <Link href="/shop" className="transition-colors hover:text-[#8b6914]">
            {t.product.breadcrumbShop}
          </Link>
          <span>›</span>
          <Link href="/shop" className="transition-colors hover:text-[#8b6914]">
            {t.product.breadcrumbCollections}
          </Link>
          <span>›</span>
          <span className="text-[#6a5c4e]">{product.name.toUpperCase()}</span>
        </nav>
      </div>

      {/* Product section */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-24">
          {/* ── Left: Gallery ── */}
          <div className="flex gap-3.5">
            {/* Thumbnail strip */}
            <div className="flex w-14 shrink-0 flex-col gap-2.5">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative aspect-square w-full overflow-hidden transition-all ${
                    activeImageIdx === idx
                      ? "ring-1 ring-[#8b6914] ring-offset-1"
                      : "ring-1 ring-[#e2d9cc] hover:ring-[#c4a95a]"
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="relative flex-1 overflow-hidden bg-[#f2ede5]">
              <div className="relative aspect-5/6 w-full">
                <Image
                  src={gallery[activeImageIdx]}
                  alt={product.name}
                  fill
                  className="object-cover transition-opacity duration-300"
                  sizes="(max-width: 1024px) 80vw, 45vw"
                  priority
                />
              </div>
            </div>
          </div>

          {/* ── Right: Product info ── */}
          <div className="flex flex-col gap-6 lg:pt-2">
            {product.badge && (
              <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.24em] text-[#8b6914]">
                {product.badge}
              </p>
            )}

            <div>
              <h1 className="font-playfair text-4xl leading-tight text-text-dark xl:text-[2.8rem]">
                {product.name}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-5">
                <span className="font-playfair text-2xl text-text-dark">
                  {formatPrice(product.price)}
                </span>
                <StarRating score={product.rating.score} count={product.rating.count} />
              </div>
            </div>

            <p className="font-montserrat text-[0.93rem] leading-7 text-[#6f6458]">
              {product.description}
            </p>

            {/* Variant selector */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <p className="font-montserrat text-[0.59rem] uppercase tracking-[0.2em] text-[#a89c87]">
                  {t.product.selectVariant}
                </p>
                <button
                  type="button"
                  className="font-montserrat text-[0.59rem] uppercase tracking-[0.2em] text-[#8b6914] underline underline-offset-2 transition-opacity hover:opacity-70"
                >
                  {t.product.sizeGuide}
                </button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((variant, idx) => (
                  <button
                    key={variant}
                    type="button"
                    onClick={() => setActiveVariant(idx)}
                    className={`px-5 py-2.5 font-montserrat text-[0.67rem] uppercase tracking-[0.14em] transition-all ${
                      activeVariant === idx
                        ? "bg-[#4a3a16] text-white"
                        : "border border-[#d9cfbe] text-text-dark hover:border-[#8b6914]"
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to cart + Wishlist */}
            <div className="flex items-stretch gap-3">
              {/* Quantity */}
              <div className="flex items-stretch border border-[#d9cfbe]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="flex w-10 items-center justify-center font-montserrat text-base text-text-dark transition-colors hover:bg-[#f5f0e8]"
                >
                  −
                </button>
                <span className="flex w-9 items-center justify-center border-x border-[#d9cfbe] font-montserrat text-sm text-text-dark">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="flex w-10 items-center justify-center font-montserrat text-base text-text-dark transition-colors hover:bg-[#f5f0e8]"
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                type="button"
                className="flex flex-1 items-center justify-center bg-[#4a3a16] px-6 py-3 font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#3b2e12]"
              >
                {t.product.addToCart}
              </button>

              {/* Wishlist */}
              <button
                type="button"
                onClick={() => setWishlisted(!wishlisted)}
                aria-label="Add to wishlist"
                className="flex w-12 items-center justify-center border border-[#d9cfbe] transition-colors hover:border-[#8b6914]"
              >
                <svg
                  className={`h-4.5 w-4.5 transition-colors ${
                    wishlisted ? "fill-[#8b6914] stroke-[#8b6914]" : "fill-none stroke-text-dark"
                  }`}
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
            </div>

            {/* Shipping / certification */}
            <div className="space-y-3 border-t border-[#e8e0d4] pt-6">
              <div className="flex items-center gap-3">
                {/* Truck icon */}
                <svg
                  className="h-4 w-4 shrink-0 text-[#8b6914]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
                <span className="font-montserrat text-[0.82rem] text-[#6f6458]">
                  {t.product.freeShipping}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {/* Check-badge icon */}
                <svg
                  className="h-4 w-4 shrink-0 text-[#8b6914]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.745 3.745 0 013.296-1.043A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
                <span className="font-montserrat text-[0.82rem] text-[#6f6458]">
                  {t.product.certified}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Tab bar */}
        <div className="border-b border-[#e2d9cc]">
          <div className="flex gap-8">
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`pb-4 font-montserrat text-[0.62rem] uppercase tracking-[0.2em] transition-colors ${
                  activeTab === id
                    ? "border-b-2 border-[#8b6914] text-[#8b6914]"
                    : "text-[#b3a897] hover:text-text-dark"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="pb-20 pt-12">
          {activeTab === "description" && (
            <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <h2 className="font-playfair text-3xl text-text-dark">
                  {t.product.storyTitle}
                </h2>
                <p className="mt-6 font-montserrat text-[0.93rem] leading-8 text-[#6f6458]">
                  {product.story}
                </p>
              </div>
              <div>
                {product.specs.map((spec, idx) => (
                  <div key={spec.label}>
                    {idx > 0 && <div className="border-t border-[#ede7dd]" />}
                    <div className="flex items-start justify-between py-5">
                      <span className="font-montserrat text-[0.6rem] uppercase tracking-[0.2em] text-[#a89c87]">
                        {spec.label}
                      </span>
                      <span className="text-end font-montserrat text-[0.88rem] text-[#5e564d]">
                        {spec.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <div className="flex items-baseline gap-4">
                <h2 className="font-playfair text-3xl text-text-dark">
                  {product.rating.count} {t.product.reviews}
                </h2>
                <StarRating score={product.rating.score} count={product.rating.count} />
              </div>
              <p className="mt-6 font-montserrat text-[0.93rem] leading-8 text-[#6f6458]">
                {t.product.reviewsComingSoon}
              </p>
            </div>
          )}

          {activeTab === "care" && (
            <div className="max-w-2xl">
              <h2 className="font-playfair text-3xl text-text-dark">{t.product.careTitle}</h2>
              <div className="mt-8 space-y-5 font-montserrat text-[0.93rem] leading-8 text-[#6f6458]">
                <p>{t.product.careStorage}</p>
                <p>{t.product.careAvoid}</p>
                <p>{t.product.careClean}</p>
                <p>{t.product.careProfessional}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Recommended for you ── */}
      {recommended.length > 0 && (
        <div className="mx-auto max-w-7xl border-t border-[#e2d9cc] px-6 pb-24 pt-16 lg:px-10">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="font-montserrat text-[0.58rem] uppercase tracking-[0.24em] text-[#a89c87]">
                {t.product.completeSet}
              </p>
              <h2 className="mt-2 font-playfair text-4xl text-text-dark">
                {t.product.recommended}
              </h2>
            </div>
            <Link
              href="/shop"
              className="font-montserrat text-[0.62rem] uppercase tracking-[0.18em] text-[#8b6914] transition-opacity hover:opacity-70"
            >
              {t.product.viewAllCollection}
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((rec) => (
              <Link
                key={rec.id}
                href={`/shop/product/${rec.id}`}
                className="group block"
              >
                <div className="relative aspect-4/5 overflow-hidden bg-[#f2ede5]">
                  <Image
                    src={rec.image}
                    alt={rec.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="pt-4">
                  <h3 className="font-playfair text-xl text-text-dark">{rec.name}</h3>
                  <p className="mt-1 font-montserrat text-[0.58rem] uppercase tracking-[0.18em] text-[#a89c87]">
                    {rec.category}
                  </p>
                  <p className="mt-2 font-montserrat text-[0.93rem] text-[#6f6458]">
                    {formatPrice(rec.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
