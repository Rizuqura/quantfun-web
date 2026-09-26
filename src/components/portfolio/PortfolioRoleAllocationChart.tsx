"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { portfolioRoleLabels, roleBreakdown } from "@/lib/portfolio/portfolio-strategies";
import type { PortfolioRole, ResolvedPosition } from "@/lib/portfolio/portfolio-types";
import { donutPath, formatAllocation, formatCompactIDR, formatIDR, polarPoint, portfolioTotals } from "@/lib/portfolio/portfolio-utils";
import styles from "./Portfolio.module.css";

const roleColors: Record<PortfolioRole, string> = {
  core: "#d99b57",
  "position-trade": "#8a9c8f",
};

/** The overview visualises the two functional buckets; holding-level charts remain in their bucket sections. */
export default function PortfolioRoleAllocationChart({ positions }: { positions: ResolvedPosition[] }) {
  const reducedMotion = useReducedMotion();
  const [activeRole, setActiveRole] = useState<PortfolioRole | null>(null);
  const total = portfolioTotals(positions);
  const roles = roleBreakdown(positions);
  let angle = -90;
  const segments = roles.map((role) => {
    const start = angle;
    angle += role.allocation / 100 * 360;
    return { ...role, start, end: angle, midpoint: (start + angle) / 2 };
  });
  const active = roles.find((role) => role.role === activeRole);

  return <section aria-labelledby="allocation-title" className={styles.allocation}>
    <div className={styles.sectionTitle}><h2 id="allocation-title">Capital allocation</h2><span>02 buckets</span></div>
    <div className={styles.donutArea}>
      <div className={styles.donut}>
        <svg viewBox="0 0 400 400" aria-label="Portfolio allocation by functional bucket. Focus a slice to inspect it." className={styles.donutSvg}>
          <circle cx="200" cy="200" r="183" fill="none" stroke="currentColor" strokeOpacity=".07" />
          <circle cx="200" cy="200" r="101" fill="none" stroke="currentColor" strokeOpacity=".07" />
          {segments.map((segment) => {
            const isActive = activeRole === segment.role;
            const offset = polarPoint(7, segment.midpoint);
            return <motion.path key={segment.role} d={donutPath(segment.start, segment.end)} fill={roleColors[segment.role]}
              role="button" tabIndex={0} aria-pressed={isActive} data-role={segment.role}
              aria-label={`${segment.label}, ${formatAllocation(segment.allocation)}, ${formatIDR(segment.valueIDR)}.`}
              className={styles.slice}
              initial={false}
              animate={{ x: isActive ? offset.x - 200 : 0, y: isActive ? offset.y - 200 : 0, scale: isActive ? 1.015 : 1, opacity: active && !isActive ? .65 : 1 }}
              transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 550, damping: 32, mass: .55 }}
              style={{ transformOrigin: "200px 200px", filter: isActive ? `drop-shadow(0 5px 5px #0008) drop-shadow(0 0 3px ${roleColors[segment.role]}60)` : "none" }}
              onPointerEnter={() => setActiveRole(segment.role)} onPointerLeave={() => setActiveRole(null)}
              onFocus={() => setActiveRole(segment.role)} onBlur={() => setActiveRole(null)} onClick={() => setActiveRole(segment.role)}
              onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActiveRole(segment.role); } if (event.key === "Escape") setActiveRole(null); }}
            />;
          })}
        </svg>
        <div className={styles.donutCenter} aria-live="polite" aria-atomic="true">
          {active ? <><span className={styles.eyebrow}>{active.label}</span><strong>{formatAllocation(active.allocation)}</strong><span className={styles.muted}>{formatIDR(active.valueIDR)}</span></> : <><strong>{formatCompactIDR(total.valueIDR)}</strong><span className={styles.eyebrow}>Total portfolio</span></>}
        </div>
      </div>
      <div className={styles.tooltipSlot}>
        {active ? <div className={styles.tooltip} role="tooltip"><span><b>{active.label}</b></span><span>{formatAllocation(active.allocation)} of portfolio <span aria-hidden="true">·</span> {formatIDR(active.valueIDR)}</span></div> : <p className={styles.chartHint}>Explore a bucket to see its share.<br /><span>Hover, focus, or select a bucket.</span></p>}
      </div>
    </div>
    <ul className={styles.legend} aria-label="Select a portfolio bucket">
      {roles.map((role) => <li key={role.role}><button type="button" aria-pressed={activeRole === role.role}
        onPointerEnter={() => setActiveRole(role.role)} onPointerLeave={() => setActiveRole(null)}
        onFocus={() => setActiveRole(role.role)} onBlur={() => setActiveRole(null)} onClick={() => setActiveRole(role.role)}>
        <span>{portfolioRoleLabels[role.role]}</span><i style={{ background: roleColors[role.role] }} aria-hidden="true" /><span>{formatAllocation(role.allocation)}</span>
      </button></li>)}
    </ul>
  </section>;
}
