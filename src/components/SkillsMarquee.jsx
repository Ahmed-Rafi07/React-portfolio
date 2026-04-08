import { useEffect, useState } from "react";

const technologies = [
  "Node.js",
  "React",
  "HTML",
  "CSS",
  "JavaScript",
  "Java",
  "Python",
  "R Programming",
  "NumPy",
  "Pandas"
];

const marqueeItems = [...technologies, ...technologies];

export default function SkillsMarquee() {
  const [speed, setSpeed] = useState(16);

  useEffect(() => {
    let resetTimer;
    let rafId;
    let lastScrollY = window.scrollY;

    const updateSpeed = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      const nextSpeed = delta > 0 ? 12 : 16;
      setSpeed(nextSpeed);

      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        setSpeed(16);
      }, 180);

      rafId = null;
    };

    const handleScroll = () => {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(updateSpeed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(resetTimer);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section className="py-24">
      <div className="mx-auto w-[min(1120px,92vw)]">
        <div className="mb-6 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#5ad2ff]">Technologies I Work With</p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">Always moving, always building</h2>
        </div>

        <div className="skills-marquee group overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,37,0.92),rgba(18,26,49,0.96))] px-4 py-5 shadow-glow">
          <div className="skills-marquee-overlay" aria-hidden="true" />
          <div
            className="skills-marquee-track flex w-max items-center gap-4"
            style={{ "--marquee-duration": `${speed}s` }}
          >
            {marqueeItems.map((tech, index) => (
              <span
                key={`${tech}-${index}`}
                className="skills-marquee-chip inline-flex items-center rounded-full border border-white/15 bg-white/5 px-6 py-2 text-sm font-medium text-white/85 backdrop-blur-sm transition duration-200 hover:scale-105 hover:border-[#5ad2ff]/60 hover:bg-[#5ad2ff]/10 hover:text-white hover:shadow-[0_0_24px_rgba(90,210,255,0.28)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
