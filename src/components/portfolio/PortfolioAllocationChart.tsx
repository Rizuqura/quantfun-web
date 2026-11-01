import type { AssetInteraction, PortfolioPosition } from "@/lib/portfolio/portfolio-types";
import PortfolioDonut from "./PortfolioDonut";
import PortfolioLegend from "./PortfolioLegend";
import styles from "./Portfolio.module.css";

export default function PortfolioAllocationChart(props: AssetInteraction & { positions: PortfolioPosition[] }) {
  return (
    <section aria-labelledby="allocation-title" className={styles.allocation}>
      <h2 id="allocation-title" className={styles.sectionTitle}>Asset Allocation</h2>
      <div className={styles.allocationGrid}>
        <PortfolioDonut {...props} />
        <PortfolioLegend {...props} />
      </div>
      <p className={styles.roundingNote}>Percentages may not total 100% due to rounding.</p>
    </section>
  );
}
