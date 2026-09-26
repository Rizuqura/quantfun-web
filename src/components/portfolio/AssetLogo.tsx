import { assetMetadata } from "@/lib/portfolio/asset-metadata";
import type { Ticker } from "@/lib/portfolio/portfolio-types";
import styles from "./Portfolio.module.css";

export default function AssetLogo({ ticker }: { ticker: Ticker }) {
  const { logoPath } = assetMetadata[ticker];
  // Tickers without a supplied local mark (cash) render no image rather than a broken one.
  if (!logoPath) return null;
  return <img className={styles.assetLogo} src={logoPath} alt="" width={32} height={32} />;
}
