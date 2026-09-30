"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { skills } from "@/app/content/site";
import { useLocale } from "./LocaleProvider";
import { Reveal } from "./ui/Reveal";
import { Rule, SectionHeading } from "./ui/SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

const GROUPS = ["frontend", "backend", "tooling"] as const;

export function AboutAndStack() {
  const { t } = useLocale();
  const reduce = useReducedMotion();

  const grouped = GROUPS.map((id) => ({
    id,
    label: t.stack.groups[id],
    items: skills.filter((skill) => skill.group === id),
  }));

  return (
    <section id="about" className="scroll-mt-28 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />
          <Rule className="mt-10" />
          <div className="mt-8 space-y-6">
            {t.about.body.map((text, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
                  {text}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <blockquote className="mt-12 border-s-2 border-accent/70 bg-accent-tint/40 px-6 py-5">
              <p className="font-display text-xl italic leading-relaxed text-ink sm:text-2xl">
                {t.about.pullQuote}
              </p>
            </blockquote>
          </Reveal>
        </div>

        <div id="stack" className="scroll-mt-28">
          <SectionHeading eyebrow={t.stack.eyebrow} title={t.stack.title} />
          <Rule className="mt-10" />
          <Reveal delay={0.05}>
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              {t.stack.text}
            </p>
          </Reveal>

          <div className="mt-10 space-y-10">
            {grouped.map((group, g) => (
              <Reveal key={group.id} delay={g * 0.08}>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="meta text-ink-mute">{group.label}</h3>
                    <span className="meta text-ink-mute">
                      {group.items.length}
                    </span>
                  </div>
                  <Rule className="mt-3" />
                  <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
                    {group.items.map((skill, i) => (
                      <motion.div
                        key={skill.id}
                        className="group inline-flex items-center gap-2.5 border border-rule bg-surface px-3 py-2 transition-all duration-300 hover:border-ink/30"
                        initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: reduce ? 0.01 : 0.4,
                          delay: g * 0.05 + i * 0.01,
                          ease: EASE,
                        }}
                        whileHover={{ y: -2 }}
                      >
                        <span className="relative grid h-7 w-7 place-items-center">
                          <span className="absolute inset-0 bg-ink/5" />
                          <Image
                            src={skill.logoSrc}
                            alt=""
                            width={20}
                            height={20}
                            loading="lazy"
                            className="h-5 w-5 object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                        </span>
                        <span className="text-sm text-ink">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}