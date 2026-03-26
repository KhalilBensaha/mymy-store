import { notFound } from "next/navigation";
import { getProducts } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";
import ProductsCatalog from "../products-catalog";

export const revalidate = 0;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
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
      eyebrow="Category Selection"
      title={category.name}
      description={category.description ?? undefined}
      initialCategory={category.name}
      lockCategory
    />
  );
}
