"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/app/lib/motion";

/**
 * Generative cover art for a project. Purely decorative — the composition is
 * derived from the project's seed so every card gets its own, consistent mark
 * without needing a screenshot.
 */
export function ProjectArtwork({
  seed,
  index,
  title,
}: {
  seed: number;
  index: string;
  title: string;
}) {
  const reduce = useReducedMotion();
  const variant = seed % 3;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-tint via-surface to-paper" />

      <motion.svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        initial={{ opacity: 0, scale: 1.06 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: reduce ? 0.01 : 1.2, ease: EASE }}
        aria-hidden="true"
      >
        {variant === 0 ? <Arcs seed={seed} /> : null}
        {variant === 1 ? <DotField seed={seed} /> : null}
        {variant === 2 ? <Hatch seed={seed} /> : null}
      </motion.svg>

      <div className="absolute inset-0 bg-gradient-to-t from-ink/5 via-transparent to-transparent" />

      <div
        className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7"
        aria-hidden="true"
      >
        <span className="font-display text-5xl leading-none text-ink/15 transition-transform duration-500 ease-editorial group-hover:-translate-y-1 sm:text-6xl">
          {index}
        </span>
        <span className="meta max-w-[60%] truncate text-ink/50">{title}</span>
      </div>

      <span className="absolute top-5 h-2 w-2 rounded-full bg-accent/70 sm:top-7 sm:h-2.5 sm:w-2.5" />
      <span className="absolute end-5 top-5 h-px w-12 bg-ink/15 sm:end-7 sm:w-20" />
    </div>
  );
}

function Arcs({ seed }: { seed: number }) {
  const count = 9;
  const radii = Array.from({ length: count }, (_, i) => 34 + i * (30 + (seed % 5) * 2));

  return (
    <g
      className="origin-center transition-transform duration-[900ms] ease-editorial group-hover:rotate-[6deg] group-hover:scale-105"
      fill="none"
      stroke="currentColor"
    >
      {radii.map((r, i) => (
        <circle
          key={r}
          cx={300}
          cy={-20}
          r={r}
          className={i % 3 === 0 ? "text-accent/35" : "text-ink/15"}
          strokeWidth={i === 2 ? 2 : 1}
        />
      ))}
    </g>
  );
}

function DotField({ seed }: { seed: number }) {
  const cols = 11;
  const rows = 8;
  const dots = [];

  for (let x = 0; x < cols; x += 1) {
    for (let y = 0; y < rows; y += 1) {
      const wave = Math.sin(x * 0.55 + y * 0.42 + seed) * 0.5 + 0.5;
      dots.push(
        <circle
          key={`${x}-${y}`}
          cx={26 + x * 35}
          cy={22 + y * 34}
          r={1.4 + wave * 5.4}
          className={
            wave > 0.86 ? "fill-accent/45" : "fill-ink/18"
          }
        />
      );
    }
  }

  return (
    <g className="transition-transform duration-[900ms] ease-editorial group-hover:scale-105">
      {dots}
    </g>
  );
}

function Hatch({ seed }: { seed: number }) {
  const lines = Array.from({ length: 16 }, (_, i) => -120 + i * 34);
  const gap = 5 + (seed % 4);

  return (
    <g
      className="transition-transform duration-[900ms] ease-editorial group-hover:translate-x-3"
      stroke="currentColor"
    >
      {lines.map((offset, i) => (
        <line
          key={offset}
          x1={offset}
          y1={340}
          x2={offset + 300}
          y2={-40}
          className={i === 4 ? "stroke-accent/40" : "stroke-ink/12"}
          strokeWidth={i === 4 ? 2.5 : 1}
          strokeDasharray={i === 4 ? undefined : `${gap} ${gap + 2}`}
        />
      ))}
    </g>
  );
}