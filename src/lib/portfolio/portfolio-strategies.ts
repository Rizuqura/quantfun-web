import type { PortfolioPosition, PortfolioRole, ResolvedPosition, Ticker } from "./portfolio-types";
import { portfolioTotals, resolveAllocations } from "./portfolio-utils";

/** The only two primary buckets, in presentation order. */
export const portfolioRoles: readonly PortfolioRole[] = ["core", "position-trade"];

export const portfolioRoleLabels: Record<PortfolioRole, string> = {
  core: "CORE",
  "position-trade": "POSITION TRADE",
};

/** Display order inside each bucket. Membership comes from each position's `portfolioRole`. */
export const portfolioRoleOrder: Record<PortfolioRole, readonly Ticker[]> = {
  core: ["BTC", "TSM", "VOO", "SCHD", "GLD"],
  "position-trade": ["MSTR", "COIN", "TSLA", "TAO", "PUMP", "WLFI", "CASH"],
};

/** Preserve holding values; each bucket uses its own IDR total for weights. */
export function rolePositions(positions: readonly PortfolioPosition[], role: PortfolioRole): ResolvedPosition[] {
  const order = portfolioRoleOrder[role];
  const selected = positions
    .filter((position) => position.portfolioRole === role)
    .sort((a, b) => order.indexOf(a.ticker) - order.indexOf(b.ticker));
  return resolveAllocations(selected.map((position) => ({ ...position, allocation: undefined })));
}

/** Bucket values and their share of the whole portfolio, calculated rather than supplied. */
export function roleBreakdown(positions: readonly PortfolioPosition[]) {
  const total = portfolioTotals(positions).valueIDR;
  return portfolioRoles.map((role) => {
    const valueIDR = portfolioTotals(rolePositions(positions, role)).valueIDR;
    return { role, label: portfolioRoleLabels[role], tickers: portfolioRoleOrder[role], valueIDR, allocation: total > 0 ? valueIDR / total * 100 : 0 };
  });
}
