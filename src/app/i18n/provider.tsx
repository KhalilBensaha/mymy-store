"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Locale, Messages } from "./types";
import en from "./en";
import fr from "./fr";
import ar from "./ar";

const messages: Record<Locale, Messages> = { en, fr, ar };

type I18nContextValue = {
  locale: Locale;
  t: Messages;
  setLocale: (l: Locale) => void;
  dir: "ltr" | "rtl";
};

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  t: en,
  setLocale: () => {},
  dir: "ltr",
});

function getInitialLocale(): Locale {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("mymy-locale") as Locale | null;
    if (saved && messages[saved]) return saved;
  }
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  // Apply lang + dir to <html>
  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("mymy-locale", l);
  }, []);

  const dir: "ltr" | "rtl" = locale === "ar" ? "rtl" : "ltr";
  const t = messages[locale];

  const value = useMemo(
    () => ({ locale, t, setLocale, dir }),
    [locale, t, setLocale, dir]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
