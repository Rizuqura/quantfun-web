import type { PortfolioSnapshot } from "./portfolio-types";

/** User-supplied investment record, not a live market feed. */
export const portfolioSnapshot: PortfolioSnapshot = {
  date: "2026-09-22",
  fxIDRPerUSD: 17922,
  source: "Owner-supplied portfolio snapshot, 22 September 2026",
  positions: [
    { ticker: "TSM", valueIDR: 585017, valueUSD: 32.64, allocation: 27.23, thesis: {
      role: "Semiconductor Core", narrative: "Exposure to the world's leading semiconductor manufacturing infrastructure. The position represents long-term exposure to advanced computing, AI infrastructure, HPC demand, and continued global semiconductor intensity.", keyFunction: "High-conviction productive equity.", status: "Core",
    } },
    { ticker: "VOO", valueIDR: 420063, valueUSD: 23.44, allocation: 19.55, thesis: {
      role: "Broad Market Core", narrative: "Provides broad exposure to large-cap U.S. productive assets and reduces dependence on individual-company outcomes. It serves as a long-duration compounding foundation within the portfolio.", keyFunction: "Broad equity diversification.", status: "Core",
    } },
    { ticker: "SCHD", valueIDR: 340642, valueUSD: 19.01, allocation: 15.86, thesis: {
      role: "Quality & Dividend Core", narrative: "Provides exposure to profitable, cash-generating U.S. businesses with an emphasis on dividend quality. The position helps balance higher-beta technology and crypto exposure.", keyFunction: "Quality equity ballast and compounding.", status: "Core",
    } },
    { ticker: "GLD", valueIDR: 193502, valueUSD: 10.80, allocation: 9.01, thesis: {
      role: "Macro Hedge", narrative: "Gold is held as a monetary and portfolio hedge against currency debasement, macro uncertainty, inflationary regimes, and periods in which risk assets experience significant stress.", keyFunction: "Portfolio hedge.", status: "Hedge",
    } },
    { ticker: "BTC", valueIDR: 289641, valueUSD: 16.16, allocation: 13.48, thesis: {
      role: "Permanent Monetary Capital", narrative: "Bitcoin is held across multiple cycles for its scarcity and network-adoption thesis. RN001 supplies historical cycle context, including diminishing returns, rather than a price forecast or a reason to tie this permanent holding to a single cycle.", keyFunction: "Long-term digital monetary exposure.", status: "Core",
    } },
    { ticker: "MSTR", valueIDR: 92175, valueUSD: 5.14, allocation: 4.29, thesis: {
      role: "High-Beta Bitcoin Expression", narrative: "Strategy provides a higher-beta equity expression of the Bitcoin thesis through its Bitcoin-heavy capital structure and corporate strategy. It is intentionally smaller than BTC because its volatility and downside amplification are substantially greater.", keyFunction: "BTC upside amplifier.", status: "Active",
    } },
    { ticker: "PUMP", valueIDR: 96045, valueUSD: 5.36, allocation: 4.47, thesis: {
      role: "Position Trade", narrative: "Pump.fun is a tactical position rather than a permanent strategic allocation. The position exists to capture a specific crypto market opportunity and should remain separated conceptually from the long-term crypto portfolio.", keyFunction: "Tactical alpha opportunity.", status: "Tactical",
    } },
    { ticker: "TAO", valueIDR: 58774, valueUSD: 3.28, allocation: 2.74, thesis: {
      role: "Decentralized AI Bet", narrative: "Bittensor represents an asymmetric thesis at the intersection of artificial intelligence and decentralized networks. The position is treated as venture-like risk rather than a core monetary asset.", keyFunction: "Asymmetric AI/crypto exposure.", status: "Active",
    } },
    { ticker: "COIN", valueIDR: 49577, valueUSD: 2.77, allocation: 2.31, thesis: {
      role: "Crypto Infrastructure Equity", narrative: "Coinbase provides exposure to crypto adoption through exchange, custody, stablecoin, and broader digital-asset infrastructure. Unlike BTC, the position also contains company-specific fundamental risk and opportunity.", keyFunction: "Crypto ecosystem infrastructure exposure.", status: "Active",
    } },
    { ticker: "TSLA", valueIDR: 23019, valueUSD: 1.28, allocation: 1.07, thesis: {
      role: "Thematic Equity", narrative: "Tesla is currently maintained as a small thematic position while a broader independent fundamental thesis is developed. It should not be treated purely as crypto beta.", keyFunction: "Optionality.", status: "Active",
    } },
  ],
};
