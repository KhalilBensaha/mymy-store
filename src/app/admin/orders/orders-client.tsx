"use client";

import { useState, useTransition, useMemo, useEffect, useCallback } from "react";
import { updateOrderStatus } from "@/lib/actions/orders";
import type { OrderWithItems } from "@/lib/actions/orders";
import Image from "next/image";

type OrderStatus = "new" | "paid" | "canceled";

const STATUS_STYLES: Record<OrderStatus, string> = {
  new: "bg-blue-50 text-blue-700",
  paid: "bg-emerald-50 text-emerald-700",
  canceled: "bg-red-50 text-red-600",
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  new: "Nouvelle",
  paid: "Payée",
  canceled: "Annulée",
};

const ALL_STATUSES: OrderStatus[] = ["new", "paid", "canceled"];

const ACTIVITY_LABELS: Record<string, string> = {
  order_information_received_by_carrier: "Commande enregistrée et validée",
  picked: "Récupérée par le prestataire",
  accepted_by_carrier: "Réceptionnée par le centre de tri",
  dispatched_to_driver: "Dispatchée au livreur",
  attempt_delivery: "Tentative de livraison",
  return_asked: "Retour initié par le centre de tri",
  return_in_transit: "Retour en transit",
  Return_received: "Retour réceptionné par le vendeur",
  livred: "Commande livrée",
  encaissed: "Commande encaissée",
  payed: "Paiement effectué",
};

type SortField = "date" | "price" | "product";
type SortDir = "asc" | "desc";

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
  const [trackingUpdates, setTrackingUpdates] = useState<
    { remarque: string; station: string; livreur: string; created_at: string; tracking: string }[]
  >([]); 
  const [loadingTracking, setLoadingTracking] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [sendingNote, setSendingNote] = useState(false);
  const [requestingReturn, setRequestingReturn] = useState(false);
  const [returnMessage, setReturnMessage] = useState("");
  const [activities, setActivities] = useState<{ activity: string; created_at: string }[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(false);

  const fetchTracking = useCallback(() => {
    if (!order.ecotrackTracking) return;
    setLoadingTracking(true);
    fetch(`/api/ecotrack/updates?tracking=${encodeURIComponent(order.ecotrackTracking)}`)
      .then((r) => r.json())
      .then((data) => setTrackingUpdates(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoadingTracking(false));
    // Also fetch operations history
    setLoadingActivities(true);
    fetch(`/api/ecotrack/tracking-info?tracking=${encodeURIComponent(order.ecotrackTracking)}`)
      .then((r) => r.json())
      .then((data) => setActivities(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoadingActivities(false));
  }, [order.ecotrackTracking]);

  useEffect(() => {
    fetchTracking();
  }, [fetchTracking]);

  async function handleAddNote() {
    if (!noteText.trim() || !order.ecotrackTracking) return;
    setSendingNote(true);
    try {
      const res = await fetch(
        `/api/ecotrack/add-update?tracking=${encodeURIComponent(order.ecotrackTracking)}&content=${encodeURIComponent(noteText.trim())}`,
        { method: "POST" }
      );
      const data = await res.json();
      if (data.success) {
        setNoteText("");
        fetchTracking(); // refresh timeline
      }
    } catch (err) {
      console.error("Failed to add tracking note:", err);
    } finally {
      setSendingNote(false);
    }
  }

  async function handleRequestReturn() {
    if (!order.ecotrackTracking) return;
    if (!confirm("Confirmer la demande de retour pour ce colis ?")) return;
    setRequestingReturn(true);
    setReturnMessage("");
    try {
      const res = await fetch(
        `/api/ecotrack/request-return?tracking=${encodeURIComponent(order.ecotrackTracking)}`,
        { method: "POST" }
      );
      const data = await res.json();
      setReturnMessage(data.message || (data.success ? "Demande envoyée" : "Échec de la demande"));
    } catch {
      setReturnMessage("Erreur de connexion");
    } finally {
      setRequestingReturn(false);
    }
  }

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
                  className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                    status === s
                      ? `${STATUS_STYLES[s]} border-current`
                      : "border-[#d1d5db] bg-white text-[#6b7280] hover:border-[#9ca3af]"
                  }`}
                >
                  {STATUS_LABELS[s]}
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
                ...(order.wilaya
                  ? [{ label: "Wilaya", value: order.wilaya }]
                  : []),
                ...(order.commune
                  ? [{ label: "Commune", value: order.commune }]
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

          {/* EcoTrack Tracking */}
          {order.ecotrackTracking && (
            <div className="space-y-2 rounded-lg border border-[#e5e7eb] p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[13px] font-bold">Suivi livraison</h3>
                <button
                  onClick={fetchTracking}
                  className="text-[11px] text-[#c4a95a] hover:underline"
                >
                  Actualiser
                </button>
              </div>
              <p className="flex justify-between text-[12px]">
                <span className="text-[#6b7280]">Tracking</span>
                <span className="font-mono font-medium">{order.ecotrackTracking}</span>
              </p>
              {loadingTracking ? (
                <p className="text-[12px] text-[#9ca3af]">Chargement…</p>
              ) : trackingUpdates.length > 0 ? (
                <div className="mt-2 space-y-2">
                  {trackingUpdates.map((u, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-[12px]"
                    >
                      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#c4a95a]" />
                      <div>
                        <p className="font-medium">{u.remarque}</p>
                        <div className="flex flex-wrap gap-x-3 text-[11px] text-[#9ca3af]">
                          <span>{u.created_at}</span>
                          {u.station && <span>📍 {u.station}</span>}
                          {u.livreur && <span>🚚 {u.livreur}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[12px] text-[#9ca3af]">Aucune mise à jour</p>
              )}

              {/* Add note form */}
              <div className="mt-3 border-t border-[#e5e7eb] pt-3">
                <label className="mb-1 block text-[11px] font-semibold text-[#374151]">
                  Ajouter une note
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={255}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Ex: Livraison avant 17h…"
                    className="flex-1 rounded-lg border border-[#d1d5db] px-3 py-2 text-[12px] outline-none focus:border-[#c4a95a]"
                  />
                  <button
                    onClick={handleAddNote}
                    disabled={sendingNote || !noteText.trim()}
                    className="rounded-lg bg-[#c4a95a] px-3 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-[#8b6914] disabled:opacity-50"
                  >
                    {sendingNote ? "…" : "Envoyer"}
                  </button>
                </div>
              </div>

              {/* Request return */}
              <div className="mt-3 border-t border-[#e5e7eb] pt-3">
                <button
                  onClick={handleRequestReturn}
                  disabled={requestingReturn}
                  className="w-full rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12px] font-semibold text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50"
                >
                  {requestingReturn ? "Envoi…" : "Demander le retour"}
                </button>
                {returnMessage && (
                  <p className="mt-1.5 text-[11px] text-[#6b7280]">{returnMessage}</p>
                )}
              </div>
            </div>
          )}

          {/* Operations History */}
          {order.ecotrackTracking && (
            <div className="space-y-2 rounded-lg border border-[#e5e7eb] p-4">
              <h3 className="text-[13px] font-bold">Historique des opérations</h3>
              {loadingActivities ? (
                <p className="text-[12px] text-[#9ca3af]">Chargement…</p>
              ) : activities.length > 0 ? (
                <div className="mt-2 space-y-0">
                  {activities.map((a, i) => {
                    const isLast = i === activities.length - 1;
                    return (
                      <div key={i} className="flex gap-3">
                        {/* Timeline indicator */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`h-3 w-3 shrink-0 rounded-full border-2 ${
                              isLast
                                ? "border-[#c4a95a] bg-[#c4a95a]"
                                : "border-[#d1d5db] bg-white"
                            }`}
                          />
                          {i < activities.length - 1 && (
                            <div className="h-full w-0.5 bg-[#e5e7eb]" />
                          )}
                        </div>
                        {/* Content */}
                        <div className="pb-4">
                          <p className="text-[12px] font-medium">
                            {ACTIVITY_LABELS[a.activity] ?? a.activity}
                          </p>
                          <p className="text-[11px] text-[#9ca3af]">{a.created_at}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-[12px] text-[#9ca3af]">Aucune opération enregistrée</p>
              )}
            </div>
          )}

          {/* Items with product images */}
          <div className="rounded-lg border border-[#e5e7eb] p-4">
            <h3 className="mb-3 text-[13px] font-bold">Articles</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg border border-[#f3f4f6] p-3"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#f9fafb]">
                    {item.productImage ? (
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[#d1d5db]">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium">{item.productName}</p>
                    {item.variant && (
                      <p className="text-[11px] text-[#9ca3af]">{item.variant}</p>
                    )}
                    <p className="text-[11px] text-[#9ca3af]">Qté : {item.quantity}</p>
                  </div>
                  <p className="whitespace-nowrap text-[13px] font-semibold">
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
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [, startTransition] = useTransition();

  const filtered = useMemo(() => {
    let result = orders.filter((o) => {
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

    result = [...result].sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "date":
          cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case "price":
          cmp = a.total - b.total;
          break;
        case "product":
          cmp = (a.items[0]?.productName ?? "").localeCompare(
            b.items[0]?.productName ?? ""
          );
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [orders, search, statusFilter, sortField, sortDir]);

  function handleStatusChange(id: number, status: OrderStatus) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
    if (selectedOrder?.id === id) {
      setSelectedOrder((prev) => (prev ? { ...prev, status } : prev));
    }
    startTransition(() => {
      updateOrderStatus(id, status).catch(console.error);
    });
  }

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir(field === "product" ? "asc" : "desc");
    }
  }

  const statusCounts = ALL_STATUSES.reduce(
    (acc, s) => ({
      ...acc,
      [s]: orders.filter((o) => o.status === s).length,
    }),
    {} as Record<OrderStatus, number>
  );

  const SortIcon = ({ field }: { field: SortField }) => (
    <svg
      className={`ml-1 inline h-3 w-3 transition-transform ${sortField === field ? "text-[#c4a95a]" : "text-[#9ca3af]"} ${sortField === field && sortDir === "asc" ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
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
          Toutes ({orders.length})
        </button>
        {ALL_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-lg px-3 py-2 text-[12px] font-semibold transition-colors ${
              statusFilter === s
                ? `${STATUS_STYLES[s]} border border-current`
                : "border border-[#e5e7eb] bg-white text-[#6b7280] hover:bg-[#f9fafb]"
            }`}
          >
            {STATUS_LABELS[s]} ({statusCounts[s]})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <svg
          className="absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]"
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
                <th className="px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">
                  Commande
                </th>
                <th className="px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">
                  Client
                </th>
                <th
                  className="cursor-pointer select-none px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280] hover:text-[#c4a95a]"
                  onClick={() => toggleSort("date")}
                >
                  Date <SortIcon field="date" />
                </th>
                <th
                  className="cursor-pointer select-none px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280] hover:text-[#c4a95a]"
                  onClick={() => toggleSort("product")}
                >
                  Produit <SortIcon field="product" />
                </th>
                <th
                  className="cursor-pointer select-none px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280] hover:text-[#c4a95a]"
                  onClick={() => toggleSort("price")}
                >
                  Total <SortIcon field="price" />
                </th>
                <th className="px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">
                  Statut
                </th>
                <th className="px-5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">
                  Tracking
                </th>
                <th className="px-5 py-3">
                </th>
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
                      <p className="max-w-[180px] truncate">
                        {o.items.map((i) => i.productName).join(", ")}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-[13px] font-semibold">
                      {formatPrice(o.total)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLES[status] ?? "bg-gray-100 text-gray-600"}`}
                      >
                        {STATUS_LABELS[status] ?? status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[12px] font-mono text-[#6b7280]">
                      {o.ecotrackTracking || "—"}
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
                  <td colSpan={8} className="px-5 py-12 text-center">
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
