# Portfolio position page

Route: `/portfolio`. The existing Portfolio navigation entry opens this page;
the homepage Works section remains available at `/#portfolio`.

## Source and calculations

`src/lib/portfolio/portfolio-data.ts` is the canonical owner-supplied snapshot of
22 September 2026, with twelve positions (eleven holdings plus derived cash) and the
supplied investment thesis copy. Totals are calculated from positions: IDR 2,906,328
and USD 162.16. USD values are derived from IDR at the working FX rate and summed as
integer cents, so both currencies stay reconciled.

Every position carries a `portfolioRole` of `core` or `position-trade`. These are the
only two buckets: BTC, TSM, VOO, SCHD and GLD are CORE, and MSTR, COIN, TSLA, TAO,
PUMP, WLFI and CASH are POSITION TRADE. Cash sits inside position trade because it is
dry powder reserved for tactical opportunities, so there is no separate cash or crypto
category. `assetMetadata.assetType` stays descriptive (`equity`, `etf`, `commodityETF`,
`crypto`, `cash`) and never drives classification. Bucket values and shares are
calculated by `roleBreakdown`; no percentage is hardcoded. Allocations are derived
from IDR value divided by total IDR value, and chart angles normalize them to 360
degrees.

## Updating data

Update `portfolioSnapshot` for a new record. Asset names, asset types, colors, and
local logo paths live in `asset-metadata.ts`. The supplied logos in
`public/ticker-logo/` are shared by the legend, holdings, thesis cards, and active
donut center. TSM maps to `TSMC.jpg`; other files use their holding ticker. A ticker
without a supplied mark (CASH) has no `logoPath` and `AssetLogo` renders no image.
Replace a file at the same path or update the metadata mapping to change a logo
across the entire portfolio.

`portfolioTotalIDR` in the data file is the owner-supplied portfolio total. Cash is
derived as that total minus every non-cash position, so a new holding value is
reconciled automatically as long as the total still covers the sum of the holdings.
Bucket membership and display order live in `portfolioRoleOrder`.

The server route passes a serializable `PortfolioSnapshot` into the client page.
An API/database adapter can replace the route's static import with a validated
fetch returning the same interface. Extend `PortfolioPosition` for cost basis,
market price, or accounting fields later; the current presentation intentionally
does not render P&L. The thesis model accepts optional targets, scenarios,
invalidation conditions, and state without displaying them in this version.

## Interaction architecture

`PortfolioPage` owns `activeAsset`. Donut, legend, holdings, and carousel share it.
Pointer and keyboard focus preview positions; leaving previews returns the donut
to total equity. Selecting a position moves the thesis carousel. Native touch
scrolling, mouse dragging, arrow buttons, arrow keys, and ticker selectors also
synchronize the active asset. The carousel retains its last viewport position
when a pointer preview ends. There is no automatic rotation.

SVG arcs use the existing Framer Motion spring system. Reduced-motion preferences
disable spring interpolation and animated carousel scrolling. Programmatic moves
use a 240ms Framer Motion transition with scroll snapping temporarily suspended,
so distant selections cannot stop at intermediate cards. Identity and precise
values remain available through text, keyboard controls, and the holdings table.

## Validation

- `node --test tests/portfolio-data.test.cjs`
- `npx tsc --noEmit --incremental false`
- `npm run build`
- With the production server running on port 3100: `node tests/portfolio-browser.cjs`.
  This uses installed Chrome and Node's built-in DevTools/WebSocket APIs, with no
  test dependency. Override `CHROME_PATH` or `PORTFOLIO_BASE_URL` as needed. It
  checks real pointer hover/lift, keyboard synchronization, exact carousel landing,
  next/previous boundaries, desktop dragging, native mobile swipe, reduced motion,
  image loading, page overflow, and runtime exceptions. Screenshots and a disposable
  Chrome profile are written to `.tmp/`.

The repository's existing `npm run lint` points to deprecated `next lint` and
opens an ESLint setup prompt because no configuration is installed. Lint cannot
run unattended until the repository configures ESLint. No additional runtime
dependency was introduced.
