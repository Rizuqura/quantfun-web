"use client";

import { motion } from "framer-motion";

export default function SincerestLetter() {
  return (
    <section id="about" className="relative overflow-hidden">
      <div className="bg-[#000000] relative z-10">
        <div className="container-x flex flex-col lg:flex-row lg:min-h-[80vh] section-pad lg:py-0 gap-8 lg:gap-0">
          <div className="flex items-end justify-center lg:justify-start flex-[0_1_45%] lg:w-[45%] flex-shrink-0">
            <img
              src="/img/profile-pic.png"
              alt="Ahsan Rizqullah"
              className="w-[min(100%,380px)] lg:w-full h-auto object-contain lg:mb-[20px]"
            />
          </div>

          <div className="flex flex-col justify-center flex-1 lg:w-[55%] lg:pl-[clamp(2rem,2rem+2vw,4rem)] lg:py-[clamp(2.5rem,2rem+3vh,4rem)]">
            <span className="font-serif uppercase text-letter-title text-white text-balance">
              SINCEREST LETTER
            </span>
            <div className="mt-[clamp(1rem,0.75rem+1.5vh,2rem)]">
              <span className="font-sans text-letter-intro text-white">
                Introducing me,{" "}
              </span>
              <span className="font-serif italic text-letter-name text-white">
                Ahsan
              </span>
            </div>
            <p className="mt-[clamp(1rem,0.75rem+1.5vh,2rem)] font-sans font-light text-letter-body text-white text-justify max-w-[min(100%,580px)]">
              Dear visitors, first of all i would like to appreciate for your
              visitation to the very creative work of mine, i am currently in
              management vocation program at Jenderal Soedirman University,
              Banyumas Regency, Central Java. At this moment, i built my whole
              interest to integrate and define my own edge.
            </p>
            <p className="mt-[clamp(0.75rem,0.5rem+1vh,1.5rem)] font-sans font-light text-letter-body text-white text-justify max-w-[min(100%,580px)]">
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
            <p className="mt-[clamp(0.75rem,0.5rem+1vh,1.5rem)] font-sans font-light text-letter-body text-white text-justify max-w-[min(100%,580px)]">
              Here i would like to introduce and present all of my projects and
              works, i share my whole project as journal and evidence for my
              project-based learning process, and hopefully would be a great
              fundamental for the next step, monetization.
            </p>
            <div className="mt-[clamp(1.5rem,1rem+2.5vh,3rem)] self-end">
              <img
                src="/img/signature.png"
                alt="Signature"
                className="block w-[clamp(120px,100px+8vw,200px)] h-auto ml-auto"
              />
              <p className="mt-2 font-serif text-[clamp(10px,9px+0.3vw,12px)] text-white/80 leading-relaxed text-right">
                Ahsan Rizqullah
                <br />
                Founder of Quantfun Technologies
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white relative z-10 overflow-hidden">
        <div className="container-x flex flex-col lg:flex-row lg:min-h-[60vh] section-pad lg:py-0 gap-8 lg:gap-0">
          <div className="hidden lg:flex items-end justify-center lg:justify-start flex-[0_1_45%] lg:w-[45%] flex-shrink-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9 }}
              className="pointer-events-none origin-bottom"
            >
              <img
                src="/img/pillar.png"
                alt=""
                className="h-[clamp(480px,80vh,860px)] w-auto object-contain object-bottom"
              />
            </motion.div>
          </div>

          <div className="flex flex-col justify-center flex-1 lg:w-[55%] lg:pl-[clamp(2rem,2rem+2vw,4rem)] lg:py-[clamp(2.5rem,2rem+3vh,4rem)]">
            <h2 className="font-serif font-light text-philosophy-title text-[#111111]">
              Philosophy
            </h2>
            <p className="mt-[clamp(1rem,0.75rem+1.5vh,2rem)] font-sans font-light text-letter-body text-[#555555] text-justify max-w-[min(100%,580px)]">
              Every project begins long before the first line of code, the
              first spreadsheet, or the first presentation.
            </p>
            <p className="mt-[clamp(0.75rem,0.5rem+1vh,1.5rem)] font-sans font-light text-letter-body text-[#555555] text-justify max-w-[min(100%,580px)]">
              It begins with understanding.
            </p>
            <p className="mt-[clamp(0.75rem,0.5rem+1vh,1.5rem)] font-sans font-light text-letter-body text-[#555555] text-justify max-w-[min(100%,580px)]">
              I believe every problem exists within a larger system, where
              decisions, assumptions, constraints, and interactions shape the
              outcome. Rather than approaching work by immediately searching
              for answers, I prefer to understand how each component
              influences another until the problem becomes structured enough
              to solve.
            </p>
            <p className="mt-[clamp(0.75rem,0.5rem+1vh,1.5rem)] font-sans font-light text-letter-body text-[#555555] text-justify max-w-[min(100%,580px)]">
              Whether conducting research, building software, analyzing
              financial markets, or designing digital products, my workflow
              remains fundamentally the same. Observe the environment,
              identify patterns, construct a logical framework, and only then
              begin execution.
            </p>
            <p className="mt-[clamp(0.75rem,0.5rem+1vh,1.5rem)] font-sans font-light text-letter-body text-[#555555] text-justify max-w-[min(100%,580px)]">
              Documentation is not an afterthought, but part of the thinking
              process itself. Recording assumptions, limitations, and
              reasoning creates transparency, enables reproducibility, and
              transforms individual work into knowledge that others can
              understand and build upon.
            </p>
            <p className="mt-[clamp(0.75rem,0.5rem+1vh,1.5rem)] font-sans font-light text-letter-body text-[#555555] text-justify max-w-[min(100%,580px)]">
              I don&apos;t see programming, finance, data, and design as
              separate disciplines. They are different languages used to
              describe the same objective: transforming complexity into
              structured understanding and practical solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
