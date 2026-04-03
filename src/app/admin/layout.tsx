import { auth } from "@/auth";
import AdminShell from "./admin-shell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  /* If not logged in, render children directly (login page) */
  if (!session?.user) {
    return <>{children}</>;
  }

  return (
    <AdminShell userName={session.user.name || "Admin"}>
      {children}
    </AdminShell>
  );
}
