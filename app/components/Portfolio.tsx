"use client";

import type { Locale } from "@/app/content/site";
import type { Messages } from "@/app/lib/messages";
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

export function Portfolio({
  locale,
  copy,
}: {
  locale: Locale;
  copy: Messages["Home"];
}) {
  return (
    <LocaleProvider locale={locale} copy={copy}>
      <Shell />
    </LocaleProvider>
  );
}