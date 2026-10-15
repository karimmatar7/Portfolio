"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/app/content/site";
import { localeMeta } from "@/app/lib/locales";
import type { Messages } from "@/app/lib/messages";

type LocaleContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  /** 1 in LTR, -1 in RTL. Multiply directional offsets by this so motion mirrors. */
  axis: 1 | -1;
  t: Messages["Home"];
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Each language has its own URL, so switching languages navigates. Next.js
 * manages the scroll position of that navigation by walking the route's
 * top-level elements, skipping the fixed header and the script tags, and
 * scrolling the first visible element it finds into view. Here that element is
 * the footer, so every switch ended at the bottom of the new page.
 *
 * We turn that behaviour off for the switch and jump to the top once the new
 * locale has rendered. The flag lives at module scope because changing the
 * locale can remount the provider, which would reset component state.
 */
let jumpToTopOnNextCommit = false;

/** Scroll to the top without letting `html { scroll-behavior: smooth }` animate. */
function jumpToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

export function LocaleProvider({
  children,
  locale: initialLocale,
  copy,
}: {
  children: React.ReactNode;
  locale: Locale;
  /**
   * Copy for the locale being rendered. Passed in from the server page so only
   * the active language is shipped to the browser, not all of them.
   */
  copy: Messages["Home"];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [syncedLocale, setSyncedLocale] = useState<Locale>(initialLocale);

  // Adjust state during render when the URL locale changes (browser back/forward
  // or a fresh navigation) instead of syncing it from an effect.
  if (initialLocale !== syncedLocale) {
    setSyncedLocale(initialLocale);
    setLocaleState(initialLocale);
  }

  useEffect(() => {
    const { dir } = localeMeta[locale];
    const root = document.documentElement;
    root.lang = locale;
    root.dir = dir;
  }, [locale]);

  // Land at the top of the page the language switch has just navigated to.
  useEffect(() => {
    if (!jumpToTopOnNextCommit) return;
    jumpToTopOnNextCommit = false;
    jumpToTop();
  }, [initialLocale, pathname]);

  // Every language has its own URL, so switching navigates instead of swapping
  // strings in place. Search engines get three separate pages to index. The
  // current path is preserved (e.g. /en/projects/enterin -> /nl/projects/enterin)
  // so switching language never drops the visitor back on the home page.
  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      const { dir } = localeMeta[next];
      document.documentElement.lang = next;
      document.documentElement.dir = dir;

      const segments = (pathname ?? "").split("/");
      const rest = segments.slice(2).filter(Boolean).join("/");

      // `scroll: false` hands the scroll position back to us, so the visitor
      // starts at the top of the new language instead of at the footer. Jump
      // straight away for immediate feedback, then again from the effect above
      // once the new locale has rendered.
      jumpToTopOnNextCommit = true;
      jumpToTop();
      router.push(`/${next}${rest ? `/${rest}` : ""}`, { scroll: false });
    },
    [router, pathname]
  );

  const value = useMemo<LocaleContextValue>(() => {
    const { dir } = localeMeta[locale];
    return {
      locale,
      dir,
      axis: dir === "rtl" ? -1 : 1,
      t: copy,
      setLocale,
    };
  }, [locale, copy, setLocale]);

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