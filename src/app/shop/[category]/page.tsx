import { notFound } from "next/navigation";
import ProductsCatalog from "../products-catalog";
import {
  getCategoryDescription,
  getCategoryFromSlug,
} from "../category-utils";

export function generateStaticParams() {
  return [
    { category: "rings" },
    { category: "necklaces" },
    { category: "earrings" },
    { category: "bracelets" },
  ];
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getCategoryFromSlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <ProductsCatalog
      eyebrow="Category Selection"
      title={category}
      description={getCategoryDescription(category)}
      initialCategory={category}
      lockCategory
    />
  );
}
