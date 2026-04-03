"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { settings, admins } from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";
import { hash } from "bcryptjs";
import { requireAdmin } from "./auth-guard";

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
  await requireAdmin();
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
  await requireAdmin();
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
  await requireAdmin();
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
  await requireAdmin();
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
  await requireAdmin();
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

/* ─── Admin management ─── */
export type AdminRow = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
};

export async function getAdmins(): Promise<AdminRow[]> {
  return db
    .select({
      id: admins.id,
      name: admins.name,
      email: admins.email,
      createdAt: admins.createdAt,
    })
    .from(admins)
    .orderBy(admins.createdAt);
}

export async function createAdmin(data: {
  name: string;
  email: string;
  password: string;
}): Promise<{ success: boolean; error?: string; admin?: AdminRow }> {
  await requireAdmin();
  const name = data.name.trim();
  const email = data.email.trim().toLowerCase();
  const password = data.password;

  if (!name || !email || !password) {
    return { success: false, error: "All fields are required." };
  }
  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters." };
  }

  // Check for duplicate emails
  const [existing] = await db
    .select({ id: admins.id })
    .from(admins)
    .where(eq(admins.email, email))
    .limit(1);

  if (existing) {
    return { success: false, error: "An admin with this email already exists." };
  }

  const passwordHash = await hash(password, 12);
  const [inserted] = await db
    .insert(admins)
    .values({ name, email, passwordHash })
    .returning({ id: admins.id, name: admins.name, email: admins.email, createdAt: admins.createdAt });
  revalidatePath("/admin/settings");
  return { success: true, admin: inserted };
}

export async function deleteAdmin(
  id: number
): Promise<{ success: boolean; error?: string }> {
  await requireAdmin();
  // Prevent deleting the last admin
  const allAdmins = await db
    .select({ id: admins.id })
    .from(admins);

  if (allAdmins.length <= 1) {
    return { success: false, error: "Cannot delete the last admin." };
  }

  await db.delete(admins).where(eq(admins.id, id));
  revalidatePath("/admin/settings");
  return { success: true };
}
