"use client";

import { useState } from "react";

/* ─── Mock order data ─── */
type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  date: string;
  paymentMethod: string;
}

const ORDERS: Order[] = [
  {
    id: "ORD-2401",
    customer: "Sophia Laurent",
    email: "sophia@example.com",
    phone: "+33 6 12 34 56 78",
    address: "15 Rue de Rivoli, Paris, France",
    items: [
      { name: "Aurelia Band", qty: 1, price: 1250 },
      { name: "Starlight Bracelet", qty: 1, price: 4500 },
    ],
    total: 5750,
    status: "delivered",
    date: "2026-03-24",
    paymentMethod: "Visa •••• 4242",
  },
  {
    id: "ORD-2400",
    customer: "Priya Rajesh",
    email: "priya@example.com",
    phone: "+971 50 123 4567",
    address: "Downtown Dubai, UAE",
    items: [{ name: "Eos Drop Earrings", qty: 1, price: 2100 }],
    total: 2100,
    status: "shipped",
    date: "2026-03-23",
    paymentMethod: "Mastercard •••• 8888",
  },
  {
    id: "ORD-2399",
    customer: "Isabella Moretti",
    email: "isabella@example.com",
    phone: "+39 320 123 4567",
    address: "Via Montenapoleone 8, Milan, Italy",
    items: [
      { name: "Veritas Choker", qty: 1, price: 3200 },
      { name: "Lunar Pendant", qty: 2, price: 890 },
    ],
    total: 4980,
    status: "processing",
    date: "2026-03-22",
    paymentMethod: "Visa •••• 1234",
  },
  {
    id: "ORD-2398",
    customer: "Amira Benali",
    email: "amira@example.com",
    phone: "+213 555 12 34 56",
    address: "Rue Didouche Mourad, Algiers, Algeria",
    items: [{ name: "Terra Ring", qty: 1, price: 1400 }],
    total: 1400,
    status: "pending",
    date: "2026-03-21",
    paymentMethod: "CIB •••• 5678",
  },
  {
    id: "ORD-2397",
    customer: "Léa Dupont",
    email: "lea@example.com",
    phone: "+33 7 98 76 54 32",
    address: "10 Place Vendôme, Paris, France",
    items: [
      { name: "Orion Cuff", qty: 1, price: 5100 },
      { name: "Solene Hoops", qty: 1, price: 1750 },
      { name: "Celeste Strand", qty: 1, price: 980 },
    ],
    total: 7830,
    status: "delivered",
    date: "2026-03-20",
    paymentMethod: "Amex •••• 3456",
  },
  {
    id: "ORD-2396",
    customer: "Yuki Tanaka",
    email: "yuki@example.com",
    phone: "+81 90 1234 5678",
    address: "Ginza 5-chome, Tokyo, Japan",
    items: [{ name: "Aurelia Band", qty: 2, price: 1250 }],
    total: 2500,
    status: "shipped",
    date: "2026-03-19",
    paymentMethod: "JCB •••• 7777",
  },
  {
    id: "ORD-2395",
    customer: "Charlotte Smith",
    email: "charlotte@example.com",
    phone: "+44 7911 123456",
    address: "22 Bond Street, London, UK",
    items: [
      { name: "Starlight Bracelet", qty: 1, price: 4500 },
      { name: "Eos Drop Earrings", qty: 1, price: 2100 },
    ],
    total: 6600,
    status: "cancelled",
    date: "2026-03-18",
    paymentMethod: "Visa •••• 9012",
  },
];

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-gray-100 text-gray-600",
  processing: "bg-amber-50 text-amber-700",
  shipped: "bg-blue-50 text-blue-700",
  delivered: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-red-50 text-red-600",
};

const ALL_STATUSES: OrderStatus[] = ["pending", "processing", "shipped", "delivered", "cancelled"];

/* ─── Order detail slide-over ─── */
function OrderDetail({
  order,
  onClose,
  onStatusChange,
}: {
  order: Order;
  onClose: () => void;
  onStatusChange: (id: string, status: OrderStatus) => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-[#e5e7eb] bg-white p-5 z-10">
          <div>
            <h2 className="text-lg font-bold font-playfair">{order.id}</h2>
            <p className="text-[12px] text-[#6b7280]">{order.date}</p>
          </div>
          <button onClick={onClose} className="text-[#9ca3af] hover:text-[#1e1e2d] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Status */}
          <div>
            <label className="block text-[12px] font-semibold text-[#374151] mb-2">Order Status</label>
            <div className="flex flex-wrap gap-2">
              {ALL_STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => onStatusChange(order.id, s)}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-semibold capitalize border transition-colors ${
                    order.status === s
                      ? `${STATUS_STYLES[s]} border-current`
                      : "bg-white text-[#6b7280] border-[#d1d5db] hover:border-[#9ca3af]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Customer */}
          <div className="rounded-lg border border-[#e5e7eb] p-4 space-y-2">
            <h3 className="text-[13px] font-bold">Customer Details</h3>
            <div className="space-y-1.5 text-[12px]">
              <p className="flex justify-between">
                <span className="text-[#6b7280]">Name</span>
                <span className="font-medium">{order.customer}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-[#6b7280]">Email</span>
                <span className="font-medium">{order.email}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-[#6b7280]">Phone</span>
                <span className="font-medium">{order.phone}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-[#6b7280]">Address</span>
                <span className="font-medium text-end max-w-[60%]">{order.address}</span>
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="rounded-lg border border-[#e5e7eb] p-4">
            <h3 className="text-[13px] font-bold mb-3">Items</h3>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-[12px]">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-[#9ca3af]">Qty: {item.qty}</p>
                  </div>
                  <p className="font-semibold">${(item.price * item.qty).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-[#f3f4f6] flex justify-between text-[13px] font-bold">
              <span>Total</span>
              <span className="text-[#c4a95a]">${order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-lg border border-[#e5e7eb] p-4">
            <h3 className="text-[13px] font-bold mb-2">Payment</h3>
            <p className="text-[12px] text-[#6b7280]">{order.paymentMethod}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(ORDERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
    if (selectedOrder?.id === id) {
      setSelectedOrder((prev) => (prev ? { ...prev, status } : prev));
    }
  };

  const statusCounts = ALL_STATUSES.reduce(
    (acc, s) => ({ ...acc, [s]: orders.filter((o) => o.status === s).length }),
    {} as Record<OrderStatus, number>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-playfair">Orders</h1>
        <p className="text-[13px] text-[#6b7280] mt-1">{orders.length} total orders</p>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter("all")}
          className={`rounded-lg px-3 py-2 text-[12px] font-semibold transition-colors ${
            statusFilter === "all"
              ? "bg-[#1e1e2d] text-white"
              : "bg-white text-[#6b7280] border border-[#e5e7eb] hover:bg-[#f9fafb]"
          }`}
        >
          All ({orders.length})
        </button>
        {ALL_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-lg px-3 py-2 text-[12px] font-semibold capitalize transition-colors ${
              statusFilter === s
                ? `${STATUS_STYLES[s]} border border-current`
                : "bg-white text-[#6b7280] border border-[#e5e7eb] hover:bg-[#f9fafb]"
            }`}
          >
            {s} ({statusCounts[s]})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <svg className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          placeholder="Search by order ID, customer, or email…"
          className="w-full rounded-lg border border-[#d1d5db] ps-9 pe-3 py-2.5 text-[13px] outline-none focus:border-[#c4a95a] focus:ring-1 focus:ring-[#c4a95a]/30 transition-colors"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[#e5e7eb] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start">
            <thead>
              <tr className="border-b border-[#f3f4f6] bg-[#f9fafb]">
                <th className="px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Order</th>
                <th className="px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Customer</th>
                <th className="px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Date</th>
                <th className="px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Items</th>
                <th className="px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Total</th>
                <th className="px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Status</th>
                <th className="px-5 py-3 text-end text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-[#f3f4f6] last:border-0 hover:bg-[#fafafa] transition-colors cursor-pointer"
                  onClick={() => setSelectedOrder(o)}
                >
                  <td className="px-5 py-4 text-[13px] font-semibold text-[#c4a95a]">{o.id}</td>
                  <td className="px-5 py-4">
                    <p className="text-[13px] font-medium">{o.customer}</p>
                    <p className="text-[11px] text-[#9ca3af]">{o.email}</p>
                  </td>
                  <td className="px-5 py-4 text-[13px] text-[#6b7280]">{o.date}</td>
                  <td className="px-5 py-4 text-[13px] text-[#6b7280]">{o.items.length} item{o.items.length > 1 ? "s" : ""}</td>
                  <td className="px-5 py-4 text-[13px] font-semibold">${o.total.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${STATUS_STYLES[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-end">
                    <button className="rounded-lg p-2 text-[#6b7280] hover:bg-[#f4f5f7] hover:text-[#c4a95a] transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <p className="text-[14px] font-semibold text-[#6b7280]">No orders found</p>
                    <p className="text-[12px] text-[#9ca3af] mt-1">Try adjusting your search or filter</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over detail */}
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
