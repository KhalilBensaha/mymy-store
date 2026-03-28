"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { settings } from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";

/* ─── Types ─── */
export type ContactInfo = {
  address: string;
  phone: string;
  email: string;
  hours: string;
};

/* ─── Generic get/set ─── */
export async function getSetting(key: string): Promise<string | null> {
  try {
    const [row] = await db
      .select()
      .from(settings)
      .where(eq(settings.key, key))
      .limit(1);
    return row?.value ?? null;
  } catch {
    return null;
  }
}

export async function setSetting(key: string, value: string) {
  try {
    await db
      .insert(settings)
      .values({ key, value })
      .onConflictDoUpdate({
        target: settings.key,
        set: { value, updatedAt: new Date() },
      });
  } catch (err) {
    console.error("setSetting failed:", err);
    throw err;
  }
}

/* ─── Contact info ─── */
const CONTACT_DEFAULTS: ContactInfo = {
  address: "15 Rue des Bijoutiers, Alger 16000, Algérie",
  phone: "+213 21 123 456",
  email: "hello@mymyatelier.com",
  hours: "Lun – Sam, 10h00 – 19h00",
};

export async function getContactSettings(): Promise<ContactInfo> {
  try {
    const keys = [
      "contact_address",
      "contact_phone",
      "contact_email",
      "contact_hours",
    ];
    const rows = await db
      .select()
      .from(settings)
      .where(inArray(settings.key, keys));
    const map: Record<string, string> = {};
    for (const r of rows) map[r.key] = r.value;
    return {
      address: map["contact_address"] ?? CONTACT_DEFAULTS.address,
      phone: map["contact_phone"] ?? CONTACT_DEFAULTS.phone,
      email: map["contact_email"] ?? CONTACT_DEFAULTS.email,
      hours: map["contact_hours"] ?? CONTACT_DEFAULTS.hours,
    };
  } catch {
    return { ...CONTACT_DEFAULTS };
  }
}

export async function saveContactSettings(info: ContactInfo) {
  const entries: [string, string][] = [
    ["contact_address", info.address],
    ["contact_phone", info.phone],
    ["contact_email", info.email],
    ["contact_hours", info.hours],
  ];
  for (const [key, value] of entries) {
    await setSetting(key, value);
  }
  revalidatePath("/contact");
  revalidatePath("/admin/settings");
}

/* ─── Featured category IDs (for Special Collections section) ─── */
export async function getFeaturedCategoryIds(): Promise<number[]> {
  const value = await getSetting("featured_category_ids");
  if (!value) return [];
  try {
    return JSON.parse(value) as number[];
  } catch {
    return [];
  }
}

export async function saveFeaturedCategoryIds(ids: number[]) {
  await setSetting("featured_category_ids", JSON.stringify(ids));
  revalidatePath("/");
  revalidatePath("/admin/settings");
}

/* ─── Site language ─── */
export type SiteLocale = "fr" | "en" | "ar";

export async function getSiteLanguage(): Promise<SiteLocale> {
  const val = await getSetting("site_language");
  if (val === "en" || val === "ar" || val === "fr") return val;
  return "fr";
}

export async function saveSiteLanguage(locale: SiteLocale) {
  await setSetting("site_language", locale);
  revalidatePath("/admin/settings");
}

/* ─── Social links ─── */
export type SocialLinks = {
  whatsapp: string;
  instagram: string;
  facebook: string;
  tiktok: string;
};

const SOCIAL_DEFAULTS: SocialLinks = {
  whatsapp: "+213555000000",
  instagram: "https://instagram.com/mymyatelier",
  facebook: "",
  tiktok: "",
};

export async function getSocialLinks(): Promise<SocialLinks> {
  try {
    const keys = [
      "social_whatsapp",
      "social_instagram",
      "social_facebook",
      "social_tiktok",
    ];
    const rows = await db
      .select()
      .from(settings)
      .where(inArray(settings.key, keys));
    const map: Record<string, string> = {};
    for (const r of rows) map[r.key] = r.value;
    return {
      whatsapp: map["social_whatsapp"] ?? SOCIAL_DEFAULTS.whatsapp,
      instagram: map["social_instagram"] ?? SOCIAL_DEFAULTS.instagram,
      facebook: map["social_facebook"] ?? SOCIAL_DEFAULTS.facebook,
      tiktok: map["social_tiktok"] ?? SOCIAL_DEFAULTS.tiktok,
    };
  } catch {
    return { ...SOCIAL_DEFAULTS };
  }
}

export async function saveSocialLinks(links: SocialLinks) {
  const entries: [string, string][] = [
    ["social_whatsapp", links.whatsapp],
    ["social_instagram", links.instagram],
    ["social_facebook", links.facebook],
    ["social_tiktok", links.tiktok],
  ];
  for (const [key, value] of entries) {
    await setSetting(key, value);
  }
  revalidatePath("/contact");
  revalidatePath("/admin/settings");
}
