"use client";

import { Navbar } from "../components/navbar";

export default function ShopLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-warm-white text-text-dark">
      <Navbar />

      <main>{children}</main>
    </div>
  );
}
