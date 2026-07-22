"use client";

import { motion } from "framer-motion";

export default function SincerestLetter() {
  return (
    <section id="about" className="relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="absolute left-[50px] bottom-0 h-full z-20 pointer-events-none scale-[0.6] origin-bottom"
      >
        <img
          src="/img/pillar.png"
          alt=""
          className="h-full w-auto object-contain"
        />
      </motion.div>

      <div className="bg-[#000000] relative z-10">
        <div className="flex min-h-[80vh] px-[260px]">
          <div className="flex items-end w-[45%] flex-shrink-0">
            <img
              src="/img/profile-pic.png"
              alt="Ahsan Rizqullah"
              className="w-full h-auto object-contain mb-[50px]"
            />
          </div>

          <div className="flex flex-col justify-start w-[55%] pl-16 pt-[64px] pb-[64px]">
            <span className="font-serif font-light uppercase text-[64px] tracking-[0.16em] text-white leading-[1.05]">
              SINCEREST LETTER
            </span>
            <div className="mt-8">
              <span className="font-sans text-[18px] text-white">
                Introducing me,{" "}
              </span>
              <span className="font-serif italic text-[28px] text-white">
                Ahsan
              </span>
            </div>
            <p className="mt-8 font-sans font-light text-[16px] leading-[1.8] text-white text-justify max-w-[580px]">
              Dear visitors, first of all i would like to appreciate for your
              visitation to the very creative work of mine, i am currently in
              management vocation program at Jenderal Soedirman University,
              Banyumas Regency, Central Java. At this moment, i built my whole
              interest to integrate and define my own edge.
            </p>
            <p className="mt-6 font-sans font-light text-[16px] leading-[1.8] text-white text-justify max-w-[580px]">
              As a management student, i made interest in economics especially
              macroeconomic, i am also engage several knowledge and
              individual-based learning in investment and finance which has been
              some interest myself quiet intrigued, and as today the Artificial
              Intelligence appear to be the frontier of our modernity, building
              exposure to Data Analytics, Data Science, Machine Learning,
              Mathematics would be an outstanding leverage for facing todays
              industry and combining them would be my long term-forever
              interest.
            </p>
            <p className="mt-6 font-sans font-light text-[16px] leading-[1.8] text-white text-justify max-w-[580px]">
              Here i would like to introduce and present all of my projects and
              works, i share my whole project as journal and evidence for my
              project-based learning process, and hopefully would be a great
              fundamental for the next step, monetization.
            </p>
            <div className="mt-12 self-end">
              <img
                src="/img/signature.png"
                alt="Signature"
                className="block"
              />
              <p className="mt-2 font-serif text-[12px] text-white/80 leading-relaxed">
                Ahsan Rizqullah
                <br />
                Founder of Quantfun Technologies
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white relative z-10">
        <div className="min-h-[60vh] px-[260px] flex items-center">
          <div className="w-[55%] ml-auto pl-16">
            <h2 className="font-serif font-light text-5xl tracking-tight text-[#111111]">
              Philosophy
            </h2>
            <p className="mt-6 text-lg text-[#555555] max-w-xl leading-relaxed">
              Clarity over decoration. Structure over noise. Substance over
              marketing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
