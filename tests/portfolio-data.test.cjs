const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

// Compile the isolated, dependency-free data layer using the existing TypeScript installation.
require.extensions[".ts"] = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  module._compile(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, filename);
};
const { portfolioSnapshot } = require("../src/lib/portfolio/portfolio-data.ts");
const { assetMetadata } = require("../src/lib/portfolio/asset-metadata.ts");
const { portfolioTotals, resolveAllocations, allocationSegments, donutPath, formatUSD, formatIDR, formatSnapshotDate } = require("../src/lib/portfolio/portfolio-utils.ts");
const { portfolioRoleLabels, portfolioRoles, portfolioRoleOrder, roleBreakdown, rolePositions } = require("../src/lib/portfolio/portfolio-strategies.ts");

const PORTFOLIO_TOTAL_IDR = 2906328;

test("snapshot reconciles to the supplied portfolio value in both currencies", () => {
  assert.deepEqual(portfolioTotals(portfolioSnapshot.positions), { valueIDR: PORTFOLIO_TOTAL_IDR, valueUSD: 162.16 });
  assert.equal(formatUSD(162.16), "$162.16");
  assert.equal(formatIDR(PORTFOLIO_TOTAL_IDR), "Rp2,906,328");
  assert.equal(formatSnapshotDate(portfolioSnapshot.date), "22 September 2026");
});

test("twelve distinct positions have complete theses and local identity assets", () => {
  assert.equal(new Set(portfolioSnapshot.positions.map((p) => p.ticker)).size, 12);
  for (const position of portfolioSnapshot.positions) {
    const metadata = assetMetadata[position.ticker];
    assert.ok(metadata.displayName && metadata.assetType && metadata.color);
    assert.ok(portfolioRoles.includes(position.portfolioRole));
    if (metadata.logoPath) assert.ok(fs.existsSync(path.join(__dirname, "../public", metadata.logoPath)));
    for (const key of ["role", "narrative", "keyFunction", "status"]) assert.ok(position.thesis[key]);
  }
  assert.equal(assetMetadata.WLFI.logoPath, "/ticker-logo/WLFI.svg");
  assert.equal(assetMetadata.CASH.assetType, "cash");
});

test("portfolio roles, not asset types, define the two buckets", () => {
  assert.deepEqual(portfolioRoleOrder.core, ["BTC", "TSM", "VOO", "SCHD", "GLD"]);
  assert.deepEqual(portfolioRoleOrder["position-trade"], ["MSTR", "COIN", "TSLA", "TAO", "PUMP", "WLFI", "CASH"]);
  assert.deepEqual(portfolioRoleLabels, { core: "CORE", "position-trade": "POSITION TRADE" });
  for (const ticker of ["BTC", "TSM", "VOO", "SCHD", "GLD"]) {
    assert.equal(portfolioSnapshot.positions.find((p) => p.ticker === ticker).portfolioRole, "core");
  }
  for (const ticker of ["MSTR", "COIN", "TSLA", "TAO", "PUMP", "WLFI", "CASH"]) {
    assert.equal(portfolioSnapshot.positions.find((p) => p.ticker === ticker).portfolioRole, "position-trade");
  }
  // Asset type and portfolio role are independent concepts.
  assert.equal(assetMetadata.BTC.assetType, "crypto");
  assert.equal(portfolioSnapshot.positions.find((p) => p.ticker === "BTC").portfolioRole, "core");
  assert.equal(assetMetadata.TAO.assetType, "crypto");
  assert.equal(portfolioSnapshot.positions.find((p) => p.ticker === "TAO").portfolioRole, "position-trade");
  assert.equal(assetMetadata.MSTR.assetType, "equity");
  assert.equal(portfolioSnapshot.positions.find((p) => p.ticker === "MSTR").portfolioRole, "position-trade");
});

test("the two buckets partition the portfolio and their shares total 100%", () => {
  const source = portfolioSnapshot.positions;
  const core = rolePositions(source, "core");
  const trade = rolePositions(source, "position-trade");
  assert.deepEqual(core.map((p) => p.ticker), ["BTC", "TSM", "VOO", "SCHD", "GLD"]);
  assert.deepEqual(trade.map((p) => p.ticker), ["MSTR", "COIN", "TSLA", "TAO", "PUMP", "WLFI", "CASH"]);
  assert.equal(portfolioTotals([...core, ...trade]).valueIDR, PORTFOLIO_TOTAL_IDR);
  const breakdown = roleBreakdown(source);
  assert.equal(portfolioTotals(core).valueIDR, 2296984);
  assert.equal(portfolioTotals(trade).valueIDR, 609344);
  assert.ok(Math.abs(breakdown.reduce((sum, role) => sum + role.allocation, 0) - 100) < 1e-9);
  for (const role of breakdown) assert.equal(role.allocation, role.valueIDR / PORTFOLIO_TOTAL_IDR * 100);
});

test("cash is the residual after every non-cash position, including COIN and TSLA", () => {
  const nonCash = portfolioSnapshot.positions.filter((p) => p.ticker !== "CASH");
  const cash = portfolioSnapshot.positions.find((p) => p.ticker === "CASH");
  assert.equal(cash.valueIDR, PORTFOLIO_TOTAL_IDR - nonCash.reduce((sum, position) => sum + position.valueIDR, 0));
  assert.equal(cash.valueIDR, 99204);
  assert.ok(cash.valueIDR > 0);
  assert.equal(portfolioSnapshot.positions.find((p) => p.ticker === "COIN").valueIDR, 49577);
  assert.equal(portfolioSnapshot.positions.find((p) => p.ticker === "TSLA").valueIDR, 23019);
});

test("derived allocations cover exactly one full ring", () => {
  const positions = resolveAllocations(portfolioSnapshot.positions);
  assert.equal(positions.find((p) => p.ticker === "BTC").allocation, 532450 / PORTFOLIO_TOTAL_IDR * 100);
  assert.ok(Math.abs(positions.reduce((sum, p) => sum + p.allocation, 0) - 100) < 1e-9);
  const segments = allocationSegments(positions);
  assert.equal(segments[0].start, -90);
  assert.ok(Math.abs(segments.at(-1).end - 270) < 1e-9);
  segments.forEach((segment, index) => {
    assert.ok(segment.end > segment.start);
    if (index) assert.equal(segment.start, segments[index - 1].end);
    assert.ok(!/NaN|Infinity/.test(donutPath(segment.start, segment.end)));
  });
});

test("future snapshots derive missing allocations from IDR without dividing by zero", () => {
  const base = { ...portfolioSnapshot.positions[0], allocation: undefined };
  assert.deepEqual(resolveAllocations([{ ...base, valueIDR: 3 }, { ...base, valueIDR: 1 }]).map((p) => p.allocation), [75, 25]);
  assert.equal(resolveAllocations([{ ...base, valueIDR: 0 }])[0].allocation, 0);
  assert.deepEqual(portfolioTotals([]), { valueIDR: 0, valueUSD: 0 });
  assert.equal(roleBreakdown([]).reduce((sum, role) => sum + role.allocation, 0), 0);
});
