import type { Locale, SkillGroupId } from "@/app/content/site";
import en from "@/app/lang/en.json";
import nl from "@/app/lang/nl.json";
import ar from "@/app/lang/ar.json";

export type ProjectCopy = {
  id: string;
  title: string;
  description: string;
};

export type EnterInShotCopy = {
  id: string;
  title: string;
  description: string;
};

export type EnterInChapterCopy = {
  id: string;
  title: string;
  text: string;
  shots: EnterInShotCopy[];
};

export type EnterInMessages = {
  meta: {
    title: string;
    description: string;
  };
  back: string;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    statement: string;
    award: string;
    watch: string;
    download: string;
    facts: string[];
  };
  showcase: {
    eyebrow: string;
    title: string;
    text: string;
    videoCaption: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    text: string;
    hint: string;
    viewLabel: string;
    close: string;
    next: string;
    prev: string;
    chapters: EnterInChapterCopy[];
  };
  download: {
    eyebrow: string;
    title: string;
    text: string;
    button: string;
    note: string;
  };
  footer: {
    back: string;
    rights: string;
  };
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
      theme: {
        label: string;
        system: string;
        light: string;
        dark: string;
      };
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
      caseStudyHost: string;
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
  EnterIn: EnterInMessages;
};

export const locales: Locale[] = ["en", "nl", "ar"];

export const localeMeta: Record<Locale, { label: string; dir: "ltr" | "rtl" }> = {
  en: { label: "EN", dir: "ltr" },
  nl: { label: "NL", dir: "ltr" },
  ar: { label: "AR", dir: "rtl" },
};

export const messages: Record<Locale, Messages> = { en, nl, ar };