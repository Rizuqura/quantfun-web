"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-[110svh] lg:min-h-[880px] wide:min-h-[1080px] flex overflow-hidden bg-white">
      <div className="absolute right-0 bottom-0 w-full sm:w-2/3 h-full">
        <img
          src="/img/bg-hero.png"
          alt=""
          className="w-full h-full object-contain object-right-bottom"
        />
      </div>

      <div className="container-x relative z-10 flex-1 flex flex-col justify-center py-24 lg:py-0">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeIn" }}
          className="font-serif uppercase text-hero-title text-[#111111] drop-shadow-[0_-2px_4px_rgba(0,0,0,0.12)] text-balance"
        >
          BUILDING CLARITY,
          <br />
          IN COMPLEXITY.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeIn", delay: 3 }}
          className="mt-[clamp(1.5rem,1rem+2.5vh,2.5rem)] flex flex-wrap items-center gap-[clamp(1.5rem,1rem+3vw,4rem)] text-[#222222]"
        >
          <span className="font-serif font-light text-hero-tag opacity-70">Data</span>
          <span className="w-[clamp(6px,0.4vw+4px,8px)] h-[clamp(6px,0.4vw+4px,8px)] bg-current" />
          <span className="font-serif font-light text-hero-tag opacity-70">Logic</span>
          <span className="w-[clamp(6px,0.4vw+4px,8px)] h-[clamp(6px,0.4vw+4px,8px)] bg-current" />
          <span className="font-serif font-light text-hero-tag opacity-70">Insight</span>
        </motion.div>
      </div>
    </section>
  );
}
