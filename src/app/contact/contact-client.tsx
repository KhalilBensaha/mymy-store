"use client";

import Link from "next/link";
import { useState } from "react";
import { MymyLogo } from "../components/mymy-logo";
import { LanguageSwitcher } from "../components/language-switcher";
import { useI18n } from "../i18n/provider";
import { useCart } from "@/lib/cart-context";
import type { ContactInfo } from "@/lib/actions/settings";

/* ─────────────── Navbar ─────────────── */
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
          <Link href="/#our-story" className="font-montserrat text-sm text-text-dark transition-colors hover:text-[#8b6914]">
            {t.nav.ourStory}
          </Link>
          <Link href="/contact" className="border-b border-[#8b6914] pb-1 font-montserrat text-sm text-[#8b6914]">
            {t.nav.contact}
          </Link>
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <LanguageSwitcher variant="gold" />
          <Link href="/cart" aria-label={t.nav.cart} className="relative text-[#8b6914] transition-colors hover:text-[#6f5110]">
            <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </Link>
          <Link href="/admin" aria-label={t.nav.admin} className="text-[#8b6914] transition-colors hover:text-[#6f5110]">
            <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
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
            { label: t.nav.ourStory, href: "/#our-story" },
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

/* ─────────────── Info Card (right column) ─────────────── */
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

/* ─────────────── Contact Option Card (left column) ─────────────── */
function ContactOptionCard({
  href,
  target,
  iconBg,
  iconColor,
  icon,
  label,
  value,
}: {
  href: string;
  target?: string;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-2xl border border-cream-dark/60 bg-warm-white p-5 shadow-sm transition-all hover:border-[#c4a95a] hover:shadow-md"
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-montserrat text-[10px] uppercase tracking-[0.18em] text-text-muted">
          {label}
        </p>
        <p className="mt-0.5 font-montserrat text-sm font-semibold text-text-dark truncate">
          {value}
        </p>
      </div>
      <svg
        className="h-4 w-4 shrink-0 text-text-muted transition-colors group-hover:text-[#c4a95a]"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </a>
  );
}

/* ─────────────── Main Page ─────────────── */
export default function ContactClient({ contactInfo }: { contactInfo: ContactInfo }) {
  const { t, dir } = useI18n();
  const c = t.contact;

  const cleanPhone = contactInfo.phone.replace(/\s/g, "");
  const waPhone = contactInfo.phone.replace(/\D/g, "");

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

          {/* ── Left: Contact option cards ── */}
          <div className="rounded-2xl border border-cream-dark/40 bg-[#f8f5f0] p-8 shadow-sm">
            <h2 className="font-playfair text-2xl font-bold text-text-dark">
              {c.howToReach}
            </h2>
            <div className="mt-2 h-px w-12 bg-[#c4a95a]" />
            <p className="mt-4 mb-8 font-montserrat text-[13px] leading-relaxed text-text-muted">
              {c.howToReachDesc}
            </p>

            <div className="space-y-4">
              {/* WhatsApp */}
              <ContactOptionCard
                href={`https://wa.me/${waPhone}`}
                target="_blank"
                iconBg="bg-emerald-50"
                iconColor="text-emerald-600"
                icon={
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                }
                label={c.chatWhatsapp}
                value={contactInfo.phone}
              />

              {/* Call */}
              <ContactOptionCard
                href={`tel:${cleanPhone}`}
                iconBg="bg-blue-50"
                iconColor="text-blue-600"
                icon={
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                }
                label={c.callDirect}
                value={contactInfo.phone}
              />

              {/* Email */}
              <ContactOptionCard
                href={`mailto:${contactInfo.email}`}
                iconBg="bg-amber-50"
                iconColor="text-[#8b6914]"
                icon={
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                }
                label={c.sendEmail}
                value={contactInfo.email}
              />

              {/* Visit atelier */}
              <ContactOptionCard
                href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
                target="_blank"
                iconBg="bg-rose-50"
                iconColor="text-rose-600"
                icon={
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                }
                label={c.bookVisit}
                value={contactInfo.address}
              />
            </div>

            {/* Hours note */}
            <div className="mt-6 flex items-center gap-3 rounded-xl bg-warm-white border border-cream-dark/40 px-5 py-3">
              <svg className="h-4 w-4 shrink-0 text-[#8b6914]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-montserrat text-[12px] text-text-muted">
                <span className="font-semibold text-text-dark">{c.hours}:</span>{" "}
                {contactInfo.hours}
              </p>
            </div>
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
              value={contactInfo.address}
              icon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              }
              href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
            />

            <InfoCard
              title={c.callUs}
              value={contactInfo.phone}
              icon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              }
              href={`tel:${cleanPhone}`}
            />

            <InfoCard
              title={c.emailUs}
              value={contactInfo.email}
              icon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              }
              href={`mailto:${contactInfo.email}`}
            />

            <InfoCard
              title={c.hours}
              value={contactInfo.hours}
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
