"use client";

import { useLocale } from "../LocaleProvider";
import { ArrowUpRight, BrandIcon } from "../Icons";
import { ProjectCover } from "./ProjectCover";
import type { ProjectItem } from "./types";

/** Compact catalogue card used for everything below the lead project. */
export function ProjectTile({ item }: { item: ProjectItem }) {
  const { t } = useLocale();

  return (
    <article
      data-project-tile
      className="group relative flex flex-col overflow-hidden border border-rule bg-surface transition-[border-color,transform] duration-500 ease-editorial hover:-translate-y-1 hover:border-ink/25"
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-editorial group-hover:scale-x-100 rtl:origin-right" />

      <a
        href={item.href}
        {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
        aria-label={item.title}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <div data-project-parallax className="absolute inset-[-6%]">
          <ProjectCover
            item={item}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <span className="pointer-events-none absolute inset-0 spotlight opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </a>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="meta text-accent">
            {t.projects.categories[item.category]}
          </span>
          <span className="meta text-ink-mute">{item.index}</span>
        </div>

        <h3 className="font-display text-2xl leading-tight text-ink transition-colors duration-500 group-hover:text-accent">
          <a
            href={item.href}
            {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            {item.title}
          </a>
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {item.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <span className="meta min-w-0 truncate text-ink-mute">
            {item.host}
          </span>
          <span className="flex shrink-0 items-center gap-3">
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
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
              aria-label={`${item.visitLabel}: ${item.title}`}
              className="inline-flex items-center text-ink-mute transition-colors hover:text-accent"
            >
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </span>
        </div>
      </div>
    </article>
  );
}
