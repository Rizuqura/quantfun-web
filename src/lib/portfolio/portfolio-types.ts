export type Ticker = "S&P500" | "TSM" | "CASH" | "BTC" | "GOOGL" | "MSTR" | "GOTO";

export interface AssetMetadata {
  displayName: string;
  color: string;
  logoPath: string;
  logoBackground?: string;
}

/** Public factsheet fields only; no asset values or private accounting data. */
export interface PortfolioPosition {
  ticker: Ticker;
  allocation: number;
}

export interface PortfolioSnapshot {
  date: string;
  totalAUMIDR: number;
  /** Estimated equivalent using the report's documented working FX rate. */
  totalAUMUSD: number;
  positions: PortfolioPosition[];
}

export interface AssetInteraction {
  activeAsset: Ticker | null;
  onActivate: (ticker: Ticker | null) => void;
}
