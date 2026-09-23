import styles from "./Works.module.css";

const categories = [
  { title: "Equity Research", lines: ["Equity", "Research"], image: "works-ellipse-1.png", pillar: true },
  { title: "AI Powered Design and Layouting", lines: ["AI Powered", "Design and", "Layouting"], image: "works-ellipse-3.png" },
  { title: "Investment Thesis & Financial Modelling", lines: ["Investment", "Thesis &", "Financial", "Modelling"], image: "works-ellipse-5.png" },
  { title: "AI Powered Programming", lines: ["AI Powered", "Programming"], image: "works-programming.svg" },
  { title: "Quantitative & Creative Research", lines: ["Quantitative", "& Creative", "Research"], image: "works-ellipse-2.png", small: true },
  { title: "Explorative Learning", lines: ["Explorative", "Learning"], image: "works-ellipse-4.png", small: true },
];

export default function Works() {
  return (
    <section id="portfolio" aria-labelledby="works-title" className={styles.section}>
      <svg className={styles.texture} aria-hidden="true" width="100%" height="100%">
        <filter id="works-paper-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#works-paper-grain)" opacity="0.17" />
      </svg>
      <div className={styles.content}>
        <h2 id="works-title" className={styles.heading}>WORKS.</h2>
        <ul className={styles.grid}>
          {categories.map((category) => (
            <li key={category.title} className={styles.category}>
              <div className={styles.sculpture}>
                <img
                  src={`/img/${category.image}`}
                  alt=""
                  loading="lazy"
                  className={category.pillar ? styles.pillar : styles.object}
                />
              </div>
              <h3 className={`${styles.label} ${category.small ? styles.smallLabel : ""}`}>
                <span className="sr-only">{category.title}</span>
                <span aria-hidden="true">
                  {category.lines.map((line) => <span className={styles.line} key={line}>{line}</span>)}
                </span>
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
