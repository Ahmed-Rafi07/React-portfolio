import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

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

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, y: 18, scale: 0.96, transition: { duration: 0.24, ease: "easeIn" } }
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

function SkillCard({ skill, isActive, isDimmed, onHover, onLeave, mousePosition }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
    const y = ((event.clientX - bounds.left) / bounds.width - 0.5) * -10;
    setTilt({ x, y });
  };

  const handleLeave = () => {
    setTilt({ x: 0, y: 0 });
    onLeave();
  };

  return (
    <motion.article
      ref={cardRef}
      variants={cardVariants}
      exit="exit"
      whileHover={{ scale: 1.05, y: -6 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      onMouseEnter={() => onHover(skill.name)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative overflow-hidden rounded-2xl border bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.045))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300 ${
        isDimmed ? "border-white/8 opacity-50 blur-[0.2px]" : "border-white/12 opacity-100"
      }`}
      style={{
        transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        boxShadow: isActive
          ? "0 24px 70px rgba(0,0,0,0.38)"
          : "0 18px 50px rgba(0,0,0,0.28)"
      }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(90,210,255,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(127,111,255,0.16),transparent_45%)]" />
        <div className="absolute inset-0 ring-1 ring-inset ring-cyan-300/20 group-hover:ring-cyan-300/45" />
      </motion.div>

      <motion.span
        aria-hidden="true"
        className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(90,210,255,0.75)]"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-sm font-bold text-white shadow-[0_0_24px_rgba(90,210,255,0.18)] transition duration-300 group-hover:border-cyan-300/45 group-hover:bg-cyan-300/10 group-hover:shadow-[0_0_28px_rgba(90,210,255,0.3)]">
          {skill.icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/55">
              {skill.category}
            </span>
            <span className="text-xs font-medium text-white/40 transition duration-300 group-hover:text-white/75">
              {isActive ? "Active" : "Hover"}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-white transition duration-300 group-hover:translate-x-0.5">
            {skill.name}
          </h3>

          <motion.p
            className="mt-2 text-sm leading-6 text-white/68"
            initial={false}
            animate={{ maxHeight: isActive ? 120 : 46, opacity: isDimmed ? 0.72 : 1 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            {skill.description}
          </motion.p>

          <motion.div
            className="mt-3 overflow-hidden rounded-xl border border-white/8 bg-black/15"
            initial={false}
            animate={{ opacity: isActive ? 1 : 0.65, height: isActive ? 36 : 8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="flex h-full items-center gap-2 px-3 text-xs text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(90,210,255,0.55)]" />
              <span>
                {skill.category === "Tools"
                  ? "Essential for build, versioning, and integrations"
                  : "Used in hands-on portfolio projects and workflows"}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: mousePosition
            ? `radial-gradient(180px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(90,210,255,0.18), transparent 60%)`
            : "transparent"
        }}
      />
    </motion.article>
  );
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
    <section id="skill-library" ref={sectionRef} className="relative overflow-hidden py-24">
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

      <div className="mx-auto w-[min(1120px,92vw)]" onMouseMove={handleSectionMove}>
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
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
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