import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Portfolio } from "../components/Portfolio";
import { projects, profile, skills, siteUrl } from "@/app/content/site";
import { locales, messages } from "@/app/lib/messages";
import type { Locale } from "@/app/content/site";

export const dynamicParams = false;

const OPEN_GRAPH_LOCALE: Record<Locale, string> = {
  en: "en_US",
  nl: "nl_NL",
  ar: "ar_AR",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messagesForLocale = messages[locale as Locale];
  if (!messagesForLocale) return {};

  const { seo } = messagesForLocale.Home;
  const path = `/${locale}`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: [
      "Karim Matar",
      "full stack developer",
      "full stack developer Belgium",
      "React developer",
      "Next.js developer",
      "Laravel developer",
      "PHP developer",
      "web developer Belgium",
      "freelance developer",
      "portfolio",
      ...skills.map((skill) => skill.name),
    ],
    authors: [{ name: profile.name, url: path }],
    creator: profile.name,
    publisher: profile.name,
    alternates: {
      canonical: path,
      languages: {
        en: "/en",
        nl: "/nl",
        ar: "/ar",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "profile",
      url: path,
      siteName: profile.name,
      title: `${seo.title} · ${profile.name}`,
      description: seo.description,
      locale: OPEN_GRAPH_LOCALE[locale as Locale],
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${profile.name}, ${seo.jobTitle}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${seo.title} · ${profile.name}`,
      description: seo.description,
    },
  };
}

/**
 * Structured data for search engines and AI answer engines. Everything in it
 * is stated plainly on the page, so a crawler can quote it without guessing.
 */
function structuredData(locale: Locale) {
  const { seo } = messages[locale].Home;
  const personId = `${siteUrl}/#person`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      url: `${siteUrl}/${locale}`,
      image: `${siteUrl}/pics/me.jpeg`,
      description: seo.description,
      jobTitle: seo.jobTitle,
      address: {
        "@type": "PostalAddress",
        addressCountry: "BE",
      },
      knowsLanguage: locales,
      knowsAbout: skills.map((skill) => skill.name),
      sameAs: profile.socials.map((social) => social.href),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: profile.name,
      inLanguage: locale,
      publisher: { "@id": personId },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${siteUrl}/${locale}#projects`,
      name: "Projects",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/${locale}`,
        item: {
          "@type": "SoftwareApplication",
          name: project.title,
          description: project.description,
          url: project.link,
          applicationCategory: "WebApplication",
          operatingSystem: "Any",
        },
      })),
    },
  ];
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) notFound();

  const jsonLd = structuredData(locale as Locale)
    .map((entry) => JSON.stringify(entry).replace(/</g, "\\u003c"))
    .join("");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <Portfolio locale={locale as Locale} />
    </>
  );
}