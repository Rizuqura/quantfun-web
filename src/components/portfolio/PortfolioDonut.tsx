"use client";

import { useId } from "react";
import { assetMetadata } from "@/lib/portfolio/asset-metadata";
import type { AssetInteraction, PortfolioPosition } from "@/lib/portfolio/portfolio-types";
import { allocationSegments, donutPath, formatAllocation, polarPoint } from "@/lib/portfolio/portfolio-utils";
import styles from "./Portfolio.module.css";

export default function PortfolioDonut({ positions, activeAsset, onActivate }: AssetInteraction & { positions: PortfolioPosition[] }) {
  const active = positions.find((position) => position.ticker === activeAsset);
  const chartId = useId().replace(/:/g, "");

  return (
    <div className={styles.donut}>
      <svg viewBox="0 0 400 400" role="group" aria-label="Portfolio allocation by asset" className={styles.donutSvg}>
        {allocationSegments(positions).map((segment, index) => {
          const metadata = assetMetadata[segment.ticker];
          const logo = polarPoint(139, segment.midpoint);
          const clipId = `${chartId}-logo-${index}`;
          return (
            <g key={segment.ticker}>
            <path d={donutPath(segment.start, segment.end)} fill={metadata.color}
              role="button" tabIndex={0} aria-pressed={activeAsset === segment.ticker}
              aria-label={`${segment.ticker}, ${metadata.displayName}, ${formatAllocation(segment.allocation)}`}
              data-asset={segment.ticker} data-muted={Boolean(active && active.ticker !== segment.ticker)}
              className={styles.slice}
              onPointerEnter={() => onActivate(segment.ticker)} onPointerLeave={() => onActivate(null)}
              onFocus={() => onActivate(segment.ticker)} onBlur={() => onActivate(null)} onClick={() => onActivate(segment.ticker)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onActivate(segment.ticker); }
                if (event.key === "Escape") onActivate(null);
              }}
            >
              <title>{`${segment.ticker} · ${formatAllocation(segment.allocation)}`}</title>
            </path>
            <g className={styles.chartLogo} data-chart-logo={segment.ticker} data-muted={Boolean(active && active.ticker !== segment.ticker)} aria-hidden="true">
              <defs><clipPath id={clipId}><circle cx={logo.x} cy={logo.y} r="15" /></clipPath></defs>
              <circle cx={logo.x} cy={logo.y} r="19" fill="#fff" />
              <image href={metadata.logoPath} x={logo.x - 15} y={logo.y - 15} width="30" height="30" preserveAspectRatio="xMidYMid meet" clipPath={`url(#${clipId})`} />
            </g>
            </g>
          );
        })}
      </svg>
      <div className={`${styles.donutCenter} ${styles.defaultCenter}`} hidden={Boolean(active)}>
        <span className={styles.eyebrow}>Portfolio</span><strong className="font-serif">Allocation</strong>
      </div>
      <div className={`${styles.donutCenter} ${styles.activeCenter}`} aria-live="polite" aria-atomic="true">
        {active && <><span className={styles.eyebrow}>{active.ticker}</span><strong>{formatAllocation(active.allocation)}</strong></>}
      </div>
    </div>
  );
}
