"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "../../../i18n/provider";
import type { OrderWithItems } from "@/lib/actions/orders";

function formatPrice(price: number) {
  return (
    new Intl.NumberFormat("fr-DZ", {
      style: "decimal",
      maximumFractionDigits: 0,
    }).format(price) + " DA"
  );
}

export function ConfirmationClient({ order }: { order: OrderWithItems }) {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-warm-white text-text-dark">
      {/* Simple header */}
      <header className="border-b border-cream-dark/40 bg-warm-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link
            href="/"
            className="font-cormorant text-2xl font-semibold tracking-widest text-text-dark"
          >
            MYMY
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
        {/* Success icon */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f5f0e8]">
            <svg
              className="h-9 w-9 text-[#8b6914]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <div className="text-center">
          <p className="font-montserrat text-[0.58rem] uppercase tracking-[0.3em] text-[#a89c87]">
            Mymy Atelier
          </p>
          <h1 className="mt-3 font-playfair text-4xl text-text-dark">
            {t.confirmation.title}
          </h1>
          <p className="mt-3 font-montserrat text-sm text-[#7a6d5e]">
            {t.confirmation.subtitle}
          </p>
          <p className="mt-2 font-montserrat text-[0.65rem] uppercase tracking-[0.18em] text-[#8b6914]">
            {t.confirmation.orderNumber} : {order.orderNumber}
          </p>
        </div>

        {/* Order details */}
        <div className="mt-12 space-y-8">
          {/* Customer info */}
          <div className="border border-[#ede7dd] bg-[#faf8f5] p-6">
            <h2 className="mb-4 font-montserrat text-[0.6rem] uppercase tracking-[0.22em] text-[#a89c87]">
              {t.confirmation.customerInfo}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: t.confirmation.name, value: order.customerName },
                { label: t.confirmation.phone, value: order.customerPhone },
                ...(order.customerEmail
                  ? [{ label: t.confirmation.email, value: order.customerEmail }]
                  : []),
                { label: t.confirmation.address, value: order.address },
                ...(order.notes
                  ? [{ label: t.confirmation.notes, value: order.notes }]
                  : []),
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.15em] text-[#a89c87]">
                    {label}
                  </p>
                  <p className="mt-0.5 font-montserrat text-sm text-text-dark">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Items */}
          <div className="border border-[#ede7dd] bg-[#faf8f5] p-6">
            <h2 className="mb-4 font-montserrat text-[0.6rem] uppercase tracking-[0.22em] text-[#a89c87]">
              {t.confirmation.items}
            </h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  {item.productImage && (
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-[#f2ede5]">
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-playfair text-sm text-text-dark">
                      {item.productName}
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
                  <span className="font-montserrat text-sm text-text-dark">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-between border-t border-[#ede7dd] pt-5">
              <span className="font-montserrat text-[0.7rem] uppercase tracking-[0.15em] text-[#a89c87]">
                {t.confirmation.total}
              </span>
              <span className="font-playfair text-xl text-text-dark">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="inline-block bg-[#4a3a16] px-10 py-4 font-montserrat text-[0.65rem] uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#3b2e12]"
          >
            {t.confirmation.continueShopping}
          </Link>
        </div>
      </main>
    </div>
  );
}
