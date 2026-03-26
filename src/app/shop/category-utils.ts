export type Category = "Rings" | "Necklaces" | "Earrings" | "Bracelets";

export const categoryOptions: Category[] = [
  "Rings",
  "Necklaces",
  "Earrings",
  "Bracelets",
];

const categoryDescriptions: Record<Category, string> = {
  Rings: "Signature bands and sculpted silhouettes crafted to become forever pieces.",
  Necklaces:
    "Layered pendants and statement chokers designed to frame every occasion.",
  Earrings:
    "Refined drops and luminous studs balancing softness with brilliance.",
  Bracelets:
    "Modern cuffs and diamond bracelets finished with heirloom-level detail.",
};

export const categorySlugs: Record<Category, string> = {
  Rings: "rings",
  Necklaces: "necklaces",
  Earrings: "earrings",
  Bracelets: "bracelets",
};

export function getCategoryFromSlug(slug: string): Category | null {
  const match = categoryOptions.find((c) => categorySlugs[c] === slug);
  return match ?? null;
}

export function getCategoryHref(category: Category) {
  return `/shop/${categorySlugs[category]}`;
}

export function getCategoryDescription(category: Category) {
  return categoryDescriptions[category];
}
