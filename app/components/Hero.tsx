"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile, projects, skills } from "@/app/content/site";
import { locales } from "@/app/lib/messages";
import { EASE } from "@/app/lib/motion";
import { useLocale } from "./LocaleProvider";
import { ArrowRight, ArrowUpRight } from "./Icons";
import { MaskedText } from "./ui/Reveal";
import { Magnetic } from "./ui/Magnetic";

function RoleRotator() {
  const { t, axis } = useLocale();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const roles = t.hero.roles;
  const longest = roles.reduce((a, b) => (b.length > a.length ? b : a), "");

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % roles.length),
      2900
    );
    return () => window.clearInterval(id);
  }, [reduce, roles.length]);

  return (
    <span className="relative inline-block whitespace-nowrap align-baseline">
      {/* invisible sizer keeps the line from jumping as words change length */}
      <span className="invisible" aria-hidden="true">
        {longest}
      </span>
      <span
        className="absolute inset-0 flex items-baseline"
        aria-hidden="true"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`${index}-${roles[index]}`}
            className="font-display italic text-accent"
            initial={{ opacity: 0, y: reduce ? 0 : axis * 0.5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : axis * -0.5 }}
            transition={{ duration: reduce ? 0.01 : 0.55, ease: EASE }}
          >
            {roles[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

export function Hero() {
  const { t } = useLocale();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 54]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.94]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0.25]);

  const stats = [
    { value: projects.length, label: t.hero.stats[0] },
    { value: skills.length, label: t.hero.stats[1] },
    { value: locales.length, label: t.hero.stats[2] },
  ];

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative grain overflow-hidden px-5 pt-28 pb-16 sm:px-8 sm:pt-36 sm:pb-20 lg:pt-40"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(60rem_32rem_at_75%_-10%,var(--color-accent-tint),transparent_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-rule-soft)_1px,transparent_1px)] bg-[size:5.5rem_100%] opacity-45" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <motion.div style={{ opacity: textOpacity }} className="order-2 lg:order-1">
          <motion.div
            className="inline-flex items-center gap-2.5 rounded-full border border-rule bg-surface/70 px-3 py-1.5"
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="meta text-ink-soft">{t.hero.availability}</span>
          </motion.div>

          <p className="meta mt-8 text-ink-mute">{t.hero.eyebrow}</p>

          <h1 className="mt-4 font-display text-hero leading-[0.92] tracking-[-0.02em] text-ink">
            <MaskedText text={t.hero.headlineLead} animate stagger={0.07} />
            {/* the rotator is decorative: screen readers get the whole list once
                instead of a word that changes every few seconds */}
            <span className="sr-only">{t.hero.headlineAccessible}</span>
            <span className="mt-1 block text-[clamp(1.5rem,5vw,3.25rem)] leading-[1.05]">
              <RoleRotator />
            </span>
          </h1>

          <motion.p
            className="mt-8 max-w-xl text-base leading-relaxed pretty text-ink-soft sm:text-lg"
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          >
            {t.hero.subtext}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.62 }}
          >
            <Magnetic>
              <motion.a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors duration-300 hover:bg-accent"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {t.hero.ctaPrimary}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                />
              </motion.a>
            </Magnetic>

            <motion.a
              href="#contact"
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="link-underline">{t.hero.ctaSecondary}</span>
              <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="order-1 lg:order-2"
          style={{ y: portraitY, scale: portraitScale }}
          initial={{ opacity: 0, y: reduce ? 0 : 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
        >
          <figure className="group relative mx-auto w-full max-w-sm lg:max-w-none">
            <span
              className="absolute -inset-2 -z-10 border border-rule transition-transform duration-700 ease-editorial group-hover:-translate-x-1.5 group-hover:-translate-y-1.5"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/5] overflow-hidden bg-surface">
              <Image
                src={profile.photoSrc}
                alt={t.hero.photoAlt}
                fill
                priority
                sizes="(max-width: 1024px) 320px, 380px"
                className="object-cover object-top transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-4">
              <span className="meta text-ink-mute">{t.hero.photoCaption}</span>
              <span className="meta text-ink-mute">{profile.location}</span>
            </figcaption>
          </figure>
        </motion.div>
      </div>

      <motion.dl
        className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-y-8 border-t border-rule pt-8 sm:mt-20 sm:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={{
              hidden: { opacity: 0, y: reduce ? 0 : 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
            className="flex items-baseline gap-3 sm:flex-col sm:gap-2"
          >
            <dt className="sr-only">{stat.label}</dt>
            <dd className="font-display text-5xl leading-none text-ink tabular-nums sm:text-6xl">
              {String(stat.value).padStart(2, "0")}
            </dd>
            <span aria-hidden="true" className="meta max-w-[16rem] text-ink-mute">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}