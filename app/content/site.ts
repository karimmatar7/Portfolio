export type Locale = "en" | "nl" | "ar";

/** Absolute origin used for canonicals, sitemap and JSON-LD. Set NEXT_PUBLIC_SITE_URL. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://karimmatar7.vercel.app"
).replace(/\/$/, "");

export type SkillGroupId = "frontend" | "backend" | "tooling";

export type Skill = {
  id: string;
  name: string;
  logoSrc: string;
  group: SkillGroupId;
};

export const profile = {
  name: "Karim Matar",
  shortName: "Karim",
  monogram: "KM",
  location: "Belgium",
  photoSrc: "/pics/me.jpeg",
  socials: [
    {
      id: "github",
      name: "GitHub",
      handle: "@karimmatar7",
      href: "https://github.com/karimmatar7",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      handle: "karim-matar",
      href: "https://www.linkedin.com/in/karim-matar-81427224b/",
    },
    {
      id: "instagram",
      name: "Instagram",
      handle: "@karim.matar7",
      href: "https://www.instagram.com/karim.matar7",
    },
  ],
};

export const skills: Skill[] = [
  { id: "html", name: "HTML", logoSrc: "/skills/html.svg", group: "frontend" },
  { id: "css", name: "CSS", logoSrc: "/skills/css.svg", group: "frontend" },
  {
    id: "javascript",
    name: "JavaScript",
    logoSrc: "/skills/javascript.svg",
    group: "frontend",
  },
  { id: "react", name: "React", logoSrc: "/skills/react.svg", group: "frontend" },
  {
    id: "nextjs",
    name: "Next.js",
    logoSrc: "/skills/nextjs.svg",
    group: "frontend",
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    logoSrc: "/skills/tailwindcss.svg",
    group: "frontend",
  },
  { id: "php", name: "PHP", logoSrc: "/skills/php.svg", group: "backend" },
  {
    id: "laravel",
    name: "Laravel",
    logoSrc: "/skills/laravel.svg",
    group: "backend",
  },
  { id: "node", name: "Node.js", logoSrc: "/skills/node.svg", group: "backend" },
  { id: "git", name: "Git", logoSrc: "/skills/git.svg", group: "tooling" },
  {
    id: "craft",
    name: "Craft CMS",
    logoSrc: "/skills/craft.svg",
    group: "tooling",
  },
  {
    id: "arduino",
    name: "Arduino",
    logoSrc: "/skills/arduino.svg",
    group: "tooling",
  },
];

export type Project = {
  id: string;
  index: string;
  title: string;
  description: string;
  link: string;
  repo?: string;
  seed: number;
};

export const projects: Project[] = [
  {
    id: "lexiplay",
    index: "01",
    title: "LexiPlay",
    description:
      "A gamified web application that helps children with dyslexia learn new words through interactive games and quizzes.",
    link: "https://lexi-play-red.vercel.app/",
    seed: 3,
  },
  {
    id: "donation",
    index: "02",
    title: "Donation app",
    description:
      "A donation environment using Mollie for visitors of De Warmste Week.",
    link: "https://dwne-donation.vercel.app/",
    seed: 7,
  },
  {
    id: "doodley",
    index: "03",
    title: "Doodley",
    description:
      "A creative drawing app for friends or family to draw and guess each other's drawings in real time.",
    link: "https://doodley-eight.vercel.app/",
    seed: 11,
  },
  {
    id: "jobfalcon",
    index: "04",
    title: "JobFalcon",
    description:
      "A private Telegram bot I built for my own job search. It hunts software engineering vacancies in the UK that offer visa sponsorship, verifies the sponsorship from each listing's own wording, and ranks the best matches for my profile.",
    link: "https://t.me/JobFalconBot",
    repo: "https://github.com/karimmatar7/job-falcon",
    seed: 13,
  },
];

export function projectHost(link: string) {
  try {
    return new URL(link).host.replace(/^www\./, "");
  } catch {
    return link;
  }
}