"use client";

import { useMemo, useState } from "react";
import type { PortfolioSnapshot, Ticker } from "@/lib/portfolio/portfolio-types";
import { formatIDR, formatUSD, formatSnapshotDate, portfolioReportPath, sortAllocations } from "@/lib/portfolio/portfolio-utils";
import PortfolioHeader from "./PortfolioHeader";
import PortfolioAllocationChart from "./PortfolioAllocationChart";
import styles from "./Portfolio.module.css";

export default function PortfolioPage({ snapshot }: { snapshot: PortfolioSnapshot }) {
  const [activeAsset, setActiveAsset] = useState<Ticker | null>(null);
  const positions = useMemo(() => sortAllocations(snapshot.positions), [snapshot.positions]);

  return (
    <main className={styles.page} data-navbar-theme="dark">
      <article className={`container-x ${styles.factsheet}`} aria-label="Monthly portfolio factsheet">
        <PortfolioHeader snapshot={snapshot} />
        <section className={styles.overview} aria-labelledby="overview-title">
          <div>
            <h2 id="overview-title" className={styles.eyebrow}>Portfolio Overview</h2>
            <p className={styles.aumLabel}>Total Assets Under Management (AUM)</p>
            <p className={styles.equity}>{formatUSD(snapshot.totalAUMUSD)}</p>
            <p className={styles.secondaryValue}>{formatIDR(snapshot.totalAUMIDR)} <span>· USD equivalent estimated</span></p>
          </div>
          <div className={styles.exportActions}>
            <a className={styles.exportButton} href={portfolioReportPath(snapshot.date)} download>Download PDF <span aria-hidden="true">↓</span></a>
            <button className={styles.exportButton} type="button" onClick={() => window.print()}>
              Print / Save PDF <span aria-hidden="true">↗</span>
            </button>
          </div>
        </section>
        <PortfolioAllocationChart positions={positions} activeAsset={activeAsset} onActivate={setActiveAsset} />
        <footer className={styles.footer}>
          <div><span className={styles.footerBrand}>QuantFun Technologies</span><span>Reporting date: <time dateTime={snapshot.date}>{formatSnapshotDate(snapshot.date)}</time></span></div>
          <p>Portfolio snapshot for informational purposes only.</p>
        </footer>
      </article>
    </main>
  );
}
