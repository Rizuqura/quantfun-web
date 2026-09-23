"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, useReducedMotion, type AnimationPlaybackControls } from "framer-motion";
import type { AssetInteraction, ResolvedPosition } from "@/lib/portfolio/portfolio-types";
import ThesisCard from "./ThesisCard";
import styles from "./Portfolio.module.css";

export default function ThesisCarousel({ positions, activeAsset, onActivate }: AssetInteraction & { positions: ResolvedPosition[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const programmatic = useRef(false);
  const animation = useRef<AnimationPlaybackControls | null>(null);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);

  const moveTo = useCallback((next: number) => {
    const element = viewport.current;
    if (!element) return;
    const card = element.children[next] as HTMLElement | undefined;
    if (!card) return;
    setIndex(next);
    const left = card.offsetLeft - (element.children[0] as HTMLElement).offsetLeft;
    animation.current?.stop();
    animation.current = null;
    if (Math.abs(element.scrollLeft - left) < 2) {
      element.style.scrollSnapType = "";
      return;
    }
    programmatic.current = true;
    element.style.scrollSnapType = "none";
    if (reducedMotion) {
      element.scrollLeft = left;
      element.style.scrollSnapType = "";
      animation.current = null;
    } else {
      animation.current = animate(element.scrollLeft, left, {
        duration: .24,
        ease: [.22, 1, .36, 1],
        onUpdate: (value) => { element.scrollLeft = value; },
        onComplete: () => {
          element.scrollLeft = left;
          element.style.scrollSnapType = "";
          animation.current = null;
        },
      });
    }
  }, [reducedMotion]);

  useEffect(() => {
    const next = positions.findIndex((position) => position.ticker === activeAsset);
    if (next >= 0) moveTo(next);
  }, [activeAsset, positions, moveTo]);

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    let previousWidth = element.clientWidth;
    const observer = new ResizeObserver(() => {
      if (element.clientWidth === previousWidth) return;
      previousWidth = element.clientWidth;
      const card = element.children[index] as HTMLElement;
      if (card) {
        animation.current?.stop();
        animation.current = null;
        element.style.scrollSnapType = "";
        programmatic.current = true;
        element.scrollTo({ left: card.offsetLeft - (element.children[0] as HTMLElement).offsetLeft, behavior: "instant" });
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [index]);

  useEffect(() => () => { if (scrollTimer.current) clearTimeout(scrollTimer.current); animation.current?.stop(); }, []);

  function select(next: number) {
    const bounded = Math.max(0, Math.min(positions.length - 1, next));
    moveTo(bounded);
    onActivate(positions[bounded].ticker);
  }

  function settleScroll() {
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      const element = viewport.current;
      if (!element || drag.current || animation.current) return;
      const first = (element.children[0] as HTMLElement).offsetLeft;
      let nearest = 0;
      Array.from(element.children).forEach((child, candidate) => {
        if (Math.abs((child as HTMLElement).offsetLeft - first - element.scrollLeft) < Math.abs((element.children[nearest] as HTMLElement).offsetLeft - first - element.scrollLeft)) nearest = candidate;
      });
      setIndex(nearest);
      if (!programmatic.current) onActivate(positions[nearest].ticker);
      programmatic.current = false;
    }, 140);
  }

  return <div className={styles.carousel} role="region" aria-roledescription="carousel" aria-label="Investment theses">
    <div className={styles.carouselControls}>
      <span aria-live="polite">{String(index + 1).padStart(2, "0")} <span className={styles.muted}>/ {String(positions.length).padStart(2, "0")}</span></span>
      <button type="button" onClick={() => select(index - 1)} disabled={index === 0} aria-label="Previous investment thesis">←</button>
      <button type="button" onClick={() => select(index + 1)} disabled={index === positions.length - 1} aria-label="Next investment thesis">→</button>
    </div>
    <div ref={viewport} className={styles.carouselViewport} tabIndex={0} aria-label="Thesis cards. Swipe or use left and right arrow keys."
      onScroll={settleScroll}
      onWheel={() => { animation.current?.stop(); animation.current = null; if (viewport.current) viewport.current.style.scrollSnapType = ""; programmatic.current = false; }}
      onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); select(index + (event.key === "ArrowRight" ? 1 : -1)); } }}
      onPointerDown={(event) => {
        animation.current?.stop();
        animation.current = null;
        event.currentTarget.style.scrollSnapType = "";
        programmatic.current = false;
        if (event.pointerType !== "mouse" || event.button !== 0) return;
        drag.current = { x: event.clientX, left: event.currentTarget.scrollLeft };
        event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.style.scrollSnapType = "none";
      }}
      onPointerMove={(event) => { if (drag.current) event.currentTarget.scrollLeft = drag.current.left - (event.clientX - drag.current.x); }}
      onPointerUp={(event) => {
        if (!drag.current) return;
        drag.current = null;
        event.currentTarget.releasePointerCapture(event.pointerId);
        event.currentTarget.style.scrollSnapType = "";
        settleScroll();
      }}
      onPointerCancel={(event) => { drag.current = null; event.currentTarget.style.scrollSnapType = ""; settleScroll(); }}>
      {positions.map((position, cardIndex) => <ThesisCard key={position.ticker} position={position} index={cardIndex} total={positions.length} />)}
    </div>
    <div className={styles.thesisTabs} aria-label="Choose an investment thesis">
      {positions.map((position, cardIndex) => <button key={position.ticker} type="button" aria-pressed={index === cardIndex} onClick={() => select(cardIndex)}>{position.ticker}</button>)}
    </div>
  </div>;
}
