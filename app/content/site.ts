import projectsData from "./projects.json";

export type Locale = "en" | "nl" | "ar";

/** Absolute origin used for canonicals, sitemap and JSON-LD. Set NEXT_PUBLIC_SITE_URL. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-orpin-beta-40.vercel.app"
).replace(/\/$/, "");

export type SkillGroupId = "frontend" | "backend" | "tooling" | "game" | "design";

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
  { id: "express", name: "Express.js", logoSrc: "/skills/express.svg", group: "backend" },
  {
    id: "rest-api",
    name: "REST APIs",
    logoSrc: "/skills/rest-api.svg",
    group: "backend",
  },
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
  {
    id: "github",
    name: "GitHub",
    logoSrc: "/skills/github.svg",
    group: "tooling",
  },
  {
    id: "vscode",
    name: "VSCode",
    logoSrc: "/skills/vscode.svg",
    group: "tooling",
  },
  {
    id: "raspberrypi",
    name: "Raspberry Pi",
    logoSrc: "/skills/raspberrypi.svg",
    group: "tooling",
  },
  {
    id: "unreal",
    name: "Unreal Engine",
    logoSrc: "/skills/unreal.svg",
    group: "game",
  },
  {
    id: "blueprints",
    name: "Blueprints",
    logoSrc: "/skills/blueprints.svg",
    group: "game",
  },
  {
    id: "graphic-design",
    name: "Graphic Design",
    logoSrc: "/skills/graphic-design.svg",
    group: "design",
  },
  { id: "figma", name: "Figma", logoSrc: "/skills/figma.svg", group: "design" },
  {
    id: "adobecc",
    name: "Adobe CC",
    logoSrc: "/skills/adobecc.svg",
    group: "design",
  },
];

export type ProjectCategory = "customer" | "education" | "personal";

export type Project = {
  id: string;
  index: string;
  title: string;
  description: string;
  link: string;
  repo?: string;
  /** Real cover screenshot. */
  image?: string;
  /** Raster logo/brand mark: contain it on a backdrop instead of cropping. */
  logo?: boolean;
  /** In-site case study: `link` is a path relative to the locale root. */
  internal?: boolean;
  /** Used to group the project list: client work, study projects or personal builds. */
  category: ProjectCategory;
};

export const projects: Project[] = projectsData as Project[];

/**
 * EnterIn case study media. Chapters and shots are matched to their
 * translations by `id`, so the order here and in the locale files can be
 * edited independently.
 */
export type EnterInShot = {
  id: string;
  src: string;
};

export type EnterInChapter = {
  id: string;
  shots: EnterInShot[];
};

export const enterIn = {
  year: "2025",
  /** Official Unreal Engine logo, shown as the case study cover. */
  heroImage: "/UE5/unreal-logo.svg",
  /** Raster shot used for social share cards and JSON-LD. */
  ogImage: "/UE5/Main%20menu.png",
  videoSrc: "/UE5/Insidious.mp4",
  /** Theatrical poster of the movie the horror experience is inspired by. */
  videoPoster: "https://upload.wikimedia.org/wikipedia/en/2/2d/Insidious_poster.jpg",
  downloadUrl:
    "https://drive.google.com/file/d/1LY-kI4NJE__qhHYdTcQXzwkoxsNMErSV/view?usp=sharing",
  chapters: [
    {
      id: "house",
      shots: [
        { id: "main-menu", src: "/UE5/Main%20menu.png" },
        { id: "hall", src: "/UE5/hall.png" },
        { id: "hall2", src: "/UE5/hall2.png" },
      ],
    },
    {
      id: "premise",
      shots: [{ id: "premise", src: "/UE5/Experience%20description.png" }],
    },
    {
      id: "fast",
      shots: [
        { id: "ff1", src: "/UE5/ff1.png" },
        { id: "ff2", src: "/UE5/ff2.png" },
        { id: "ff3", src: "/UE5/ff3.png" },
      ],
    },
    {
      id: "dragon",
      shots: [
        { id: "httyd1", src: "/UE5/httyd.png" },
        { id: "httyd2", src: "/UE5/httyd2.png" },
        { id: "httyd3", src: "/UE5/httyd3.png" },
      ],
    },
  ] as EnterInChapter[],
};

export function projectHost(link: string) {
  try {
    return new URL(link).host.replace(/^www\./, "");
  } catch {
    return link;
  }
}