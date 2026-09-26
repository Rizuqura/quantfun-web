import type { PortfolioPosition, PortfolioSnapshot } from "./portfolio-types";

/** Working FX rate. USD values are derived from IDR so both currencies stay reconciled. */
const fxIDRPerUSD = 17922;

/** Owner-supplied total portfolio value. Cash is derived as the residual against this figure. */
const portfolioTotalIDR = 2906328;

const toUSD = (valueIDR: number) => Math.round((valueIDR / fxIDRPerUSD) * 100) / 100;

/** A holding before its USD value is derived from the IDR value and the working FX rate. */
type IdrPosition = Omit<PortfolioPosition, "valueUSD">;

/** User-supplied investment record, not a live market feed. */
const nonCashPositions: IdrPosition[] = [
  { ticker: "BTC", portfolioRole: "core", valueIDR: 532450, thesis: {
    role: "Permanent Monetary Capital", narrative: "Bitcoin is held across multiple cycles for its scarcity and network-adoption thesis. RN001 supplies historical cycle context, including diminishing returns, rather than a price forecast or a reason to tie this permanent holding to a single cycle.", keyFunction: "Long-term digital monetary exposure.", status: "Core",
  } },
  { ticker: "TSM", portfolioRole: "core", valueIDR: 600453, thesis: {
    role: "Semiconductor Core", narrative: "Exposure to the world's leading semiconductor manufacturing infrastructure. The position represents long-term exposure to advanced computing, AI infrastructure, HPC demand, and continued global semiconductor intensity.", keyFunction: "High-conviction productive equity.", status: "Core",
  } },
  { ticker: "VOO", portfolioRole: "core", valueIDR: 418488, thesis: {
    role: "Broad Market Core", narrative: "Provides broad exposure to large-cap U.S. productive assets and reduces dependence on individual-company outcomes. It serves as a long-duration compounding foundation within the portfolio.", keyFunction: "Broad equity diversification.", status: "Core",
  } },
  { ticker: "SCHD", portfolioRole: "core", valueIDR: 404857, thesis: {
    role: "Quality & Dividend Core", narrative: "Provides exposure to profitable, cash-generating U.S. businesses with an emphasis on dividend quality. The position helps balance higher-beta technology and crypto exposure.", keyFunction: "Quality equity ballast and compounding.", status: "Core",
  } },
  { ticker: "GLD", portfolioRole: "core", valueIDR: 340736, thesis: {
    role: "Macro Hedge", narrative: "Gold is held as a monetary and portfolio hedge against currency debasement, macro uncertainty, inflationary regimes, and periods in which risk assets experience significant stress.", keyFunction: "Portfolio hedge.", status: "Hedge",
  } },
  { ticker: "MSTR", portfolioRole: "position-trade", valueIDR: 169798, thesis: {
    role: "High-Beta Bitcoin Expression", narrative: "Strategy provides a higher-beta equity expression of the Bitcoin thesis through its Bitcoin-heavy capital structure and corporate strategy. It is intentionally smaller than BTC because its volatility and downside amplification are substantially greater.", keyFunction: "BTC upside amplifier.", status: "Active",
  } },
  { ticker: "COIN", portfolioRole: "position-trade", valueIDR: 49577, thesis: {
    role: "Crypto Infrastructure Equity", narrative: "Coinbase provides exposure to crypto adoption through exchange, custody, stablecoin, and broader digital-asset infrastructure. Unlike BTC, the position also contains company-specific fundamental risk and opportunity.", keyFunction: "Crypto ecosystem infrastructure exposure.", status: "Active",
  } },
  { ticker: "TSLA", portfolioRole: "position-trade", valueIDR: 23019, thesis: {
    role: "Thematic Equity", narrative: "Tesla is currently maintained as a small thematic position while a broader independent fundamental thesis is developed. It should not be treated purely as crypto beta.", keyFunction: "Optionality.", status: "Active",
  } },
  { ticker: "TAO", portfolioRole: "position-trade", valueIDR: 148757, thesis: {
    role: "Decentralized AI Bet", narrative: "Bittensor represents an asymmetric thesis at the intersection of artificial intelligence and decentralized networks. The position is treated as venture-like risk rather than a core monetary asset.", keyFunction: "Asymmetric AI/crypto exposure.", status: "Active",
  } },
  { ticker: "PUMP", portfolioRole: "position-trade", valueIDR: 48883, thesis: {
    role: "Position Trade", narrative: "Pump.fun is a tactical position rather than a permanent strategic allocation. The position exists to capture a specific crypto market opportunity and should remain separated conceptually from the long-term core.", keyFunction: "Tactical alpha opportunity.", status: "Tactical",
  } },
  { ticker: "WLFI", portfolioRole: "position-trade", valueIDR: 70106, thesis: {
    role: "Speculative Platform Exposure", narrative: "WLFI is held as a small tactical expression of a single platform thesis rather than as a structural portfolio function. Issuer, governance, liquidity and regulatory risk are material, so the position is sized and reviewed as venture-like risk.", keyFunction: "Asymmetric platform exposure.", status: "Tactical",
  } },
];

/** Cash is the residual of the supplied total once every non-cash position is accounted for. */
const cashValueIDR =
  portfolioTotalIDR -
  nonCashPositions.reduce((sum, position) => sum + position.valueIDR, 0);

const cashPosition: IdrPosition = {
  ticker: "CASH",
  portfolioRole: "position-trade",
  valueIDR: cashValueIDR,
  thesis: {
    role: "Dry Powder", narrative: "Cash is dry powder reserved for tactical and positional opportunities rather than a separate asset class. In the functional architecture it belongs to position trade because it exists to be deployed into specific setups, so it is never surfaced as its own category.", keyFunction: "Optionality and deployment reserve.", status: "Tactical",
  },
};

export const portfolioSnapshot: PortfolioSnapshot = {
  date: "2026-09-22",
  fxIDRPerUSD,
  source: "Owner-supplied portfolio snapshot, 22 September 2026",
  positions: [...nonCashPositions, cashPosition].map((position) => ({ ...position, valueUSD: toUSD(position.valueIDR) })),
};
