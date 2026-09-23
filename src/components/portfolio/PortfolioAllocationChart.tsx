import type { AssetInteraction, ResolvedPosition } from "@/lib/portfolio/portfolio-types";
import PortfolioDonut from "./PortfolioDonut";
import PortfolioLegend from "./PortfolioLegend";
import styles from "./Portfolio.module.css";

export default function PortfolioAllocationChart(props: AssetInteraction & { positions: ResolvedPosition[] }) {
  return <section aria-labelledby="allocation-title" className={styles.allocation}>
    <div className={styles.sectionTitle}><h2 id="allocation-title">Capital allocation</h2><span>{String(props.positions.length).padStart(2, "0")} positions</span></div>
    <PortfolioDonut {...props} />
    <PortfolioLegend {...props} />
  </section>;
}
