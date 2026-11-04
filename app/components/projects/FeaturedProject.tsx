"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { CARD_SPRING } from "@/app/lib/motion";
import { useLocale } from "../LocaleProvider";
import { ArrowUpRight, BrandIcon } from "../Icons";
import { ProjectCover } from "./ProjectCover";
import type { ProjectItem } from "./types";

/** Large lead project. Tilts toward the cursor and gets a slow cover parallax. */
export function FeaturedProject({ item }: { item: ProjectItem }) {
  const { t } = useLocale();
  const reduce = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, CARD_SPRING);
  const springY = useSpring(rotateY, CARD_SPRING);

  return (
    <motion.article
      data-project-card
      className="group relative isolate flex flex-col overflow-hidden border border-rule bg-surface transition-colors duration-500 hover:border-ink/25 lg:flex-row"
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
        rotateY.set(px * 4);
        rotateX.set(-py * 4);
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
      <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:w-[52%]">
        <div data-project-parallax className="absolute inset-[-6%]">
          {item.external ? (
            <ProjectCover item={item} />
          ) : (
            <a
              href={item.href}
              className="absolute inset-0 block"
              aria-label={item.title}
            >
              <ProjectCover item={item} />
            </a>
          )}
        </div>
        <div className="pointer-events-none absolute inset-0 spotlight opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="relative flex flex-1 flex-col justify-center gap-5 p-7 sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="meta text-ink-mute">{item.index}</span>
            <span className="h-3 w-px bg-rule" />
            <span className="meta text-accent">
              {t.projects.categories[item.category]}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {item.repo ? (
              <a
                href={item.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink-mute transition-colors hover:text-ink"
              >
                <BrandIcon name="github" className="h-4 w-4" />
                {t.projects.repoLabel}
              </a>
            ) : null}
            <a
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="group/visit inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink transition-colors hover:text-accent"
            >
              {item.visitLabel}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/visit:translate-x-0.5 group-hover/visit:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <h3 className="font-display text-4xl leading-[1.02] text-ink transition-colors duration-500 group-hover:text-accent sm:text-5xl">
          {item.title}
        </h3>

        <p className="max-w-lg text-base leading-relaxed text-ink-soft pretty">
          {item.description}
        </p>

        <div className="mt-1 flex items-center gap-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
          <span className="meta truncate text-ink-mute">{item.host}</span>
        </div>
      </div>
    </motion.article>
  );
}
