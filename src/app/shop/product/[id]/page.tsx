import { notFound } from "next/navigation";
import { getProductById, getProducts } from "@/lib/actions/products";
import ProductDetailClient from "./product-detail-client";

export const revalidate = 0;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) {
    notFound();
  }

  // Up to 3 from same category, falling back to others if needed
  const allProducts = await getProducts();
  const sameCategory = allProducts.filter(
    (p) => p.id !== product.id && p.categoryId === product.categoryId
  );
  const others = allProducts.filter(
    (p) => p.id !== product.id && p.categoryId !== product.categoryId
  );
  const recommended = [...sameCategory, ...others].slice(0, 3);

  return <ProductDetailClient product={product} recommended={recommended} />;
}
