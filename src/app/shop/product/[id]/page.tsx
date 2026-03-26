import { notFound } from "next/navigation";
import { PRODUCTS } from "../../product-data";
import ProductDetailClient from "./product-detail-client";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: String(p.id) }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    notFound();
  }

  // Up to 3 from same category, falling back to others if needed
  const sameCategory = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  );
  const others = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category !== product.category
  );
  const recommended = [...sameCategory, ...others].slice(0, 3);

  return <ProductDetailClient product={product} recommended={recommended} />;
}
