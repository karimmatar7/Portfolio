"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/app/content/site";
import { localeMeta, messages, type Messages } from "@/app/lib/messages";

type LocaleContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  /** 1 in LTR, -1 in RTL. Multiply directional offsets by this so motion mirrors. */
  axis: 1 | -1;
  t: Messages["Home"];
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  locale: initialLocale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    setLocaleState(initialLocale);
  }, [initialLocale]);

  useEffect(() => {
    const { dir } = localeMeta[locale];
    const root = document.documentElement;
    root.lang = locale;
    root.dir = dir;
  }, [locale]);

  // Every language has its own URL, so switching navigates instead of swapping
  // strings in place. Search engines get three separate pages to index.
  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      const { dir } = localeMeta[next];
      document.documentElement.lang = next;
      document.documentElement.dir = dir;
      router.push(`/${next}`);
    },
    [router]
  );

  const value = useMemo<LocaleContextValue>(() => {
    const { dir } = localeMeta[locale];
    return {
      locale,
      dir,
      axis: dir === "rtl" ? -1 : 1,
      t: messages[locale].Home,
      setLocale,
    };
  }, [locale, setLocale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used inside <LocaleProvider>");
  }
  return ctx;
}