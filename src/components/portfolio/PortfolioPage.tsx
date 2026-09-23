"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PortfolioSnapshot, Ticker } from "@/lib/portfolio/portfolio-types";
import { formatIDR, resolveAllocations } from "@/lib/portfolio/portfolio-utils";
import PortfolioHeader from "./PortfolioHeader";
import PortfolioAllocationChart from "./PortfolioAllocationChart";
import HoldingsSummary from "./HoldingsSummary";
import InvestmentThesisSection from "./InvestmentThesisSection";
import styles from "./Portfolio.module.css";

export default function PortfolioPage({ snapshot }: { snapshot: PortfolioSnapshot }) {
  const [activeAsset, setActiveAsset] = useState<Ticker | null>(null);
  const positions = useMemo(() => resolveAllocations(snapshot.positions), [snapshot.positions]);
  const interaction = { positions, activeAsset, onActivate: setActiveAsset };
  return <main className={styles.page} data-navbar-theme="dark">
    <div className="container-x">
      <PortfolioHeader snapshot={snapshot} />
      <div className={styles.overview}><PortfolioAllocationChart {...interaction} /><HoldingsSummary {...interaction} /></div>
      <div className={styles.snapshotNote}><span>{snapshot.source}</span><span>Working FX · 1 USD = {formatIDR(snapshot.fxIDRPerUSD)}</span></div>
      <InvestmentThesisSection {...interaction} />
      <footer className={styles.footer}><span>QuantFun Technologies</span><Link href="/#portfolio">Explore our work <span aria-hidden="true">↗</span></Link></footer>
    </div>
  </main>;
}
