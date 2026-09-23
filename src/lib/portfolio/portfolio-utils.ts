import type { PortfolioPosition, ResolvedPosition } from "./portfolio-types";

export const formatUSD = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
export const formatIDR = (value: number) => `Rp${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value)}`;
export const formatAllocation = (value: number) => `${value.toFixed(2)}%`;
export const formatCompactIDR = (value: number) => `Rp${new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 }).format(value)}`;
export const formatSnapshotDate = (date: string) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));

export function portfolioTotals(positions: readonly PortfolioPosition[]) {
  return {
    valueIDR: positions.reduce((sum, position) => sum + position.valueIDR, 0),
    valueUSD: positions.reduce((sum, position) => sum + Math.round(position.valueUSD * 100), 0) / 100,
  };
}

export function resolveAllocations(positions: readonly PortfolioPosition[]): ResolvedPosition[] {
  const total = portfolioTotals(positions).valueIDR;
  return positions.map((position) => ({ ...position, allocation: position.allocation ?? (total > 0 ? position.valueIDR / total * 100 : 0) }));
}

export function allocationSegments(positions: readonly ResolvedPosition[]) {
  const total = positions.reduce((sum, position) => sum + position.allocation, 0);
  let angle = -90;
  return positions.map((position) => {
    const start = angle;
    angle += total > 0 ? position.allocation / total * 360 : 0;
    return { ...position, start, end: angle, midpoint: (start + angle) / 2 };
  });
}

export function polarPoint(radius: number, angle: number) {
  const radians = angle * Math.PI / 180;
  return { x: 200 + radius * Math.cos(radians), y: 200 + radius * Math.sin(radians) };
}

export function donutPath(start: number, end: number, outer = 166, inner = 112) {
  // A minimal gap keeps even the smallest position visible. Guard full-circle SVG arcs.
  const gap = Math.min(0.8, (end - start) / 8);
  const from = start + gap / 2;
  const to = Math.min(end - gap / 2, from + 359.999);
  const a = polarPoint(outer, from), b = polarPoint(outer, to);
  const c = polarPoint(inner, to), d = polarPoint(inner, from);
  const large = to - from > 180 ? 1 : 0;
  return `M ${a.x} ${a.y} A ${outer} ${outer} 0 ${large} 1 ${b.x} ${b.y} L ${c.x} ${c.y} A ${inner} ${inner} 0 ${large} 0 ${d.x} ${d.y} Z`;
}
