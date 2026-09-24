import type { AssetInteraction, ResolvedPosition } from "@/lib/portfolio/portfolio-types";
import { strategyPositions } from "@/lib/portfolio/portfolio-strategies";
import { formatAllocation, portfolioTotals } from "@/lib/portfolio/portfolio-utils";
import PortfolioAllocationChart from "./PortfolioAllocationChart";
import ThesisCarousel from "./ThesisCarousel";
import styles from "./Portfolio.module.css";

export default function InvestmentThesisSection({ positions, ...interaction }: AssetInteraction & { positions: ResolvedPosition[] }) {
  const total = portfolioTotals(positions).valueIDR;
  return <>{[true, false].map((permanent) => {
    const group = strategyPositions(positions, permanent);
    const id = permanent ? "permanent-capital" : "position-trade";
    const title = permanent ? "Permanent Capital" : "Position Trade";
    const share = total > 0 ? portfolioTotals(group).valueIDR / total * 100 : 0;
    return <section key={id} id={id} className={styles.strategySection} aria-labelledby={`${id}-title`}>
      <header className={styles.strategyHeading}>
        <div><p className={styles.eyebrow}>{permanent ? "01 / Long-duration ownership" : "02 / Cycle-sensitive opportunities"}</p><h2 id={`${id}-title`} className="font-serif">{title}</h2></div>
        <div className={styles.strategyShare}><strong>{formatAllocation(share)}</strong><span>of total portfolio · by IDR value</span></div>
      </header>
      <div className={styles.strategyOverview}>
        <PortfolioAllocationChart {...interaction} positions={group} id={`${id}-allocation`} title={`${title} allocation`} allocationScope={title.toLowerCase()} />
        <div className={styles.strategyIntro}>
          <p className={styles.eyebrow}>{permanent ? "Built to compound" : "A defined investment horizon"}</p>
          <h3 className="font-serif">{permanent ? "Ownership beyond a single cycle." : "Participate. Reassess. Adapt."}</h3>
          <p>{permanent ? "TSMC (TSM), VOO, SCHD, BTC and GLD form the long-term foundation: productive businesses, broad equity exposure, dividend quality, a scarce digital asset and gold. Each has a distinct role; conviction is reviewed as fundamentals change." : "MSTR, PUMP, TAO and COIN express different parts of the crypto ecosystem. TSLA is retained here as a separate thematic equity position, with an independent thesis rather than an assumed link to Bitcoin."}</p>
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
            <article><h4>Recovery & participation</h4><p>Across the next two to three years, a recovery would need evidence of renewed demand and sustained activity. MSTR and COIN offer different equity exposures; PUMP and TAO require their own adoption and token-economics evidence.</p></article>
            <article><h4>Reassessment & exits</h4><p>Diminishing historical cycle returns argue against extrapolating earlier gains. Reassess as the thesis matures or weakens, and revise the outlook if liquidity, company fundamentals or network usage diverge from the cycle framework.</p></article>
          </div>
          <p>These scenarios are portfolio interpretations of the research, not asset-level findings or price targets. TSLA remains a separate business thesis within the position-trade group.</p>
        </>}
        <p className={styles.researchNote}>Research basis: RN001 — <cite>Bitcoin Cycle Indicator: An Exploratory Quantitative Analysis of Bitcoin Market Cycles</cite>. Data through 3 June 2026; only three completed cycles. The study excludes macroeconomic conditions, liquidity and institutional flows from its model, and describes its framework as exploratory rather than predictive.</p>
      </div>
      <div className={styles.strategyCards}><p className={styles.eyebrow}>Holding theses · allocations within {title.toLowerCase()}</p><ThesisCarousel {...interaction} positions={group} /></div>
    </section>;
  })}</>;
}
