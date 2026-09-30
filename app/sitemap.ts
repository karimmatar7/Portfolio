import type { MetadataRoute } from "next";
import { siteUrl } from "@/app/content/site";
import { locales } from "@/app/lib/messages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${siteUrl}/${locale}`])
  );

  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: locale === "en" ? 1 : 0.9,
    alternates: { languages: { ...languages, "x-default": `${siteUrl}/en` } },
  }));
}