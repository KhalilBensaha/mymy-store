"use client";

import { useState } from "react";

/* ─── Mock customer data ─── */
interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  status: "active" | "inactive";
  joined: string;
}

const CUSTOMERS: Customer[] = [
  { id: 1, name: "Sophia Laurent", email: "sophia@example.com", phone: "+33 6 12 34 56 78", location: "Paris, France", orders: 8, totalSpent: 24500, lastOrder: "2026-03-24", status: "active", joined: "2025-06-15" },
  { id: 2, name: "Priya Rajesh", email: "priya@example.com", phone: "+971 50 123 4567", location: "Dubai, UAE", orders: 5, totalSpent: 18200, lastOrder: "2026-03-23", status: "active", joined: "2025-08-20" },
  { id: 3, name: "Isabella Moretti", email: "isabella@example.com", phone: "+39 320 123 4567", location: "Milan, Italy", orders: 12, totalSpent: 42800, lastOrder: "2026-03-22", status: "active", joined: "2025-01-10" },
  { id: 4, name: "Amira Benali", email: "amira@example.com", phone: "+213 555 12 34 56", location: "Algiers, Algeria", orders: 3, totalSpent: 5400, lastOrder: "2026-03-21", status: "active", joined: "2025-11-05" },
  { id: 5, name: "Léa Dupont", email: "lea@example.com", phone: "+33 7 98 76 54 32", location: "Paris, France", orders: 15, totalSpent: 67300, lastOrder: "2026-03-20", status: "active", joined: "2024-12-01" },
  { id: 6, name: "Yuki Tanaka", email: "yuki@example.com", phone: "+81 90 1234 5678", location: "Tokyo, Japan", orders: 4, totalSpent: 12500, lastOrder: "2026-03-19", status: "active", joined: "2025-09-14" },
  { id: 7, name: "Charlotte Smith", email: "charlotte@example.com", phone: "+44 7911 123456", location: "London, UK", orders: 6, totalSpent: 28900, lastOrder: "2026-03-18", status: "inactive", joined: "2025-03-22" },
  { id: 8, name: "Fatima Al-Said", email: "fatima@example.com", phone: "+966 50 987 6543", location: "Riyadh, Saudi Arabia", orders: 9, totalSpent: 38700, lastOrder: "2026-02-28", status: "active", joined: "2025-02-14" },
  { id: 9, name: "Emma Wagner", email: "emma@example.com", phone: "+49 170 123 4567", location: "Berlin, Germany", orders: 2, totalSpent: 3200, lastOrder: "2026-01-15", status: "inactive", joined: "2025-10-30" },
  { id: 10, name: "Aisha Mohammed", email: "aisha@example.com", phone: "+971 55 987 6543", location: "Abu Dhabi, UAE", orders: 7, totalSpent: 31400, lastOrder: "2026-03-15", status: "active", joined: "2025-04-18" },
];

/* ─── Page ─── */
export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  const filtered = CUSTOMERS.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalCustomers = CUSTOMERS.length;
  const activeCustomers = CUSTOMERS.filter((c) => c.status === "active").length;
  const totalRevenue = CUSTOMERS.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgSpend = Math.round(totalRevenue / totalCustomers);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-playfair">Customers</h1>
        <p className="text-[13px] text-[#6b7280] mt-1">Manage your customer base</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Total Customers", value: totalCustomers },
          { label: "Active", value: activeCustomers },
          { label: "Total Revenue", value: `${totalRevenue.toLocaleString()} DA` },
          { label: "Avg. Spend", value: `${avgSpend.toLocaleString()} DA` },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-[#e5e7eb] bg-white p-4">
            <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider">{s.label}</p>
            <p className="text-xl font-bold mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, email, or location…"
            className="w-full rounded-lg border border-[#d1d5db] ps-9 pe-3 py-2.5 text-[13px] outline-none focus:border-[#c4a95a] focus:ring-1 focus:ring-[#c4a95a]/30 transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="rounded-lg border border-[#d1d5db] px-3 py-2.5 text-[13px] outline-none focus:border-[#c4a95a] bg-white transition-colors"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "inactive")}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[#e5e7eb] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start">
            <thead>
              <tr className="border-b border-[#f3f4f6] bg-[#f9fafb]">
                <th className="px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Customer</th>
                <th className="px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Location</th>
                <th className="px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Orders</th>
                <th className="px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Total Spent</th>
                <th className="px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Last Order</th>
                <th className="px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-[#f3f4f6] last:border-0 hover:bg-[#fafafa] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c4a95a]/10 text-[#c4a95a] text-[12px] font-bold shrink-0">
                        {c.name.split(" ").map((w) => w[0]).join("")}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold">{c.name}</p>
                        <p className="text-[11px] text-[#9ca3af]">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[13px] text-[#6b7280]">{c.location}</td>
                  <td className="px-5 py-4 text-[13px] font-medium">{c.orders}</td>
                  <td className="px-5 py-4 text-[13px] font-semibold">{c.totalSpent.toLocaleString()} DA</td>
                  <td className="px-5 py-4 text-[13px] text-[#6b7280]">{c.lastOrder}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${
                        c.status === "active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center">
                    <p className="text-[14px] font-semibold text-[#6b7280]">No customers found</p>
                    <p className="text-[12px] text-[#9ca3af] mt-1">Try adjusting your search or filter</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
