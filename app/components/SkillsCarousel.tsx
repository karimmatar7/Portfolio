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

export function SkillsCarousel({ messages }: { messages: SkillsMessages }) {
  const skills = messages.skills;
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="space-y-6 sm:space-y-8" id="skills">
      <h2 className="text-xl sm:text-2xl font-semibold text-slate-100">
        {messages.skillsTitle}
      </h2>

      <div className="flex flex-wrap gap-4 sm:gap-4 lg:gap-5">
        {skills.map((skill, i) => (
          <div key={skill.name} className="flex flex-col items-center gap-1.5 w-16 sm:w-20 lg:w-24">
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02, duration: 0.2 }}
              onMouseEnter={() => setActive(skill.name)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(skill.name)}
              onBlur={() => setActive(null)}
              className="relative flex h-14 w-14 sm:h-20 sm:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/60 transition-all duration-200 hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-800/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
            >
              <Image
                src={skill.logoSrc}
                alt={skill.name}
                width={28}
                height={28}
                className="h-7 w-7 sm:h-10 sm:w-10 lg:h-12 lg:w-12 object-contain"
              />

              {/* tooltip: only devices with a real hover-capable pointer (mouse/trackpad) */}
              <AnimatePresence>
                {active === skill.name && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 hidden [@media(hover:hover)]:block whitespace-nowrap rounded-md bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-100 shadow-lg"
                  >
                    {skill.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* static label: any device without real hover — phones, tablets, touch laptops */}
            <span className="text-[11px] leading-tight text-slate-400 text-center [@media(hover:hover)]:hidden">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}