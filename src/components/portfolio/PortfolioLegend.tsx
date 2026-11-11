import { assetMetadata } from "@/lib/portfolio/asset-metadata";
import type { AssetInteraction, PortfolioPosition } from "@/lib/portfolio/portfolio-types";
import { formatAllocation } from "@/lib/portfolio/portfolio-utils";
import styles from "./Portfolio.module.css";

export default function PortfolioLegend({ positions, activeAsset, onActivate }: AssetInteraction & { positions: PortfolioPosition[] }) {
  return (
    <ul className={styles.legend} aria-label="Asset allocation, largest to smallest">
      {positions.map((position) => (
        <li key={position.ticker}>
          <button type="button" aria-pressed={activeAsset === position.ticker}
            onPointerEnter={() => onActivate(position.ticker)} onPointerLeave={() => onActivate(null)}
            onFocus={() => onActivate(position.ticker)} onBlur={() => onActivate(null)} onClick={() => onActivate(position.ticker)}
            onKeyDown={(event) => { if (event.key === "Escape") onActivate(null); }}>
            <span className={styles.assetMark}>
              <img className={styles.assetLogo} src={assetMetadata[position.ticker].logoPath} style={{ background: assetMetadata[position.ticker].logoBackground }} alt="" width={38} height={38} />
              <i className={styles.swatch} style={{ background: assetMetadata[position.ticker].color }} aria-hidden="true" />
            </span>
            <span className={styles.assetIdentity}><b>{position.ticker === "CASH" ? "Cash" : position.ticker}</b>{position.ticker !== "CASH" && <span>{assetMetadata[position.ticker].displayName}</span>}</span>
            <span className={styles.weight}>{formatAllocation(position.allocation)}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
