import type { MetadataRoute } from "next";
import { siteUrl } from "@/app/content/site";
import { locales } from "@/app/lib/messages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${siteUrl}/${locale}`])
  );
  const caseStudyLanguages = Object.fromEntries(
    locales.map((locale) => [locale, `${siteUrl}/${locale}/projects/enterin`])
  );

  const home: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: locale === "en" ? 1 : 0.9,
    alternates: { languages: { ...languages, "x-default": `${siteUrl}/en` } },
  }));

  const caseStudy: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${siteUrl}/${locale}/projects/enterin`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: {
      languages: { ...caseStudyLanguages, "x-default": `${siteUrl}/en/projects/enterin` },
    },
  }));

  return [...home, ...caseStudy];
}