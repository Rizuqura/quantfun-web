import type { PortfolioSnapshot } from "./portfolio-types";

const totalAUMIDR = 2670525;
// Owner-supplied reporting conversion, not a live FX quote.
const workingIDRPerUSD = 18200;

/** Public, owner-supplied snapshot. Store only AUM and percentage allocations. */
export const portfolioSnapshot: PortfolioSnapshot = {
  date: "2026-11-01",
  totalAUMIDR,
  totalAUMUSD: totalAUMIDR / workingIDRPerUSD,
  positions: [
    { ticker: "S&P500", allocation: 33.95 },
    { ticker: "TSM", allocation: 20.48 },
    { ticker: "CASH", allocation: 15.11 },
    { ticker: "BTC", allocation: 14.53 },
    { ticker: "GOOGL", allocation: 8.09 },
    { ticker: "MSTR", allocation: 7.83 },
  ],
};
