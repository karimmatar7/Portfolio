"use client";

import { ProjectTile } from "./ProjectTile";
import type { ProjectItem } from "./types";

/** Responsive catalogue grid for the projects after the lead card. */
export function ProjectGrid({ items }: { items: ProjectItem[] }) {
  if (!items.length) return null;

  return (
    <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ProjectTile key={item.id} item={item} />
      ))}
    </div>
  );
}
