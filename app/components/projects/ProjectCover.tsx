import Image from "next/image";
import { cx } from "@/app/lib/cx";
import type { ProjectItem } from "./types";

/** Cover image. Logos are contained on a tinted backdrop, screenshots cropped. */
export function ProjectCover({
  item,
  sizes = "(max-width: 1024px) 100vw, 52vw",
}: {
  item: ProjectItem;
  sizes?: string;
}) {
  if (!item.image) {
    return (
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-tint via-surface to-paper" />
    );
  }

  const isSvg = item.image.toLowerCase().endsWith(".svg");
  const isLogo = item.logo ?? isSvg;

  return (
    <>
      {/* Logo backdrop sits behind the mark; the photo scrim sits on top of
          the screenshot. Both are decorative. */}
      {isLogo ? (
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-tint via-surface to-paper" />
      ) : null}
      <Image
        src={item.image}
        alt={item.title}
        fill
        unoptimized={isSvg}
        sizes={sizes}
        className={cx(
          "transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.04]",
          isLogo ? "p-6 object-contain" : "object-cover"
        )}
      />
      {isLogo ? null : (
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/5 to-transparent" />
      )}
    </>
  );
}
