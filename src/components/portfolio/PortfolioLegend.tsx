import { assetMetadata } from "@/lib/portfolio/asset-metadata";
import type { AssetInteraction, ResolvedPosition } from "@/lib/portfolio/portfolio-types";
import { formatAllocation } from "@/lib/portfolio/portfolio-utils";
import AssetLogo from "./AssetLogo";
import styles from "./Portfolio.module.css";

export default function PortfolioLegend({ positions, activeAsset, onActivate }: AssetInteraction & { positions: ResolvedPosition[] }) {
  return <ul className={styles.legend} aria-label="Select a portfolio position">
    {positions.map((position) => <li key={position.ticker}><button type="button" aria-pressed={activeAsset === position.ticker}
      onPointerEnter={() => onActivate(position.ticker)} onPointerLeave={() => onActivate(null)}
      onFocus={() => onActivate(position.ticker)} onBlur={() => onActivate(null)} onClick={() => onActivate(position.ticker)}>
      <AssetLogo ticker={position.ticker} /><span>{position.ticker}</span><i style={{ background: assetMetadata[position.ticker].color }} aria-hidden="true" /><span>{formatAllocation(position.allocation)}</span>
    </button></li>)}
  </ul>;
}
