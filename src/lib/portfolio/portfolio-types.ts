export type Ticker = "TSM" | "VOO" | "SCHD" | "GLD" | "BTC" | "MSTR" | "PUMP" | "TAO" | "COIN" | "TSLA" | "WLFI" | "CASH";

/** What the instrument is. Descriptive only; it never drives portfolio classification. */
export type AssetType = "equity" | "etf" | "commodityETF" | "crypto" | "cash";

/** What the position does inside the portfolio. The only two primary buckets. */
export type PortfolioRole = "core" | "position-trade";

export interface AssetMetadata {
  ticker: Ticker;
  displayName: string;
  color: string;
  logoPath?: string;
  assetType: AssetType;
}

export interface InvestmentThesis {
  role: string;
  narrative: string;
  keyFunction: string;
  status: "Active" | "Tactical" | "Core" | "Hedge";
  // Optional research fields can be populated by a later API without changing the UI contract.
  thesisState?: string;
  priceTargets?: { currency: string; value: number; horizon: string }[];
  scenarios?: Partial<Record<"bear" | "base" | "bull" | "ultraBull", string>>;
  invalidationConditions?: string[];
}

export interface PortfolioPosition {
  ticker: Ticker;
  /** Functional classification. Independent from AssetMetadata.assetType. */
  portfolioRole: PortfolioRole;
  valueIDR: number;
  valueUSD: number;
  allocation?: number;
  thesis: InvestmentThesis;
  targetAllocation?: number;
  entryDate?: string;
  exitRules?: string[];
  rebalanceRules?: string[];
}

export interface PortfolioSnapshot {
  date: string;
  fxIDRPerUSD: number;
  source: string;
  positions: PortfolioPosition[];
}

export type ResolvedPosition = PortfolioPosition & { allocation: number };

export interface AssetInteraction {
  activeAsset: Ticker | null;
  onActivate: (ticker: Ticker | null) => void;
}
