"use client";

import { useState, type ReactNode } from "react";

/* ─── Settings sections ─── */
type Section = "general" | "profile" | "shipping" | "payments" | "notifications";

const SECTIONS: { id: Section; label: string; icon: ReactNode }[] = [
  {
    id: "general",
    label: "General",
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.15c0 .415.336.75.75.75z" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    id: "shipping",
    label: "Shipping",
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H6.375c-.621 0-1.125-.504-1.125-1.125V14.25m0 0V5.625c0-.621.504-1.125 1.125-1.125h12.75c.621 0 1.125.504 1.125 1.125v8.625m0 0h1.125c.621 0 1.125-.504 1.125-1.125v-3.375c0-.621-.504-1.125-1.125-1.125h-1.5l-1.842-2.763a1.125 1.125 0 00-.938-.5h-1.97" />
      </svg>
    ),
  },
  {
    id: "payments",
    label: "Payments",
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
  },
];

/* ─── Toggle component ─── */
function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
        enabled ? "bg-[#c4a95a]" : "bg-[#d1d5db]"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transition-transform duration-200 ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

/* ─── Page ─── */
export default function SettingsPage() {
  const [section, setSection] = useState<Section>("general");

  /* General store settings */
  const [storeName, setStoreName] = useState("Mymy Atelier");
  const [storeEmail, setStoreEmail] = useState("contact@mymy-store.com");
  const [storePhone, setStorePhone] = useState("+213 555 00 00 00");
  const [currency, setCurrency] = useState("USD");
  const [storeDesc, setStoreDesc] = useState(
    "Crafted for Eternity. Designed for Elegance. Premium handcrafted luxury jewelry."
  );

  /* Profile */
  const [profileName, setProfileName] = useState("Mymy Admin");
  const [profileEmail, setProfileEmail] = useState("admin@mymy-store.com");

  /* Shipping */
  const [freeShippingMin, setFreeShippingMin] = useState("500");
  const [flatRate, setFlatRate] = useState("25");
  const [expressRate, setExpressRate] = useState("50");

  /* Notifications */
  const [emailOrders, setEmailOrders] = useState(true);
  const [emailShipping, setEmailShipping] = useState(true);
  const [emailMarketing, setEmailMarketing] = useState(false);
  const [smsOrders, setSmsOrders] = useState(false);

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-playfair">Settings</h1>
        <p className="text-[13px] text-[#6b7280] mt-1">Manage your store configuration</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Section nav */}
        <div className="lg:w-56 shrink-0">
          <nav className="rounded-xl border border-[#e5e7eb] bg-white p-2 space-y-0.5">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors ${
                  section === s.id
                    ? "bg-[#c4a95a]/10 text-[#c4a95a]"
                    : "text-[#6b7280] hover:bg-[#f4f5f7] hover:text-[#1e1e2d]"
                }`}
              >
                {s.icon}
                {s.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 rounded-xl border border-[#e5e7eb] bg-white">
          {/* ── General ── */}
          {section === "general" && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-[16px] font-bold">Store Information</h2>
                <p className="text-[12px] text-[#6b7280] mt-0.5">Basic details about your store</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-[#374151] mb-1">Store Name</label>
                  <input
                    className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] outline-none focus:border-[#c4a95a] transition-colors"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#374151] mb-1">Contact Email</label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] outline-none focus:border-[#c4a95a] transition-colors"
                    value={storeEmail}
                    onChange={(e) => setStoreEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#374151] mb-1">Phone</label>
                  <input
                    className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] outline-none focus:border-[#c4a95a] transition-colors"
                    value={storePhone}
                    onChange={(e) => setStorePhone(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#374151] mb-1">Currency</label>
                  <select
                    className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] outline-none focus:border-[#c4a95a] bg-white transition-colors"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="DZD">DZD (د.ج)</option>
                    <option value="AED">AED (د.إ)</option>
                    <option value="SAR">SAR (ر.س)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#374151] mb-1">Store Description</label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] outline-none focus:border-[#c4a95a] transition-colors resize-none"
                  value={storeDesc}
                  onChange={(e) => setStoreDesc(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* ── Profile ── */}
          {section === "profile" && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-[16px] font-bold">Owner Profile</h2>
                <p className="text-[12px] text-[#6b7280] mt-0.5">Your personal information</p>
              </div>
              <div className="flex items-center gap-5">
                <div className="h-16 w-16 rounded-full bg-[#c4a95a] flex items-center justify-center text-white text-xl font-bold">
                  MA
                </div>
                <div>
                  <button className="rounded-lg bg-[#f4f5f7] px-4 py-2 text-[12px] font-semibold text-[#374151] hover:bg-[#e5e7eb] transition-colors">
                    Change Avatar
                  </button>
                  <p className="text-[11px] text-[#9ca3af] mt-1">JPG, PNG up to 2MB</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-[#374151] mb-1">Full Name</label>
                  <input
                    className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] outline-none focus:border-[#c4a95a] transition-colors"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#374151] mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] outline-none focus:border-[#c4a95a] transition-colors"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-[14px] font-bold mb-3">Change Password</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#374151] mb-1">Current Password</label>
                    <input
                      type="password"
                      className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] outline-none focus:border-[#c4a95a] transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[#374151] mb-1">New Password</label>
                    <input
                      type="password"
                      className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] outline-none focus:border-[#c4a95a] transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Shipping ── */}
          {section === "shipping" && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-[16px] font-bold">Shipping Settings</h2>
                <p className="text-[12px] text-[#6b7280] mt-0.5">Configure shipping rates and zones</p>
              </div>
              <div className="space-y-4">
                <div className="rounded-lg border border-[#e5e7eb] p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-semibold">Free Shipping Threshold</p>
                    <p className="text-[11px] text-[#6b7280]">Orders above this amount get free shipping</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[13px] text-[#9ca3af]">$</span>
                    <input
                      type="number"
                      className="w-24 rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] text-end outline-none focus:border-[#c4a95a] transition-colors"
                      value={freeShippingMin}
                      onChange={(e) => setFreeShippingMin(e.target.value)}
                    />
                  </div>
                </div>
                <div className="rounded-lg border border-[#e5e7eb] p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-semibold">Standard Flat Rate</p>
                    <p className="text-[11px] text-[#6b7280]">Default shipping cost</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[13px] text-[#9ca3af]">$</span>
                    <input
                      type="number"
                      className="w-24 rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] text-end outline-none focus:border-[#c4a95a] transition-colors"
                      value={flatRate}
                      onChange={(e) => setFlatRate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="rounded-lg border border-[#e5e7eb] p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-semibold">Express Shipping</p>
                    <p className="text-[11px] text-[#6b7280]">Priority delivery cost</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[13px] text-[#9ca3af]">$</span>
                    <input
                      type="number"
                      className="w-24 rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] text-end outline-none focus:border-[#c4a95a] transition-colors"
                      value={expressRate}
                      onChange={(e) => setExpressRate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Payments ── */}
          {section === "payments" && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-[16px] font-bold">Payment Methods</h2>
                <p className="text-[12px] text-[#6b7280] mt-0.5">Configure accepted payment methods</p>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Credit / Debit Cards", desc: "Visa, Mastercard, Amex", enabled: true },
                  { name: "PayPal", desc: "Pay via PayPal account", enabled: true },
                  { name: "Bank Transfer", desc: "Direct bank transfer", enabled: false },
                  { name: "Cash on Delivery", desc: "Pay when delivered", enabled: false },
                  { name: "CIB / EDAHABIA", desc: "Algerian banking cards", enabled: true },
                ].map((pm) => (
                  <div key={pm.name} className="rounded-lg border border-[#e5e7eb] p-4 flex items-center justify-between">
                    <div>
                      <p className="text-[13px] font-semibold">{pm.name}</p>
                      <p className="text-[11px] text-[#6b7280]">{pm.desc}</p>
                    </div>
                    <Toggle enabled={pm.enabled} onChange={() => {}} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Notifications ── */}
          {section === "notifications" && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-[16px] font-bold">Notification Preferences</h2>
                <p className="text-[12px] text-[#6b7280] mt-0.5">Choose how you want to be notified</p>
              </div>
              <div>
                <h3 className="text-[13px] font-bold mb-3">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[13px] font-medium">New Orders</p>
                      <p className="text-[11px] text-[#6b7280]">Receive email when a new order is placed</p>
                    </div>
                    <Toggle enabled={emailOrders} onChange={setEmailOrders} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[13px] font-medium">Shipping Updates</p>
                      <p className="text-[11px] text-[#6b7280]">Get notified about shipping status changes</p>
                    </div>
                    <Toggle enabled={emailShipping} onChange={setEmailShipping} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[13px] font-medium">Marketing & Promotions</p>
                      <p className="text-[11px] text-[#6b7280]">Tips, offers, and product news</p>
                    </div>
                    <Toggle enabled={emailMarketing} onChange={setEmailMarketing} />
                  </div>
                </div>
              </div>
              <div className="border-t border-[#f3f4f6] pt-5">
                <h3 className="text-[13px] font-bold mb-3">SMS Notifications</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-medium">Order Alerts</p>
                    <p className="text-[11px] text-[#6b7280]">SMS for new orders and critical updates</p>
                  </div>
                  <Toggle enabled={smsOrders} onChange={setSmsOrders} />
                </div>
              </div>
            </div>
          )}

          {/* Save bar */}
          <div className="flex items-center justify-end gap-3 border-t border-[#e5e7eb] p-5">
            {saved && (
              <span className="text-[12px] font-semibold text-emerald-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Saved successfully
              </span>
            )}
            <button
              onClick={handleSave}
              className="rounded-lg bg-[#c4a95a] px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-[#b09845] transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
