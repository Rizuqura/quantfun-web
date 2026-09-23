export type Ticker = "TSM" | "VOO" | "SCHD" | "GLD" | "BTC" | "MSTR" | "PUMP" | "TAO" | "COIN" | "TSLA";
export type Category = "Core Equity" | "Hedge" | "Crypto Ecosystem" | "Position Trade" | "Thematic Equity";

export interface AssetMetadata {
  ticker: Ticker;
  displayName: string;
  color: string;
  logoPath: string;
  category: Category;
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
