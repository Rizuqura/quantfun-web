import type { AssetMetadata, Ticker } from "./portfolio-types";

export const assetMetadata: Record<Ticker, AssetMetadata> = {
  "S&P500": { displayName: "Diversified index & thematic exposure", color: "#853746", logoPath: "/ticker-logo/SP500.png" },
  TSM: { displayName: "TSMC", color: "#b7616c", logoPath: "/ticker-logo/TSMC.jpg" },
  CASH: { displayName: "Cash", color: "#8a9c8f", logoPath: "/ticker-logo/CASH.svg" },
  BTC: { displayName: "Bitcoin", color: "#d99b57", logoPath: "/ticker-logo/BTC.webp" },
  GOOGL: { displayName: "Alphabet Class A", color: "#aaa8c7", logoPath: "/ticker-logo/GOOGL.svg" },
  MSTR: { displayName: "Strategy Inc.", color: "#a96b48", logoPath: "/ticker-logo/MSTR.png" },
};
