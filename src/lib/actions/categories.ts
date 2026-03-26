"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

/* ─── Types ─── */
export type CategoryInput = {
  name: string;
  slug: string;
  description: string;
  image: string;
};

/* ─── Queries ─── */
export async function getCategories() {
  return db.select().from(categories).orderBy(categories.name);
}

export async function getCategoriesWithCounts() {
  const cats = await db.select().from(categories).orderBy(categories.name);

  const counts = await db
    .select({
      categoryId: products.categoryId,
      count: sql<number>`count(*)`,
    })
    .from(products)
    .groupBy(products.categoryId);

  const countMap: Record<number, number> = {};
  for (const c of counts) countMap[c.categoryId] = Number(c.count);

  return cats.map((cat) => ({
    ...cat,
    productCount: countMap[cat.id] ?? 0,
  }));
}

/* ─── Mutations ─── */
export async function createCategory(data: CategoryInput) {
  await db.insert(categories).values(data);
  revalidatePath("/admin/categories");
  revalidatePath("/admin");
  revalidatePath("/shop");
}

export async function updateCategory(id: number, data: Partial<CategoryInput>) {
  await db.update(categories).set(data).where(eq(categories.id, id));
  revalidatePath("/admin/categories");
  revalidatePath("/admin");
  revalidatePath("/shop");
}

export async function deleteCategory(id: number) {
  await db.delete(categories).where(eq(categories.id, id));
  revalidatePath("/admin/categories");
  revalidatePath("/admin");
  revalidatePath("/shop");
}
