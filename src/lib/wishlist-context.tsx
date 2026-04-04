"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  startTransition,
} from "react";

/* ────────────────────────────────────────────── */
/*  Types                                         */
/* ────────────────────────────────────────────── */

export type WishlistItem = {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  image: string;
};

type WishlistContextValue = {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: number) => void;
  toggleItem: (item: WishlistItem) => void;
  hasItem: (id: number) => boolean;
  totalItems: number;
};

/* ────────────────────────────────────────────── */
/*  Context                                       */
/* ────────────────────────────────────────────── */

const WishlistContext = createContext<WishlistContextValue | null>(null);

const STORAGE_KEY = "mymy_wishlist";

/* ────────────────────────────────────────────── */
/*  Provider                                      */
/* ────────────────────────────────────────────── */

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const hydrated = useRef(false);

  /* Hydrate from localStorage on mount */
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) startTransition(() => setItems(JSON.parse(raw) as WishlistItem[]));
    } catch {
      /* ignore malformed data */
    }
  }, []);

  /* Persist whenever items change (after hydration) */
  useEffect(() => {
    if (!hydrated.current) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  /* ── Actions ── */

  const addItem = useCallback((newItem: WishlistItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === newItem.id)) return prev;
      return [...prev, newItem];
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const toggleItem = useCallback((item: WishlistItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  }, []);

  const hasItem = useCallback(
    (id: number) => items.some((i) => i.id === id),
    [items]
  );

  /* ── Derived ── */

  const totalItems = useMemo(() => items.length, [items]);

  const value = useMemo<WishlistContextValue>(
    () => ({ items, addItem, removeItem, toggleItem, hasItem, totalItems }),
    [items, addItem, removeItem, toggleItem, hasItem, totalItems]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

/* ────────────────────────────────────────────── */
/*  Hook                                          */
/* ────────────────────────────────────────────── */

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx)
    throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}
