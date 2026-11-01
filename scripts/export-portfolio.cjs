const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const ts = require("typescript");

// Export only after the factsheet passes layout, privacy and PDF checks.
const root = path.resolve(__dirname, "..");
const result = spawnSync(process.execPath, ["tests/portfolio-browser.cjs"], { cwd: root, stdio: "inherit", windowsHide: true });
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status || 1);

require.extensions[".ts"] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText, filename);
};
const { portfolioSnapshot } = require("../src/lib/portfolio/portfolio-data.ts");
const { portfolioReportPath } = require("../src/lib/portfolio/portfolio-utils.ts");
const destination = path.join(root, "public", portfolioReportPath(portfolioSnapshot.date));
fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.copyFileSync(path.join(root, ".tmp/portfolio-november-2026.pdf"), destination);
console.log("Downloadable factsheet saved to " + destination);
