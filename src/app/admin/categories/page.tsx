import { getCategoriesWithCounts } from "@/lib/actions/categories";
import { getProducts } from "@/lib/actions/products";
import CategoriesClient from "./categories-client";

export const revalidate = 0;

export default async function CategoriesPage() {
  const [categoriesWithCounts, allProducts] = await Promise.all([
    getCategoriesWithCounts(),
    getProducts(),
  ]);
  const totalProducts = categoriesWithCounts.reduce((sum, c) => sum + c.productCount, 0);

  const productList = allProducts.map((p) => ({
    id: p.id,
    name: p.name,
    image: p.image,
    categoryId: p.categoryId,
  }));

  return (
    <CategoriesClient
      initialCategories={categoriesWithCounts}
      totalProducts={totalProducts}
      products={productList}
    />
  );
}
