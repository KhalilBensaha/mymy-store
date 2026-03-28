import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getOrderByNumber } from "@/lib/actions/orders";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  const order = await getOrderByNumber(orderNumber);

  if (!order) notFound();

  return (
    <div className="min-h-screen bg-warm-white text-text-dark">
      {/* Simple header */}
      <header className="border-b border-cream-dark/40 bg-warm-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/" className="font-cormorant text-2xl font-semibold tracking-widest text-text-dark">
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div className="text-center">
          <p className="font-montserrat text-[0.58rem] uppercase tracking-[0.3em] text-[#a89c87]">
            Mymy Atelier
          </p>
          <h1 className="mt-3 font-playfair text-4xl text-text-dark">
            Commande confirmée !
          </h1>
          <p className="mt-3 font-montserrat text-sm text-[#7a6d5e]">
            Merci pour votre commande. Nous vous contacterons bientôt pour la confirmer.
          </p>
          <p className="mt-2 font-montserrat text-[0.65rem] uppercase tracking-[0.18em] text-[#8b6914]">
            N° de commande : {order.orderNumber}
          </p>
        </div>

        {/* Order details */}
        <div className="mt-12 space-y-8">
          {/* Customer info */}
          <div className="border border-[#ede7dd] bg-[#faf8f5] p-6">
            <h2 className="mb-4 font-montserrat text-[0.6rem] uppercase tracking-[0.22em] text-[#a89c87]">
              Vos coordonnées
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Nom", value: order.customerName },
                { label: "Téléphone", value: order.customerPhone },
                ...(order.customerEmail ? [{ label: "E-mail", value: order.customerEmail }] : []),
                { label: "Adresse", value: order.address },
                ...(order.notes ? [{ label: "Notes", value: order.notes }] : []),
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
              Articles commandés
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
                Total
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
            Continuer les achats
          </Link>
        </div>
      </main>
    </div>
  );
}
