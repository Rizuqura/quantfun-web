import type { PortfolioPosition, Ticker } from "./portfolio-types";
import { resolveAllocations } from "./portfolio-utils";

export const permanentCapitalTickers: readonly Ticker[] = ["TSM", "VOO", "SCHD", "BTC", "GLD"];

/** Preserve holding values; each strategy uses its own IDR total for weights. */
export function strategyPositions(positions: readonly PortfolioPosition[], permanent: boolean) {
  const selected = positions.filter((position) => permanentCapitalTickers.includes(position.ticker) === permanent);
  if (permanent) selected.sort((a, b) => permanentCapitalTickers.indexOf(a.ticker) - permanentCapitalTickers.indexOf(b.ticker));
  return resolveAllocations(selected.map((position) => ({ ...position, allocation: undefined })));
}
