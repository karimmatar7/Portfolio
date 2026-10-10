"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/app/lib/motion";
import { MaskedText, Reveal } from "./Reveal";

/** Hairline rule that draws itself in when scrolled into view. */
export function Rule({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`h-px origin-left bg-rule rtl:origin-right ${className}`}
      initial={{ scaleX: reduce ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: reduce ? 0.01 : 1.1, ease: EASE }}
    />
  );
}

/**
 * Numbered editorial heading. The eyebrow arrives as "01 — Selected work",
 * so the index is pulled out and printed in the accent colour. A missing
 * separator is tolerated: the whole string is then used as the label.
 */
export function SectionHeading({
  eyebrow,
  title,
  as: Heading = "h2",
  className = "",
}: {
  eyebrow: string;
  title: string;
  as?: "h2" | "h3";
  className?: string;
}) {
  const [index, ...rest] = eyebrow.split(/\s+—\s+/);
  const label = rest.join(" — ");

  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      <Reveal>
        <div className="flex items-center gap-3">
          {index ? <span className="meta text-accent">{index}</span> : null}
          {label ? (
            <motion.span
              className="meta text-ink-mute"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {label}
            </motion.span>
          ) : null}
        </div>
      </Reveal>
      <Heading className="font-display text-display leading-[1.05] balance text-ink">
        <MaskedText text={title} stagger={0.04} />
      </Heading>
    </div>
  );
}