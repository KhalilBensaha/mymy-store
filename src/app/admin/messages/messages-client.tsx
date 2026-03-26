"use client";

import { useState, useTransition } from "react";
import {
  markMessageRead,
  markAllMessagesRead,
  deleteMessage,
} from "@/lib/actions/messages";

/* ─── Types ─── */
type MessageRow = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  read: boolean;
  submittedAt: Date;
};

/* ─── Helpers ─── */
function timeAgo(date: Date): string {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60_000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (days > 0) return `${days}d ago`;
  if (hrs > 0) return `${hrs}h ago`;
  if (mins > 0) return `${mins}m ago`;
  return "Just now";
}

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

const AVATAR_COLORS = [
  "bg-violet-100 text-violet-700",
  "bg-sky-100 text-sky-700",
  "bg-emerald-100 text-emerald-700",
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
  "bg-indigo-100 text-indigo-700",
];

function avatarColor(name: string): string {
  let hash = 0;
  for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) & 0xffff;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

/* ─── Message Detail Panel ─── */
function DetailPanel({
  msg,
  onClose,
  onDelete,
}: {
  msg: MessageRow;
  onClose: () => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30" onClick={onClose}>
      <div
        className="relative w-full max-w-md overflow-y-auto bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-4">
          <h2 className="font-playfair text-xl font-bold text-[#1e1e2d]">Message</h2>
          <button
            onClick={onClose}
            className="text-[#9ca3af] hover:text-[#1e1e2d] transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sender block */}
        <div className="flex items-center gap-4 border-b border-[#e5e7eb] px-6 py-5">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[15px] font-bold ${avatarColor(msg.name)}`}
          >
            {initials(msg.name)}
          </div>
          <div>
            <p className="font-semibold text-[#1e1e2d]">{msg.name}</p>
            <a href={`mailto:${msg.email}`} className="text-[12px] text-[#c4a95a] hover:underline">
              {msg.email}
            </a>
            {msg.phone && <p className="text-[12px] text-[#6b7280]">{msg.phone}</p>}
          </div>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-3 border-b border-[#e5e7eb] px-6 py-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f5f7] px-3 py-1 text-[11px] font-semibold text-[#374151]">
            <svg className="h-3.5 w-3.5 text-[#c4a95a]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
            </svg>
            {msg.subject}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f5f7] px-3 py-1 text-[11px] text-[#6b7280]">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {timeAgo(msg.submittedAt)}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f5f7] px-3 py-1 text-[11px] text-[#6b7280]">
            {new Date(msg.submittedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {/* Message body */}
        <div className="px-6 py-5">
          <p className="whitespace-pre-wrap font-montserrat text-[13px] leading-relaxed text-[#374151]">
            {msg.message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 border-t border-[#e5e7eb] px-6 py-4">
          <a
            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#8b6914] px-4 py-2.5 text-[12px] font-semibold text-white hover:bg-[#6f5110] transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            Reply
          </a>
          <button
            onClick={() => onDelete(msg.id)}
            className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-[12px] font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Client ─── */
export default function MessagesClient({
  initialMessages,
}: {
  initialMessages: MessageRow[];
}) {
  const [messages, setMessages] = useState<MessageRow[]>(initialMessages);
  const [selected, setSelected] = useState<MessageRow | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [, startTransition] = useTransition();

  const unreadCount = messages.filter((m) => !m.read).length;

  /* Open message → mark as read */
  function openMessage(msg: MessageRow) {
    if (!msg.read) {
      startTransition(async () => {
        await markMessageRead(msg.id);
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
      );
    }
    setSelected(msg);
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      await deleteMessage(id);
    });
    setMessages((prev) => prev.filter((m) => m.id !== id));
    setSelected(null);
  }

  function handleMarkAllRead() {
    startTransition(async () => {
      await markAllMessagesRead();
    });
    setMessages((prev) => prev.map((m) => ({ ...m, read: true })));
  }

  /* Filter + search */
  const visible = messages.filter((m) => {
    const matchesFilter =
      filter === "all" || (filter === "unread" ? !m.read : m.read);
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.subject.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-[#1e1e2d]">Messages</h1>
          <p className="mt-1 text-[13px] text-[#6b7280]">
            Contact form submissions from the store
          </p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="rounded-lg border border-[#d1d5db] bg-white px-4 py-2 text-[12px] font-semibold text-[#374151] hover:bg-[#f4f5f7] transition-colors"
            >
              Mark all as read
            </button>
          )}
          <a
            href="/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-[#8b6914] px-4 py-2 text-[12px] font-semibold text-white hover:bg-[#6f5110] transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            View Contact Page
          </a>
        </div>
      </div>

      {/* Stats strip */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        {[
          { label: "Total", value: messages.length, color: "text-[#1e1e2d]" },
          { label: "Unread", value: unreadCount, color: "text-amber-600" },
          { label: "Read", value: messages.length - unreadCount, color: "text-emerald-600" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-[#e5e7eb] bg-white p-4 text-center shadow-sm"
          >
            <p className={`font-playfair text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-1 font-montserrat text-[11px] uppercase tracking-[0.12em] text-[#9ca3af]">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <svg
            className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search messages…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[#d1d5db] bg-white py-2.5 ps-9 pe-4 text-[13px] outline-none focus:border-[#c4a95a] transition-colors"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex rounded-xl border border-[#d1d5db] bg-white overflow-hidden">
          {(["all", "unread", "read"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2.5 text-[12px] font-semibold capitalize transition-colors ${
                filter === f
                  ? "bg-[#1e1e2d] text-white"
                  : "text-[#6b7280] hover:text-[#1e1e2d]"
              }`}
            >
              {f}
              {f === "unread" && unreadCount > 0 && (
                <span className="ms-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#c4a95a] text-[9px] text-white font-bold">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Message list */}
      <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f4f5f7] text-[#9ca3af]">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <p className="font-semibold text-[#374151]">
              {searchQuery ? "No messages found" : "No messages yet"}
            </p>
            <p className="text-[12px] text-[#9ca3af]">
              {searchQuery
                ? "Try a different search term."
                : "Messages sent through the contact form will appear here."}
            </p>
            {!searchQuery && (
              <a
                href="/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-[12px] font-semibold text-[#8b6914] hover:underline"
              >
                Open contact form →
              </a>
            )}
          </div>
        ) : (
          <ul>
            {visible.map((msg, idx) => (
              <li
                key={msg.id}
                onClick={() => openMessage(msg)}
                className={`flex cursor-pointer items-start gap-4 px-5 py-4 transition-colors hover:bg-[#f9f9fb] ${
                  idx !== 0 ? "border-t border-[#f0f0f0]" : ""
                } ${!msg.read ? "bg-[#fffdf7]" : ""}`}
              >
                {/* Avatar */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${avatarColor(msg.name)}`}
                >
                  {initials(msg.name)}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className={`truncate text-[13px] ${!msg.read ? "font-bold text-[#1e1e2d]" : "font-medium text-[#374151]"}`}>
                      {msg.name}
                    </p>
                    <span className="shrink-0 text-[11px] text-[#9ca3af]">
                      {timeAgo(msg.submittedAt)}
                    </span>
                  </div>
                  <p className={`truncate text-[12px] ${!msg.read ? "font-semibold text-[#374151]" : "text-[#6b7280]"}`}>
                    {msg.subject}
                  </p>
                  <p className="mt-0.5 truncate text-[12px] text-[#9ca3af]">
                    {msg.message}
                  </p>
                </div>

                {/* Unread dot */}
                {!msg.read && (
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#c4a95a]" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Detail panel */}
      {selected && (
        <DetailPanel
          msg={selected}
          onClose={() => setSelected(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
