"use client";

import { skills } from "@/app/content/site";

/**
 * Infinite ticker between the hero and the work. Decorative only — the same
 * skills are listed properly in the stack section below.
 */
export function Marquee() {
  const row = [...skills, ...skills];

  return (
    <div
      className="marquee-pause fade-edges relative overflow-hidden border-y border-rule bg-surface/50 py-4"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max items-center">
        {row.map((skill, i) => (
          <span key={`${skill.id}-${i}`} className="flex items-center">
            <span className="meta px-6 text-ink-mute">{skill.name}</span>
            <span className="h-1 w-1 rounded-full bg-accent/60" />
          </span>
        ))}
      </div>
    </div>
  );
}