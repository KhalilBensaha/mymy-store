"use client";

import Link from "next/link";
import { MymyLogo } from "../components/mymy-logo";
import { Navbar } from "../components/navbar";
import { useI18n } from "../i18n/provider";

export default function ShopLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-warm-white text-text-dark">
      <Navbar />

      <main>{children}</main>

      <footer className="border-t border-cream-dark/40 bg-[#f7f3ec]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-10">
          <div>
            <MymyLogo className="text-3xl" />
            <p className="mt-4 max-w-xs font-montserrat text-sm leading-7 text-[#7a7065]">
              {t.shop.atelierDesc}
            </p>
          </div>

          <div>
            <p className="font-montserrat text-[0.66rem] uppercase tracking-[0.22em] text-[#a89c87]">{t.nav.shop}</p>
            <ul className="mt-4 space-y-3 font-montserrat text-sm text-[#6c6257]">
              <li><Link href="/shop">{t.nav.shop}</Link></li>
              <li><Link href="/shop/categories">{t.nav.categories}</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-montserrat text-[0.66rem] uppercase tracking-[0.22em] text-[#a89c87]">{t.footer.service}</p>
            <ul className="mt-4 space-y-3 font-montserrat text-sm text-[#6c6257]">
              <li><Link href="#">{t.footer.shipping}</Link></li>
              <li><Link href="#">{t.footer.returns}</Link></li>
              <li><Link href="#">{t.footer.contactUs}</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-montserrat text-[0.66rem] uppercase tracking-[0.22em] text-[#a89c87]">{t.footer.follow}</p>
            <ul className="mt-4 space-y-3 font-montserrat text-sm text-[#6c6257]">
              <li><Link href="#">{t.footer.instagram}</Link></li>
              <li><Link href="#">{t.footer.pinterest}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-10">
          <p className="font-montserrat text-[0.62rem] uppercase tracking-[0.24em] text-[#b3a897]">
            {t.footer.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
}
