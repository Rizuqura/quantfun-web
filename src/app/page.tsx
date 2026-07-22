import Hero from "@/components/sections/Hero";
import SincerestLetter from "@/components/sections/SincerestLetter";

export default function Home() {
  return (
    <main>
      <Hero />
      <SincerestLetter />

      <section
        id="portfolio"
        className="h-screen flex items-center justify-center bg-[#f8f8f8]"
      >
        <div className="max-w-3xl mx-auto px-8">
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-[#111111]">
            Works
          </h2>
          <p className="mt-6 text-lg text-[#555555] max-w-xl leading-relaxed">
            Selected projects and research — under construction.
          </p>
        </div>
      </section>

      <section
        id="curriculum-vitae"
        className="h-screen flex items-center justify-center bg-black"
      >
        <div className="max-w-3xl mx-auto px-8">
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-white">
            Curriculum Vitae
          </h2>
          <p className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
            Background, experience, and publications — under construction.
          </p>
        </div>
      </section>
    </main>
  );
}
