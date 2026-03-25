"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type Category = "Rings" | "Necklaces" | "Earrings" | "Bracelets";
type Material = "18K Yellow Gold" | "Sterling Silver" | "VS Diamonds";

type Product = {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  category: Category;
  materials: Material[];
};

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Aurelia Band",
    subtitle: "18K Yellow Gold",
    price: 1250,
    image: "/images/cat-rings.jpg",
    category: "Rings",
    materials: ["18K Yellow Gold", "VS Diamonds"],
  },
  {
    id: 2,
    name: "Lunar Pendant",
    subtitle: "Sterling Silver",
    price: 890,
    image: "/images/best2.jpg",
    category: "Necklaces",
    materials: ["Sterling Silver"],
  },
  {
    id: 3,
    name: "Eos Drop Earrings",
    subtitle: "18K Yellow Gold",
    price: 2100,
    image: "/images/cat-earrings.jpg",
    category: "Earrings",
    materials: ["18K Yellow Gold"],
  },
  {
    id: 4,
    name: "Starlight Bracelet",
    subtitle: "VS Diamonds",
    price: 4500,
    image: "/images/hero-bracelet.jpg",
    category: "Bracelets",
    materials: ["VS Diamonds"],
  },
  {
    id: 5,
    name: "Terra Ring",
    subtitle: "18K Yellow Gold",
    price: 1400,
    image: "/images/best6.jpg",
    category: "Rings",
    materials: ["18K Yellow Gold"],
  },
  {
    id: 6,
    name: "Veritas Choker",
    subtitle: "Emeralds Gold",
    price: 3200,
    image: "/images/best5.jpg",
    category: "Necklaces",
    materials: ["18K Yellow Gold", "VS Diamonds"],
  },
  {
    id: 7,
    name: "Solene Hoops",
    subtitle: "18K Yellow Gold",
    price: 1750,
    image: "/images/best4.jpg",
    category: "Earrings",
    materials: ["18K Yellow Gold"],
  },
  {
    id: 8,
    name: "Celeste Strand",
    subtitle: "Sterling Silver",
    price: 980,
    image: "/images/best3.jpg",
    category: "Necklaces",
    materials: ["Sterling Silver"],
  },
  {
    id: 9,
    name: "Orion Cuff",
    subtitle: "VS Diamonds",
    price: 5100,
    image: "/images/best7.jpg",
    category: "Bracelets",
    materials: ["VS Diamonds", "18K Yellow Gold"],
  },
];

const categoryOptions: Category[] = ["Rings", "Necklaces", "Earrings", "Bracelets"];
const materialOptions: Material[] = ["18K Yellow Gold", "Sterling Silver", "VS Diamonds"];
const MAX_PRICE = 10000;
const PAGE_SIZE = 6;

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link href="#" className="block">
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

export default function ProductsCatalog() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>(["VS Diamonds"]);
  const [maxPrice, setMaxPrice] = useState(5500);
  const [page, setPage] = useState(0);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const categoryMatch = activeCategory ? product.category === activeCategory : true;
      const materialMatch =
        selectedMaterials.length > 0
          ? selectedMaterials.every((material) => product.materials.includes(material))
          : true;
      const priceMatch = product.price <= maxPrice;

      return categoryMatch && materialMatch && priceMatch;
    });
  }, [activeCategory, selectedMaterials, maxPrice]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const paginatedProducts = filteredProducts.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE
  );

  const toggleMaterial = (material: Material) => {
    setPage(0);
    setSelectedMaterials((current) =>
      current.includes(material)
        ? current.filter((item) => item !== material)
        : [...current, material]
    );
  };

  const clearFilters = () => {
    setActiveCategory(null);
    setSelectedMaterials([]);
    setMaxPrice(5500);
  };

  return (
    <section className="bg-warm-white">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-12 lg:px-10 lg:pb-20 lg:pt-14">
        <div className="mb-14 max-w-3xl lg:mb-16">
          <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.22em] text-[#a89c87]">
            Curated Selection
          </p>
          <h1 className="mt-3 font-playfair text-5xl leading-[1.04] text-text-dark lg:text-[4.25rem]">
            The Core Collection
          </h1>
          <p className="mt-5 max-w-2xl font-montserrat text-[0.97rem] leading-8 text-[#6f6458] lg:text-[1.02rem]">
            Sculptural forms and timeless materials. Each piece is hand-finished in our atelier to ensure a lifetime of wear.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)] md:items-start">
          <aside className="space-y-9">
            <div>
              <p className="font-montserrat text-[0.62rem] uppercase tracking-[0.22em] text-[#a89c87]">
                Category
              </p>
              <ul className="mt-5 space-y-3">
                {categoryOptions.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <li key={category}>
                      <button
                        type="button"
                        onClick={() => {
                          setPage(0);
                          setActiveCategory(isActive ? null : category);
                        }}
                        className={`font-montserrat text-left text-[0.96rem] transition-colors ${
                          isActive ? "text-[#8b6914]" : "text-text-dark hover:text-[#8b6914]"
                        }`}
                      >
                        {category}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <p className="font-montserrat text-[0.62rem] uppercase tracking-[0.22em] text-[#a89c87]">
                Material
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
                Price Range
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
                  <span>$500</span>
                  <span>{formatPrice(maxPrice)}+</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="font-montserrat text-[0.66rem] uppercase tracking-[0.18em] text-[#a89c87] transition-colors hover:text-[#8b6914]"
            >
              Clear Filters
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
                  <p className="font-playfair text-3xl text-text-dark">No pieces found</p>
                  <p className="mt-3 font-montserrat text-sm text-[#7d7267]">
                    Adjust the filters to explore more pieces.
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
                      aria-label={`Go to page ${index + 1}`}
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
