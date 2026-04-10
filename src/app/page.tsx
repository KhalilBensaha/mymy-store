import { getCategories } from "@/lib/actions/categories";
import { getFeaturedCategoryIds } from "@/lib/actions/settings";
import { getBestSellers } from "@/lib/actions/orders";
import { getLifestyleImages } from "@/lib/actions/products";
import HomeClient, { CategoryData } from "./home-client";

export const revalidate = 300;

export default async function HomePage() {
  const [allCats, featuredIds, bestSellers, lifestyleImages] = await Promise.all([
    getCategories(),
    getFeaturedCategoryIds(),
    getBestSellers(4),
    getLifestyleImages(3),
  ]);

  const featuredCategories: CategoryData[] =
    (featuredIds
      .map((id) => allCats.find((c) => c.id === id))
      .filter(Boolean) as CategoryData[]);

  return (
    <HomeClient
      allCategories={allCats as CategoryData[]}
      featuredCategories={featuredCategories}
      bestSellers={bestSellers}
      lifestyleImages={lifestyleImages}
    />
  );
}
