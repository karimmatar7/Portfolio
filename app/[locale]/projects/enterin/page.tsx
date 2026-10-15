import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnterInCase } from "@/app/components/enterin/EnterInCase";
import { enterIn, profile, siteUrl } from "@/app/content/site";
import { messages } from "@/app/lib/messages";
import { ENTERIN_PATHS, OPEN_GRAPH_LOCALE, isLocale, locales } from "@/app/lib/locales";

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

  const copy = messages[locale].EnterIn;
  const path = ENTERIN_PATHS[locale];

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
        ...ENTERIN_PATHS,
        "x-default": ENTERIN_PATHS.en,
      },
    },
    openGraph: {
      type: "article",
      url: path,
      siteName: profile.name,
      title: copy.meta.title,
      description: copy.meta.description,
      locale: OPEN_GRAPH_LOCALE[locale],
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
  if (!isLocale(locale)) notFound();

  const copy = messages[locale].EnterIn;
  const path = ENTERIN_PATHS[locale];

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
      <EnterInCase locale={locale} copy={messages[locale]} />
    </>
  );
}
