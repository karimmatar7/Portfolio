"use client";

import { motion, Variants } from "framer-motion";
import { projects } from "../data/projects";


const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

type LocalizedProject = {
  id: string;
  title: string;
  description: string;
};

type ProjectsMessages = {
  projectsTitle: string;
  projects: {
    title: string;
    description: string;
    link?: string;
  }[];
  visitLabel: string;   // add this line
};

export function ProjectsSection({ messages }: { messages: ProjectsMessages }) {
  return (
    <motion.section className="space-y-6" variants={sectionVariants}>
      <h2 className="text-xl sm:text-2xl font-semibold text-slate-100">
        {messages.projectsTitle}
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => {
          const localizedProject = messages.projects.find(
            (p) => p.id === project.id
          );

          const title = localizedProject?.title ?? project.title;
          const description =
            localizedProject?.description ?? project.description;

          return (
            <motion.article
              key={project.id}
              className="group rounded-xl border border-slate-800 bg-slate-900/80 p-5 hover:border-red-500/60 transition-colors"
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <h3 className="text-lg font-semibold mb-2 group-hover:text-red-400 transition-colors text-slate-100">
                {title}
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                {description}
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                Visit project
                <span className="ml-1">↗</span>
              </a>
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
}