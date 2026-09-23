# Portfolio position page

Route: `/portfolio`. The existing Portfolio navigation entry opens this page;
the homepage Works section remains available at `/#portfolio`.

## Source and calculations

`src/lib/portfolio/portfolio-data.ts` is the canonical owner-supplied snapshot of
22 September 2026, with ten positions and the supplied investment thesis copy.
Totals are calculated from positions: IDR 2,148,455 and USD 119.88. USD totals are
summed as integer cents. The working FX rate is descriptive; the independently
rounded supplied USD values are preserved rather than recalculated.

Supplied allocation labels sum to 100.01%. Chart angles normalize these weights
to 360 degrees; labels retain the supplied values. Omitting a position's optional
`allocation` derives it from its IDR value divided by total IDR value. Supply all
allocations consistently, or omit all allocations when using calculated weights.

## Updating data

Update `portfolioSnapshot` for a new record. Asset names, categories, colors, and
local logo paths live in `asset-metadata.ts`. The supplied logos in
`public/ticker-logo/` are shared by the legend, holdings, thesis cards, and active
donut center. TSM maps to `TSMC.jpg`; other files use their holding ticker.
The shared `AssetLogo` component preserves image proportions on a light backdrop
so dark marks remain readable. Replace a file at the same path or update the
metadata mapping to change a logo across the entire portfolio.

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
