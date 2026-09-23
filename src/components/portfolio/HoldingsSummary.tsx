import { assetMetadata } from "@/lib/portfolio/asset-metadata";
import type { AssetInteraction, ResolvedPosition } from "@/lib/portfolio/portfolio-types";
import { formatAllocation, formatIDR, formatUSD, portfolioTotals } from "@/lib/portfolio/portfolio-utils";
import AssetLogo from "./AssetLogo";
import styles from "./Portfolio.module.css";

export default function HoldingsSummary({ positions, activeAsset, onActivate }: AssetInteraction & { positions: ResolvedPosition[] }) {
  const totals = portfolioTotals(positions);
  return <section className={styles.holdings} aria-labelledby="holdings-title">
    <div className={styles.sectionTitle}><h2 id="holdings-title">Holdings</h2><span>Snapshot values</span></div>
    <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="Holdings table, scroll horizontally on smaller screens">
      <table className={styles.table}>
        <caption className="sr-only">Position values and capital allocations</caption>
        <thead><tr><th scope="col">Asset</th><th scope="col">Category</th><th scope="col">Allocation</th><th scope="col">Value USD</th><th scope="col">Value IDR</th></tr></thead>
        <tbody>{positions.map((position) => {
          const metadata = assetMetadata[position.ticker];
          return <tr key={position.ticker} data-active={activeAsset === position.ticker} onPointerEnter={() => onActivate(position.ticker)} onPointerLeave={() => onActivate(null)} onClick={() => onActivate(position.ticker)}>
            <th scope="row"><button type="button" className={styles.assetButton} aria-pressed={activeAsset === position.ticker} onFocus={() => onActivate(position.ticker)} onBlur={() => onActivate(null)} onClick={() => onActivate(position.ticker)}>
              <AssetLogo ticker={position.ticker} /><span><b>{position.ticker}</b><small>{metadata.displayName}</small></span>
            </button></th>
            <td className={styles.categoryCell}>{metadata.category}</td><td>{formatAllocation(position.allocation)}</td><td>{formatUSD(position.valueUSD)}</td><td>{formatIDR(position.valueIDR)}</td>
          </tr>;
        })}</tbody>
        <tfoot><tr><th scope="row" colSpan={2}>Total equity</th><td>100%</td><td>{formatUSD(totals.valueUSD)}</td><td>{formatIDR(totals.valueIDR)}</td></tr></tfoot>
      </table>
    </div>
    <p className={styles.tableNote}>Individual allocation labels are rounded; totals may differ by 0.01%.</p>
  </section>;
}
