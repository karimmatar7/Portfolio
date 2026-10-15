import type { Locale } from "@/app/content/site";

/**
 * Locale facts and per-locale paths.
 *
 * Kept separate from `messages.ts` on purpose: this module has no JSON imports,
 * so client components can read the locale list without pulling every language
 * pack into the browser bundle.
 */
export const locales: Locale[] = ["en", "nl", "ar"];

export const localeMeta: Record<Locale, { label: string; dir: "ltr" | "rtl" }> = {
  en: { label: "EN", dir: "ltr" },
  nl: { label: "NL", dir: "ltr" },
  ar: { label: "AR", dir: "rtl" },
};

/** Open Graph locale codes used in page metadata. */
export const OPEN_GRAPH_LOCALE: Record<Locale, string> = {
  en: "en_US",
  nl: "nl_NL",
  ar: "ar_AR",
};

/** Canonical path per locale for the home page. */
export const homePath = (locale: Locale) => `/${locale}`;

/** Canonical path per locale for the EnterIn case study. */
export const ENTERIN_PATHS: Record<Locale, string> = {
  en: "/en/projects/enterin",
  nl: "/nl/projects/enterin",
  ar: "/ar/projects/enterin",
};

/** hreflang alternates for the home page. */
export const HOME_ALTERNATES: Record<string, string> = {
  en: "/en",
  nl: "/nl",
  ar: "/ar",
  "x-default": "/en",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
