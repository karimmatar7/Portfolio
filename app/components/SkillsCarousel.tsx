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

// You can delete skillVariants and state if you’re not using them anymore

export function SkillsCarousel({ messages }: { messages: SkillsMessages }) {
  const skills = messages.skills;

  return (
    <section className="space-y-6" id="skills">
      <h2 className="text-xl font-semibold text-slate-100 text-center">
        {messages.skillsTitle}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-4"
          >
            <Image
              src={skill.logoSrc}
              alt={skill.name}
              width={48}
              height={48}
              className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
            />
            <span className="text-sm sm:text-base font-medium text-slate-100">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}