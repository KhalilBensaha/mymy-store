"use server";

import { auth } from "@/auth";

/**
 * Guard for admin-only server actions.
 * Throws if the caller is not authenticated.
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  return session;
}
