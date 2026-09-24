"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const PAGE_ORDER = ["/", "/portfolio", "/project"];

export default function PageTransitions() {
  const pathname = usePathname();
  const router = useRouter();
  const completeNavigation = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    completeNavigation.current?.();
  }, [pathname]);

  useEffect(() => {
    let activeTransition: ViewTransition | undefined;

    function handleClick(event: MouseEvent) {
      if (
        event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
        !(event.target instanceof Element) ||
        !document.startViewTransition ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) return;

      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.hasAttribute("download") ||
        (link.target && link.target !== "_self")) return;

      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin ||
        destination.pathname === window.location.pathname) return;

      event.preventDefault();
      // Finish an interrupted navigation before taking the next snapshot.
      completeNavigation.current?.();
      activeTransition?.skipTransition();

      const previousIndex = PAGE_ORDER.indexOf(window.location.pathname);
      const nextIndex = PAGE_ORDER.indexOf(destination.pathname);
      document.documentElement.dataset.slideDirection =
        previousIndex >= 0 && nextIndex >= 0 && nextIndex < previousIndex
          ? "backward" : "forward";

      activeTransition = document.startViewTransition(() =>
        new Promise<void>((resolve) => {
          // Release the snapshot even if a route fails or redirects.
          const timeout = window.setTimeout(finish, 2000);
          function finish() {
            window.clearTimeout(timeout);
            if (completeNavigation.current === finish) {
              completeNavigation.current = null;
            }
            resolve();
          }
          completeNavigation.current = finish;
          router.push(destination.pathname + destination.search + destination.hash);
        }),
      );
      // Snapshot creation can be skipped by the browser (e.g. in a hidden tab).
      void activeTransition.ready.catch(() => {});
      void activeTransition.finished.catch(() => {});
    }

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      completeNavigation.current?.();
      activeTransition?.skipTransition();
    };
  }, [router]);

  return null;
}
