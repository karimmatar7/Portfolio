"use client";

import { motion } from "framer-motion";
import { profile } from "@/app/content/site";
import { useLocale } from "./LocaleProvider";
import { ArrowUpRight } from "./Icons";
import { MaskedText } from "./ui/Reveal";

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="px-5 pb-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="border-t border-rule pt-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="font-display text-display leading-[1.02] text-ink">
              <MaskedText text={t.contact.title} animate stagger={0.05} />
            </h2>

            <motion.a
              href="#top"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {t.footer.backToTop}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:scale-x-[-1]" />
            </motion.a>
          </div>

          <p
            className="mt-10 select-none font-display text-[clamp(2.25rem,10vw,7rem)] leading-[0.9] tracking-[-0.02em] text-ink/85"
            aria-hidden="true"
          >
            <span className="text-accent">{profile.name.charAt(0)}</span>
            {profile.name.slice(1)}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="meta text-ink-mute">{`© ${year} ${profile.name}`}</p>
          <p className="meta text-ink-mute">{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}