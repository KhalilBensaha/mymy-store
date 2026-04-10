"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { products, categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "./auth-guard";

/* ─── Types ─── */
export type ProductInput = {
  name: string;
  subtitle: string;
  price: number;
  image: string;
  gallery: string[];
  categoryId: number | null;
  materials: string[];
  badge: string;
  description: string;
  story: string;
  specs: { label: string; value: string }[];
  variants: string[];
  ratingScore: number;
  ratingCount: number;
};

/* ─── Queries ─── */
export async function getProducts() {
  return db
    .select({
      id: products.id,
      name: products.name,
      subtitle: products.subtitle,
      price: products.price,
      image: products.image,
      gallery: products.gallery,
      categoryId: products.categoryId,
      categoryName: categories.name,
      categorySlug: categories.slug,
      materials: products.materials,
      badge: products.badge,
      description: products.description,
      story: products.story,
      specs: products.specs,
      variants: products.variants,
      ratingScore: products.ratingScore,
      ratingCount: products.ratingCount,
      createdAt: products.createdAt,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .orderBy(products.createdAt);
}

export async function getProductById(id: number) {
  const [product] = await db
    .select({
      id: products.id,
      name: products.name,
      subtitle: products.subtitle,
      price: products.price,
      image: products.image,
      gallery: products.gallery,
      categoryId: products.categoryId,
      categoryName: categories.name,
      categorySlug: categories.slug,
      materials: products.materials,
      badge: products.badge,
      description: products.description,
      story: products.story,
      specs: products.specs,
      variants: products.variants,
      ratingScore: products.ratingScore,
      ratingCount: products.ratingCount,
      createdAt: products.createdAt,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.id, id))
    .limit(1);
  return product ?? null;
}

/* ─── Mutations ─── */
export async function createProduct(data: ProductInput) {
  await requireAdmin();
  await db.insert(products).values(data);
  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/shop");
}

export async function updateProduct(id: number, data: Partial<ProductInput>) {
  await requireAdmin();
  await db.update(products).set(data).where(eq(products.id, id));
  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/shop");
  revalidatePath(`/shop/product/${id}`);
}

export async function deleteProduct(id: number) {
  await requireAdmin();
  await db.delete(products).where(eq(products.id, id));
  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/shop");
}

export async function getProductsByCategoryId(categoryId: number) {
  return db
    .select({ id: products.id, name: products.name, image: products.image })
    .from(products)
    .where(eq(products.categoryId, categoryId))
    .orderBy(products.name);
}

/** Get product images for the lifestyle showcase section */
export async function getLifestyleImages(limit = 3) {
  let rows: Array<{ image: string; gallery: string[] | null }> = [];

  try {
    rows = await db
      .select({ image: products.image, gallery: products.gallery })
      .from(products)
      .orderBy(products.createdAt)
      .limit(limit * 2);
  } catch {
    // Backward compatibility: some deployed DBs may not have the gallery column yet.
    const fallbackRows = await db
      .select({ image: products.image })
      .from(products)
      .orderBy(products.createdAt)
      .limit(limit * 2);

    rows = fallbackRows.map((row) => ({ image: row.image, gallery: null }));
  }

  // Collect unique images, preferring gallery images over main image
  const images: string[] = [];
  for (const row of rows) {
    const gallery = row.gallery as string[] | null;
    if (gallery && gallery.length > 1) {
      // Pick a gallery image that isn't the main one
      const alt = gallery.find((g) => g !== row.image) ?? gallery[0];
      if (alt && !images.includes(alt)) images.push(alt);
    } else if (row.image && !images.includes(row.image)) {
      images.push(row.image);
    }
    if (images.length >= limit) break;
  }
  return images;
}
