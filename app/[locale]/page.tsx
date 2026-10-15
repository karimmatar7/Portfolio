import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Portfolio } from "../components/Portfolio";
import { projects, profile, skills, siteUrl } from "@/app/content/site";
import { messages } from "@/app/lib/messages";
import {
  HOME_ALTERNATES,
  OPEN_GRAPH_LOCALE,
  homePath,
  isLocale,
  locales,
} from "@/app/lib/locales";
import type { Locale } from "@/app/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const messagesForLocale = messages[locale];

  const { seo } = messagesForLocale.Home;
  const path = homePath(locale);

  return {
    title: { absolute: `${seo.title} · ${profile.name}` },
    description: seo.description,
    keywords: [
      "Karim Matar",
      "full stack developer",
      "React developer",
      "Next.js developer",
      "Laravel developer",
      "PHP developer",
      "web developer",
      "freelance developer",
      "portfolio",
      ...skills.map((skill) => skill.name),
    ],
    authors: [{ name: profile.name, url: path }],
    creator: profile.name,
    publisher: profile.name,
    alternates: {
      canonical: path,
      languages: HOME_ALTERNATES,
    },
    openGraph: {
      type: "profile",
      url: path,
      siteName: profile.name,
      title: `${seo.title} · ${profile.name}`,
      description: seo.description,
      locale: OPEN_GRAPH_LOCALE[locale],
      images: [
        {
          url: `${path}/opengraph-image`,
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
      images: [`${path}/opengraph-image`],
    },
  };
}

/**
 * schema.org data for the site: the person, the site itself, and the project
 * list. The values come from the same content the page renders.
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

  if (!isLocale(locale)) notFound();

  const jsonLd = structuredData(locale)
    .map((entry) => JSON.stringify(entry).replace(/</g, "\\u003c"))
    .join("");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <Portfolio locale={locale} copy={messages[locale].Home} />
    </>
  );
}