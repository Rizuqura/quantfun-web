const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const ts = require("typescript");

// Compile the isolated, dependency-free data layer using the existing TypeScript installation.
require.extensions[".ts"] = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  module._compile(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, filename);
};
const { portfolioSnapshot } = require("../src/lib/portfolio/portfolio-data.ts");
const { assetMetadata } = require("../src/lib/portfolio/asset-metadata.ts");
const { portfolioTotals, resolveAllocations, allocationSegments, donutPath, formatUSD, formatIDR, formatSnapshotDate } = require("../src/lib/portfolio/portfolio-utils.ts");

test("snapshot reconciles to the supplied equity in both currencies", () => {
  assert.deepEqual(portfolioTotals(portfolioSnapshot.positions), { valueIDR: 2148455, valueUSD: 119.88 });
  assert.equal(formatUSD(119.88), "$119.88");
  assert.equal(formatIDR(2148455), "Rp2,148,455");
  assert.equal(formatSnapshotDate(portfolioSnapshot.date), "22 September 2026");
});

test("ten distinct positions have complete theses and local identity assets", () => {
  assert.equal(new Set(portfolioSnapshot.positions.map((p) => p.ticker)).size, 10);
  for (const position of portfolioSnapshot.positions) {
    const metadata = assetMetadata[position.ticker];
    assert.ok(metadata.displayName && metadata.category && metadata.color);
    assert.ok(fs.existsSync(require("node:path").join(__dirname, "../public", metadata.logoPath)));
    for (const key of ["role", "narrative", "keyFunction", "status"]) assert.ok(position.thesis[key]);
  }
});

test("rounded allocations preserve labels while covering exactly one full ring", () => {
  const positions = resolveAllocations(portfolioSnapshot.positions);
  assert.equal(positions.find((p) => p.ticker === "BTC").allocation, 13.48);
  assert.ok(Math.abs(positions.reduce((sum, p) => sum + p.allocation, 0) - 100.01) < 1e-9);
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
  const base = portfolioSnapshot.positions[0];
  assert.deepEqual(resolveAllocations([{ ...base, allocation: undefined, valueIDR: 3 }, { ...base, allocation: undefined, valueIDR: 1 }]).map((p) => p.allocation), [75, 25]);
  assert.equal(resolveAllocations([{ ...base, allocation: undefined, valueIDR: 0 }])[0].allocation, 0);
  assert.deepEqual(portfolioTotals([]), { valueIDR: 0, valueUSD: 0 });
});
