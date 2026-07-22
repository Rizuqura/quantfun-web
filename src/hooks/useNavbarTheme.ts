"use client";

import { useEffect, useState } from "react";

export type NavbarTheme = "light" | "dark";

export function useNavbarTheme(): NavbarTheme {
  const [theme, setTheme] = useState<NavbarTheme>("light");

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      "[data-navbar-theme]"
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            (!bestEntry ||
              entry.intersectionRatio > bestEntry.intersectionRatio)
          ) {
            bestEntry = entry;
          }
        }
        if (bestEntry) {
          const sectionTheme = (
            bestEntry.target as HTMLElement
          ).getAttribute("data-navbar-theme");
          if (sectionTheme === "dark" || sectionTheme === "light") {
            setTheme(sectionTheme);
          }
        }
      },
      { threshold: [0.1, 0.3, 0.5], rootMargin: "-80px 0px 0px 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return theme;
}
