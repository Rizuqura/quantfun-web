import type { PortfolioSnapshot } from "./portfolio-types";

const totalAUMIDR = 2693025;
// Owner-supplied reporting conversion, not a live FX quote.
const workingIDRPerUSD = 18200;

/** Public, owner-supplied snapshot. Store only AUM and percentage allocations. */
export const portfolioSnapshot: PortfolioSnapshot = {
  date: "2026-11-01",
  totalAUMIDR,
  totalAUMUSD: totalAUMIDR / workingIDRPerUSD,
  positions: [
    // Existing weights rebased proportionally from the prior rounded snapshot.
    { ticker: "S&P500", allocation: 33.67 },
    { ticker: "TSM", allocation: 20.31 },
    { ticker: "CASH", allocation: 14.99 },
    { ticker: "BTC", allocation: 14.41 },
    { ticker: "GOOGL", allocation: 8.02 },
    { ticker: "MSTR", allocation: 7.77 },
    { ticker: "GOTO", allocation: 0.84 },
  ],
};
