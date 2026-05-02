import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import SkillCard from "./SkillCard";

const skills = [
  {
    name: "MongoDB",
    icon: "DB",
    description: "NoSQL database for scalable applications",
    category: "Databases"
  },
  {
    name: "MySQL",
    icon: "SQL",
    description: "Relational database design and query management",
    category: "Databases"
  },
  {
    name: "SQL",
    icon: "SQ",
    description: "Structured querying for data retrieval and analysis",
    category: "Databases"
  },
  {
    name: "Pandas",
    icon: "PY",
    description: "Data wrangling and analysis in Python",
    category: "Data Science"
  },
  {
    name: "NumPy",
    icon: "NP",
    description: "Fast numerical computing for scientific workflows",
    category: "Data Science"
  },
  {
    name: "Bootstrap",
    icon: "UI",
    description: "Responsive UI components and layout utility framework",
    category: "Frontend"
  },
  {
    name: "Tailwind CSS",
    icon: "TW",
    description: "Utility-first styling for rapid interface building",
    category: "Frontend"
  },
  {
    name: "Git",
    icon: "GI",
    description: "Version control for collaborative development",
    category: "Tools"
  },
  {
    name: "GitHub",
    icon: "GH",
    description: "Repository hosting and project collaboration",
    category: "Tools"
  },
  {
    name: "REST APIs",
    icon: "API",
    description: "Connect services with clean request and response flows",
    category: "Tools"
  }
];

const filters = ["All", "Databases", "Data Science", "Frontend", "Tools"];

const typingPhrases = [
  "Exploring MongoDB...",
  "Analyzing data with Pandas...",
  "Building APIs with Node.js...",
  "Styling with Tailwind CSS..."
];

const containerVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06
    }
  }
};

function useTypingLoop(words) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const isComplete = text === currentWord;
    const speed = deleting ? 28 : 52;
    const pause = isComplete && !deleting ? 900 : speed;

    const timer = window.setTimeout(() => {
      if (!deleting && text !== currentWord) {
        setText(currentWord.slice(0, text.length + 1));
      } else if (deleting && text !== "") {
        setText(currentWord.slice(0, text.length - 1));
      } else if (isComplete) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }, pause);

    return () => window.clearTimeout(timer);
  }, [deleting, text, wordIndex, words]);

  return text;
}

function skillMatchesFilter(skill, filter) {
  return filter === "All" || skill.category === filter;
}

function SkillLibrary() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredSkill, setHoveredSkill] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const typingText = useTypingLoop(typingPhrases);
  const sectionRef = useRef(null);

  const visibleSkills = useMemo(
    () => skills.filter((skill) => skillMatchesFilter(skill, activeFilter)),
    [activeFilter]
  );

  const handleSectionMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setMousePosition({ x: event.clientX - bounds.left, y: event.clientY - bounds.top });
  };

  return (
    <section id="skill-library" ref={sectionRef} className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-[-8%] top-8 h-72 w-72 rounded-full bg-cyan-400/14 blur-3xl"
          animate={{ x: [0, 24, 0], y: [0, 14, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-6%] top-1/3 h-80 w-80 rounded-full bg-violet-500/12 blur-3xl"
          animate={{ x: [0, -18, 0], y: [0, 18, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_28%),linear-gradient(180deg,rgba(9,13,28,0.12),rgba(9,13,28,0.7))]" />
      </div>

      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6" onMouseMove={handleSectionMove}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto mb-8 max-w-4xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#5ad2ff]">Skill Library</p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">Tools and libraries that support real work</h2>
          <p className="mt-4 text-base text-white/70 md:text-lg">
            Tools & technologies I use to build and analyze real-world applications
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mb-7 flex max-w-3xl flex-wrap items-center justify-center gap-3"
        >
          <div className="mr-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65 backdrop-blur-md">
            <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(90,210,255,0.75)]" />
            {typingText}
            <span className="ml-1 animate-pulse">|</span>
          </div>
        </motion.div>

        <motion.div
          className="mb-8 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <motion.button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition duration-300 ${
                  isActive
                    ? "border-cyan-300/60 bg-cyan-300/12 text-white shadow-[0_0_24px_rgba(90,210,255,0.2)]"
                    : "border-white/12 bg-white/5 text-white/70 hover:border-cyan-300/30 hover:bg-white/8 hover:text-white"
                }`}
              >
                {filter}
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-24 mx-auto h-[520px] w-[min(920px,88vw)] rounded-full opacity-70 blur-3xl"
          animate={{
            background: [
              "radial-gradient(circle, rgba(90,210,255,0.08) 0%, transparent 68%)",
              "radial-gradient(circle, rgba(127,111,255,0.09) 0%, transparent 68%)",
              "radial-gradient(circle, rgba(90,210,255,0.08) 0%, transparent 68%)"
            ]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
        >
          <AnimatePresence mode="popLayout">
            {visibleSkills.map((skill) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                isActive={hoveredSkill === skill.name}
                isDimmed={hoveredSkill && hoveredSkill !== skill.name}
                onHover={setHoveredSkill}
                onLeave={() => setHoveredSkill("")}
                mousePosition={mousePosition}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default SkillLibrary;