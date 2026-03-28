"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { createOrder } from "@/lib/actions/orders";
import { useI18n } from "../i18n/provider";
import { MymyLogo } from "../components/mymy-logo";
import { LanguageSwitcher } from "../components/language-switcher";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CheckoutPage() {
  const { t } = useI18n();
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [placing, setPlacing] = useState(false);

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.customerName.trim()) e.customerName = t.checkout.required;
    if (!form.customerPhone.trim()) e.customerPhone = t.checkout.required;
    if (!form.address.trim()) e.address = t.checkout.required;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) return;

    setPlacing(true);
    try {
      const orderNumber = await createOrder({ ...form, items });
      clearCart();
      router.push(`/checkout/confirmation/${orderNumber}`);
    } catch (err) {
      console.error(err);
      setPlacing(false);
    }
  }

  /* If cart is empty redirect to cart */
  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-warm-white px-6 text-center">
        <p className="font-playfair text-3xl text-text-dark">{t.cart.empty}</p>
        <Link
          href="/shop"
          className="bg-[#4a3a16] px-8 py-3.5 font-montserrat text-[0.65rem] uppercase tracking-[0.22em] text-white hover:bg-[#3b2e12]"
        >
          {t.cart.continueShopping}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-white text-text-dark">
      {/* Minimal nav */}
      <header className="sticky top-0 z-40 border-b border-cream-dark/40 bg-warm-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/" aria-label="Mymy home">
            <MymyLogo className="text-[1.7rem]" />
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="gold" />
            <Link
              href="/cart"
              className="font-montserrat text-[0.62rem] uppercase tracking-[0.18em] text-[#8b6914] transition-opacity hover:opacity-70"
            >
              ← {t.cart.title}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* Title */}
        <div className="mb-10">
          <p className="font-montserrat text-[0.58rem] uppercase tracking-[0.3em] text-[#a89c87]">
            Mymy Atelier
          </p>
          <h1 className="mt-2 font-playfair text-4xl text-text-dark">
            {t.checkout.title}
          </h1>
          <p className="mt-2 font-montserrat text-sm text-[#7a6d5e]">
            {t.checkout.subtitle}
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          {/* ── Form ── */}
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Full name */}
            <div>
              <label className="mb-1.5 block font-montserrat text-[0.6rem] uppercase tracking-[0.2em] text-[#8b6914]">
                {t.checkout.fullName} *
              </label>
              <input
                type="text"
                value={form.customerName}
                onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                placeholder={t.checkout.fullNamePlaceholder}
                className="w-full border border-[#d9cfbe] bg-white px-4 py-3.5 font-montserrat text-sm text-text-dark placeholder-[#c1b49a] outline-none transition-colors focus:border-[#8b6914]"
              />
              {errors.customerName && (
                <p className="mt-1 font-montserrat text-[0.65rem] text-red-500">
                  {errors.customerName}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1.5 block font-montserrat text-[0.6rem] uppercase tracking-[0.2em] text-[#8b6914]">
                {t.checkout.phone} *
              </label>
              <input
                type="tel"
                value={form.customerPhone}
                onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                placeholder={t.checkout.phonePlaceholder}
                className="w-full border border-[#d9cfbe] bg-white px-4 py-3.5 font-montserrat text-sm text-text-dark placeholder-[#c1b49a] outline-none transition-colors focus:border-[#8b6914]"
              />
              {errors.customerPhone && (
                <p className="mt-1 font-montserrat text-[0.65rem] text-red-500">
                  {errors.customerPhone}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block font-montserrat text-[0.6rem] uppercase tracking-[0.2em] text-[#8b6914]">
                {t.checkout.email}
              </label>
              <input
                type="email"
                value={form.customerEmail}
                onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                placeholder={t.checkout.emailPlaceholder}
                className="w-full border border-[#d9cfbe] bg-white px-4 py-3.5 font-montserrat text-sm text-text-dark placeholder-[#c1b49a] outline-none transition-colors focus:border-[#8b6914]"
              />
            </div>

            {/* Address */}
            <div>
              <label className="mb-1.5 block font-montserrat text-[0.6rem] uppercase tracking-[0.2em] text-[#8b6914]">
                {t.checkout.address} *
              </label>
              <textarea
                rows={3}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder={t.checkout.addressPlaceholder}
                className="w-full resize-none border border-[#d9cfbe] bg-white px-4 py-3.5 font-montserrat text-sm text-text-dark placeholder-[#c1b49a] outline-none transition-colors focus:border-[#8b6914]"
              />
              {errors.address && (
                <p className="mt-1 font-montserrat text-[0.65rem] text-red-500">
                  {errors.address}
                </p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="mb-1.5 block font-montserrat text-[0.6rem] uppercase tracking-[0.2em] text-[#8b6914]">
                {t.checkout.notes}
              </label>
              <textarea
                rows={2}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder={t.checkout.notesPlaceholder}
                className="w-full resize-none border border-[#d9cfbe] bg-white px-4 py-3.5 font-montserrat text-sm text-text-dark placeholder-[#c1b49a] outline-none transition-colors focus:border-[#8b6914]"
              />
            </div>

            <button
              type="submit"
              disabled={placing}
              className="w-full bg-[#4a3a16] py-4 font-montserrat text-[0.65rem] uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#3b2e12] disabled:opacity-60"
            >
              {placing ? t.checkout.placing : t.checkout.placeOrder}
            </button>
          </form>

          {/* ── Order summary ── */}
          <aside className="h-fit border border-[#ede7dd] bg-[#faf8f5] p-8">
            <h2 className="mb-6 font-montserrat text-[0.62rem] uppercase tracking-[0.22em] text-[#a89c87]">
              {t.checkout.orderSummary}
            </h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.variant}`}
                  className="flex items-center gap-3"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-[#f2ede5]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-playfair text-sm text-text-dark">
                      {item.name}
                    </p>
                    {item.variant && (
                      <p className="font-montserrat text-[0.65rem] text-[#a89c87]">
                        {item.variant}
                      </p>
                    )}
                    <p className="font-montserrat text-[0.65rem] text-[#a89c87]">
                      × {item.quantity}
                    </p>
                  </div>
                  <span className="shrink-0 font-montserrat text-sm text-text-dark">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between border-t border-[#ede7dd] pt-5">
              <span className="font-montserrat text-[0.78rem] uppercase tracking-[0.15em] text-[#a89c87]">
                {t.cart.total}
              </span>
              <span className="font-playfair text-xl text-text-dark">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
