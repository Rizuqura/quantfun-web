"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[900px] overflow-hidden bg-white">
      <div className="absolute right-0 top-0 w-2/3 h-full">
        <img
          src="/img/bg-hero.png"
          alt=""
          className="w-full h-full object-cover object-right-top"
        />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center px-[260px]">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeIn" }}
          className="font-serif font-light uppercase text-[64px] leading-[1.05] tracking-[0.16em] text-[#111111] drop-shadow-[0_-2px_4px_rgba(0,0,0,0.12)]"
        >
          BUILDING CLARITY,
          <br />
          IN COMPLEXITY.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeIn", delay: 3 }}
          className="mt-10 flex items-center gap-16 text-[#222222]"
        >
          <span className="font-serif font-light text-[24px] opacity-70">Data</span>
          <span className="w-[8px] h-[8px] bg-current" />
          <span className="font-serif font-light text-[24px] opacity-70">Logic</span>
          <span className="w-[8px] h-[8px] bg-current" />
          <span className="font-serif font-light text-[24px] opacity-70">Insight</span>
        </motion.div>
      </div>
    </section>
  );
}
