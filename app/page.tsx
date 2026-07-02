"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import enMessages from "./lang/en.json";
import nlMessages from "./lang/nl.json";
import arMessages from "./lang/ar.json";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactForm } from "./components/ContactForm";
import { SkillsCarousel } from "./components/SkillsCarousel";
import { SocialLinks } from "./components/SocialLinks";

const pageVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1] as const,  // key change
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};


const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,   // key change
    },
  },
};

export default function Home() {
  const locales = {
    en: enMessages,
    nl: nlMessages,
    ar: arMessages,
  };

  const [locale, setLocale] = useState<"en" | "nl" | "ar">("en");
  const t = locales[locale].Home;
  const isRtl = locale === "ar";

  return (
 <main
  className={`min-h-screen bg-slate-950 text-slate-100 px-3 sm:px-4 py-8 sm:py-10 ${
    isRtl ? "text-right" : "text-left"
  }`}
  dir={isRtl ? "rtl" : "ltr"}
>
  <motion.div
    className="mx-auto w-full max-w-6xl space-y-16 sm:space-y-20"
    variants={pageVariants}
    initial="hidden"
    animate="visible"
  >
        {/* Header bar */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold">
              K
            </div>
            <div className="text-xs font-semibold tracking-[0.2em] text-slate-500">
              {t.brandLabel /* e.g. "PORTFOLIO" */}
            </div>
          </div>

          <div className="flex gap-2">
            {["en", "nl", "ar"].map((lng) => (
              <button
                key={lng}
                onClick={() => setLocale(lng as "en" | "nl" | "ar")}
                className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                  locale === lng
                    ? "border-red-500 bg-red-500/10 text-red-300"
                    : "border-slate-700 text-slate-400 hover:border-red-500/60 hover:text-red-200"
                }`}
              >
                {lng === "en" ? "EN" : lng === "nl" ? "NL" : "AR"}
              </button>
            ))}
          </div>
        </header>

        {/* HERO */}
    <motion.section
  className="flex flex-col gap-8 md:grid md:gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center"
  variants={sectionVariants}
>
          <div className="space-y-6">
            <p className="text-sm font-semibold text-red-400 uppercase tracking-[0.25em]">
              {t.tagline}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              {t.headline}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl">
              {t.subtext}
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <motion.a
                href="#projects"
                className="inline-flex items-center rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-red-400 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
              >
                {t.heroPrimaryCta}
              </motion.a>
              <motion.a
                href="#contact"
                className="inline-flex items-center rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-red-400 hover:text-red-200 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
              >
                {t.heroSecondaryCta}
              </motion.a>
            </div>
          </div>

          {/* Photo + mini info */}
          <motion.div
            className={`flex ${
              isRtl
                ? "justify-start md:justify-start"
                : "justify-center md:justify-end"
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <motion.div
              className="relative h-52 w-52 sm:h-60 sm:w-60 rounded-3xl border border-slate-800 bg-slate-900/80 shadow-[0_0_50px_rgba(248,113,113,0.45)] overflow-hidden"
              whileHover={{
                scale: 1.03,
                y: -4,
                boxShadow: "0 0 70px rgba(248,113,113,0.65)",
              }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              <Image
                src="/pics/me.jpeg"
                alt={t.photoAlt}  // e.g. "Karim Matar"
                width={240}
                height={240}
                className="h-full w-full object-cover"
                loading="eager"
              />
      
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ABOUT + SKILLS */}
<motion.section
  className="space-y-10"
  variants={sectionVariants}
>
  <div className="space-y-3 max-w-2xl">
    <h2 className="text-lg font-semibold text-slate-100">
      {t.aboutTitle}
    </h2>
    <p className="text-sm text-slate-300">
      {t.aboutText}
    </p>
  </div>
  <div className="flex justify-center">
    <SkillsCarousel
      messages={{
        skillsTitle: t.skillsTitle,
        skills: t.skills, // now an array of { name, logoSrc }
      }}
    />
  </div>
</motion.section>

        {/* PROJECTS */}
        <ProjectsSection
          messages={{
            projectsTitle: t.projectsTitle,
            projects: t.projects,
    projectsVisitLabel: t.projectsVisitLabel,
          }}
        />

        {/* CONTACT */}
        <ContactForm
          messages={{
            contactTitle: t.contactTitle,
            contactIntro: t.contactIntro,
            contactNameLabel: t.contactNameLabel,
            contactEmailLabel: t.contactEmailLabel,
            contactMessageLabel: t.contactMessageLabel,
            contactButton: t.contactButton,
            contactSuccess: t.contactSuccess,
            contactError: t.contactError,
          }}
        />

<motion.section variants={sectionVariants}>
<SocialLinks socialTitle={t.socialTitle} />
</motion.section>

      </motion.div>
    </main>
  );
}