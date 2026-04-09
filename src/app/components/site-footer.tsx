"use client";

import Link from "next/link";
import { MymyLogo } from "./mymy-logo";
import { LanguageSwitcher } from "./language-switcher";
import { useI18n } from "../i18n/provider";
import type { SocialLinks } from "@/lib/actions/settings";

export function SiteFooter({ socialLinks }: { socialLinks: SocialLinks }) {
  const { t } = useI18n();

  const routeLinks = [
    { href: "/", label: t.nav.home },
    { href: "/shop", label: t.nav.shop },
    { href: "/shop/categories", label: t.nav.categories },
    { href: "/contact", label: t.nav.contact },
    { href: "/wishlist", label: t.nav.wishlist },
    { href: "/cart", label: t.nav.cart },
  ];

  const normalizedWhatsapp = socialLinks.whatsapp
    ? `https://wa.me/${socialLinks.whatsapp.replace(/[^0-9]/g, "")}`
    : "";

  return (
    <footer className="border-t border-cream-dark/40 bg-[#f7f3ec]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-10">
        <div>
          <MymyLogo className="text-3xl" />
          <p className="mt-4 max-w-xs font-montserrat text-sm leading-7 text-[#7a7065]">
            {t.shop.atelierDesc}
          </p>
        </div>

        <div>
          <p className="font-montserrat text-[0.66rem] uppercase tracking-[0.22em] text-[#a89c87]">
            {t.nav.shop}
          </p>
          <ul className="mt-4 space-y-3 font-montserrat text-sm text-[#6c6257]">
            {routeLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-[#8b6914]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-montserrat text-[0.66rem] uppercase tracking-[0.22em] text-[#a89c87]">
            {t.lang.label}
          </p>
          <div className="mt-4">
            <LanguageSwitcher variant="gold" />
          </div>
        </div>

        <div>
          <p className="font-montserrat text-[0.66rem] uppercase tracking-[0.22em] text-[#a89c87]">
            {t.footer.follow}
          </p>
          <div className="mt-4 flex items-center gap-4">
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.footer.instagram}
                className="text-[#6c6257] transition-colors hover:text-[#8b6914]"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            )}

            {socialLinks.facebook && (
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-[#6c6257] transition-colors hover:text-[#8b6914]"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            )}

            {socialLinks.tiktok && (
              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-[#6c6257] transition-colors hover:text-[#8b6914]"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z" />
                </svg>
              </a>
            )}

            {normalizedWhatsapp && (
              <a
                href={normalizedWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-[#6c6257] transition-colors hover:text-[#8b6914]"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.852L.073 23.927a.75.75 0 00.916.916l6.106-1.46A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.71 9.71 0 01-4.95-1.352l-.353-.21-3.63.868.883-3.558-.228-.368A9.75 9.75 0 1112 21.75z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-10">
        <p className="font-montserrat text-[0.62rem] uppercase tracking-[0.24em] text-[#b3a897]">
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
