import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnterInCase } from "@/app/components/enterin/EnterInCase";
import { enterIn, profile, siteUrl } from "@/app/content/site";
import type { Locale } from "@/app/content/site";
import { locales, messages } from "@/app/lib/messages";

export const dynamicParams = false;

const OPEN_GRAPH_LOCALE: Record<Locale, string> = {
  en: "en_US",
  nl: "nl_NL",
  ar: "ar_AR",
};

const PATHS: Record<Locale, string> = {
  en: "/en/projects/enterin",
  nl: "/nl/projects/enterin",
  ar: "/ar/projects/enterin",
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
  const copy = messages[locale as Locale]?.EnterIn;
  if (!copy) return {};

  const path = PATHS[locale as Locale];

  return {
    title: copy.meta.title,
    description: copy.meta.description,
    keywords: [
      "EnterIn",
      "Unreal Engine 5",
      "UE5 game",
      "Insidious game",
      "horror experience",
      "Artevelde University",
      profile.name,
    ],
    authors: [{ name: profile.name, url: path }],
    alternates: {
      canonical: path,
      languages: {
        ...PATHS,
        "x-default": PATHS.en,
      },
    },
    openGraph: {
      type: "article",
      url: path,
      siteName: profile.name,
      title: copy.meta.title,
      description: copy.meta.description,
      locale: OPEN_GRAPH_LOCALE[locale as Locale],
      images: [
        {
          url: enterIn.ogImage,
          width: 2560,
          height: 1440,
          alt: copy.hero.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.meta.title,
      description: copy.meta.description,
      images: [enterIn.ogImage],
    },
  };
}

export default async function EnterInPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const copy = messages[locale as Locale].EnterIn;
  const path = PATHS[locale as Locale];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: copy.hero.title,
    description: copy.meta.description,
    url: `${siteUrl}${path}`,
    image: `${siteUrl}${enterIn.ogImage}`,
    inLanguage: locale,
    applicationCategory: "Game",
    operatingSystem: "Windows",
    gamePlatform: "Unreal Engine 5",
    datePublished: enterIn.year,
    author: {
      "@type": "Person",
      name: profile.name,
      url: `${siteUrl}/${locale}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <EnterInCase locale={locale as Locale} />
    </>
  );
}
