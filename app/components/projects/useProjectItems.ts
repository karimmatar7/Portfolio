"use client";

import { useMemo } from "react";
import type { Project } from "@/app/content/site";
import { projectHost } from "@/app/content/site";
import { useLocale } from "../LocaleProvider";
import type { ProjectItem } from "./types";

/** Joins the project data in `projects.json` with the copy for the active locale. */
export function useProjectItems(projects: Project[]): ProjectItem[] {
  const { t, locale } = useLocale();
  const copy = t.projects;

  return useMemo(
    () =>
      projects.map((project) => {
        const localized = copy.list.find((entry) => entry.id === project.id);
        const external = !project.internal;

        return {
          ...project,
          title: localized?.title ?? project.title,
          description: localized?.description ?? project.description,
          external,
          href: external ? project.link : `/${locale}${project.link}`,
          host: external ? projectHost(project.link) : copy.caseStudyHost,
          visitLabel: localized?.visitLabel ?? copy.visitLabel,
        };
      }),
    [copy, locale, projects]
  );
}
