import type { Metadata } from "next";
import { getProducts } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";
import ProductsCatalog from "./products-catalog";

const SITE_URL = "https://mymy-store.vercel.app";

export const metadata: Metadata = {
  title: "Shop — Mymy Atelier",
  description:
    "Browse our natural healing stones collection — authentic crystals selected for balance, calm, and positive energy.",
  alternates: { canonical: `${SITE_URL}/shop` },
  openGraph: {
    title: "Shop — Mymy Atelier",
    description: "Browse our natural healing stones collection.",
    url: `${SITE_URL}/shop`,
    type: "website",
  },
};

export const revalidate = 0;

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return <ProductsCatalog products={products} categories={categories} />;
}
