import type { Locale, SkillGroupId } from "@/app/content/site";
import en from "@/app/lang/en.json";
import nl from "@/app/lang/nl.json";
import ar from "@/app/lang/ar.json";

export type ProjectCopy = {
  id: string;
  title: string;
  description: string;
};

export type Messages = {
  Home: {
    brand: string;
    seo: {
      title: string;
      jobTitle: string;
      description: string;
    };
    nav: {
      work: string;
      about: string;
      stack: string;
      contact: string;
      menu: string;
      close: string;
    };
    hero: {
      eyebrow: string;
      headlineLead: string;
      headlineAccessible: string;
      roles: string[];
      subtext: string;
      availability: string;
      ctaPrimary: string;
      ctaSecondary: string;
      photoAlt: string;
      photoCaption: string;
      stats: string[];
    };
    projects: {
      eyebrow: string;
      title: string;
      text: string;
      showcaseView: string;
      indexView: string;
      visitLabel: string;
      repoLabel: string;
      list: ProjectCopy[];
    };
    about: {
      eyebrow: string;
      title: string;
      body: string[];
      pullQuote: string;
    };
    stack: {
      eyebrow: string;
      title: string;
      text: string;
      groups: Record<SkillGroupId, string>;
    };
    contact: {
      eyebrow: string;
      title: string;
      intro: string;
      nameLabel: string;
      emailLabel: string;
      messageLabel: string;
      messageHint: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      required: string;
      invalidEmail: string;
      button: string;
      sending: string;
      success: string;
      error: string;
      sendAnother: string;
      socialTitle: string;
    };
    footer: {
      backToTop: string;
      rights: string;
    };
  };
};

export const locales: Locale[] = ["en", "nl", "ar"];

export const localeMeta: Record<Locale, { label: string; dir: "ltr" | "rtl" }> = {
  en: { label: "EN", dir: "ltr" },
  nl: { label: "NL", dir: "ltr" },
  ar: { label: "AR", dir: "rtl" },
};

export const messages: Record<Locale, Messages> = { en, nl, ar };

export const defaultLocale: Locale = "en";