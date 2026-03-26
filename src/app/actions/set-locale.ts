"use server";

import { cookies } from "next/headers";

export async function setLocale(locale: string) {
  (await cookies()).set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 365 * 24 * 60 * 60,
    sameSite: "lax",
  });
}
