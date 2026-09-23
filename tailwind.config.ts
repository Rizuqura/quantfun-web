import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      wide: "1920px",
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Cormorant Garamond", "serif"],
      },
      fontSize: {
        nav: ["13px", { lineHeight: "1.5", letterSpacing: "0.04em", fontWeight: "400" }],
        // Fluid type: floor = 1280x720 default, ceiling = 1920x1080 original
        // 1280/1920 = 0.667 scale factor
        "hero-title": [
          "clamp(2.5rem, 1.25rem + 3.33vw, 4rem)",
          { lineHeight: "1.05", letterSpacing: "0.16em", fontWeight: "300" },
        ],
        "hero-tag": [
          "clamp(1rem, 0.5rem + 1.33vw, 1.5rem)",
          { lineHeight: "1.5", fontWeight: "300" },
        ],
        "letter-title": [
          "clamp(2.25rem, 1rem + 3.33vw, 4rem)",
          { lineHeight: "1.05", letterSpacing: "0.16em", fontWeight: "300" },
        ],
        "letter-name": [
          "clamp(1.25rem, 0.75rem + 1.33vw, 1.75rem)",
          { lineHeight: "1.5", fontWeight: "400" },
        ],
        "letter-intro": [
          "clamp(0.875rem, 0.625rem + 0.67vw, 1.125rem)",
          { lineHeight: "1.5", fontWeight: "400" },
        ],
        "letter-body": [
          "clamp(0.8125rem, 0.625rem + 0.5vw, 1rem)",
          { lineHeight: "1.8", fontWeight: "300" },
        ],
        "philosophy-title": [
          "clamp(1.75rem, 1rem + 2vw, 3rem)",
          { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "300" },
        ],
      },
      spacing: {
        nav: "clamp(3rem, 2rem + 2.67vw, 4.5rem)",
      },
      transitionDuration: {
        "250": "250ms",
      },
    },
  },
  plugins: [],
};

export default config;
