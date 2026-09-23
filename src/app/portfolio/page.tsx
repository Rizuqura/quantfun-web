import type { Metadata } from "next";
import PortfolioPage from "@/components/portfolio/PortfolioPage";
import { portfolioSnapshot } from "@/lib/portfolio/portfolio-data";

export const metadata: Metadata = {
  title: "Portfolio | QuantFun Technologies",
  description: "Where QuantFun capital is allocated, and why. Investment positions and their underlying theses.",
};

export default function Page() {
  return <PortfolioPage snapshot={portfolioSnapshot} />;
}
