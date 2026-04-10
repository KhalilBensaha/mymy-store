import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/actions/categories";

const SITE_URL = "https://mymy-store.com";

export const metadata: Metadata = {
  title: "Categories — Mymy Atelier",
  description: "Browse natural healing stone categories and find the right crystal for your needs.",
  alternates: { canonical: `${SITE_URL}/shop/categories` },
  openGraph: {
    title: "Categories — Mymy Atelier",
    description: "Browse natural healing stone categories.",
    url: `${SITE_URL}/shop/categories`,
    type: "website",
  },
};

export const revalidate = 300;

export default async function ShopCategoriesPage() {
  const categories = await getCategories();

  return (
    <section className="bg-warm-white">
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-12 lg:px-10">
        <div className="mb-12 max-w-3xl">
          <h1 className="font-playfair text-5xl leading-[1.04] text-text-dark lg:text-[4.25rem]">
            Categories
          </h1>
        </div>

        {categories.length === 0 ? (
          <div className="rounded-2xl border border-[#e8e0d4] bg-[#fcfaf6] p-10 text-center">
            <p className="font-montserrat text-sm text-[#6f6458]">No categories available yet.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop/${category.slug}`}
                className="group block"
              >
                <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-[#f2ede5]">
                  <Image
                    src={category.image || "/images/best1.jpg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="pt-4">
                  <h2 className="font-playfair text-2xl text-text-dark">{category.name}</h2>
                  {category.description && (
                    <p className="mt-2 font-montserrat text-sm leading-7 text-[#6f6458]">
                      {category.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
