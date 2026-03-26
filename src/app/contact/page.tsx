"use client";

import Link from "next/link";
import { useState } from "react";
import { MymyLogo } from "../components/mymy-logo";
import { LanguageSwitcher } from "../components/language-switcher";
import { useI18n } from "../i18n/provider";
import { submitContactMessage } from "@/lib/actions/messages";

/* ─────────────── Navbar (mirrors shop layout) ─────────────── */
function Navbar() {
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cream-dark/40 bg-warm-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" aria-label="Mymy home">
          <MymyLogo className="text-[1.7rem]" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          <Link href="/shop" className="font-montserrat text-sm text-text-dark transition-colors hover:text-[#8b6914]">
            {t.nav.shop}
          </Link>
          <Link href="/#collections" className="font-montserrat text-sm text-text-dark transition-colors hover:text-[#8b6914]">
            {t.nav.collections}
          </Link>
          <Link href="/contact" className="border-b border-[#8b6914] pb-1 font-montserrat text-sm text-[#8b6914]">
            {t.nav.contact}
          </Link>
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <LanguageSwitcher variant="gold" />
          <Link href="/wishlist" aria-label={t.nav.wishlist} className="text-[#8b6914] transition-colors hover:text-[#6f5110]">
            <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher variant="gold" />
          <button
            className="text-[#8b6914]"
            aria-label={mobileOpen ? t.nav.close : t.nav.menu}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile slide-down */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 border-t border-cream-dark/40 px-6 py-4">
          {[
            { label: t.nav.shop, href: "/shop" },
            { label: t.nav.collections, href: "/#collections" },
            { label: t.nav.contact, href: "/contact" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="py-2 font-montserrat text-sm text-text-dark transition-colors hover:text-[#8b6914]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* ─────────────── Contact Info Card ─────────────── */
function InfoCard({
  icon,
  title,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4 rounded-2xl border border-cream-dark/60 bg-warm-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-[#8b6914]">
        {icon}
      </div>
      <div>
        <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
          {title}
        </p>
        <p className="mt-1 font-montserrat text-sm font-medium text-text-dark">{value}</p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
}

/* ─────────────── Main Page ─────────────── */
export default function ContactPage() {
  const { t, dir } = useI18n();
  const c = t.contact;

  const subjects = [
    c.subjectGeneral,
    c.subjectOrder,
    c.subjectCustom,
    c.subjectReturns,
    c.subjectCare,
  ];

  type FormState = {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  };

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: subjects[0],
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Partial<FormState>>({});

  function validate(): boolean {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = "•";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "•";
    if (!form.message.trim()) newErrors.message = "•";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    submitContactMessage({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      subject: form.subject,
      message: form.message.trim(),
    }).then(() => {
      setStatus("sent");
    });
  }

  function resetForm() {
    setForm({ name: "", email: "", phone: "", subject: subjects[0], message: "" });
    setErrors({});
    setStatus("idle");
  }

  const inputBase =
    "w-full rounded-xl border bg-white px-4 py-3 font-montserrat text-[13px] text-text-dark outline-none transition-colors placeholder:text-text-muted/60 focus:border-[#c4a95a] focus:ring-1 focus:ring-[#c4a95a]/30";

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-text-dark" dir={dir}>
      <Navbar />

      {/* ── Hero banner ── */}
      <section className="bg-warm-white py-14 text-center">
        <p className="font-montserrat text-[10px] uppercase tracking-[0.32em] text-[#8b6914]">
          Mymy Atelier
        </p>
        <h1 className="mt-3 font-playfair text-4xl font-bold tracking-wide text-text-dark sm:text-5xl">
          {c.title}
        </h1>
        <div className="mx-auto mt-5 h-px w-16 bg-[#c4a95a]" />
        <p className="mx-auto mt-5 max-w-xl font-montserrat text-[13px] leading-relaxed text-text-muted">
          {c.subtitle}
        </p>
      </section>

      {/* ── Content grid ── */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">

          {/* ── Left: Form ── */}
          <div className="rounded-2xl border border-cream-dark/40 bg-warm-white p-8 shadow-sm">
            {status === "sent" ? (
              /* Success state */
              <div className="flex flex-col items-center justify-center gap-5 py-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="font-playfair text-2xl font-bold text-text-dark">{c.successTitle}</h2>
                <p className="max-w-sm font-montserrat text-[13px] leading-relaxed text-text-muted">
                  {c.successMessage}
                </p>
                <button
                  onClick={resetForm}
                  className="mt-2 font-montserrat text-[11px] uppercase tracking-[0.16em] font-semibold text-[#8b6914] hover:text-[#6f5110] transition-colors"
                >
                  {c.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Row: name + email */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block font-montserrat text-[11px] font-semibold uppercase tracking-[0.14em] text-text-dark">
                      {c.nameLabel}
                      <span className="text-[#c4a95a]"> *</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={c.namePlaceholder}
                      className={`${inputBase} ${errors.name ? "border-red-300" : "border-cream-dark/60"}`}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-montserrat text-[11px] font-semibold uppercase tracking-[0.14em] text-text-dark">
                      {c.emailLabel}
                      <span className="text-[#c4a95a]"> *</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder={c.emailPlaceholder}
                      className={`${inputBase} ${errors.email ? "border-red-300" : "border-cream-dark/60"}`}
                    />
                  </div>
                </div>

                {/* Row: phone + subject */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block font-montserrat text-[11px] font-semibold uppercase tracking-[0.14em] text-text-dark">
                      {c.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder={c.phonePlaceholder}
                      className={`${inputBase} border-cream-dark/60`}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-montserrat text-[11px] font-semibold uppercase tracking-[0.14em] text-text-dark">
                      {c.subjectLabel}
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className={`${inputBase} border-cream-dark/60 cursor-pointer`}
                    >
                      {subjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1.5 block font-montserrat text-[11px] font-semibold uppercase tracking-[0.14em] text-text-dark">
                    {c.messageLabel}
                    <span className="text-[#c4a95a]"> *</span>
                  </label>
                  <textarea
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={c.messagePlaceholder}
                    className={`${inputBase} resize-none ${errors.message ? "border-red-300" : "border-cream-dark/60"}`}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex w-full items-center justify-center gap-2 bg-[#8b6914] px-6 py-3.5 font-montserrat text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#6f5110] disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {c.sending}
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                      {c.send}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── Right: Info cards ── */}
          <div className="flex flex-col gap-4">
            {/* Decorative gold divider */}
            <div className="mb-2 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#c4a95a]/40" />
              <div className="h-1.5 w-1.5 rotate-45 bg-[#c4a95a]" />
              <div className="h-px flex-1 bg-[#c4a95a]/40" />
            </div>

            <InfoCard
              title={c.visitUs}
              value={c.address}
              icon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              }
              href={`https://maps.google.com/?q=${encodeURIComponent(c.address)}`}
            />

            <InfoCard
              title={c.callUs}
              value={c.phone}
              icon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              }
              href={`tel:${c.phone.replace(/\s/g, "")}`}
            />

            <InfoCard
              title={c.emailUs}
              value={c.emailAddress}
              icon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              }
              href={`mailto:${c.emailAddress}`}
            />

            <InfoCard
              title={c.hours}
              value={c.hoursValue}
              icon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />

            {/* Social links */}
            <div className="mt-2 flex items-center gap-4 rounded-2xl border border-cream-dark/60 bg-warm-white p-5 shadow-sm">
              <span className="font-montserrat text-[10px] uppercase tracking-[0.18em] text-text-muted">
                {t.footer.follow}
              </span>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/mymyatelier"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-cream-dark/60 text-text-muted transition-colors hover:border-[#c4a95a] hover:text-[#8b6914]"
                  aria-label="Instagram"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.pinterest.com/mymyatelier"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-cream-dark/60 text-text-muted transition-colors hover:border-[#c4a95a] hover:text-[#8b6914]"
                  aria-label="Pinterest"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer strip ── */}
      <footer className="border-t border-cream-dark/40 bg-warm-white py-6 text-center">
        <p className="font-montserrat text-[11px] text-text-muted">{t.footer.copyright}</p>
      </footer>
    </div>
  );
}
