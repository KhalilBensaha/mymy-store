import { auth } from "@/auth";

/**
 * Next.js 16 "proxy" (replaces middleware.ts).
 * Delegates to Auth.js so /admin/* routes are gated.
 */
export default auth;

export const config = {
  matcher: ["/admin/:path*"],
};
