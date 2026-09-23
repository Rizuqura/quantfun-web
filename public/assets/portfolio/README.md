# Portfolio identity placeholders

These legacy placeholders are no longer used by the Portfolio page. Its shared
asset metadata now points to the supplied images in `public/ticker-logo/`.

These locally authored SVG monograms are temporary identifiers, not official brand logos.
Replace each SVG with an approved brand asset at the same path, or change `logoPath`
in `src/lib/portfolio/asset-metadata.ts`. The chart uses metadata colors and has no
remote logo dependencies. Bitcoin and Bittensor use their currency-style symbols;
gold uses the chemical symbol Au.
