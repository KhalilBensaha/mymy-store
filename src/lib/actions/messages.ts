"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { eq, sql, desc } from "drizzle-orm";

/* ─── Types ─── */
export type MessageInput = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

/* ─── Queries ─── */
export async function getMessages() {
  return db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.submittedAt));
}

export async function getUnreadMessageCount() {
  const [result] = await db
    .select({ count: sql<number>`count(*)` })
    .from(contactMessages)
    .where(eq(contactMessages.read, false));
  return Number(result?.count ?? 0);
}

/* ─── Mutations ─── */
export async function submitContactMessage(data: MessageInput) {
  await db.insert(contactMessages).values(data);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function markMessageRead(id: number) {
  await db
    .update(contactMessages)
    .set({ read: true })
    .where(eq(contactMessages.id, id));
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function markAllMessagesRead() {
  await db
    .update(contactMessages)
    .set({ read: true })
    .where(eq(contactMessages.read, false));
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessage(id: number) {
  await db.delete(contactMessages).where(eq(contactMessages.id, id));
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}
