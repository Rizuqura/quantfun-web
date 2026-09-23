import type { AssetMetadata, Ticker } from "./portfolio-types";

export const assetMetadata: Record<Ticker, AssetMetadata> = {
  TSM: { ticker: "TSM", displayName: "Taiwan Semiconductor Manufacturing", color: "#b7616c", logoPath: "/ticker-logo/TSMC.jpg", category: "Core Equity" },
  VOO: { ticker: "VOO", displayName: "Vanguard S&P 500 ETF", color: "#853746", logoPath: "/ticker-logo/VOO.png", category: "Core Equity" },
  SCHD: { ticker: "SCHD", displayName: "Schwab U.S. Dividend Equity ETF", color: "#6b9bc2", logoPath: "/ticker-logo/SCHD.png", category: "Core Equity" },
  GLD: { ticker: "GLD", displayName: "SPDR Gold Shares", color: "#c6ae70", logoPath: "/ticker-logo/GLD.png", category: "Hedge" },
  BTC: { ticker: "BTC", displayName: "Bitcoin", color: "#d99b57", logoPath: "/ticker-logo/BTC.webp", category: "Crypto Ecosystem" },
  MSTR: { ticker: "MSTR", displayName: "Strategy", color: "#a96b48", logoPath: "/ticker-logo/MSTR.png", category: "Crypto Ecosystem" },
  PUMP: { ticker: "PUMP", displayName: "Pump.fun", color: "#83bca9", logoPath: "/ticker-logo/PUMP.png", category: "Position Trade" },
  TAO: { ticker: "TAO", displayName: "Bittensor", color: "#c9cdd0", logoPath: "/ticker-logo/TAO.png", category: "Crypto Ecosystem" },
  COIN: { ticker: "COIN", displayName: "Coinbase Global", color: "#667ed0", logoPath: "/ticker-logo/COIN.webp", category: "Crypto Ecosystem" },
  TSLA: { ticker: "TSLA", displayName: "Tesla", color: "#d38285", logoPath: "/ticker-logo/TSLA.webp", category: "Thematic Equity" },
};
