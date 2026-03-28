"use client";

import { useState, useTransition } from "react";
import { updateOrderStatus } from "@/lib/actions/orders";
import type { OrderWithItems } from "@/lib/actions/orders";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-gray-100 text-gray-600",
  processing: "bg-amber-50 text-amber-700",
  shipped: "bg-blue-50 text-blue-700",
  delivered: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-red-50 text-red-600",
};

const ALL_STATUSES: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

/* ─── Order detail slide-over ─── */
function OrderDetail({
  order,
  onClose,
  onStatusChange,
}: {
  order: OrderWithItems;
  onClose: () => void;
  onStatusChange: (id: number, status: OrderStatus) => void;
}) {
  const status = order.status as OrderStatus;

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end bg-black/40"
      onClick={onClose}
    >
      <div
        className="h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e5e7eb] bg-white p-5">
          <div>
            <h2 className="font-playfair text-lg font-bold">{order.orderNumber}</h2>
            <p className="text-[12px] text-[#6b7280]">{formatDate(order.createdAt)}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#9ca3af] transition-colors hover:text-[#1e1e2d]"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6 p-5">
          {/* Status */}
          <div>
            <label className="mb-2 block text-[12px] font-semibold text-[#374151]">
              Statut de la commande
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => onStatusChange(order.id, s)}
                  className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold capitalize transition-colors ${
                    status === s
                      ? `${STATUS_STYLES[s]} border-current`
                      : "border-[#d1d5db] bg-white text-[#6b7280] hover:border-[#9ca3af]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Customer */}
          <div className="space-y-2 rounded-lg border border-[#e5e7eb] p-4">
            <h3 className="text-[13px] font-bold">Coordonnées client</h3>
            <div className="space-y-1.5 text-[12px]">
              {[
                { label: "Nom", value: order.customerName },
                { label: "Téléphone", value: order.customerPhone },
                ...(order.customerEmail
                  ? [{ label: "Email", value: order.customerEmail }]
                  : []),
                { label: "Adresse", value: order.address },
                ...(order.notes ? [{ label: "Notes", value: order.notes }] : []),
              ].map(({ label, value }) => (
                <p key={label} className="flex justify-between gap-2">
                  <span className="text-[#6b7280]">{label}</span>
                  <span className="max-w-[60%] text-end font-medium">{value}</span>
                </p>
              ))}
            </div>
          </div>

          {/* Items */}
          <div className="rounded-lg border border-[#e5e7eb] p-4">
            <h3 className="mb-3 text-[13px] font-bold">Articles</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-[12px]"
                >
                  <div>
                    <p className="font-medium">
                      {item.productName}
                      {item.variant ? ` — ${item.variant}` : ""}
                    </p>
                    <p className="text-[#9ca3af]">Qté : {item.quantity}</p>
                  </div>
                  <p className="font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between border-t border-[#f3f4f6] pt-3 text-[13px] font-bold">
              <span>Total</span>
              <span className="text-[#c4a95a]">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main client component ─── */
export default function OrdersClient({
  initialOrders,
}: {
  initialOrders: OrderWithItems[];
}) {
  const [orders, setOrders] = useState<OrderWithItems[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [selectedOrder, setSelectedOrder] = useState<OrderWithItems | null>(null);
  const [, startTransition] = useTransition();

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    const matchSearch =
      o.orderNumber.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerEmail.toLowerCase().includes(q) ||
      o.customerPhone.toLowerCase().includes(q);
    const matchStatus =
      statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  function handleStatusChange(id: number, status: OrderStatus) {
    // Optimistic update
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
    if (selectedOrder?.id === id) {
      setSelectedOrder((prev) => (prev ? { ...prev, status } : prev));
    }
    // Persist to DB
    startTransition(() => {
      updateOrderStatus(id, status).catch(console.error);
    });
  }

  const statusCounts = ALL_STATUSES.reduce(
    (acc, s) => ({
      ...acc,
      [s]: orders.filter((o) => o.status === s).length,
    }),
    {} as Record<OrderStatus, number>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-playfair text-2xl font-bold">Commandes</h1>
        <p className="mt-1 text-[13px] text-[#6b7280]">
          {orders.length} commande{orders.length !== 1 ? "s" : ""} au total
        </p>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter("all")}
          className={`rounded-lg px-3 py-2 text-[12px] font-semibold transition-colors ${
            statusFilter === "all"
              ? "bg-[#1e1e2d] text-white"
              : "border border-[#e5e7eb] bg-white text-[#6b7280] hover:bg-[#f9fafb]"
          }`}
        >
          Tous ({orders.length})
        </button>
        {ALL_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-lg px-3 py-2 text-[12px] font-semibold capitalize transition-colors ${
              statusFilter === s
                ? `${STATUS_STYLES[s]} border border-current`
                : "border border-[#e5e7eb] bg-white text-[#6b7280] hover:bg-[#f9fafb]"
            }`}
          >
            {s} ({statusCounts[s]})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <svg
          className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="text"
          placeholder="Rechercher par n° de commande, client ou téléphone…"
          className="w-full rounded-lg border border-[#d1d5db] pe-3 ps-9 py-2.5 text-[13px] outline-none transition-colors focus:border-[#c4a95a] focus:ring-1 focus:ring-[#c4a95a]/30"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-start">
            <thead>
              <tr className="border-b border-[#f3f4f6] bg-[#f9fafb]">
                {["Commande", "Client", "Date", "Articles", "Total", "Statut", ""].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => {
                const status = o.status as OrderStatus;
                return (
                  <tr
                    key={o.id}
                    className="cursor-pointer border-b border-[#f3f4f6] transition-colors last:border-0 hover:bg-[#fafafa]"
                    onClick={() => setSelectedOrder(o)}
                  >
                    <td className="px-5 py-4 text-[13px] font-semibold text-[#c4a95a]">
                      {o.orderNumber}
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-[13px] font-medium">{o.customerName}</p>
                      <p className="text-[11px] text-[#9ca3af]">{o.customerPhone}</p>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-[#6b7280]">
                      {formatDate(o.createdAt)}
                    </td>
                    <td className="px-5 py-4 text-[13px] text-[#6b7280]">
                      {o.items.length} article{o.items.length !== 1 ? "s" : ""}
                    </td>
                    <td className="px-5 py-4 text-[13px] font-semibold">
                      {formatPrice(o.total)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${STATUS_STYLES[status] ?? "bg-gray-100 text-gray-600"}`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-end">
                      <button className="rounded-lg p-2 text-[#6b7280] transition-colors hover:bg-[#f4f5f7] hover:text-[#c4a95a]">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.6}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <p className="text-[14px] font-semibold text-[#6b7280]">
                      Aucune commande trouvée
                    </p>
                    <p className="mt-1 text-[12px] text-[#9ca3af]">
                      Ajustez votre recherche ou vos filtres
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over */}
      {selectedOrder && (
        <OrderDetail
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
