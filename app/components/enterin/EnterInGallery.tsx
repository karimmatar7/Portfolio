"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { EnterInChapter } from "@/app/content/site";
import type { EnterInMessages } from "@/app/lib/messages";
import { cx } from "@/app/lib/cx";
import { EASE } from "@/app/lib/motion";
import { ArrowRight, CloseIcon } from "../Icons";

type GalleryCopy = EnterInMessages["gallery"];

type FlatShot = {
  id: string;
  src: string;
  title: string;
  description: string;
};

function findCopy(copy: GalleryCopy, chapterId: string, shotId: string) {
  const chapter = copy.chapters.find((entry) => entry.id === chapterId);
  return (
    chapter?.shots.find((entry) => entry.id === shotId) ?? {
      id: shotId,
      title: "",
      description: "",
    }
  );
}

function Lightbox({
  shots,
  index,
  onClose,
  onStep,
  closeLabel,
  nextLabel,
  prevLabel,
}: {
  shots: FlatShot[];
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
  closeLabel: string;
  nextLabel: string;
  prevLabel: string;
}) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const shot = shots[index];
  const [direction, setDirection] = useState(1);

  const handleStep = useCallback(
    (delta: number) => {
      const rtl = document.documentElement.dir === "rtl";
      setDirection(rtl ? -delta : delta);
      onStep(delta);
    },
    [onStep]
  );

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") handleStep(1);
      if (event.key === "ArrowLeft") handleStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, handleStep]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  if (!shot) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex flex-col bg-solid-ink/95 text-solid-paper backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-modal="true"
      aria-label={shot.title}
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <span className="meta text-solid-paper/60 tabular-nums">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(shots.length).padStart(2, "0")}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-solid-paper transition-colors hover:border-white/60 hover:bg-white/10"
        >
          <CloseIcon />
        </button>
      </div>

      <div
        className="flex flex-1 items-center justify-center overflow-y-auto px-4 pb-6 sm:px-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="w-full max-w-6xl">
          <div className="relative aspect-video w-full overflow-hidden border border-white/10 bg-black">
            <AnimatePresence initial={false}>
              <motion.div
                key={shot.id}
                className="absolute inset-0 transform-gpu will-change-transform"
                initial={
                  reduce ? { opacity: 0 } : { x: direction > 0 ? "100%" : "-100%" }
                }
                animate={{ x: 0, opacity: 1 }}
                exit={
                  reduce ? { opacity: 0 } : { x: direction > 0 ? "-100%" : "100%" }
                }
                transition={{ duration: reduce ? 0.01 : 0.28, ease: EASE }}
              >
                <Image
                  src={shot.src}
                  alt={shot.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>
            {[
              shots[(index + 1) % shots.length],
              shots[(index - 1 + shots.length) % shots.length],
            ].map((neighbor) => (
              <Image
                key={neighbor.id}
                src={neighbor.src}
                alt=""
                aria-hidden
                fill
                sizes="100vw"
                loading="eager"
                className="pointer-events-none invisible"
              />
            ))}
          </div>

          <figcaption className="mt-6 flex flex-col gap-5 border-t border-white/10 pt-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="relative">
                <div className="invisible" aria-hidden="true">
                  <h4 className="font-display text-2xl leading-tight text-solid-paper sm:text-3xl">
                    {shot.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-solid-paper/70 sm:text-base">
                    {shot.description}
                  </p>
                </div>
                <AnimatePresence initial={false}>
                  <motion.div
                    key={`${shot.id}-copy`}
                    className="absolute inset-0"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduce ? 0.01 : 0.12, ease: EASE }}
                  >
                    <h4 className="font-display text-2xl leading-tight text-solid-paper sm:text-3xl">
                      {shot.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-solid-paper/70 sm:text-base">
                      {shot.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => handleStep(-1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-solid-paper transition-colors hover:border-white/60 hover:bg-white/10"
                aria-label={prevLabel}
              >
                <ArrowRight className="h-4 w-4 rotate-180 rtl:rotate-0" />
              </button>
              <button
                type="button"
                onClick={() => handleStep(1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-solid-paper transition-colors hover:border-white/60 hover:bg-white/10"
                aria-label={nextLabel}
              >
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </button>
            </div>
          </figcaption>
        </div>
      </div>
    </motion.div>
  );
}

function ShotCard({
  shot,
  ordinal,
  feature,
  label,
  delay,
  onOpen,
}: {
  shot: FlatShot;
  ordinal: number;
  feature: boolean;
  label: string;
  delay: number;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{
        duration: reduce ? 0.01 : 0.7,
        delay: reduce ? 0 : delay,
        ease: EASE,
      }}
      className={cx(
        "group relative block w-full overflow-hidden border border-rule bg-surface text-start transition-colors duration-500 hover:border-ink/30",
        feature && "lg:grid lg:grid-cols-[1.6fr_1fr]"
      )}
      aria-label={`${label}: ${shot.title}`}
    >
      <div
        className={cx(
          "relative overflow-hidden",
          feature ? "aspect-video" : "aspect-video"
        )}
      >
        <Image
          src={shot.src}
          alt={shot.title}
          fill
          sizes={
            feature
              ? "(max-width: 1024px) 100vw, 60vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          className="object-cover transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.05]"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-solid-ink/85 via-solid-ink/10 to-transparent" />
        <span className="absolute start-5 top-5 inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-white/25 bg-black/30 px-2 text-xs tabular-nums text-solid-paper backdrop-blur-sm">
          {String(ordinal).padStart(2, "0")}
        </span>
        <span className="absolute bottom-0 start-0 end-0 p-5">
          <span className="block font-display text-xl leading-tight text-solid-paper sm:text-2xl">
            {shot.title}
          </span>
        </span>
      </div>

      <div
        className={cx(
          "flex flex-col justify-center",
          feature ? "gap-4 p-6 sm:p-8" : "sr-only"
        )}
      >
        <p className="text-sm leading-relaxed text-ink-soft pretty sm:text-base">
          {shot.description}
        </p>
        <span className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-accent">
          {label}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
        </span>
      </div>

      {!feature ? (
        <span className="pointer-events-none absolute bottom-0 start-0 end-0 translate-y-2 bg-surface/95 p-5 opacity-0 transition-all duration-500 ease-editorial group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <span className="block text-sm leading-relaxed text-ink-soft">
            {shot.description}
          </span>
        </span>
      ) : null}
    </motion.button>
  );
}

export function EnterInGallery({
  copy,
  chapters,
}: {
  copy: GalleryCopy;
  chapters: EnterInChapter[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const shots = useMemo<FlatShot[]>(() => {
    const flat: FlatShot[] = [];
    for (const chapter of chapters) {
      for (const shot of chapter.shots) {
        const shotCopy = findCopy(copy, chapter.id, shot.id);
        flat.push({
          id: shot.id,
          src: shot.src,
          title: shotCopy.title,
          description: shotCopy.description,
        });
      }
    }
    return flat;
  }, [chapters, copy]);

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        return (current + delta + shots.length) % shots.length;
      });
    },
    [shots.length]
  );

  const close = useCallback(() => setOpenIndex(null), []);

  const chapterOffsets = chapters.reduce<number[]>((acc, chapter, index) => {
    const previous = index === 0 ? 0 : acc[index - 1] + chapters[index - 1].shots.length;
    acc.push(previous);
    return acc;
  }, []);

  return (
    <div className="space-y-20 sm:space-y-28">
      {chapters.map((chapter, chapterIndex) => {
        const chapterCopy = copy.chapters.find(
          (entry) => entry.id === chapter.id
        );
        if (!chapterCopy) return null;

        const count = chapter.shots.length;
        const offset = chapterOffsets[chapterIndex] ?? 0;
        const feature = count === 1;

        return (
          <div key={chapter.id}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="meta text-accent">
                  {String(chapterIndex + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-8 bg-rule" aria-hidden="true" />
                <h3 className="font-display text-2xl leading-tight text-ink sm:text-3xl">
                  {chapterCopy.title}
                </h3>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-ink-soft pretty sm:text-base">
                {chapterCopy.text}
              </p>
            </div>

            <div
              className={cx(
                "mt-8 grid gap-4",
                count === 1
                  ? "grid-cols-1"
                  : count === 2
                    ? "sm:grid-cols-2"
                    : "sm:grid-cols-2 lg:grid-cols-3"
              )}
            >
              {chapter.shots.map((shot, shotIndex) => {
                const shotCopy = findCopy(copy, chapter.id, shot.id);
                const ordinal = offset + shotIndex + 1;
                return (
                  <ShotCard
                    key={shot.id}
                    shot={{
                      id: shot.id,
                      src: shot.src,
                      title: shotCopy.title,
                      description: shotCopy.description,
                    }}
                    ordinal={ordinal}
                    feature={feature}
                    label={copy.viewLabel}
                    delay={shotIndex * 0.06}
                    onOpen={() => setOpenIndex(offset + shotIndex)}
                  />
                );
              })}
            </div>
          </div>
        );
      })}

      <AnimatePresence>
        {openIndex !== null ? (
          <Lightbox
            shots={shots}
            index={openIndex}
            onClose={close}
            onStep={step}
            closeLabel={copy.close}
            nextLabel={copy.next}
            prevLabel={copy.prev}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
