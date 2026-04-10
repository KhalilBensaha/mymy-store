"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  type ProductInput,
} from "@/lib/actions/products";
import { CloudinaryUpload, CloudinaryGalleryUpload } from "@/components/cloudinary-upload";

/* ─── Types ─── */
export type ProductRow = {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  gallery: string[];
  categoryId: number | null;
  categoryName: string | null;
  categorySlug: string | null;
  materials: string[];
  badge: string | null;
  description: string;
  story: string;
  specs: { label: string; value: string }[];
  variants: string[];
  ratingScore: number;
  ratingCount: number;
  createdAt: Date;
};

export type CategoryOption = {
  id: number;
  name: string;
};

/* ─── Modal ─── */
function ProductModal({
  product,
  categories,
  onClose,
}: {
  product: (ProductRow & { _isNew?: boolean }) | null;
  categories: CategoryOption[];
  onClose: () => void;
}) {
  const isNew = product?._isNew ?? false;
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    name: product?.name ?? "",
    subtitle: product?.subtitle ?? "",
    price: product?.price ?? 0,
    image: product?.image ?? "/images/best1.jpg",
    gallery: product?.gallery ?? ["/images/best1.jpg"],
    categoryId: product?.categoryId ?? null,
    materials: product?.materials ?? [],
    badge: product?.badge ?? "",
    description: product?.description ?? "",
    story: product?.story ?? "",
    specs: product?.specs ?? [{ label: "", value: "" }],
    variants: product?.variants ?? [],
    ratingScore: product?.ratingScore ?? 0,
    ratingCount: product?.ratingCount ?? 0,
  });
  const [materialsText, setMaterialsText] = useState(
    (product?.materials ?? []).join(", ")
  );
  const [variantInput, setVariantInput] = useState("");

  const handleSave = () => {
    const data: ProductInput = {
      name: form.name,
      subtitle: form.subtitle,
      price: form.price,
      image: form.image,
      gallery: form.gallery,
      categoryId: form.categoryId,
      materials: materialsText
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
      badge: form.badge,
      description: form.description,
      story: form.story,
      specs: form.specs.filter((s) => s.label && s.value),
      variants: form.variants,
      ratingScore: form.ratingScore,
      ratingCount: form.ratingCount,
    };
    startTransition(async () => {
      if (isNew) {
        await createProduct(data);
      } else {
        await updateProduct(product!.id, data);
      }
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center bg-black/50 overflow-y-auto py-8 px-4">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e5e7eb] p-5">
          <h2 className="text-lg font-bold font-playfair">
            {isNew ? "Add Product" : `Edit: ${form.name}`}
          </h2>
          <button onClick={onClose} className="text-[#9ca3af] hover:text-[#1e1e2d] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Name + Subtitle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#374151] mb-1">Product Name</label>
              <input className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] outline-none focus:border-[#c4a95a] focus:ring-1 focus:ring-[#c4a95a]/30" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Aurelia Band" />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#374151] mb-1">Subtitle</label>
              <input className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] outline-none focus:border-[#c4a95a] focus:ring-1 focus:ring-[#c4a95a]/30" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} placeholder="e.g. 18K Yellow Gold" />
            </div>
          </div>

          {/* Price + Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#374151] mb-1">Price ($)</label>
              <input type="number" className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] outline-none focus:border-[#c4a95a] focus:ring-1 focus:ring-[#c4a95a]/30" value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} placeholder="1250" />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#374151] mb-1">Category</label>
              <select
                className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] outline-none focus:border-[#c4a95a] bg-white"
                value={form.categoryId ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    categoryId: e.target.value === "" ? null : Number(e.target.value),
                  })
                }
              >
                <option value="">No category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Badge + Image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#374151] mb-1">Badge (optional)</label>
              <input className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] outline-none focus:border-[#c4a95a] focus:ring-1 focus:ring-[#c4a95a]/30" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="e.g. Bestseller" />
            </div>
            <CloudinaryUpload
              label="Main Image"
              folder="mymy-store/products"
              value={form.image}
              onChange={(url) => setForm({ ...form, image: url })}
            />
          </div>

          {/* Gallery */}
          <CloudinaryGalleryUpload
            label="Gallery Images"
            folder="mymy-store/products"
            value={form.gallery}
            onChange={(urls) => setForm({ ...form, gallery: urls })}
          />

          {/* Materials */}
          <div>
            <label className="block text-[12px] font-semibold text-[#374151] mb-1">
              Materials (comma separated)
            </label>
            <input
              className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] outline-none focus:border-[#c4a95a] focus:ring-1 focus:ring-[#c4a95a]/30"
              value={materialsText}
              onChange={(e) => setMaterialsText(e.target.value)}
              placeholder="e.g. Amethyst, Rose Quartz, Black Tourmaline"
            />
          </div>

          {/* Variants */}
          <div>
            <label className="block text-[12px] font-semibold text-[#374151] mb-2">Variants</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {form.variants.map((v) => (
                <span key={v} className="inline-flex items-center gap-1 rounded-full bg-[#f4f5f7] px-2.5 py-1 text-[11px] font-medium">
                  {v}
                  <button type="button" onClick={() => setForm({ ...form, variants: form.variants.filter((x) => x !== v) })} className="text-[#9ca3af] hover:text-red-500">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input className="flex-1 rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] outline-none focus:border-[#c4a95a]" value={variantInput} onChange={(e) => setVariantInput(e.target.value)} placeholder="Add variant (e.g. Rose Gold)" onKeyDown={(e) => { if (e.key === "Enter" && variantInput.trim()) { setForm({ ...form, variants: [...form.variants, variantInput.trim()] }); setVariantInput(""); } }} />
              <button type="button" onClick={() => { if (variantInput.trim()) { setForm({ ...form, variants: [...form.variants, variantInput.trim()] }); setVariantInput(""); } }} className="rounded-lg bg-[#f4f5f7] px-3 py-2 text-[12px] font-semibold text-[#374151] hover:bg-[#e5e7eb]">Add</button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[12px] font-semibold text-[#374151] mb-1">Description</label>
            <textarea rows={3} className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] outline-none focus:border-[#c4a95a] focus:ring-1 focus:ring-[#c4a95a]/30 resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Product description…" />
          </div>

          {/* Story */}
          <div>
            <label className="block text-[12px] font-semibold text-[#374151] mb-1">Story</label>
            <textarea rows={3} className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-[13px] outline-none focus:border-[#c4a95a] focus:ring-1 focus:ring-[#c4a95a]/30 resize-none" value={form.story} onChange={(e) => setForm({ ...form, story: e.target.value })} placeholder="Product story / heritage…" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-[#e5e7eb] p-5">
          <button onClick={onClose} className="rounded-lg border border-[#d1d5db] px-4 py-2 text-[12px] font-semibold text-[#374151] hover:bg-[#f4f5f7]">Cancel</button>
          <button onClick={handleSave} disabled={isPending} className="rounded-lg bg-[#c4a95a] px-5 py-2 text-[12px] font-semibold text-white hover:bg-[#b09845] disabled:opacity-50">
            {isPending ? "Saving…" : isNew ? "Create Product" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Delete dialog ─── */
function DeleteDialog({ name, onCancel, onConfirm, isPending }: { name: string; onCancel: () => void; onConfirm: () => void; isPending: boolean }) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <h3 className="text-[15px] font-bold">Delete Product</h3>
        <p className="text-[13px] text-[#6b7280] mt-2">Are you sure you want to delete <strong>{name}</strong>? This action cannot be undone.</p>
        <div className="flex gap-3 mt-5">
          <button onClick={onCancel} className="flex-1 rounded-lg border border-[#d1d5db] py-2 text-[12px] font-semibold text-[#374151] hover:bg-[#f4f5f7]">Cancel</button>
          <button onClick={onConfirm} disabled={isPending} className="flex-1 rounded-lg bg-red-600 py-2 text-[12px] font-semibold text-white hover:bg-red-700 disabled:opacity-50">
            {isPending ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main client component ─── */
export default function ProductsClient({
  initialProducts,
  categories,
}: {
  initialProducts: ProductRow[];
  categories: CategoryOption[];
}) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<number | "all">("all");
  const [editProduct, setEditProduct] = useState<(ProductRow & { _isNew?: boolean }) | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductRow | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = initialProducts.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.subtitle.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "all" || p.categoryId === categoryFilter;
    return matchSearch && matchCat;
  });

  const handleDelete = () => {
    if (!deleteTarget) return;
    startTransition(async () => {
      await deleteProduct(deleteTarget.id);
      setDeleteTarget(null);
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-playfair">Products</h1>
          <p className="text-[13px] text-[#6b7280] mt-1">{initialProducts.length} products in your catalog</p>
        </div>
        <button
          onClick={() => setEditProduct({ id: 0, name: "", subtitle: "", price: 0, image: "/images/best1.jpg", gallery: ["/images/best1.jpg"], categoryId: null, categoryName: null, categorySlug: null, materials: [], badge: "", description: "", story: "", specs: [{ label: "", value: "" }], variants: [], ratingScore: 0, ratingCount: 0, createdAt: new Date(), _isNew: true })}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#c4a95a] px-4 py-2.5 text-[12px] font-semibold text-white hover:bg-[#b09845] transition-colors self-start"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute inset-s-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input type="text" placeholder="Search products…" className="w-full rounded-lg border border-[#d1d5db] ps-9 pe-3 py-2.5 text-[13px] outline-none focus:border-[#c4a95a] focus:ring-1 focus:ring-[#c4a95a]/30" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="rounded-lg border border-[#d1d5db] px-3 py-2.5 text-[13px] outline-none focus:border-[#c4a95a] bg-white" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value === "all" ? "all" : Number(e.target.value))}>
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[#e5e7eb] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start">
            <thead>
              <tr className="border-b border-[#f3f4f6] bg-[#f9fafb]">
                <th className="px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Product</th>
                <th className="px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Category</th>
                <th className="px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Price</th>
                <th className="px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Materials</th>
                <th className="px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Badge</th>
                <th className="px-5 py-3 text-end text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-[#f3f4f6] last:border-0 hover:bg-[#fafafa] transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 rounded-lg overflow-hidden bg-[#f4f5f7]">
                        <Image src={p.image} alt={p.name} fill className="object-cover" sizes="40px" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold">{p.name}</p>
                        <p className="text-[11px] text-[#9ca3af]">{p.subtitle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="rounded-full bg-[#f4f5f7] px-2.5 py-1 text-[11px] font-medium text-[#374151]">{p.categoryName ?? "No category"}</span>
                  </td>
                  <td className="px-5 py-3 text-[13px] font-semibold">{p.price.toLocaleString()} DA</td>
                  <td className="px-5 py-3">
                    <span className="text-[12px] text-[#6b7280]">{p.materials.join(", ") || "-"}</span>
                  </td>
                  <td className="px-5 py-3">
                    {p.badge ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">{p.badge}</span>
                    ) : (
                      <span className="text-[11px] text-[#d1d5db]">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setEditProduct(p)} className="rounded-lg p-2 text-[#6b7280] hover:bg-[#f4f5f7] hover:text-[#c4a95a] transition-colors" title="Edit">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </button>
                      <button onClick={() => setDeleteTarget(p)} className="rounded-lg p-2 text-[#6b7280] hover:bg-red-50 hover:text-red-600 transition-colors" title="Delete">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center">
                    <p className="text-[14px] font-semibold text-[#6b7280]">No products found</p>
                    <p className="text-[12px] text-[#9ca3af] mt-1">Try adjusting your search or filter</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {editProduct && (
        <ProductModal product={editProduct} categories={categories} onClose={() => setEditProduct(null)} />
      )}
      {deleteTarget && (
        <DeleteDialog name={deleteTarget.name} onCancel={() => setDeleteTarget(null)} onConfirm={handleDelete} isPending={isPending} />
      )}
    </div>
  );
}
