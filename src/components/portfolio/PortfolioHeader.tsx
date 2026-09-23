import type { PortfolioSnapshot } from "@/lib/portfolio/portfolio-types";
import { formatIDR, formatSnapshotDate, formatUSD, portfolioTotals } from "@/lib/portfolio/portfolio-utils";
import styles from "./Portfolio.module.css";

export default function PortfolioHeader({ snapshot }: { snapshot: PortfolioSnapshot }) {
  const totals = portfolioTotals(snapshot.positions);
  return (
    <header className={styles.header}>
      <div>
        <p className={styles.eyebrow}>QuantFun Technologies — Investment Portfolio</p>
        <h1 className="font-serif">PORTFOLIO</h1>
        <p className={styles.headerCaption}>Capital, with conviction.</p>
      </div>
      <div className={styles.headerNumbers}>
        <div><p className={styles.eyebrow}>Total Equity</p><p className={styles.equity}>{formatUSD(totals.valueUSD)}</p><p className={styles.secondaryValue}>{formatIDR(totals.valueIDR)}</p></div>
        <div className={styles.snapshot}><p className={styles.eyebrow}>Snapshot</p><time dateTime={snapshot.date}>{formatSnapshotDate(snapshot.date)}</time><span>Investment record</span></div>
      </div>
    </header>
  );
}
