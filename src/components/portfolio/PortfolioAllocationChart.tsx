import type { AssetInteraction, ResolvedPosition } from "@/lib/portfolio/portfolio-types";
import PortfolioDonut from "./PortfolioDonut";
import PortfolioLegend from "./PortfolioLegend";
import styles from "./Portfolio.module.css";

export default function PortfolioAllocationChart({ id = "allocation-title", title = "Capital allocation", allocationScope = "portfolio", ...props }: AssetInteraction & { positions: ResolvedPosition[]; id?: string; title?: string; allocationScope?: string }) {
  return <section aria-labelledby={id} className={styles.allocation}>
    <div className={styles.sectionTitle}><h2 id={id}>{title}</h2><span>{String(props.positions.length).padStart(2, "0")} positions</span></div>
    <PortfolioDonut {...props} allocationScope={allocationScope} />
    <PortfolioLegend {...props} />
  </section>;
}
