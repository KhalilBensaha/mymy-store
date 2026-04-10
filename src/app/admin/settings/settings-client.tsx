"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  saveFeaturedCategoryIds,
  saveContactSettings,
  saveSiteLanguage,
  saveSocialLinks,
  createAdmin,
  deleteAdmin,
  type ContactInfo,
  type SiteLocale,
  type SocialLinks,
  type AdminRow,
} from "@/lib/actions/settings";

/* ─── Types ─── */
type CategoryRow = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
};

type Section = "collections" | "contact" | "language" | "social" | "admins";

/* ─── Sections config ─── */
const SECTIONS: { id: Section; label: string; icon: ReactNode }[] = [
  {
    id: "collections",
    label: "Collections",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contact Info",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    id: "language",
    label: "Language",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
      </svg>
    ),
  },
  {
    id: "social",
    label: "Social Links",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
    ),
  },
  {
    id: "admins",
    label: "Admins",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
];

const inputCls =
  "w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] outline-none focus:border-[#c4a95a] transition-colors bg-white";

type Props = {
  allCategories: CategoryRow[];
  initialFeaturedIds: number[];
  initialContactInfo: ContactInfo;
  initialLanguage: SiteLocale;
  initialSocialLinks: SocialLinks;
  initialAdmins: AdminRow[];
};

const LOCALE_OPTIONS: { value: SiteLocale; label: string; flag: string; native: string }[] = [
  { value: "fr", label: "French", flag: "🇫🇷", native: "Français" },
  { value: "en", label: "English", flag: "🇬🇧", native: "English" },
  { value: "ar", label: "Arabic", flag: "🇩🇿", native: "العربية" },
];

export default function SettingsClient({
  allCategories,
  initialFeaturedIds,
  initialContactInfo,
  initialLanguage,
  initialSocialLinks,
  initialAdmins,
}: Props) {
  const validCategoryIds = new Set(allCategories.map((c) => c.id));
  const [section, setSection] = useState<Section>("collections");
  const [selectedIds, setSelectedIds] = useState<number[]>(
    initialFeaturedIds.filter((id) => validCategoryIds.has(id))
  );
  const [contactForm, setContactForm] = useState<ContactInfo>(initialContactInfo);
  const [locale, setLocale] = useState<SiteLocale>(initialLanguage);
  const [social, setSocial] = useState<SocialLinks>(initialSocialLinks);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Admin management state
  const [adminList, setAdminList] = useState<AdminRow[]>(initialAdmins);
  const [adminForm, setAdminForm] = useState({ name: "", email: "", password: "" });
  const [adminSaving, setAdminSaving] = useState(false);
  const [adminError, setAdminError] = useState("");

  function showSaved() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function toggleCategory(id: number) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
  }

  async function handleSave() {
    setSaving(true);
    setSaveError("");
    try {
      if (section === "collections") await saveFeaturedCategoryIds(selectedIds);
      else if (section === "contact") await saveContactSettings(contactForm);
      else if (section === "language") await saveSiteLanguage(locale);
      else if (section === "social") await saveSocialLinks(social);
      showSaved();
    } catch {
      setSaveError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold font-playfair">Settings</h1>
          <p className="text-[13px] text-[#6b7280] mt-1">Manage your store configuration</p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-lg border border-[#c4a95a] px-4 py-2 text-[12px] font-semibold text-[#c4a95a] hover:bg-[#c4a95a]/5 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          View Store
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Section nav */}
        <div className="lg:w-56 shrink-0">
          <nav className="rounded-xl border border-[#e5e7eb] bg-white p-2 space-y-0.5">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors ${
                  section === s.id
                    ? "bg-[#c4a95a]/10 text-[#c4a95a]"
                    : "text-[#6b7280] hover:bg-[#f4f5f7] hover:text-[#1e1e2d]"
                }`}
              >
                {s.icon}
                {s.label}
              </button>
            ))}
          </nav>

          {/* Quick links */}
          <div className="mt-4 rounded-xl border border-[#e5e7eb] bg-white p-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9ca3af] mb-2 px-1">
              Quick Links
            </p>
            {[
              { label: "Products", href: "/admin/products" },
              { label: "Categories", href: "/admin/categories" },
              { label: "Orders", href: "/admin/orders" },
              { label: "Contact Page", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.href.startsWith("/admin") ? undefined : "_blank"}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12px] text-[#6b7280] hover:bg-[#f4f5f7] hover:text-[#1e1e2d] transition-colors"
              >
                <span className="h-1 w-1 rounded-full bg-[#c4a95a]" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 rounded-xl border border-[#e5e7eb] bg-white">

          {/* ── Collections ── */}
          {section === "collections" && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-[16px] font-bold">Special Collections</h2>
                <p className="text-[12px] text-[#6b7280] mt-0.5">
                  Choose up to 4 categories to feature in the Special Collections section on the homepage.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-[#fffbeb] border border-[#fde68a] px-4 py-2.5">
                <svg className="w-4 h-4 text-[#92400e] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <p className="text-[12px] text-[#92400e]">
                  <span className="font-semibold">{selectedIds.length}/4</span> categories selected.
                  {selectedIds.length >= 4 && " Deselect one to choose another."}
                </p>
              </div>

              {allCategories.length === 0 ? (
                <div className="rounded-lg border border-dashed border-[#e5e7eb] p-10 text-center text-[13px] text-[#9ca3af]">
                  No categories found.{" "}
                  <Link href="/admin/categories" className="text-[#c4a95a] underline">
                    Create some first.
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {allCategories.map((cat) => {
                    const isSelected = selectedIds.includes(cat.id);
                    const isDisabled = !isSelected && selectedIds.length >= 4;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => toggleCategory(cat.id)}
                        className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all ${
                          isSelected
                            ? "border-[#c4a95a] bg-[#c4a95a]/5"
                            : isDisabled
                            ? "border-[#e5e7eb] opacity-40 cursor-not-allowed"
                            : "border-[#e5e7eb] hover:border-[#c4a95a]/50 hover:bg-[#fafaf9]"
                        }`}
                      >
                        <div
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                            isSelected ? "border-[#c4a95a] bg-[#c4a95a]" : "border-[#d1d5db]"
                          }`}
                        >
                          {isSelected && (
                            <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          )}
                        </div>
                        {cat.image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={cat.image} alt={cat.name} className="h-10 w-10 rounded-lg object-cover shrink-0" />
                        )}
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-[#1e1e2d] truncate">{cat.name}</p>
                          <p className="text-[11px] text-[#6b7280] truncate">{cat.description || cat.slug}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ── Contact Info ── */}
          {section === "contact" && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-[16px] font-bold">Contact Information</h2>
                <p className="text-[12px] text-[#6b7280] mt-0.5">
                  Displayed on the contact page and used in customer communication action cards.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-[12px] font-semibold text-[#374151] mb-1">Address</label>
                  <input className={inputCls} value={contactForm.address} onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })} placeholder="15 Rue des Bijoutiers, Alger 16000" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#374151] mb-1">Phone</label>
                    <input className={inputCls} value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} placeholder="+213 21 123 456" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[#374151] mb-1">Email</label>
                    <input type="email" className={inputCls} value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} placeholder="hello@mymyatelier.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#374151] mb-1">Opening Hours</label>
                  <input className={inputCls} value={contactForm.hours} onChange={(e) => setContactForm({ ...contactForm, hours: e.target.value })} placeholder="Lun – Sam, 10h00 – 19h00" />
                  <p className="mt-1 text-[11px] text-[#9ca3af]">Shown on the contact page and in action cards.</p>
                </div>
              </div>
              {/* Preview */}
              <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-4">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">Preview</p>
                <div className="space-y-2 text-[12px] text-[#374151]">
                  {([
                    { d: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z", val: contactForm.address },
                    { d: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z", val: contactForm.phone },
                    { d: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75", val: contactForm.email },
                    { d: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z", val: contactForm.hours },
                  ] as { d: string; val: string }[]).map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c4a95a]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.d} />
                      </svg>
                      <span>{item.val || "—"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Language ── */}
          {section === "language" && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-[16px] font-bold">Default Language</h2>
                <p className="text-[12px] text-[#6b7280] mt-0.5">
                  Set the default language for new visitors. Users can still switch from the navbar.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {LOCALE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setLocale(opt.value)}
                    className={`flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all ${
                      locale === opt.value
                        ? "border-[#c4a95a] bg-[#c4a95a]/5"
                        : "border-[#e5e7eb] hover:border-[#c4a95a]/40 hover:bg-[#fafaf9]"
                    }`}
                  >
                    <span className="text-4xl">{opt.flag}</span>
                    <div className="text-center">
                      <p className="text-[14px] font-bold text-[#1e1e2d]">{opt.native}</p>
                      <p className="text-[11px] text-[#6b7280]">{opt.label}</p>
                    </div>
                    {locale === opt.value && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#c4a95a] px-2.5 py-0.5 text-[10px] font-bold text-white">
                        <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Active
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="rounded-lg bg-[#f0fdf4] border border-[#bbf7d0] px-4 py-3 text-[12px] text-[#15803d]">
                <span className="font-semibold">Note:</span> This sets the default language for first-time visitors. The setting is persisted in the database.
              </div>
            </div>
          )}

          {/* ── Social Links ── */}
          {section === "social" && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-[16px] font-bold">Social & Contact Links</h2>
                <p className="text-[12px] text-[#6b7280] mt-0.5">
                  These links appear in the contact page action cards and the site footer.
                </p>
              </div>
              <div className="space-y-5">
                {[
                  {
                    key: "whatsapp" as keyof SocialLinks,
                    label: "WhatsApp Number",
                    placeholder: "+213555000000",
                    hint: "Include country code, no spaces.",
                    iconColor: "text-emerald-500",
                    iconPath: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.852L.073 23.927a.75.75 0 00.916.916l6.106-1.46A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.71 9.71 0 01-4.95-1.352l-.353-.21-3.63.868.883-3.558-.228-.368A9.75 9.75 0 1112 21.75z",
                  },
                  {
                    key: "instagram" as keyof SocialLinks,
                    label: "Instagram URL",
                    placeholder: "https://instagram.com/mymyatelier",
                    hint: "",
                    iconColor: "text-pink-500",
                    iconPath: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
                  },
                  {
                    key: "facebook" as keyof SocialLinks,
                    label: "Facebook URL",
                    placeholder: "https://facebook.com/mymyatelier",
                    hint: "",
                    iconColor: "text-blue-600",
                    iconPath: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                  },
                  {
                    key: "tiktok" as keyof SocialLinks,
                    label: "TikTok URL",
                    placeholder: "https://tiktok.com/@mymyatelier",
                    hint: "",
                    iconColor: "text-[#1e1e2d]",
                    iconPath: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z",
                  },
                ].map((field) => (
                  <div key={field.key}>
                    <label className={`flex items-center gap-2 text-[12px] font-semibold text-[#374151] mb-1`}>
                      <span className={field.iconColor}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d={field.iconPath} />
                        </svg>
                      </span>
                      {field.label}
                    </label>
                    <input
                      className={inputCls}
                      value={social[field.key]}
                      onChange={(e) => setSocial({ ...social, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      dir="ltr"
                    />
                    {field.hint && <p className="mt-1 text-[11px] text-[#9ca3af]">{field.hint}</p>}
                  </div>
                ))}
              </div>
              <div className="rounded-lg bg-[#eff6ff] border border-[#bfdbfe] px-4 py-3 text-[12px] text-[#1d4ed8]">
                <span className="font-semibold">Tip:</span> Leave a field empty to hide that social link. The WhatsApp number is also used in the &ldquo;Chat on WhatsApp&rdquo; action card on the contact page.
              </div>
            </div>
          )}

          {/* ── Admins ── */}
          {section === "admins" && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-[16px] font-bold">Admin Accounts</h2>
                <p className="text-[12px] text-[#6b7280] mt-0.5">
                  Manage admin users who can access the dashboard.
                </p>
              </div>

              {adminError && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-[12px] text-red-700 font-medium">
                  {adminError}
                </div>
              )}

              {/* Current admins */}
              <div className="space-y-2">
                <p className="text-[12px] font-semibold text-[#374151]">Current Admins ({adminList.length})</p>
                <div className="divide-y divide-[#e5e7eb] rounded-xl border border-[#e5e7eb]">
                  {adminList.map((admin) => (
                    <div key={admin.id} className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c4a95a]/10 text-[#c4a95a] text-[12px] font-bold uppercase">
                          {admin.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-[#1e1e2d]">{admin.name}</p>
                          <p className="text-[11px] text-[#6b7280]">{admin.email}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        disabled={adminList.length <= 1 || adminSaving}
                        onClick={async () => {
                          if (!confirm(`Delete admin "${admin.name}"?`)) return;
                          setAdminSaving(true);
                          setAdminError("");
                          try {
                            const res = await deleteAdmin(admin.id);
                            if (!res.success) { setAdminError(res.error ?? "Failed"); return; }
                            setAdminList((prev) => prev.filter((a) => a.id !== admin.id));
                          } catch { setAdminError("Failed to delete admin."); }
                          finally { setAdminSaving(false); }
                        }}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-[11px] font-semibold text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                {adminList.length <= 1 && (
                  <p className="text-[11px] text-[#9ca3af]">You cannot remove the last admin.</p>
                )}
              </div>

              {/* Create new admin */}
              <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-5 space-y-4">
                <p className="text-[13px] font-bold text-[#1e1e2d]">Create New Admin</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#374151] mb-1">Name</label>
                    <input className={inputCls} value={adminForm.name} onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })} placeholder="Full name" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[#374151] mb-1">Email</label>
                    <input type="email" className={inputCls} value={adminForm.email} onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })} placeholder="admin@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#374151] mb-1">Password</label>
                  <input type="password" className={inputCls} value={adminForm.password} onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })} placeholder="Min 6 characters" />
                </div>
                <button
                  type="button"
                  disabled={adminSaving || !adminForm.name.trim() || !adminForm.email.trim() || adminForm.password.length < 6}
                  onClick={async () => {
                    setAdminSaving(true);
                    setAdminError("");
                    try {
                      const res = await createAdmin(adminForm);
                      if (!res.success) { setAdminError(res.error ?? "Failed"); return; }
                      setAdminList((prev) => [...prev, res.admin!]);
                      setAdminForm({ name: "", email: "", password: "" });
                    } catch { setAdminError("Failed to create admin."); }
                    finally { setAdminSaving(false); }
                  }}
                  className="rounded-lg bg-[#c4a95a] px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-[#b09845] transition-colors disabled:opacity-60"
                >
                  {adminSaving ? "Creating…" : "Create Admin"}
                </button>
              </div>
            </div>
          )}

          {/* ── Save bar (not shown for admins — has inline actions) ── */}
          {section !== "admins" && (
          <div className="flex items-center justify-end gap-3 border-t border-[#e5e7eb] p-5">
            {saveError && <span className="text-[12px] font-semibold text-red-500">{saveError}</span>}
            {saved && !saveError && (
              <span className="text-[12px] font-semibold text-emerald-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Saved successfully
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-[#c4a95a] px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-[#b09845] transition-colors disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
