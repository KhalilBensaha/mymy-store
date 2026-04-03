import { getCategories } from "@/lib/actions/categories";
import { getFeaturedCategoryIds, getSocialLinks } from "@/lib/actions/settings";
import { getBestSellers } from "@/lib/actions/orders";
import { getLifestyleImages } from "@/lib/actions/products";
import HomeClient, { CategoryData } from "./home-client";

export const revalidate = 0;

export default async function HomePage() {
  const [allCats, featuredIds, bestSellers, socialLinks, lifestyleImages] = await Promise.all([
    getCategories(),
    getFeaturedCategoryIds(),
    getBestSellers(4),
    getSocialLinks(),
    getLifestyleImages(3),
  ]);

  const featuredCategories: CategoryData[] =
    featuredIds.length > 0
      ? (featuredIds
          .map((id) => allCats.find((c) => c.id === id))
          .filter(Boolean) as CategoryData[])
      : (allCats.slice(0, 4) as CategoryData[]);

  return (
    <HomeClient
      allCategories={allCats as CategoryData[]}
      featuredCategories={featuredCategories}
      bestSellers={bestSellers}
      socialLinks={socialLinks}
      lifestyleImages={lifestyleImages}
    />
  );
}
