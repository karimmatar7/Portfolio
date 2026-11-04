"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP entrance for the project spread: the lead card settles in first, then
 * the catalogue tiles follow with a short stagger. Cover images drift slowly
 * as they pass through the viewport. Re-runs when the category filter changes.
 */
export function useProjectReveal(key: string) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const featured = root.querySelectorAll<HTMLElement>("[data-project-card]");
    const tiles = root.querySelectorAll<HTMLElement>("[data-project-tile]");
    const covers = root.querySelectorAll<HTMLElement>("[data-project-parallax]");
    if (!featured.length && !tiles.length) return;

    const ctx = gsap.context(() => {
      if (featured.length) {
        gsap.fromTo(
          featured,
          { opacity: 0, y: 26, scale: 0.985 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }

      if (tiles.length) {
        gsap.fromTo(
          tiles,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.12,
            stagger: 0.06,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }

      // The wrapper is inset by 6%, so this drift never reveals its edges.
      covers.forEach((cover) => {
        gsap.fromTo(
          cover,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: cover,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, [key]);

  return scope;
}
