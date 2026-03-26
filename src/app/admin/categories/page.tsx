import { getCategoriesWithCounts } from "@/lib/actions/categories";
import CategoriesClient from "./categories-client";

export const revalidate = 0;

export default async function CategoriesPage() {
  const categoriesWithCounts = await getCategoriesWithCounts();
  const totalProducts = categoriesWithCounts.reduce((sum, c) => sum + c.productCount, 0);

  return (
    <CategoriesClient
      initialCategories={categoriesWithCounts}
      totalProducts={totalProducts}
    />
  );
}
