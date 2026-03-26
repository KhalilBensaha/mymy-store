"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { products, categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/* ─── Types ─── */
export type ProductInput = {
  name: string;
  subtitle: string;
  price: number;
  image: string;
  gallery: string[];
  categoryId: number;
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
  await db.insert(products).values(data);
  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/shop");
}

export async function updateProduct(id: number, data: Partial<ProductInput>) {
  await db.update(products).set(data).where(eq(products.id, id));
  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/shop");
  revalidatePath(`/shop/product/${id}`);
}

export async function deleteProduct(id: number) {
  await db.delete(products).where(eq(products.id, id));
  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/shop");
}
