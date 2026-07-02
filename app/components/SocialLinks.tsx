"use client";

type SocialLink = {
  name: string;
  href: string;
  iconSrc: string;
};

const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/karim-matar-81427224b/",
iconSrc: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/linkedin.svg",
  },
  {
    name: "GitHub",
    href: "https://github.com/karimmatar7",
    iconSrc: "https://cdn.simpleicons.org/github/ffffff",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/karim.matar7",
    iconSrc: "https://cdn.simpleicons.org/instagram/ffffff",
  },
];

export function SocialLinks() {
  return (
    <section className="space-y-4" id="socials">
      <h2 className="text-lg font-semibold text-slate-100">
        Social platforms
      </h2>

      <div className="flex flex-wrap gap-3">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs sm:text-sm text-slate-100 hover:border-red-500 hover:text-red-200 transition-colors"
          >
         <img
  src={social.iconSrc}
  alt=""
  width={18}
  height={18}
  className={`h-4 w-4 sm:h-5 sm:w-5 ${
    social.name === "LinkedIn" ? "invert" : ""
  }`}
/>
            <span>{social.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}