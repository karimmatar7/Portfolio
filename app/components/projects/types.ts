import type { Project, ProjectCategory } from "@/app/content/site";

/** A project with its copy resolved for the active locale and its link built. */
export type ProjectItem = Project & {
  host: string;
  href: string;
  external: boolean;
  visitLabel: string;
};

export type ProjectFilter = "all" | ProjectCategory;
