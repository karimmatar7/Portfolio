"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { projectHost, projects, type Project } from "@/app/content/site";
import { cx } from "@/app/lib/cx";
import { useLocale } from "./LocaleProvider";
import { ArrowUpRight, BrandIcon, GridIcon, ListIcon } from "./Icons";
import { Reveal } from "./ui/Reveal";
import { Rule, SectionHeading } from "./ui/SectionHeading";
import { ProjectArtwork } from "./ui/ProjectArtwork";

const EASE = [0.16, 1, 0.3, 1] as const;
const SPRING = { stiffness: 200, damping: 20, mass: 0.5 } as const;

type Item = Project & { host: string };

type View = "showcase" | "index";

function ShowcaseCard({ item, featured }: { item: Item; featured: boolean }) {
  const { t } = useLocale();
  const reduce = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, SPRING);
  const springY = useSpring(rotateY, SPRING);

  return (
    <motion.article
      className={cx(
        "group relative isolate flex flex-col overflow-hidden border border-rule bg-surface transition-colors duration-500 hover:border-ink/25",
        featured && "lg:flex-row"
      )}
      style={
        reduce
          ? undefined
          : {
              rotateX: springX,
              rotateY: springY,
              transformPerspective: 1100,
            }
      }
      onPointerMove={(event) => {
        if (reduce || event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        rotateY.set(px * 6);
        rotateX.set(-py * 6);
        event.currentTarget.style.setProperty(
          "--mx",
          `${event.clientX - rect.left}px`
        );
        event.currentTarget.style.setProperty(
          "--my",
          `${event.clientY - rect.top}px`
        );
      }}
      onPointerLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
    >
      <div
        className={cx(
          "relative overflow-hidden",
          featured ? "aspect-[16/10] lg:aspect-auto lg:w-[52%]" : "aspect-[16/10]"
        )}
      >
        <ProjectArtwork seed={item.seed} index={item.index} title={item.title} />
        <div className="pointer-events-none absolute inset-0 spotlight opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div
        className={cx(
          "relative flex flex-1 flex-col",
          featured ? "justify-center gap-5 p-7 sm:p-10" : "gap-4 p-6"
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <span className="meta text-ink-mute">{item.index}</span>
          <div className="flex items-center gap-4">
            {item.repo ? (
              <a
                href={item.repo}
                target="_blank"
                rel="noreferrer"
                className="group/repo inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink-mute transition-colors hover:text-ink"
              >
                <BrandIcon name="github" className="h-4 w-4" />
                {t.projects.repoLabel}
              </a>
            ) : null}
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="group/visit inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink transition-colors hover:text-accent"
            >
              {t.projects.visitLabel}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/visit:translate-x-0.5 group-hover/visit:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <h3
          className={cx(
            "font-display leading-[1.05] text-ink transition-colors duration-500 group-hover:text-accent",
            featured ? "text-4xl sm:text-5xl" : "text-3xl"
          )}
        >
          {item.title}
        </h3>

        <p
          className={cx(
            "text-ink-soft pretty",
            featured ? "max-w-lg text-base leading-relaxed" : "text-sm leading-relaxed"
          )}
        >
          {item.description}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-6">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
          <span className="meta truncate text-ink-mute">{item.host}</span>
        </div>
      </div>
    </motion.article>
  );
}

function IndexRow({ item }: { item: Item }) {
  const { t } = useLocale();

  return (
    <li className="border-t border-rule">
      <div className="group grid items-center gap-x-6 gap-y-3 py-7 sm:grid-cols-[2.5rem_minmax(0,1fr)_11rem_auto]">
        <span className="meta text-ink-mute transition-colors duration-300 group-hover:text-accent">
          {item.index}
        </span>

        <div className="min-w-0">
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="inline-block"
          >
            <h3 className="font-display text-3xl leading-tight text-ink transition-transform duration-500 ease-editorial group-hover:translate-x-2 rtl:group-hover:-translate-x-2 sm:text-4xl">
              {item.title}
            </h3>
          </a>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
            {item.description}
          </p>
        </div>

        <div className="relative hidden h-24 w-full overflow-hidden border border-rule opacity-0 transition-all duration-500 ease-editorial group-hover:scale-100 group-hover:opacity-100 sm:block sm:scale-95">
          <ProjectArtwork seed={item.seed} index={item.index} title={item.title} />
        </div>

        <span className="inline-flex items-center gap-3 text-ink-mute sm:justify-self-end">
          {item.repo ? (
            <a
              href={item.repo}
              target="_blank"
              rel="noreferrer"
              aria-label={t.projects.repoLabel}
              className="inline-flex items-center text-ink-mute transition-colors hover:text-ink"
            >
              <BrandIcon name="github" className="h-4 w-4" />
            </a>
          ) : null}
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-ink-mute transition-colors hover:text-accent"
          >
            <span className="meta hidden max-w-[10rem] truncate md:inline">
              {item.host}
            </span>
            <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="sr-only">{t.projects.visitLabel}</span>
          </a>
        </span>
      </div>
    </li>
  );
}

export function Projects() {
  const { t } = useLocale();
  const reduce = useReducedMotion();
  const copy = t.projects;
  const [view, setView] = useState<View>("showcase");

  const items: Item[] = projects.map((project) => {
    const localized = copy.list.find((entry) => entry.id === project.id);
    return {
      ...project,
      title: localized?.title ?? project.title,
      description: localized?.description ?? project.description,
      host: projectHost(project.link),
    };
  });

  const [featured, ...rest] = items;

  const views: { id: View; label: string; icon: typeof GridIcon }[] = [
    { id: "showcase", label: copy.showcaseView, icon: GridIcon },
    { id: "index", label: copy.indexView, icon: ListIcon },
  ];

  return (
    <section id="work" className="scroll-mt-28 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
            className="sm:max-w-2xl"
          />
          <Reveal delay={0.15} className="shrink-0">
            <div
              className="inline-flex items-center gap-1 rounded-full border border-rule bg-surface p-1"
              role="group"
            >
              {views.map((entry) => {
                const Icon = entry.icon;
                const isActive = view === entry.id;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setView(entry.id)}
                    aria-pressed={isActive}
                    className={cx(
                      "relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors",
                      isActive ? "text-paper" : "text-ink-mute hover:text-ink"
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="projects-view-pill"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    ) : null}
                    <Icon className="relative h-3.5 w-3.5" />
                    <span className="meta relative">{entry.label}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
            {copy.text}
          </p>
        </Reveal>

        <Rule className="mt-10" />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view}
            initial={{ opacity: 0, y: reduce ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -10 }}
            transition={{ duration: reduce ? 0.01 : 0.45, ease: EASE }}
            className="pt-10"
          >
            {view === "showcase" ? (
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="lg:col-span-2">
                  <ShowcaseCard item={featured} featured />
                </div>
                {rest.map((item, index) =>
                  rest.length % 2 === 1 && index === rest.length - 1 ? (
                    <div className="lg:col-span-2" key={item.id}>
                      <ShowcaseCard item={item} featured />
                    </div>
                  ) : (
                    <ShowcaseCard key={item.id} item={item} featured={false} />
                  )
                )}
              </div>
            ) : (
              <ul className="border-b border-rule">
                {items.map((item) => (
                  <IndexRow key={item.id} item={item} />
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}