import type { Metadata } from "next";
import PortfolioPage from "@/components/portfolio/PortfolioPage";
import { portfolioSnapshot } from "@/lib/portfolio/portfolio-data";

export const metadata: Metadata = {
  title: "November 2026 Portfolio Factsheet | QuantFun Technologies",
  description: "QuantFun Technologies monthly portfolio factsheet for November 2026. Total AUM and percentage asset allocation as of November 1, 2026.",
};

export default function Page() {
  return <PortfolioPage snapshot={portfolioSnapshot} />;
}
