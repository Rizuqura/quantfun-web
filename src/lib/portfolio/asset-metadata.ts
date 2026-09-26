import type { AssetMetadata, Ticker } from "./portfolio-types";

/** Identity only. A position's bucket comes from its `portfolioRole`, never from `assetType`. */
export const assetMetadata: Record<Ticker, AssetMetadata> = {
  TSM: { ticker: "TSM", displayName: "Taiwan Semiconductor Manufacturing", color: "#b7616c", logoPath: "/ticker-logo/TSMC.jpg", assetType: "equity" },
  VOO: { ticker: "VOO", displayName: "Vanguard S&P 500 ETF", color: "#853746", logoPath: "/ticker-logo/VOO.png", assetType: "etf" },
  SCHD: { ticker: "SCHD", displayName: "Schwab U.S. Dividend Equity ETF", color: "#6b9bc2", logoPath: "/ticker-logo/SCHD.png", assetType: "etf" },
  GLD: { ticker: "GLD", displayName: "SPDR Gold Shares", color: "#c6ae70", logoPath: "/ticker-logo/GLD.png", assetType: "commodityETF" },
  BTC: { ticker: "BTC", displayName: "Bitcoin", color: "#d99b57", logoPath: "/ticker-logo/BTC.webp", assetType: "crypto" },
  MSTR: { ticker: "MSTR", displayName: "Strategy", color: "#a96b48", logoPath: "/ticker-logo/MSTR.png", assetType: "equity" },
  PUMP: { ticker: "PUMP", displayName: "Pump.fun", color: "#83bca9", logoPath: "/ticker-logo/PUMP.png", assetType: "crypto" },
  TAO: { ticker: "TAO", displayName: "Bittensor", color: "#c9cdd0", logoPath: "/ticker-logo/TAO.png", assetType: "crypto" },
  COIN: { ticker: "COIN", displayName: "Coinbase Global", color: "#667ed0", logoPath: "/ticker-logo/COIN.webp", assetType: "equity" },
  TSLA: { ticker: "TSLA", displayName: "Tesla", color: "#d38285", logoPath: "/ticker-logo/TSLA.webp", assetType: "equity" },
  WLFI: { ticker: "WLFI", displayName: "World Liberty Financial", color: "#d8a33e", logoPath: "/ticker-logo/WLFI.svg", assetType: "crypto" },
  CASH: { ticker: "CASH", displayName: "Cash reserve", color: "#8a9c8f", assetType: "cash" },
};
