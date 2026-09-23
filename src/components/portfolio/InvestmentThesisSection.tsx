import type { AssetInteraction, ResolvedPosition } from "@/lib/portfolio/portfolio-types";
import ThesisCarousel from "./ThesisCarousel";
import styles from "./Portfolio.module.css";

export default function InvestmentThesisSection(props: AssetInteraction & { positions: ResolvedPosition[] }) {
  return <section className={styles.thesisSection} aria-labelledby="thesis-title">
    <div className={styles.thesisHeading}><h2 id="thesis-title" className="font-serif">INVESTMENT THESIS</h2><p>Why this capital is here.</p></div>
    <ThesisCarousel {...props} />
  </section>;
}
