import type { CSSProperties } from "react";
import { assetMetadata } from "@/lib/portfolio/asset-metadata";
import type { ResolvedPosition } from "@/lib/portfolio/portfolio-types";
import { portfolioRoleLabels } from "@/lib/portfolio/portfolio-strategies";
import { formatAllocation } from "@/lib/portfolio/portfolio-utils";
import AssetLogo from "./AssetLogo";
import styles from "./Portfolio.module.css";

export default function ThesisCard({ position, index, total }: { position: ResolvedPosition; index: number; total: number }) {
  const metadata = assetMetadata[position.ticker];
  return <article className={styles.thesisCard} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${total}: ${position.ticker}`} style={{ "--asset-color": metadata.color } as CSSProperties}>
    <div className={styles.thesisIdentity}>
      <div className={styles.thesisAsset}><AssetLogo ticker={position.ticker} /><span className={styles.eyebrow}>{portfolioRoleLabels[position.portfolioRole]}</span></div>
      <h3 className="font-serif">{position.ticker}</h3><p className={styles.fullName}>{metadata.displayName}</p>
      <dl className={styles.thesisMetrics}><div><dt>Allocation</dt><dd>{formatAllocation(position.allocation)}</dd></div><div><dt>Status</dt><dd><span className={styles.status}>{position.thesis.status}</span></dd></div></dl>
    </div>
    <div className={styles.thesisNarrative}>
      <p className={styles.eyebrow}>Role in portfolio</p><h4 className="font-serif">{position.thesis.role}</h4>
      <p className={styles.eyebrow}>Thesis</p><p className={styles.narrative}>{position.thesis.narrative}</p>
      <div className={styles.keyFunction}><p className={styles.eyebrow}>Key function</p><p>{position.thesis.keyFunction}</p></div>
    </div>
  </article>;
}
