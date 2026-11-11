# Monthly Portfolio Factsheet

The existing Portfolio menu opens `/portfolio`. The page reuses the QuantFun
dark palette, serif heading, navigation and allocation components.

## Public snapshot

`src/lib/portfolio/portfolio-data.ts` is the canonical owner-supplied snapshot:
November 1, 2026, total AUM Rp2,693,025, with seven percentage allocations.
USD is the primary AUM display; IDR appears underneath. The estimated USD
equivalent is USD 147.97, derived using the owner-supplied reporting rate of
Rp18,200/USD. This is not a live FX rate. Update the working conversion when an
approved USD valuation or rate is supplied. Conversion applies only to total AUM.
Each position contains only its ticker and supplied allocation. Names and chart
colors live in `asset-metadata.ts`. No position values, quantities, FX rates,
cost basis, account information, transactions or investment theses are stored
in the public factsheet model or passed to the browser.

For a future edition, update the date, total AUM and percentage allocations.
The header and footer derive the reporting period/date from that snapshot.
Update the route metadata in `src/app/portfolio/page.tsx` for the new edition.

The updated percentages total **100.01%**. Display labels retain their supplied
two decimal places; SVG angles alone normalize the weights to a full circle.
Cash appears as its own allocation. Display order is descending by weight.

GOTO is included as additional capital at 0.84%. Existing allocations are
approximate: the prior rounded weights are normalized by their 99.99% sum,
then rebased proportionally to the new AUM and rounded to two decimal places.
The public model stores only total AUM and percentage weights, with no position
values. The reporting date of the existing November factsheet is retained.

The public `S&P500` category combines the two index/ETF allocations at 33.67%.
It is a reporting category for diversified index and thematic exposure, not a
claim that every underlying instrument tracks the same benchmark. Underlying
fund names, tickers and separate weights are omitted from the public data model.

## Layout and export

`PortfolioPage` owns the active asset shared by `PortfolioDonut` and
`PortfolioLegend`, composed by `PortfolioAllocationChart`. Pointer, touch and
keyboard interactions show only tickers/names and percentages. All seven labels
remain visible independently of hover, and long names wrap on narrow screens.
The former value tables, role charts, thesis cards, carousel and strategy model
have been removed.

The **Print / Save PDF** control opens the browser print dialog. Print styles
provide a white A4 factsheet, hide navigation/export controls, preserve chart
colors and restore a neutral chart center even when an asset is selected.
Choose Save as PDF in the print dialog; disable browser headers/footers for a
clean publication export. No PDF library or other dependency is required.

**Download PDF** directly downloads the versioned file under `public/reports/`.
After changing a snapshot, stop the development server, run the production build
and server, then run
`npm run export:portfolio` (or `npm.cmd run export:portfolio` in PowerShell).
This runs the browser/export checks before publishing the generated one-page PDF.
Chrome must be installed; the same `CHROME_PATH` and `PORTFOLIO_BASE_URL`
overrides as the browser check are supported. Regenerate the PDF before deploying
an updated factsheet so the web view and download stay consistent.
Stop the production server before restarting development; both use `.next/`.

Each allocation has a local logo. Existing TSMC, Bitcoin and Strategy assets are
reused. The S&P500 logo is the owner-supplied red circular PNG in
`public/ticker-logo/SP500.png`.
Logos use circular containers in the asset list and appear inside their matching
donut slices. SVG clipping keeps the chart icons round, and midpoint placement
keeps them separated. Chart icons do not intercept pointer or touch interactions.
Small allocations use an outside circular badge with a short leader line so
their logo does not obscure the slice. GOTO uses the official GoTo wordmark
from https://www.gotocompany.com/_next/static/media/footer-logo.8fa29839.png
on a green circular background.
Alphabet icon source: https://commons.wikimedia.org/wiki/File:Abc.xyz_Favicon.svg.
Cash uses a project-owned banknote SVG. Logos are stored locally so printing
and downloads do not depend on third-party image requests.

## Verification

- `node --test tests/portfolio-data.test.cjs`
- `node node_modules/typescript/bin/tsc --noEmit --incremental false`
- `npm run build` (use `npm.cmd` in PowerShell where scripts are restricted).
- With the production server on port 3100: `node tests/portfolio-browser.cjs`.

The browser check uses installed Chrome and Node's built-in DevTools/WebSocket
APIs. Override `CHROME_PATH` or `PORTFOLIO_BASE_URL` if needed. It verifies
public labels and serialized data, absence of removed sections, asset interaction,
mobile/desktop overflow and label layout, print styling, one-page PDF output,
and browser runtime errors. QA screenshots and the exported PDF go to ignored
`.tmp/`.

The existing lint script uses deprecated `next lint`; lint configuration is
outside this change. No additional dependency was introduced.
