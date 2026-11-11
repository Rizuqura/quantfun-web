const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const ts = require("typescript");

// Compile the isolated data layer using the project's existing TypeScript installation.
require.extensions[".ts"] = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  module._compile(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, filename);
};
const { portfolioSnapshot } = require("../src/lib/portfolio/portfolio-data.ts");
const { assetMetadata } = require("../src/lib/portfolio/asset-metadata.ts");
const { sortAllocations, allocationSegments, donutPath, formatAllocation, formatIDR, formatUSD, formatSnapshotDate, formatReportingPeriod } = require("../src/lib/portfolio/portfolio-utils.ts");

const expectedAllocations = [
  ["S&P500", 33.67], ["TSM", 20.31], ["CASH", 14.99],
  ["BTC", 14.41], ["GOOGL", 8.02], ["MSTR", 7.77], ["GOTO", 0.84],
];

test("November snapshot preserves AUM and the seven public allocation weights", () => {
  assert.equal(portfolioSnapshot.totalAUMIDR, 2693025);
  assert.equal(formatIDR(portfolioSnapshot.totalAUMIDR), "Rp2,693,025");
  assert.equal(formatUSD(portfolioSnapshot.totalAUMUSD).replace(/\s/g, ' '), "USD 147.97");
  assert.equal(portfolioSnapshot.totalAUMUSD, portfolioSnapshot.totalAUMIDR / 18200);
  assert.equal(portfolioSnapshot.date, "2026-11-01");
  assert.equal(formatSnapshotDate(portfolioSnapshot.date), "November 1, 2026");
  assert.equal(formatReportingPeriod(portfolioSnapshot.date), "November 2026");
  assert.deepEqual(portfolioSnapshot.positions.map(p => [p.ticker, p.allocation]), expectedAllocations);
  for (const [ticker, weight] of expectedAllocations) {
    assert.equal(formatAllocation(weight), weight.toFixed(2) + "%");
    assert.ok(assetMetadata[ticker].displayName && assetMetadata[ticker].color);
    assert.ok(fs.existsSync(require('node:path').join(__dirname, '../public', assetMetadata[ticker].logoPath)));
  }
  assert.equal(assetMetadata.CASH.displayName, "Cash");
  assert.equal(assetMetadata.GOOGL.displayName, "Alphabet Class A");
});

test("public snapshot contains only approved disclosure fields", () => {
  assert.doesNotMatch(JSON.stringify({ portfolioSnapshot, assetMetadata }), /VOO|SCHD|Vanguard|Schwab/);
  assert.deepEqual(Object.keys(portfolioSnapshot).sort(), ["date", "positions", "totalAUMIDR", "totalAUMUSD"]);
  for (const position of portfolioSnapshot.positions) {
    assert.deepEqual(Object.keys(position).sort(), ["allocation", "ticker"]);
  }
});

test("rounded weights total 100.01% while geometry closes a full ring without changing labels", () => {
  const positions = portfolioSnapshot.positions;
  const total = positions.reduce((sum, p) => sum + p.allocation, 0);
  assert.ok(Math.abs(total - 100.01) < 1e-9);
  assert.ok(Math.abs(100 - total) < 0.02);
  const segments = allocationSegments(positions);
  assert.equal(segments[0].start, -90);
  assert.ok(Math.abs(segments.at(-1).end - 270) < 1e-9);
  segments.forEach((segment, index) => {
    assert.equal(segment.allocation, expectedAllocations[index][1]);
    assert.ok(segment.end > segment.start);
    if (index) assert.equal(segment.start, segments[index - 1].end);
    assert.ok(!/NaN|Infinity/.test(donutPath(segment.start, segment.end)));
  });
  assert.deepEqual(allocationSegments([]), []);
});

test("GOTO capital is added to AUM and existing rounded weights are rebased proportionally", () => {
  const previousTotal = 2670525;
  const capitalAdded = portfolioSnapshot.totalAUMIDR - previousTotal;
  assert.ok(capitalAdded > 0);
  const previousWeights = [33.95, 20.48, 15.11, 14.53, 8.09, 7.83];
  const previousWeightSum = previousWeights.reduce((sum, weight) => sum + weight, 0);
  portfolioSnapshot.positions.slice(0, -1).forEach((position, index) => {
    const rebased = previousWeights[index] / previousWeightSum * previousTotal / portfolioSnapshot.totalAUMIDR * 100;
    assert.ok(Math.abs(position.allocation - rebased) <= 0.005);
  });
  assert.ok(Math.abs(portfolioSnapshot.positions.at(-1).allocation - capitalAdded / portfolioSnapshot.totalAUMIDR * 100) <= 0.005);
});

test("descending display order does not mutate a supplied snapshot", () => {
  const positions = Object.freeze([...portfolioSnapshot.positions].reverse());
  const original = [...positions];
  assert.deepEqual(sortAllocations(positions).map(p => p.ticker), expectedAllocations.map(p => p[0]));
  assert.deepEqual(positions, original);
});
