"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type SkillItem = {
  name: string;
  logoSrc: string;
};

type SkillsMessages = {
  skillsTitle: string;
  skills: SkillItem[];
};

const skillVariants = {
  enter: { opacity: 0, x: 60 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 },
};

export function SkillsCarousel({ messages }: { messages: SkillsMessages }) {
  const [index, setIndex] = useState(0);
  const skills = messages.skills;
  const current = skills[index];

  function next() {
    setIndex((i) => (i + 1) % skills.length);
  }

  function prev() {
    setIndex((i) => (i - 1 + skills.length) % skills.length);
  }

  return (
    <section className="space-y-6" id="skills">
      <h2 className="text-xl font-semibold text-slate-100 text-center">
        {messages.skillsTitle}
      </h2>

   <div className="flex items-center justify-center gap-4 sm:gap-8">
  <button
    onClick={prev}
    className="rounded-full border border-slate-700 px-3 sm:px-4 py-2 text-xs sm:text-sm text-slate-300 hover:border-red-400 hover:text-red-200 transition-colors"
  >
    ‹
  </button>

  <div className="w-56 sm:w-72">
    <AnimatePresence mode="wait">
      <motion.div
        key={current.name}
        variants={skillVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center gap-3 sm:gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 px-6 sm:px-8 py-6 sm:py-8"
      >
        <Image
          src={current.logoSrc}
          alt={current.name}
          width={72}
          height={72}
          className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
        />
        <div className="text-sm sm:text-base font-semibold text-slate-100">
          {current.name}
        </div>
      </motion.div>
    </AnimatePresence>
  </div>

  <button
    onClick={next}
    className="rounded-full border border-slate-700 px-3 sm:px-4 py-2 text-xs sm:text-sm text-slate-300 hover:border-red-400 hover:text-red-200 transition-colors"
  >
    ›
  </button>
</div>
    </section>
  );
}