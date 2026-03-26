import { auth } from "@/auth";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import AdminShell from "./admin-shell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  /* If not logged in, render children directly (login page) */
  if (!session?.user) {
    return <>{children}</>;
  }

  /* Count unread messages from DB */
  const [result] = await db
    .select({ count: sql<number>`count(*)` })
    .from(contactMessages)
    .where(eq(contactMessages.read, false));

  const unreadMessages = Number(result?.count ?? 0);

  return (
    <AdminShell userName={session.user.name || "Admin"} unreadMessages={unreadMessages}>
      {children}
    </AdminShell>
  );
}
