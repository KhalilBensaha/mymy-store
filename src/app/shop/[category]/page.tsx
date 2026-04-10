import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";
import ProductsCatalog from "../products-catalog";

const SITE_URL = "https://mymy-store.com";

export const revalidate = 300;

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};

  const title = `${category.name} — Mymy Atelier`;
  const description = category.description?.slice(0, 160) ?? category.name;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/shop/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/shop/${slug}`,
      ...(category.image && {
        images: [{ url: category.image, alt: category.name }],
      }),
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;

  const [allProducts, allCategories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const category = allCategories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <ProductsCatalog
      products={allProducts}
      categories={allCategories}
      title={category.name}
      description={category.description ?? ""}
      initialCategory={category.name}
      lockCategory
    />
  );
}
