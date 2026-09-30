"use client";

import type { Locale } from "@/app/content/site";
import { LocaleProvider, useLocale } from "./LocaleProvider";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Marquee } from "./Marquee";
import { Projects } from "./Projects";
import { AboutAndStack } from "./AboutAndStack";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

function Shell() {
  const { t } = useLocale();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        {t.nav.skipToContent}
      </a>

      <Nav copy={t.nav} />

      <main id="main" className="flex-1">
        <Hero />
        <Marquee />
        <Projects />
        <AboutAndStack />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export function Portfolio({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider locale={locale}>
      <Shell />
    </LocaleProvider>
  );
}