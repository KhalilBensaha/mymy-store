import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe config — no DB / bcrypt here.
 * Used only for the authorized callback in the proxy.
 */
export default {
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = nextUrl.pathname.startsWith("/admin");
      const isLoginPage = nextUrl.pathname === "/admin/login";

      // Let /admin/login through always
      if (isLoginPage) return true;

      // Protect all /admin/* routes
      if (isAdmin) {
        if (isLoggedIn) return true;
        return false; // Redirect to signIn page
      }

      return true; // Allow all other routes
    },
  },
  providers: [], // Providers are added in auth.ts (can't import bcrypt at edge)
} satisfies NextAuthConfig;
