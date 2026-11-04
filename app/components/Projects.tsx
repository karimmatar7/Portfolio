"use client";

import { useState } from "react";
import projectsData from "@/app/content/projects.json";
import type { Project } from "@/app/content/site";
import { useLocale } from "./LocaleProvider";
import { Reveal } from "./ui/Reveal";
import { Rule, SectionHeading } from "./ui/SectionHeading";
import { FeaturedProject } from "./projects/FeaturedProject";
import { ProjectGrid } from "./projects/ProjectGrid";
import { ProjectsToolbar } from "./projects/ProjectsToolbar";
import { useProjectItems } from "./projects/useProjectItems";
import { useProjectReveal } from "./projects/useProjectReveal";
import type { ProjectFilter } from "./projects/types";

const projects = projectsData as Project[];

export function Projects() {
  const { t } = useLocale();
  const copy = t.projects;
  const [filter, setFilter] = useState<ProjectFilter>("all");

  const items = useProjectItems(projects);
  const visible =
    filter === "all" ? items : items.filter((item) => item.category === filter);

  const counts = items.reduce<Record<ProjectFilter, number>>(
    (acc, item) => {
      acc.all += 1;
      acc[item.category] += 1;
      return acc;
    },
    { all: 0, customer: 0, education: 0, personal: 0 }
  );

  const [featured, ...rest] = visible;
  const scope = useProjectReveal(filter);

  return (
    <section id="work" className="scroll-mt-28 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
            className="sm:max-w-2xl"
          />
          <Reveal delay={0.15} className="w-full shrink-0 sm:w-auto">
            <ProjectsToolbar
              filter={filter}
              counts={counts}
              onFilterChange={setFilter}
            />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
            {copy.text}
          </p>
        </Reveal>

        <Rule className="mt-10" />

        <div ref={scope} className="pt-8">
          {featured ? <FeaturedProject item={featured} /> : null}

          {rest.length ? (
            <>
              <div className="mt-8 flex items-center gap-4">
                <span className="meta shrink-0 text-ink-mute">
                  {copy.moreLabel}
                </span>
                <span className="h-px flex-1 bg-rule" />
                <span className="meta shrink-0 text-ink-mute">
                  {String(rest.length).padStart(2, "0")}
                </span>
              </div>
              <ProjectGrid items={rest} />
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
