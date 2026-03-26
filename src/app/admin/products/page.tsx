import { getProducts } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";
import ProductsClient from "./products-client";

export const revalidate = 0;

export default async function ProductsPage() {
  const [allProducts, allCategories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <ProductsClient
      initialProducts={allProducts}
      categories={allCategories.map((c) => ({ id: c.id, name: c.name }))}
    />
  );
}
