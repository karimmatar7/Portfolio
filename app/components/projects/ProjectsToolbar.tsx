"use client";

import { cx } from "@/app/lib/cx";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "../LocaleProvider";
import type { ProjectFilter } from "./types";

type FilterCounts = Record<ProjectFilter, number>;

function Pill({
  active,
  layoutId,
  onClick,
  className,
  children,
}: {
  active: boolean;
  layoutId: string;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        "relative inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2 transition-colors sm:py-1.5",
        active ? "text-paper" : "text-ink-mute hover:text-ink",
        className
      )}
    >
      {active ? (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 rounded-full bg-ink"
          transition={
            reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 34 }
          }
        />
      ) : null}
      {children}
    </button>
  );
}

export function ProjectsToolbar({
  filter,
  counts,
  onFilterChange,
}: {
  filter: ProjectFilter;
  counts: FilterCounts;
  onFilterChange: (filter: ProjectFilter) => void;
}) {
  const { t } = useLocale();
  const copy = t.projects;

  const filters: { id: ProjectFilter; label: string; shortLabel: string }[] = [
    { id: "all", label: copy.categories.all, shortLabel: copy.shortCategories.all },
    {
      id: "customer",
      label: copy.categories.customer,
      shortLabel: copy.shortCategories.customer,
    },
    {
      id: "education",
      label: copy.categories.education,
      shortLabel: copy.shortCategories.education,
    },
    {
      id: "personal",
      label: copy.categories.personal,
      shortLabel: copy.shortCategories.personal,
    },
  ];

  return (
    <div
      role="group"
      aria-label={copy.filterLabel}
      className="grid w-full grid-cols-2 gap-1 rounded-2xl border border-rule bg-surface p-1 sm:inline-flex sm:w-auto sm:flex-wrap sm:rounded-full"
    >
      {filters.map((entry) => {
        const isActive = filter === entry.id;
        return (
          <Pill
            key={entry.id}
            active={isActive}
            layoutId="projects-filter-pill"
            onClick={() => onFilterChange(entry.id)}
            className="w-full sm:w-auto"
          >
            <span className="relative text-[0.6875rem] uppercase leading-none tracking-[0.1em] sm:hidden">
              {entry.shortLabel}
            </span>
            <span className="meta relative hidden sm:inline">{entry.label}</span>
            <span
              className={cx(
                "relative font-mono text-[0.625rem] leading-none",
                isActive ? "text-paper/70" : "text-ink-mute/70"
              )}
            >
              {String(counts[entry.id]).padStart(2, "0")}
            </span>
          </Pill>
        );
      })}
    </div>
  );
}
