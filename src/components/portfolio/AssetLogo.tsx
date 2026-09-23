import { assetMetadata } from "@/lib/portfolio/asset-metadata";
import type { Ticker } from "@/lib/portfolio/portfolio-types";
import styles from "./Portfolio.module.css";

export default function AssetLogo({ ticker }: { ticker: Ticker }) {
  return <img className={styles.assetLogo} src={assetMetadata[ticker].logoPath} alt="" width={32} height={32} />;
}
