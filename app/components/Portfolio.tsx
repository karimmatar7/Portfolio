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