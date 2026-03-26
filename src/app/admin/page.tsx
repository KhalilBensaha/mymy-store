"use client";

import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "../shop/product-data";
import { categoryOptions } from "../shop/category-utils";

/* ─── Mock order data ─── */
const RECENT_ORDERS = [
  { id: "ORD-2401", customer: "Sophia Laurent", email: "sophia@example.com", total: 5560, items: 2, status: "delivered" as const, date: "Mar 24, 2026" },
  { id: "ORD-2400", customer: "Priya Rajesh", email: "priya@example.com", total: 4500, items: 1, status: "shipped" as const, date: "Mar 23, 2026" },
  { id: "ORD-2399", customer: "Isabella Moretti", email: "isabella@example.com", total: 2100, items: 3, status: "processing" as const, date: "Mar 22, 2026" },
  { id: "ORD-2398", customer: "Amira Benali", email: "amira@example.com", total: 1250, items: 1, status: "pending" as const, date: "Mar 21, 2026" },
  { id: "ORD-2397", customer: "Léa Dupont", email: "lea@example.com", total: 8900, items: 4, status: "delivered" as const, date: "Mar 20, 2026" },
];

const STATUS_STYLES: Record<string, string> = {
  delivered: "bg-emerald-50 text-emerald-700",
  shipped: "bg-blue-50 text-blue-700",
  processing: "bg-amber-50 text-amber-700",
  pending: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-50 text-red-600",
};

/* ─── Stats ─── */
const STATS = [
  {
    label: "Total Revenue",
    value: "$124,580",
    change: "+12.5%",
    positive: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Total Orders",
    value: "384",
    change: "+8.2%",
    positive: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
      </svg>
    ),
  },
  {
    label: "Total Products",
    value: String(PRODUCTS.length),
    change: `${categoryOptions.length} categories`,
    positive: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    label: "Customers",
    value: "1,247",
    change: "+3.1%",
    positive: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
];

/* ─── Revenue chart (mini bar chart) ─── */
const REVENUE_DATA = [
  { month: "Oct", value: 18400 },
  { month: "Nov", value: 22100 },
  { month: "Dec", value: 31500 },
  { month: "Jan", value: 19800 },
  { month: "Feb", value: 24600 },
  { month: "Mar", value: 28200 },
];

function MiniChart() {
  const max = Math.max(...REVENUE_DATA.map((d) => d.value));
  return (
    <div className="flex items-end gap-3 h-40 mt-4">
      {REVENUE_DATA.map((d) => (
        <div key={d.month} className="flex flex-col items-center flex-1 gap-1">
          <div
            className="w-full rounded-t-md bg-[#c4a95a]/80 hover:bg-[#c4a95a] transition-colors min-h-[4px]"
            style={{ height: `${(d.value / max) * 100}%` }}
          />
          <span className="text-[10px] text-[#9ca3af]">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Top selling products ─── */
function TopProducts() {
  const top = [...PRODUCTS].sort((a, b) => b.price - a.price).slice(0, 5);
  return (
    <div className="space-y-3">
      {top.map((p, i) => (
        <div key={p.id} className="flex items-center gap-3">
          <span className="text-[11px] font-bold text-[#9ca3af] w-5">#{i + 1}</span>
          <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-[#f4f5f7] shrink-0">
            <Image src={p.image} alt={p.name} fill className="object-cover" sizes="40px" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold truncate">{p.name}</p>
            <p className="text-[11px] text-[#9ca3af]">{p.category}</p>
          </div>
          <p className="text-[13px] font-semibold text-[#1e1e2d]">${p.price.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── Page ─── */
export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-playfair">Dashboard</h1>
          <p className="text-[13px] text-[#6b7280] mt-1">Welcome back! Here&apos;s your store overview.</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#c4a95a] px-4 py-2 text-[12px] font-semibold text-white hover:bg-[#b09845] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Product
          </Link>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-[12px] font-semibold text-[#374151] hover:bg-[#f9fafb] transition-colors"
          >
            View Orders
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-[#e5e7eb] bg-white p-5 flex items-start justify-between"
          >
            <div>
              <p className="text-[12px] text-[#6b7280] font-medium">{s.label}</p>
              <p className="text-2xl font-bold mt-1">{s.value}</p>
              <p className={`text-[11px] mt-1 font-medium ${s.positive ? "text-emerald-600" : "text-red-500"}`}>
                {s.change}
              </p>
            </div>
            <div className="rounded-lg bg-[#c4a95a]/10 p-2.5 text-[#c4a95a]">
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Top Products row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="lg:col-span-2 rounded-xl border border-[#e5e7eb] bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[15px] font-bold">Revenue Overview</h2>
              <p className="text-[12px] text-[#6b7280]">Last 6 months</p>
            </div>
            <span className="text-[12px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">+12.5%</span>
          </div>
          <MiniChart />
        </div>

        {/* Top products */}
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-6">
          <h2 className="text-[15px] font-bold mb-4">Top Products</h2>
          <TopProducts />
        </div>
      </div>

      {/* Recent orders */}
      <div className="rounded-xl border border-[#e5e7eb] bg-white">
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-[15px] font-bold">Recent Orders</h2>
          <Link href="/admin/orders" className="text-[12px] font-medium text-[#c4a95a] hover:underline">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-start">
            <thead>
              <tr className="border-t border-b border-[#f3f4f6] bg-[#f9fafb]">
                <th className="px-6 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Order</th>
                <th className="px-6 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Customer</th>
                <th className="px-6 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Date</th>
                <th className="px-6 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Total</th>
                <th className="px-6 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((o) => (
                <tr key={o.id} className="border-b border-[#f3f4f6] last:border-0 hover:bg-[#f9fafb] transition-colors">
                  <td className="px-6 py-4 text-[13px] font-semibold text-[#c4a95a]">{o.id}</td>
                  <td className="px-6 py-4">
                    <p className="text-[13px] font-medium">{o.customer}</p>
                    <p className="text-[11px] text-[#9ca3af]">{o.email}</p>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#6b7280]">{o.date}</td>
                  <td className="px-6 py-4 text-[13px] font-semibold">${o.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${STATUS_STYLES[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Manage Products", desc: "Add, edit, or remove products", href: "/admin/products", color: "bg-[#c4a95a]" },
          { label: "Manage Categories", desc: "Organize your catalog", href: "/admin/categories", color: "bg-[#1e1e2d]" },
          { label: "Store Settings", desc: "Configure your store", href: "/admin/settings", color: "bg-[#374151]" },
        ].map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className={`${q.color} rounded-xl p-6 text-white hover:opacity-90 transition-opacity`}
          >
            <h3 className="text-[14px] font-bold">{q.label}</h3>
            <p className="text-[12px] text-white/70 mt-1">{q.desc}</p>
            <p className="text-[12px] font-semibold mt-3">Go →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
