"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Locale } from "@/app/content/site";
import { enterIn, profile } from "@/app/content/site";
import { messages } from "@/app/lib/messages";
import { EASE } from "@/app/lib/motion";
import { LocaleProvider, useLocale } from "../LocaleProvider";
import { LocaleSwitch } from "../Nav";
import { ThemeSwitch } from "../ThemeSwitch";
import { ArrowRight, ArrowUpRight, DownloadIcon, PlayIcon } from "../Icons";
import { MaskedText, Reveal } from "../ui/Reveal";
import { Rule, SectionHeading } from "../ui/SectionHeading";
import { EnterInGallery } from "./EnterInGallery";

function Shell() {
  const { locale } = useLocale();
  const reduce = useReducedMotion();
  const copy = messages[locale].EnterIn;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3.5 sm:px-8">
          <a
            href={`/${locale}`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink"
          >
            <ArrowRight className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5 rtl:rotate-0 rtl:group-hover:translate-x-0.5" />
            <span className="hidden sm:inline">{copy.back}</span>
          </a>

          <div className="flex items-center gap-2">
            <LocaleSwitch />
            <ThemeSwitch />
            <a
              href={enterIn.downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[0.8125rem] font-medium text-paper transition-colors duration-300 hover:bg-accent md:inline-flex"
            >
              {copy.hero.download}
              <DownloadIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      <main id="main" className="flex-1">
        <section className="relative isolate overflow-hidden bg-solid-ink text-solid-paper">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(55rem_28rem_at_50%_-5%,rgba(198,64,45,0.22),transparent_60%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(45rem_28rem_at_50%_0%,black,transparent_75%)]" />
          </div>

          <div className="mx-auto flex max-w-6xl flex-col items-center px-5 pt-32 pb-16 text-center sm:px-8 sm:pt-44 sm:pb-24">
            <motion.p
              className="meta mt-8 text-solid-paper/60"
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            >
              {copy.hero.eyebrow}
            </motion.p>

            <h1 className="mt-4 font-display text-hero leading-[0.92] tracking-[-0.02em] text-solid-paper">
              <MaskedText text={copy.hero.title} animate stagger={0.06} />
            </h1>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            >
              <Image
                src={enterIn.heroImage}
                alt="Unreal Engine 5"
                width={642}
                height={525}
                unoptimized
                priority
                className="h-40 w-auto max-w-[85vw] object-contain [filter:brightness(0)_invert(1)] drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)] sm:h-56"
              />
            </motion.div>

            <p className="mt-10 max-w-2xl text-base leading-relaxed text-solid-paper/80 pretty sm:text-lg">
              {copy.hero.lead}
            </p>

            <motion.p
              className="mt-6 max-w-3xl text-base leading-relaxed text-solid-paper/70 pretty sm:text-lg"
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
            >
              {copy.hero.statement}
            </motion.p>

            <motion.div
              className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-2"
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
            >
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              <span className="text-sm font-medium text-solid-paper">
                {copy.hero.award}
              </span>
            </motion.div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
              <motion.a
                href="#video"
                className="group inline-flex items-center gap-2 rounded-full bg-solid-paper px-6 py-3 text-sm font-medium text-solid-ink transition-colors duration-300 hover:bg-accent hover:text-solid-paper"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <PlayIcon className="h-3.5 w-3.5 text-accent transition-colors group-hover:text-solid-paper" />
                {copy.hero.watch}
              </motion.a>

              <motion.a
                href={enterIn.downloadUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-medium text-solid-paper"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="link-underline">{copy.hero.download}</span>
                <DownloadIcon className="h-4 w-4 text-accent" />
              </motion.a>
            </div>

            <dl className="mt-14 grid w-full max-w-3xl grid-cols-1 gap-y-6 border-t border-white/15 pt-8 sm:grid-cols-3">
              {copy.hero.facts.map((fact) => (
                <motion.div
                  key={fact}
                  initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
                >
                  <dt className="meta text-solid-paper/50">EnterIn</dt>
                  <dd className="mt-2 font-display text-2xl leading-none text-solid-paper sm:text-3xl">
                    {fact}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </section>

        <section
          id="video"
          className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow={copy.showcase.eyebrow}
              title={copy.showcase.title}
              className="max-w-3xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-soft pretty sm:text-base">
                {copy.showcase.text}
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <figure className="group relative">
                <div className="relative overflow-hidden border border-rule bg-solid-ink">
                  <video
                    className="aspect-video w-full bg-black object-contain"
                    src={enterIn.videoSrc}
                    poster={enterIn.videoPoster}
                    controls
                    playsInline
                    preload="metadata"
                  />
                </div>
                <figcaption className="mt-4 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  <span className="meta text-ink-mute">
                    {copy.showcase.videoCaption}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow={copy.gallery.eyebrow}
                title={copy.gallery.title}
                className="max-w-3xl"
              />
              <Reveal delay={0.15} className="shrink-0">
                <span className="inline-flex items-center gap-2 rounded-full border border-rule bg-surface px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  <span className="meta text-ink-mute">{copy.gallery.hint}</span>
                </span>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-soft pretty sm:text-base">
                {copy.gallery.text}
              </p>
            </Reveal>

            <Rule className="mt-10" />

            <div className="pt-12">
              <EnterInGallery copy={copy.gallery} chapters={enterIn.chapters} />
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8 sm:pb-32">
          <div className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden border border-rule bg-surface p-8 sm:p-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_20rem_at_100%_0%,var(--color-accent-tint),transparent_60%)]" />
              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <p className="meta text-accent">{copy.download.eyebrow}</p>
                  <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
                    {copy.download.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft pretty sm:text-base">
                    {copy.download.text}
                  </p>
                </div>

                <div className="shrink-0">
                  <motion.a
                    href={enterIn.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-sm font-medium text-paper transition-colors duration-300 hover:bg-accent"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <DownloadIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                    {copy.download.button}
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-5 pb-10 sm:px-8">
        <div className="mx-auto max-w-6xl border-t border-rule pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={`/${locale}`}
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
            >
              <ArrowRight className="h-4 w-4 rotate-180 rtl:rotate-0" />
              {copy.footer.back}
              <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
            </a>
            <p className="meta text-ink-mute">
              {`© ${enterIn.year} ${profile.name}`} · {copy.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export function EnterInCase({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider locale={locale}>
      <Shell />
    </LocaleProvider>
  );
}
