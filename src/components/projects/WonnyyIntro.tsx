"use client";

import { useRef, useState } from "react";
import styles from "./WonnyyIntro.module.css";

const scenes = [
  { id: "planet-view", title: "Planet view", description: "Navigate research as a spatial knowledge system.", time: "03s", alt: "Wonnyy Planet View showing research files as orbiting nodes, a knowledge vault and contextual chat." },
  { id: "ai-workspace", title: "AI workspace", description: "Work inside the same terminal with live context and sources.", time: "45s", alt: "Wonnyy workspace with a file explorer, central working area and source-aware AI chat." },
  { id: "document-reading", title: "Document reading", description: "Move from files into focused analysis without leaving the workspace.", time: "67s", alt: "A research document open inside Wonnyy beside the knowledge vault and AI chat." },
  { id: "context-windows", title: "Context windows", description: "Group and authorize the context the model is allowed to use.", time: "126s", alt: "Wonnyy AI Terminal showing model checks, provider configuration and active context." },
  { id: "agent-market", title: "Agent market", description: "Specialized agents extend the terminal without changing the core workflow.", time: "205s", alt: "Wonnyy Agent Market view with a connected research graph and contextual agent panel." },
];

export default function WonnyyIntro() {
  const [index, setIndex] = useState(0);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const scene = scenes[index];
  function move(direction: number) {
    setIndex((current) => (current + direction + scenes.length) % scenes.length);
  }
  return <section className={styles.feature} aria-labelledby="wonnyy-title">
    <div className={styles.container}>
      <header className={styles.header}>
        <p className={styles.wordmark}>WONNYY</p>
        <p className={styles.byline}>By QuantFun</p>
        <h1 id="wonnyy-title">Research, context, and agents —<br />inside one working terminal.</h1>
        <p className={styles.subtitle}>Built directly from the real software footage below. No reconstructed UI.</p>
      </header>
      <div className={styles.scenes} role="region" aria-roledescription="carousel" aria-label="Wonnyy app demo" onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
      }}>
        <div className={styles.controls}>
          <p aria-live="polite" aria-atomic="true">{String(index + 1).padStart(2, "0")} / 05 <span>{scene.title}</span></p>
          <div><button type="button" onClick={() => move(-1)} aria-label="Previous demo screen">←</button><button type="button" onClick={() => move(1)} aria-label="Next demo screen">→</button></div>
        </div>
        <figure className={styles.scene} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${scenes.length}: ${scene.title}`}>
          <figcaption className={styles.caption}>
            <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
            <div><h2>{scene.title}</h2><p>{scene.description}</p></div>
            <span className={styles.timestamp} aria-label={`${parseInt(scene.time)} seconds into the recording`}>{scene.time}</span>
          </figcaption>
          <a className={styles.frame} href={`/assets/wonnyy/${scene.id}.webp`} target="_blank" rel="noreferrer" aria-label={`Open ${scene.title} screenshot at full resolution`}
            onPointerDown={(event) => { swiped.current = false; gesture.current = { x: event.clientX, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId); }}
            onPointerUp={(event) => {
              const start = gesture.current; gesture.current = null;
              if (!start) return;
              const dx = event.clientX - start.x, dy = event.clientY - start.y;
              if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) { swiped.current = true; move(dx < 0 ? 1 : -1); }
            }}
            onPointerCancel={() => { gesture.current = null; }}
            onDragStart={(event) => event.preventDefault()}
            onClick={(event) => { if (swiped.current) { event.preventDefault(); swiped.current = false; } }}>
            <img src={`/assets/wonnyy/${scene.id}.webp`} alt={scene.alt} width={1920} height={1080} draggable={false} />
          </a>
        </figure>
        <div className={styles.indicators} role="group" aria-label="Choose a demo screen">
          {scenes.map((item, itemIndex) => <button key={item.id} type="button" aria-pressed={index === itemIndex} aria-label={`Show ${item.title}`} onClick={() => setIndex(itemIndex)}><span>{String(itemIndex + 1).padStart(2, "0")}</span>{item.title}</button>)}
        </div>
      </div>
      <footer className={styles.footer}>
        <div><p className={styles.footerBrand}>WONNYY</p><p className={styles.footerDescription}>A working research terminal by QuantFun Technologies.</p></div>
        <p className={styles.motto}>Building clarity in complexity.</p>
      </footer>
    </div>
  </section>;
}
