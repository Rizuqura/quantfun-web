import type { PortfolioSnapshot } from "@/lib/portfolio/portfolio-types";
import { formatReportingPeriod, formatSnapshotDate } from "@/lib/portfolio/portfolio-utils";
import styles from "./Portfolio.module.css";

export default function PortfolioHeader({ snapshot }: { snapshot: PortfolioSnapshot }) {
  return (
    <header className={styles.header}>
      <div>
        <p className={styles.eyebrow}>QuantFun Technologies</p>
        <h1 className="font-serif">Monthly Portfolio<br />Factsheet</h1>
      </div>
      <div className={styles.snapshot}>
        <p className={styles.period}>{formatReportingPeriod(snapshot.date)}</p>
        <p>Reporting date: <time dateTime={snapshot.date}>{formatSnapshotDate(snapshot.date)}</time></p>
      </div>
    </header>
  );
}
