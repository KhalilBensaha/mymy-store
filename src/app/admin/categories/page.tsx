"use client";

import Image from "next/image";
import { useState } from "react";
import { PRODUCTS } from "../../shop/product-data";
import { categoryOptions, type Category, getCategoryDescription } from "../../shop/category-utils";

/* ─── Category images ─── */
const CATEGORY_IMAGES: Record<Category, string> = {
  Rings: "/images/cat-rings.jpg",
  Necklaces: "/images/cat-necklace.jpg",
  Earrings: "/images/cat-earrings.jpg",
  Bracelets: "/images/hero-bracelet.jpg",
};

/* ─── Modal ─── */
function CategoryModal({
  category,
  onClose,
  onSave,
}: {
  category: { name: string; description: string; image: string; isNew: boolean } | null;
  onClose: () => void;
  onSave: (c: { name: string; description: string; image: string }) => void;
}) {
  const [form, setForm] = useState(
    category ?? { name: "", description: "", image: "/images/best1.jpg" }
  );

  if (!category) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#e5e7eb] p-5">
          <h2 className="text-lg font-bold font-playfair">
            {category.isNew ? "Add Category" : `Edit: ${form.name}`}
          </h2>
          <button onClick={onClose} className="text-[#9ca3af] hover:text-[#1e1e2d] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-[12px] font-semibold text-[#374151] mb-1">Category Name</label>
            <input
              className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] outline-none focus:border-[#c4a95a] transition-colors"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Pendants"
            />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-[#374151] mb-1">Description</label>
            <textarea
              rows={3}
              className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] outline-none focus:border-[#c4a95a] transition-colors resize-none"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="A short description for this category…"
            />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-[#374151] mb-1">Image URL</label>
            <input
              className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] outline-none focus:border-[#c4a95a] transition-colors"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="/images/category.jpg"
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-[#e5e7eb] p-5">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#d1d5db] px-4 py-2 text-[12px] font-semibold text-[#374151] hover:bg-[#f4f5f7] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="rounded-lg bg-[#c4a95a] px-5 py-2 text-[12px] font-semibold text-white hover:bg-[#b09845] transition-colors"
          >
            {category.isNew ? "Create" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function CategoriesPage() {
  const [editCat, setEditCat] = useState<{
    name: string;
    description: string;
    image: string;
    isNew: boolean;
  } | null>(null);

  const categoriesData = categoryOptions.map((cat) => ({
    name: cat,
    description: getCategoryDescription(cat),
    image: CATEGORY_IMAGES[cat],
    productCount: PRODUCTS.filter((p) => p.category === cat).length,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-playfair">Categories</h1>
          <p className="text-[13px] text-[#6b7280] mt-1">
            {categoryOptions.length} categories organizing your catalog
          </p>
        </div>
        <button
          onClick={() => setEditCat({ name: "", description: "", image: "/images/best1.jpg", isNew: true })}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#c4a95a] px-4 py-2.5 text-[12px] font-semibold text-white hover:bg-[#b09845] transition-colors self-start"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Category
        </button>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {categoriesData.map((cat) => (
          <div
            key={cat.name}
            className="group rounded-xl border border-[#e5e7eb] bg-white overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Image */}
            <div className="relative h-40 bg-[#f4f5f7]">
              <Image src={cat.image} alt={cat.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute bottom-3 start-3">
                <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[#1e1e2d]">
                  {cat.productCount} products
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="text-[15px] font-bold">{cat.name}</h3>
              <p className="text-[12px] text-[#6b7280] mt-1 line-clamp-2">{cat.description}</p>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#f3f4f6]">
                <button
                  onClick={() =>
                    setEditCat({
                      name: cat.name,
                      description: cat.description,
                      image: cat.image,
                      isNew: false,
                    })
                  }
                  className="flex-1 rounded-lg border border-[#d1d5db] py-1.5 text-[11px] font-semibold text-[#374151] hover:bg-[#f4f5f7] transition-colors"
                >
                  Edit
                </button>
                <button className="rounded-lg border border-[#d1d5db] p-1.5 text-[#9ca3af] hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="rounded-xl border border-[#e5e7eb] bg-white p-6">
        <h2 className="text-[15px] font-bold mb-4">Category Distribution</h2>
        <div className="space-y-3">
          {categoriesData.map((cat) => {
            const pct = PRODUCTS.length > 0 ? Math.round((cat.productCount / PRODUCTS.length) * 100) : 0;
            return (
              <div key={cat.name} className="flex items-center gap-4">
                <span className="text-[13px] font-medium w-24">{cat.name}</span>
                <div className="flex-1 h-2.5 rounded-full bg-[#f4f5f7] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#c4a95a] transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-[12px] font-semibold text-[#6b7280] w-10 text-end">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {editCat && (
        <CategoryModal
          category={editCat}
          onClose={() => setEditCat(null)}
          onSave={() => setEditCat(null)}
        />
      )}
    </div>
  );
}
