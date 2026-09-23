"use client";

import { motion, useReducedMotion } from "framer-motion";
import { assetMetadata } from "@/lib/portfolio/asset-metadata";
import type { AssetInteraction, ResolvedPosition } from "@/lib/portfolio/portfolio-types";
import { allocationSegments, donutPath, formatAllocation, formatCompactIDR, formatIDR, formatUSD, polarPoint, portfolioTotals } from "@/lib/portfolio/portfolio-utils";
import styles from "./Portfolio.module.css";
import AssetLogo from "./AssetLogo";

export default function PortfolioDonut({ positions, activeAsset, onActivate }: AssetInteraction & { positions: ResolvedPosition[] }) {
  const reducedMotion = useReducedMotion();
  const totals = portfolioTotals(positions);
  const active = positions.find((position) => position.ticker === activeAsset);
  // Paint the raised slice last so its shadow and edges sit above its neighbours.
  const segments = allocationSegments(positions).sort((a, b) => Number(a.ticker === activeAsset) - Number(b.ticker === activeAsset));
  return (
    <div className={styles.donutArea}>
      <div className={styles.donut}>
        <svg viewBox="0 0 400 400" aria-label="Portfolio allocation. Focus a slice to inspect it; press Enter to select its thesis." className={styles.donutSvg}>
          <circle cx="200" cy="200" r="183" fill="none" stroke="currentColor" strokeOpacity=".07" />
          <circle cx="200" cy="200" r="101" fill="none" stroke="currentColor" strokeOpacity=".07" />
          {segments.map((segment) => {
            const metadata = assetMetadata[segment.ticker];
            const isActive = activeAsset === segment.ticker;
            const offset = polarPoint(7, segment.midpoint);
            return (
              <motion.path key={segment.ticker} d={donutPath(segment.start, segment.end)} fill={metadata.color}
                role="button" tabIndex={0} aria-pressed={isActive}
                aria-label={`${segment.ticker}, ${metadata.displayName}, ${formatAllocation(segment.allocation)}, ${formatUSD(segment.valueUSD)}. View investment thesis.`}
                data-asset={segment.ticker}
                className={styles.slice}
                initial={false}
                animate={{ x: isActive ? offset.x - 200 : 0, y: isActive ? offset.y - 200 : 0, scale: isActive ? 1.015 : 1, opacity: activeAsset && !isActive ? .65 : 1 }}
                transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 550, damping: 32, mass: .55 }}
                style={{ transformOrigin: "200px 200px", filter: isActive ? `drop-shadow(0 5px 5px #0008) drop-shadow(0 0 3px ${metadata.color}60)` : "none" }}
                onPointerEnter={() => onActivate(segment.ticker)} onPointerLeave={() => onActivate(null)}
                onFocus={() => onActivate(segment.ticker)} onBlur={() => onActivate(null)} onClick={() => onActivate(segment.ticker)}
                onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onActivate(segment.ticker); } if (event.key === "Escape") onActivate(null); }}
              />
            );
          })}
        </svg>
        <div className={styles.donutCenter} aria-live="polite" aria-atomic="true">
          {active ? <>
            <span className={styles.centerIdentity}><AssetLogo ticker={active.ticker} /><span className={styles.eyebrow}>{active.ticker}</span></span>
            <strong>{formatAllocation(active.allocation)}</strong>
            <span className={styles.centerValue}>{formatUSD(active.valueUSD)}</span>
            <span className={styles.muted}>{formatIDR(active.valueIDR)}</span>
          </> : <>
            <strong>{formatUSD(totals.valueUSD)}</strong>
            <span className={styles.eyebrow}>Total Equity</span>
            <span className={styles.muted}>{formatCompactIDR(totals.valueIDR)}</span>
          </>}
        </div>
      </div>
      <div className={styles.tooltipSlot}>
        {active ? <div className={styles.tooltip} role="tooltip">
          <span><b>{assetMetadata[active.ticker].displayName}</b> <span className={styles.muted}>/ {active.ticker}</span></span>
          <span>{formatAllocation(active.allocation)} of portfolio <span aria-hidden="true">·</span> {formatUSD(active.valueUSD)} <span aria-hidden="true">·</span> {formatIDR(active.valueIDR)}</span>
        </div> : <p className={styles.chartHint}>Explore a position to see where it fits.<br /><span>Hover, focus, or select an asset.</span></p>}
      </div>
    </div>
  );
}
