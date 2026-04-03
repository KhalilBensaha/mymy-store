import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { products, categories, orders, orderItems } from "@/lib/db/schema";
import { sql, eq, desc } from "drizzle-orm";

export const revalidate = 0;

const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-50 text-blue-700",
  paid: "bg-emerald-50 text-emerald-700",
  canceled: "bg-red-50 text-red-600",
  pending: "bg-gray-100 text-gray-600",
};

/* ─── Stats ─── */
function buildStats(productCount: number, categoryCount: number, totalRevenue: number, orderCount: number) {
  return [
    {
      label: "Total Revenue",
      value: `${totalRevenue.toLocaleString()} DA`,
      change: `${orderCount} orders`,
      positive: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Total Orders",
      value: String(orderCount),
      change: `${totalRevenue.toLocaleString()} DA revenue`,
      positive: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
        </svg>
      ),
    },
    {
      label: "Total Products",
      value: String(productCount),
      change: `${categoryCount} categories`,
      positive: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
    },
    {
      label: "Categories",
      value: String(categoryCount),
      change: `${productCount} products`,
      positive: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
        </svg>
      ),
    },
  ];
}

/* ─── Revenue chart (mini bar chart) ─── */
function MiniChart({ data }: { data: { month: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-3 h-40 mt-4">
      {data.map((d) => (
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
function TopProducts({ topProducts }: { topProducts: { id: number; name: string; image: string; price: number; categoryName: string | null }[] }) {
  return (
    <div className="space-y-3">
      {topProducts.map((p, i) => (
        <div key={p.id} className="flex items-center gap-3">
          <span className="text-[11px] font-bold text-[#9ca3af] w-5">#{i + 1}</span>
          <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-[#f4f5f7] shrink-0">
            <Image src={p.image} alt={p.name} fill className="object-cover" sizes="40px" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold truncate">{p.name}</p>
            <p className="text-[11px] text-[#9ca3af]">{p.categoryName}</p>
          </div>
          <p className="text-[13px] font-semibold text-[#1e1e2d]">{p.price.toLocaleString()} DA</p>
        </div>
      ))}
    </div>
  );
}

/* ─── Page ─── */
export default async function AdminDashboard() {
  /* Fetch counts from DB */
  const [productCountResult] = await db.select({ count: sql<number>`count(*)` }).from(products);
  const [categoryCountResult] = await db.select({ count: sql<number>`count(*)` }).from(categories);
  const [orderCountResult] = await db.select({ count: sql<number>`count(*)` }).from(orders);
  const [revenueResult] = await db.select({ total: sql<number>`coalesce(sum(${orders.total}), 0)` }).from(orders);

  const productCount = Number(productCountResult?.count ?? 0);
  const categoryCount = Number(categoryCountResult?.count ?? 0);
  const orderCount = Number(orderCountResult?.count ?? 0);
  const totalRevenue = Number(revenueResult?.total ?? 0);

  /* Recent orders */
  const recentOrders = await db
    .select({
      id: orders.id,
      orderNumber: orders.orderNumber,
      customerName: orders.customerName,
      customerEmail: orders.customerEmail,
      total: orders.total,
      status: orders.status,
      createdAt: orders.createdAt,
    })
    .from(orders)
    .orderBy(desc(orders.createdAt))
    .limit(5);

  /* Monthly revenue for chart (last 6 months) */
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const now = new Date();
  const revenueByMonth: { month: string; value: number }[] = [];

  const monthlyRows = await db
    .select({
      month: sql<number>`extract(month from ${orders.createdAt})`,
      year: sql<number>`extract(year from ${orders.createdAt})`,
      total: sql<number>`coalesce(sum(${orders.total}), 0)`,
    })
    .from(orders)
    .where(sql`${orders.createdAt} >= now() - interval '6 months'`)
    .groupBy(sql`extract(year from ${orders.createdAt})`, sql`extract(month from ${orders.createdAt})`)
    .orderBy(sql`extract(year from ${orders.createdAt})`, sql`extract(month from ${orders.createdAt})`);

  const monthMap = new Map<string, number>();
  for (const r of monthlyRows) {
    monthMap.set(`${Number(r.year)}-${Number(r.month)}`, Number(r.total));
  }
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
    revenueByMonth.push({ month: monthNames[d.getMonth()], value: monthMap.get(key) ?? 0 });
  }

  /* Top products by price */
  const topProducts = await db
    .select({
      id: products.id,
      name: products.name,
      image: products.image,
      price: products.price,
      categoryName: categories.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .orderBy(desc(products.price))
    .limit(5);

  const STATS = buildStats(productCount, categoryCount, totalRevenue, orderCount);
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
            <span className="text-[12px] font-semibold text-[#1e1e2d] bg-[#f4f5f7] px-2 py-1 rounded-md">{totalRevenue.toLocaleString()} DA</span>
          </div>
          <MiniChart data={revenueByMonth} />
        </div>

        {/* Top products */}
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-6">
          <h2 className="text-[15px] font-bold mb-4">Top Products</h2>
          <TopProducts topProducts={topProducts} />
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
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[13px] text-[#9ca3af]">
                    No orders yet
                  </td>
                </tr>
              ) : (
                recentOrders.map((o) => (
                  <tr key={o.id} className="border-b border-[#f3f4f6] last:border-0 hover:bg-[#f9fafb] transition-colors">
                    <td className="px-6 py-4 text-[13px] font-semibold text-[#c4a95a]">{o.orderNumber}</td>
                    <td className="px-6 py-4">
                      <p className="text-[13px] font-medium">{o.customerName}</p>
                      <p className="text-[11px] text-[#9ca3af]">{o.customerEmail}</p>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[#6b7280]">
                      {new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4 text-[13px] font-semibold">{o.total.toLocaleString()} DA</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${STATUS_STYLES[o.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
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
