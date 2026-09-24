"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./ProjectGallery.module.css";
import WonnyyIntro from "./WonnyyIntro";

const projects = [
  { id: "01", title: "Understanding the value behind the business.", category: "Finance", discipline: "Equity research", image: "works-ellipse-1.png", name: "Anatomy of a business", description: "An exploration of business quality, competitive advantages, and the assumptions behind a company's valuation.", tags: ["Fundamental analysis", "Valuation"], scope: "A sample company overview, industry landscape, and valuation framework. The final case study will bring together the research process, assumptions, and conclusions." },
  { id: "02", name: "From thesis to numbers", category: "Finance", discipline: "Financial modelling", image: "works-ellipse-5.png", description: "Turning an investment idea into a structured financial model, one assumption at a time.", tags: ["Financial statements", "Scenario analysis"], scope: "A proposed three-statement model with base, upside, and downside scenarios. This preview illustrates where the model walkthrough and supporting files will live." },
  { id: "03", name: "Patterns in the noise", category: "Research", discipline: "Quantitative research", image: "works-ellipse-2.png", description: "A research notebook exploring market behaviour through data, probability, and systematic thinking.", tags: ["Python", "Data analysis"], scope: "A sample workflow covering data preparation, exploratory analysis, and hypothesis testing. Research findings and reproducible notebooks will be added here." },
  { id: "04", name: "A system for ideas", category: "Design", discipline: "AI powered design", image: "works-ellipse-3.png", description: "Exploring how typography, structure, and visual systems can make complex ideas easier to understand.", tags: ["Visual identity", "UI design"], scope: "A concept design study with space for early sketches, layout experiments, and the final component system. This entry currently contains demonstration content." },
  { id: "05", name: "Small tools, useful answers", category: "Programming", discipline: "AI powered programming", image: "works-programming.svg", description: "An experiment in building focused software that simplifies an everyday research workflow.", tags: ["Automation", "Web development"], scope: "A sample software project outlining the problem, approach, and implementation. A working demo and source repository can be attached when available." },
  { id: "06", name: "Notes from the unfamiliar", category: "Learning", discipline: "Explorative learning", image: "works-ellipse-4.png", description: "An open-ended collection of experiments at the intersection of mathematics, technology, and creativity.", tags: ["Learning journal", "Experiments"], scope: "A placeholder for short experiments, useful questions, and reflections. Each future entry will document what was tried, what worked, and what to investigate next." },
];

const categories = ["All projects", "Finance", "Research", "Design", "Programming", "Learning"];

export default function ProjectGallery() {
  const [category, setCategory] = useState("All projects");
  const [query, setQuery] = useState("");
  const visibleProjects = projects.filter((project) =>
    (category === "All projects" || project.category === category) &&
    `${project.name} ${project.discipline} ${project.description} ${project.tags.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <main className={styles.page}>
      <WonnyyIntro />
      <div className="container-x">

        <section className={styles.collection} aria-labelledby="collection-title">
          <div className={styles.collectionHeader}>
            <h2 id="collection-title">The collection <span>/{String(projects.length).padStart(2, "0")}</span></h2>
            <label className={styles.search}>
              <span className="sr-only">Search projects</span>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5" /></svg>
              <input type="search" placeholder="Search projects" value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>
          </div>
          <div className={styles.filters} role="group" aria-label="Filter projects by category">
            {categories.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          <p className={styles.resultCount} role="status">{visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"}{query.trim() ? ` matching “${query.trim()}”` : " to explore"}</p>
          <div className={styles.grid}>
            {visibleProjects.map((project) => (
              <article key={project.id} id={`project-${project.id}`} className={styles.card}>
                <div className={styles.cardArt}>
                  <span className={styles.cardNumber}>{project.id} /</span>
                  <span className={styles.sample}>Sample project</span>
                  <img src={`/img/${project.image}`} alt="" loading="lazy" />
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.eyebrow}>{project.discipline}</span>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <ul className={styles.tags} aria-label="Topics">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                  <details className={styles.details}>
                    <summary>Project overview <span aria-hidden="true">+</span></summary>
                    <p>{project.scope}</p>
                  </details>
                </div>
              </article>
            ))}
          </div>
          {visibleProjects.length === 0 && <div className={styles.empty}><h3>No projects found.</h3><p>Try another keyword or explore the full collection.</p><button type="button" onClick={() => { setCategory("All projects"); setQuery(""); }}>Reset filters ↗</button></div>}
        </section>
        <footer className={styles.footer}><p>Always learning. Always building.</p><Link href="/">Back to QuantFun <span aria-hidden="true">↗</span></Link></footer>
      </div>
    </main>
  );
}
