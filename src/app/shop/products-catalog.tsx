"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useI18n } from "../i18n/provider";

/* ─── Types matching DB query shape ─── */
export type CatalogProduct = {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  gallery: string[] | null;
  categoryId: number | null;
  categoryName: string | null;
  categorySlug: string | null;
  materials: string[] | null;
  badge: string | null;
  description: string | null;
  story: string | null;
  specs: { label: string; value: string }[] | null;
  variants: string[] | null;
  ratingScore: number | null;
  ratingCount: number | null;
  createdAt: Date;
};

export type CatalogCategory = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
};

const MAX_PRICE = 10000;
const PAGE_SIZE = 6;

export type ProductsCatalogProps = {
  products: CatalogProduct[];
  categories: CatalogCategory[];
  eyebrow?: string;
  title?: string;
  description?: string;
  initialCategory?: string | null;
  lockCategory?: boolean;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("fr-DZ", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(price) + " DA";
}

function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <article className="group">
      <Link href={`/shop/product/${product.id}`} className="block">
        <div className="relative aspect-4/5 overflow-hidden bg-[#f7f4ee] shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="pt-3">
          <h3 className="font-montserrat text-[1.05rem] font-medium text-text-dark">
            {product.name}
          </h3>
          <p className="mt-1 font-montserrat text-[0.65rem] uppercase tracking-[0.16em] text-[#9f937e]">
            {product.subtitle}
          </p>
          <p className="mt-3 font-montserrat text-sm text-[#8a8176]">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </article>
  );
}

export default function ProductsCatalog({
  products,
  categories,
  eyebrow,
  title,
  description,
  initialCategory = null,
  lockCategory = false,
}: ProductsCatalogProps) {
  const { t } = useI18n();
  const resolvedEyebrow = eyebrow ?? t.shop.curatedSelection;
  const resolvedTitle = title ?? t.shop.coreCollection;
  const resolvedDescription = description ?? t.shop.coreCollectionDesc;
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(5500);
  const [page, setPage] = useState(0);

  const materialOptions = useMemo(() => {
    const allMaterials = new Set<string>();
    for (const p of products) {
      if (p.materials) p.materials.forEach((m) => allMaterials.add(m));
    }
    return Array.from(allMaterials).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = activeCategory ? product.categoryName === activeCategory : true;
      const materialMatch =
        selectedMaterials.length > 0
          ? selectedMaterials.every((material) => product.materials?.includes(material))
          : true;
      const priceMatch = product.price <= maxPrice;

      return categoryMatch && materialMatch && priceMatch;
    });
  }, [activeCategory, selectedMaterials, maxPrice, products]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const paginatedProducts = filteredProducts.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE
  );

  const toggleMaterial = (material: string) => {
    setPage(0);
    setSelectedMaterials((current) =>
      current.includes(material)
        ? current.filter((item) => item !== material)
        : [...current, material]
    );
  };

  const clearFilters = () => {
    setActiveCategory(initialCategory);
    setSelectedMaterials([]);
    setMaxPrice(5500);
    setPage(0);
  };

  return (
    <section className="bg-warm-white">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-12 lg:px-10 lg:pb-20 lg:pt-14">
        {/* Back to home */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-montserrat text-[0.72rem] uppercase tracking-[0.18em] text-[#a89c87] transition-colors hover:text-[#8b6914]"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </Link>
        </div>
        <div className="mb-14 max-w-3xl lg:mb-16">
          <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.22em] text-[#a89c87]">
            {resolvedEyebrow}
          </p>
          <h1 className="mt-3 font-playfair text-5xl leading-[1.04] text-text-dark lg:text-[4.25rem]">
            {resolvedTitle}
          </h1>
          <p className="mt-5 max-w-2xl font-montserrat text-[0.97rem] leading-8 text-[#6f6458] lg:text-[1.02rem]">
            {resolvedDescription}
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)] md:items-start">
          <aside className="space-y-9">
            <div>
              <p className="font-montserrat text-[0.62rem] uppercase tracking-[0.22em] text-[#a89c87]">
                {t.shop.category}
              </p>
              <ul className="mt-5 space-y-3">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.name;
                  return (
                    <li key={cat.id}>
                      {lockCategory ? (
                        <Link
                          href={`/shop/${cat.slug}`}
                          className={`font-montserrat text-start text-[0.96rem] transition-colors ${
                            isActive ? "text-[#8b6914]" : "text-text-dark hover:text-[#8b6914]"
                          }`}
                        >
                          {cat.name}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setPage(0);
                            setActiveCategory(isActive ? null : cat.name);
                          }}
                          className={`font-montserrat text-start text-[0.96rem] transition-colors ${
                            isActive ? "text-[#8b6914]" : "text-text-dark hover:text-[#8b6914]"
                          }`}
                        >
                          {cat.name}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <p className="font-montserrat text-[0.62rem] uppercase tracking-[0.22em] text-[#a89c87]">
                {t.shop.material}
              </p>
              <div className="mt-5 space-y-3.5">
                {materialOptions.map((material) => {
                  const checked = selectedMaterials.includes(material);
                  return (
                    <label key={material} className="flex cursor-pointer items-center gap-3">
                      <span className="relative flex h-3.5 w-3.5 items-center justify-center border border-[#d9cfbe] bg-white">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleMaterial(material)}
                          className="absolute inset-0 opacity-0"
                        />
                        {checked ? <span className="h-2 w-2 bg-[#8b6914]" /> : null}
                      </span>
                      <span className="font-montserrat text-[0.92rem] text-[#5e564d]">{material}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="font-montserrat text-[0.62rem] uppercase tracking-[0.22em] text-[#a89c87]">
                {t.shop.priceRange}
              </p>
              <div className="mt-7">
                <input
                  type="range"
                  min={500}
                  max={MAX_PRICE}
                  step={50}
                  value={maxPrice}
                  onChange={(event) => {
                    setPage(0);
                    setMaxPrice(Number(event.target.value));
                  }}
                  className="luxury-range w-full"
                  aria-label="Maximum price"
                  style={{
                    background: `linear-gradient(to right, var(--gold) 0%, var(--gold) ${
                      ((maxPrice - 500) / (MAX_PRICE - 500)) * 100
                    }%, #d9cfbe ${((maxPrice - 500) / (MAX_PRICE - 500)) * 100}%, #d9cfbe 100%)`,
                  }}
                />
                <div className="mt-4 flex items-center justify-between font-montserrat text-[0.85rem] text-[#7d7267]">
                  <span>500 DA</span>
                  <span>{formatPrice(maxPrice)}+</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="font-montserrat text-[0.66rem] uppercase tracking-[0.18em] text-[#a89c87] transition-colors hover:text-[#8b6914]"
            >
              {t.shop.clearFilters}
            </button>
          </aside>

          <div>
            <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {paginatedProducts.length === 0 ? (
              <div className="flex min-h-75 items-center justify-center rounded-3xl border border-dashed border-[#d9cfbe] bg-[#fcfaf6]">
                <div className="text-center">
                  <p className="font-playfair text-3xl text-text-dark">{t.shop.noPiecesFound}</p>
                  <p className="mt-3 font-montserrat text-sm text-[#7d7267]">
                    {t.shop.adjustFilters}
                  </p>
                </div>
              </div>
            ) : null}

            {totalPages > 1 ? (
              <div className="mt-14 flex items-center justify-center gap-3">
                {Array.from({ length: totalPages }).map((_, index) => {
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setPage(index)}
                      aria-label={`${t.shop.goToPage} ${index + 1}`}
                      className={`h-2.5 w-2.5 rounded-full transition-colors ${
                        safePage === index ? "bg-[#8b6914]" : "bg-[#ddd6ca] hover:bg-[#b9a68a]"
                      }`}
                    />
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
