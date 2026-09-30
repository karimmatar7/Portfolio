"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { cx } from "@/app/lib/cx";
import { profile } from "@/app/content/site";
import { localeMeta, locales, type Messages } from "@/app/lib/messages";
import { useLocale } from "./LocaleProvider";
import { ArrowUpRight, CloseIcon, MenuIcon } from "./Icons";

type NavCopy = Messages["Home"]["nav"];

const SECTIONS = ["work", "about", "stack", "contact"] as const;

function useActiveSection() {
  const [active, setActive] = useState<string>(SECTIONS[0]);

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      const line = window.innerHeight * 0.34;
      let current: string = SECTIONS[0];

      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 12;
      if (atBottom) current = SECTIONS[SECTIONS.length - 1];

      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return active;
}

function LocaleSwitch({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className={cx(
        "relative flex items-center rounded-full border border-rule bg-surface/70 p-0.5",
        compact && "bg-transparent"
      )}
      role="group"
    >
      {locales.map((lng) => {
        const isActive = locale === lng;
        return (
          <button
            key={lng}
            type="button"
            onClick={() => setLocale(lng)}
            aria-pressed={isActive}
            className={cx(
              "relative rounded-full px-2.5 py-1 transition-colors",
              isActive ? "text-paper" : "text-ink-mute hover:text-ink"
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="locale-pill"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
            <span className="meta relative">{localeMeta[lng].label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Nav({ copy }: { copy: NavCopy }) {
  const { t, dir } = useLocale();
  const reduce = useReducedMotion();
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.4,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const links = [
    { id: SECTIONS[0], label: copy.work },
    { id: SECTIONS[1], label: copy.about },
    { id: SECTIONS[2], label: copy.stack },
    { id: SECTIONS[3], label: copy.contact },
  ];

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={reduce ? false : { y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        <div
          className={cx(
            "transition-[background-color,border-color,backdrop-filter] duration-500",
            scrolled
              ? "border-b border-rule bg-paper/85 backdrop-blur-md"
              : "border-b border-transparent bg-transparent"
          )}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8 sm:py-4">
            <a
              href="#top"
              className="group flex items-center gap-2.5"
              aria-label={`${profile.name} — ${t.brand}`}
            >
              <span className="flex h-8 w-8 items-center justify-center border border-ink/80 bg-ink text-paper transition-colors duration-300 group-hover:border-accent group-hover:bg-accent">
                <span className="font-display text-base italic leading-none">
                  {profile.shortName.charAt(0)}
                </span>
              </span>
              <span className="meta hidden text-ink-mute sm:block">{t.brand}</span>
            </a>

            <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
              {links.map((link) => {
                const isActive = active === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className={cx(
                      "relative rounded-full px-3.5 py-2 text-[0.8125rem] font-medium transition-colors",
                      isActive ? "text-ink" : "text-ink-mute hover:text-ink"
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-ink/5"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative">{link.label}</span>
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <LocaleSwitch />
              </div>
              <a
                href="#contact"
                className="hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[0.8125rem] font-medium text-paper transition-colors duration-300 hover:bg-accent md:inline-flex"
              >
                {t.hero.ctaSecondary}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label={copy.menu}
                aria-expanded={menuOpen}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink transition-colors hover:border-ink md:hidden"
              >
                <MenuIcon />
              </button>
            </div>
          </div>

          <motion.div
            className="h-px origin-left bg-ink/70 rtl:origin-right"
            style={{ scaleX: progress }}
            aria-hidden="true"
          />
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="menu"
            className="fixed inset-0 z-[60] flex flex-col bg-paper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-5 py-3.5 sm:px-8">
              <span className="meta text-ink-mute">{t.brand}</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={copy.close}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink"
              >
                <CloseIcon />
              </button>
            </div>

            <nav
              className="flex flex-1 flex-col justify-center gap-1 px-5 sm:px-8"
              aria-label="Sections"
            >
              {links.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-4 border-b border-rule py-4 font-display text-4xl text-ink transition-colors hover:text-accent sm:text-5xl"
                  initial={{ opacity: 0, x: dir === "rtl" ? 28 : -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.08 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <span className="meta text-accent">
                    0{i + 1}
                  </span>
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center justify-between gap-4 px-5 py-6 sm:px-8">
              <LocaleSwitch compact />
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper"
              >
                {t.hero.ctaSecondary}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}