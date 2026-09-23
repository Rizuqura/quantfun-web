import Hero from "@/components/sections/Hero";
import SincerestLetter from "@/components/sections/SincerestLetter";
import Works from "@/components/sections/Works";

export default function Home() {
  return (
    <main>
      <Hero />
      <SincerestLetter />

      <Works />

      <section
        id="curriculum-vitae"
        className="min-h-screen lg:min-h-[720px] flex items-center justify-center bg-black section-pad"
      >
        <div className="container-x max-w-3xl">
          <h2 className="font-medium tracking-tight text-philosophy-title text-white">
            Curriculum Vitae
          </h2>
          <p className="mt-[clamp(1rem,0.75rem+1.5vh,1.5rem)] text-letter-body text-white/60 max-w-xl leading-relaxed">
            Background, experience, and publications — under construction.
          </p>
        </div>
      </section>
    </main>
  );
}
