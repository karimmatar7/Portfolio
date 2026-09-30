"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
};

/** Fades content up the first time it enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  duration = 0.75,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: reduce ? 0.01 : duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Editorially masked line reveal: every word slides up out of its own clip. */
export function MaskedText({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  animate = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  animate?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {/* The separator must sit *outside* the clipping box: a space inside
              an inline-block is trailing white space and gets dropped, which
              ran every word together ("thewholestackobsessed"). Padding and
              negative margin cancel out so the glyphs keep their position
              while descenders and italic overhangs stay unclipped. */}
          <span className="-mx-[0.06em] inline-block overflow-hidden px-[0.06em] pb-[0.14em] align-bottom -mb-[0.14em]">
            <motion.span
              className="inline-block"
              initial={{ y: reduce ? 0 : "110%", opacity: reduce ? 1 : 0.4 }}
              {...(animate
                ? { animate: { y: 0, opacity: 1 } }
                : { whileInView: { y: 0, opacity: 1 } })}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{
                duration: reduce ? 0.01 : 0.9,
                delay: delay + i * (reduce ? 0 : stagger),
                ease: EASE,
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}