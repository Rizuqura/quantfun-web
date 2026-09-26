import type { AssetInteraction, PortfolioRole, ResolvedPosition } from "@/lib/portfolio/portfolio-types";
import { portfolioRoleLabels, portfolioRoles, rolePositions } from "@/lib/portfolio/portfolio-strategies";
import { formatAllocation, portfolioTotals } from "@/lib/portfolio/portfolio-utils";
import PortfolioAllocationChart from "./PortfolioAllocationChart";
import ThesisCarousel from "./ThesisCarousel";
import styles from "./Portfolio.module.css";

const sectionCopy: Record<PortfolioRole, { id: string; title: string; eyebrow: string; introEyebrow: string; headline: string; intro: string }> = {
  core: {
    id: "permanent-capital",
    title: "Core",
    eyebrow: "01 / Long-duration ownership",
    introEyebrow: "Built to compound",
    headline: "Ownership beyond a single cycle.",
    intro: "BTC, TSMC (TSM), VOO, SCHD and GLD form the long-term foundation: a scarce digital asset, productive businesses, broad equity exposure, dividend quality and gold. Each has a distinct role; conviction is reviewed as fundamentals change.",
  },
  "position-trade": {
    id: "position-trade",
    title: "Position Trade",
    eyebrow: "02 / Cycle-sensitive opportunities",
    introEyebrow: "A defined investment horizon",
    headline: "Participate. Reassess. Adapt.",
    intro: "MSTR, COIN, TSLA, TAO, PUMP and WLFI express different parts of the crypto ecosystem and single-name themes. CASH is the dry powder held inside this bucket for tactical deployment, not a category of its own.",
  },
};

export default function InvestmentThesisSection({ positions, ...interaction }: AssetInteraction & { positions: ResolvedPosition[] }) {
  const total = portfolioTotals(positions).valueIDR;
  return <>{portfolioRoles.map((role) => {
    const permanent = role === "core";
    const copy = sectionCopy[role];
    const group = rolePositions(positions, role);
    const id = copy.id;
    const title = copy.title;
    const share = total > 0 ? portfolioTotals(group).valueIDR / total * 100 : 0;
    return <section key={id} id={id} className={styles.strategySection} aria-labelledby={`${id}-title`}>
      <header className={styles.strategyHeading}>
        <div><p className={styles.eyebrow}>{copy.eyebrow}</p><h2 id={`${id}-title`} className="font-serif">{title}</h2></div>
        <div className={styles.strategyShare}><strong>{formatAllocation(share)}</strong><span>of total portfolio · by IDR value</span></div>
      </header>
      <div className={styles.strategyOverview}>
        <PortfolioAllocationChart {...interaction} positions={group} id={`${id}-allocation`} title={`${portfolioRoleLabels[role]} allocation`} allocationScope={title.toLowerCase()} />
        <div className={styles.strategyIntro}>
          <p className={styles.eyebrow}>{copy.introEyebrow}</p>
          <h3 className="font-serif">{copy.headline}</h3>
          <p>{copy.intro}</p>
          <p className={styles.strategyAllocationNote}>Chart weights are relative to this group and total 100% before rounding. Holding values come from the same portfolio snapshot.</p>
        </div>
      </div>
      <div className={styles.strategyThesis}>
        <p className={styles.eyebrow}>{permanent ? "Long-term thesis" : "2–3 year outlook / September 2026–2029"}</p>
        <h3 className="font-serif">{permanent ? "Compound productive capital. Preserve monetary optionality." : "Use the cycle as context, then test the opportunity."}</h3>
        {permanent ? <>
          <p>TSMC provides the semiconductor exposure; VOO spreads ownership across large U.S. businesses; SCHD adds a dividend-quality emphasis. Together, they anchor the portfolio in business earnings and long-term compounding. GLD adds a distinct monetary exposure, while BTC is held for its scarcity and adoption thesis over multiple cycles.</p>
          <p>RN001 suggests recurring phases in Bitcoin’s historical cycles and diminishing cycle returns. For permanent capital, the implication is to separate BTC’s long-term rationale from near-term cycle enthusiasm. The framework informs patience and review; it does not establish the investment case for the equity or gold holdings, or guarantee diversification during stress.</p>
        </> : <>
          <p>RN001 describes expansion, contraction, below-trend conditions and recovery across normalized Bitcoin cycles. At its June 2026 research cutoff, the study placed its observation in a post-expansion transition. This is a historical observation, not a live reading of the September 2026 portfolio.</p>
          <div className={styles.outlookGrid}>
            <article><h4>Contraction & rebuilding</h4><p>If the historical pattern persists, weaker conditions may precede recovery. Review resilience and position sizing; a lower price alone does not validate a thesis.</p></article>
            <article><h4>Recovery & participation</h4><p>Across the next two to three years, a recovery would need evidence of renewed demand and sustained activity. MSTR and COIN offer different equity exposures; PUMP, TAO and WLFI require their own adoption and token-economics evidence.</p></article>
            <article><h4>Reassessment & exits</h4><p>Diminishing historical cycle returns argue against extrapolating earlier gains. Reassess as the thesis matures or weakens, and revise the outlook if liquidity, company fundamentals or network usage diverge from the cycle framework.</p></article>
          </div>
          <p>These scenarios are portfolio interpretations of the research, not asset-level findings or price targets. TSLA remains a separate business thesis within the position-trade group.</p>
        </>}
        <p className={styles.researchNote}>Research basis: RN001 — <cite>Bitcoin Cycle Indicator: An Exploratory Quantitative Analysis of Bitcoin Market Cycles</cite>. Data through 3 June 2026; only three completed cycles. The study excludes macroeconomic conditions, liquidity and institutional flows from its model, and describes its framework as exploratory rather than predictive.</p>
      </div>
      <div className={styles.strategyCards}><p className={styles.eyebrow}>Holding theses · allocations within {portfolioRoleLabels[role]}</p><ThesisCarousel {...interaction} positions={group} /></div>
    </section>;
  })}</>;
}
