import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useEffect, useMemo, useRef, useState } from "react";
import Loader from "./components/Loader";
import ProjectsSection from "./components/Projects";
import SkillLibrary from "./components/SkillLibrary";
import SkillsMarquee from "./components/SkillsMarquee";
import TypingHeadline from "./components/TypingHeadline";

const coreSkillGroups = [
  {
    category: "Frontend",
    accent: "from-[#53ceff] to-[#7a6cff]",
    skills: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 93 },
      { name: "JavaScript", level: 91 },
      { name: "React", level: 92 }
    ]
  },
  {
    category: "Backend",
    accent: "from-[#7a6cff] to-[#8f84ff]",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 84 }
    ]
  },
  {
    category: "Database",
    accent: "from-[#4bbdff] to-[#5ad2ff]",
    skills: [
      { name: "MongoDB", level: 84 },
      { name: "SQL", level: 82 },
      { name: "MySQL", level: 79 }
    ]
  },
  {
    category: "Programming",
    accent: "from-[#6cc8ff] to-[#7a6cff]",
    skills: [
      { name: "Java", level: 80 },
      { name: "Python", level: 88 },
      { name: "R Programming", level: 75 }
    ]
  },
  {
    category: "Concepts",
    accent: "from-[#4bbdff] to-[#8f84ff]",
    skills: [
      { name: "REST APIs", level: 89 },
      { name: "Data Structures", level: 86 }
    ]
  }
];

const aboutBadges = [
  "Full Stack Developer",
  "Data Science Enthusiast",
  "Node.js",
  "React",
  "NumPy",
  "Pandas",
  "Python",
  "R"
];

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" }
];

const fastVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.08,
      delayChildren: 0.04
    }
  }
};

const fastItemVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
};

function useTyping(text) {
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const idleDelay = 1100;
    const typeSpeed = deleting ? 40 : 75;

    const timer = setTimeout(() => {
      if (!deleting) {
        const next = text.slice(0, typed.length + 1);
        setTyped(next);
        if (next === text) {
          setDeleting(true);
        }
      } else {
        const next = text.slice(0, typed.length - 1);
        setTyped(next);
        if (!next) {
          setDeleting(false);
        }
      }
    }, !deleting && typed === text ? idleDelay : typeSpeed);

    return () => clearTimeout(timer);
  }, [deleting, text, typed]);

  return typed;
}

export default function App() {
  const [cursor, setCursor] = useState({ x: 0, y: 0, hover: false });
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const handleMove = (event) => {
      const isInteractive = Boolean(event.target.closest("a, button, input, textarea"));
      setCursor({ x: event.clientX, y: event.clientY, hover: isInteractive });
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  useEffect(() => {
    const navEntries = performance.getEntriesByType("navigation");
    const navType = navEntries.length > 0 ? navEntries[0].type : "navigate";
    const hasVisited = sessionStorage.getItem("portfolio-visited");
    const shouldShowLoader = !hasVisited || navType === "reload";

    if (!shouldShowLoader) {
      return undefined;
    }

    sessionStorage.setItem("portfolio-visited", "true");
    setShowLoader(true);

    const hideTimer = window.setTimeout(() => {
      setShowLoader(false);
    }, 4200);

    return () => {
      window.clearTimeout(hideTimer);
    };
  }, []);

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#070b18] text-white selection:bg-[#7d6dff]/50 selection:text-white">
      <AnimatePresence>
        {showLoader ? <Loader active={showLoader} onComplete={handleLoaderComplete} /> : null}
      </AnimatePresence>

      <AnimatePresence>
        {!showLoader && sessionStorage.getItem("portfolio-visited") === "true" && (
          <motion.div
            key="transition-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="fixed inset-0 z-[100] pointer-events-none bg-white"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showLoader && sessionStorage.getItem("portfolio-visited") === "true" && (
          <motion.div
            key="transition-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.25, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="fixed inset-0 z-[105] pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,159,0.35),transparent_45%)]" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatedBackground />
      <CursorRing x={cursor.x} y={cursor.y} hover={cursor.hover} />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={showLoader ? { opacity: 0, scale: 0.92, y: 40, pointerEvents: "none" } : { opacity: 1, scale: 1, y: 0, pointerEvents: "auto" }}
        transition={showLoader ? { duration: 0.3 } : { type: "spring", stiffness: 100, damping: 14, mass: 0.8, duration: 0.8 }}
      >
        <Navbar />
        <Hero />
        <About />
        <ProjectsSection />
        <Skills />
        <SkillLibrary />
        <Resume />
        <SkillsMarquee />
        <Contact />
        <Footer />
      </motion.div>
    </div>
  );
}

function AnimatedBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        id: index,
        left: `${(index * 11) % 100}%`,
        delay: `${(index % 7) * 0.7}s`,
        duration: `${10 + (index % 4) * 1.5}s`
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="animated-mesh absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(92,78,255,0.2),transparent_36%),radial-gradient(circle_at_80%_18%,rgba(0,194,255,0.12),transparent_34%),radial-gradient(circle_at_50%_90%,rgba(134,91,255,0.14),transparent_40%)]" />
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="particle"
          style={{ left: particle.left, animationDelay: particle.delay, animationDuration: particle.duration }}
        />
      ))}
    </div>
  );
}

function CursorRing({ x, y, hover }) {
  return (
    <span
      className={`custom-cursor ${hover ? "custom-cursor-hover" : ""}`}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      aria-hidden="true"
    />
  );
}

function ScrollSection({ id, className = "", children }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fastVariant}
    >
      {children}
    </motion.section>
  );
}

function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-md">
      <div className="mx-auto flex w-[min(1120px,92vw)] items-center justify-between py-4">
        <a
          href="#home"
          className="bg-gradient-to-r from-[#8f84ff] via-[#5ad2ff] to-[#8f84ff] bg-[length:160%_100%] bg-clip-text text-xl font-bold text-transparent"
        >
          Rafi.dev
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-white/80 md:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const typed = useTyping("Full Stack Developer | Data Science Enthusiast");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [profileImage, setProfileImage] = useState("/profile.png");

  const handleMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientY - bounds.top) / bounds.height - 0.5) * 9;
    const y = ((event.clientX - bounds.left) / bounds.width - 0.5) * -12;
    setTilt({ x, y });
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center pt-24">
      <div className="mx-auto grid w-[min(1120px,92vw)] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial="hidden" animate="visible" variants={fastVariant}>
          <motion.p
            variants={fastItemVariant}
            className="mb-5 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/75 backdrop-blur"
          >
            Internship + Freelance Ready
          </motion.p>
          <motion.h1
            variants={fastItemVariant}
            className="max-w-3xl text-5xl font-bold leading-[0.94] tracking-tight md:text-7xl"
          >
            Hi, I&apos;m <span className="text-white">Rafi</span>
            <span className="text-white/45">.</span>
            <br />
            <span className="hero-gradient">Building premium digital products.</span>
          </motion.h1>
          <motion.p variants={fastItemVariant} className="mt-6 max-w-xl text-lg text-white/70 md:text-xl">
            Full Stack Developer and Data Science enthusiast focused on clean architecture, polished UI,
            and practical data-driven features.
          </motion.p>
          <motion.p
            variants={fastItemVariant}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 backdrop-blur"
          >
            <span className="font-semibold text-[#5ad2ff]">Typing:</span>
            <span>{typed}</span>
            <span className="animate-pulse">|</span>
          </motion.p>
          <motion.div variants={fastItemVariant} className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-2xl bg-gradient-to-r from-[#7667ff] to-[#4bbdff] px-6 py-3 font-semibold shadow-glow transition hover:-translate-y-1"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3 font-semibold transition hover:-translate-y-1 hover:bg-white/10"
            >
              Contact Me
            </a>
            <a
              href="/Rafi-CV.pdf"
              download
              className="rounded-2xl border border-[#8f84ff] bg-[#8f84ff]/10 px-6 py-3 font-semibold transition hover:-translate-y-1 hover:bg-[#8f84ff]/20"
            >
              Download CV
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md"
          onMouseMove={handleMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
            className="relative"
          >
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-r from-[#7a6cff]/35 to-[#4bbdff]/35 blur-2xl opacity-70" />
            <div className="relative rounded-[2rem] bg-gradient-to-br from-[#1f1f3a] to-[#0f172a] p-[2px] shadow-xl">
              <div
                className="rounded-[2rem] border border-white/15 bg-[#0b0f1a] p-4 shadow-glow backdrop-blur-md transition-transform duration-200"
                style={{ transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
              >
                <div className="overflow-hidden rounded-[1.5rem] bg-black/20">
                  <img
                    className="aspect-square w-full object-contain transition duration-500 hover:scale-105"
                    src={profileImage}
                    alt="Ahmed Rafi"
                    onError={() => setProfileImage("https://api.dicebear.com/9.x/notionists/svg?seed=Rafi")}
                  />
                </div>
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/55">Current Focus</p>
                  <p className="mt-2 text-sm text-white/85">
                    Building full-stack applications with React + Node.js and adding data intelligence with
                    Python and Pandas.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <ScrollSection id="about" className="py-24">
      <div className="mx-auto grid w-[min(1120px,92vw)] gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
          variants={fastItemVariant}
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-glow backdrop-blur-md"
        >
          <img
            className="h-full min-h-[320px] w-full rounded-[1.5rem] object-cover"
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
            alt="Workspace with laptop and code"
          />
        </motion.div>
        <motion.div variants={fastItemVariant}>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#5ad2ff]">About Me</p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">Full Stack meets Data Science.</h2>
          <p className="mt-5 max-w-xl text-white/70 md:text-lg">
            I&apos;m Rafi, a Full Stack Developer who designs clean frontend experiences and scalable backend
            logic, while also working with data tools like NumPy, Pandas, and R to deliver smarter
            product decisions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {aboutBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85"
              >
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </ScrollSection>
  );
}

function Skills() {
  return (
    <ScrollSection id="skills" className="py-24">
      <div className="mx-auto w-[min(1120px,92vw)]">
        <motion.div variants={fastItemVariant} className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#5ad2ff]">Skills</p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">
            <TypingHeadline
              words={[
                "Engineering stack, data mindset",
                "Core technologies I master",
                "Built on strong fundamentals"
              ]}
            />
          </h2>
        </motion.div>
        <motion.div
          variants={fastItemVariant}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {coreSkillGroups.map((group, groupIndex) => (
            <motion.article
              key={group.category}
              variants={fastItemVariant}
              whileHover={{ scale: 1.03 }}
              whileInView={{ y: [0, -3, 0] }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                y: {
                  duration: 5.6,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: groupIndex * 0.2
                },
                scale: { type: "spring", stiffness: 220, damping: 18 }
              }}
              className="rounded-2xl border border-white/15 bg-[linear-gradient(140deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_16px_45px_rgba(8,12,28,0.35)] backdrop-blur-md transition hover:border-[#5ad2ff]/45 hover:shadow-[0_0_28px_rgba(90,210,255,0.24)]"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">{group.category}</h3>
                <span className={`h-2 w-14 rounded-full bg-gradient-to-r ${group.accent} shadow-[0_0_20px_rgba(90,210,255,0.45)]`} />
              </div>

              <div className="space-y-3">
                {group.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.45, ease: "easeOut", delay: skillIndex * 0.05 }}
                    className="rounded-xl border border-white/10 bg-black/20 p-3"
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-white">{skill.name}</p>
                      <p className="text-xs text-white/60">{skill.level}%</p>
                    </div>
                    <div className="h-2.5 rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, amount: 0.7 }}
                        transition={{ duration: 0.9, ease: "easeOut", delay: skillIndex * 0.05 }}
                        className={`h-full rounded-full bg-gradient-to-r ${group.accent} shadow-[0_0_16px_rgba(75,189,255,0.42)]`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </ScrollSection>
  );
}

function Resume() {
  return (
    <ScrollSection id="resume" className="py-24">
      <div className="mx-auto w-[min(1120px,92vw)]">
        <motion.div
          variants={fastItemVariant}
          className="grid gap-8 rounded-[2rem] border border-white/15 bg-gradient-to-r from-[#10152c]/90 to-[#0a1020]/90 p-8 shadow-glow backdrop-blur-md lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#8f84ff]">Resume</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Download My Resume</h2>
            <p className="mt-4 max-w-xl text-white/70">
              A concise overview of my full-stack development work, data science toolkit, projects, and
              internship-ready technical impact.
            </p>
            <a
              href="/Rafi-CV.pdf"
              download
              className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-[#7a6cff] to-[#4bbdff] px-6 py-3 font-semibold transition hover:-translate-y-1"
            >
              Download CV (PDF)
            </a>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-white/55">Preview Card</p>
            <div className="mt-3 rounded-xl border border-white/15 bg-black/25 p-4">
              <p className="text-lg font-semibold">Rafi - Resume</p>
              <p className="mt-1 text-sm text-white/65">Full Stack Developer + Data Science Enthusiast</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
                <span className="rounded-full bg-white/10 px-3 py-1">React</span>
                <span className="rounded-full bg-white/10 px-3 py-1">Node.js</span>
                <span className="rounded-full bg-white/10 px-3 py-1">Python</span>
                <span className="rounded-full bg-white/10 px-3 py-1">Pandas</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </ScrollSection>
  );
}

function Contact() {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [isSending, setIsSending] = useState(false);

  const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const receiverEmail = import.meta.env.VITE_CONTACT_RECEIVER_EMAIL || "Ahmed.rafi.dev@gmail.com";
  const placeholderKeys = [
    !emailServiceId || emailServiceId.startsWith("your_") ? "VITE_EMAILJS_SERVICE_ID" : "",
    !emailTemplateId || emailTemplateId.startsWith("your_") ? "VITE_EMAILJS_TEMPLATE_ID" : "",
    !emailPublicKey || emailPublicKey.startsWith("your_") ? "VITE_EMAILJS_PUBLIC_KEY" : ""
  ].filter(Boolean);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", text: "Please fill all fields before sending." });
      return;
    }

    if (placeholderKeys.length) {
      const missing = placeholderKeys;

      console.error("EmailJS config missing:", missing.join(", "));
      setStatus({
        type: "error",
        text: `Contact form is not configured yet. Missing: ${missing.join(", ")}`
      });
      return;
    }

    try {
      setIsSending(true);
      setStatus({ type: "", text: "" });

      await emailjs.sendForm(
        emailServiceId,
        emailTemplateId,
        formRef.current,
        emailPublicKey
      );

      setStatus({ type: "success", text: "Message sent successfully. I will get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      const detail = error?.text || error?.message || "Unknown EmailJS error";
      console.error("EmailJS send failed:", detail, error);
      setStatus({
        type: "error",
        text: `Unable to send right now. ${detail}`
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <ScrollSection id="contact" className="py-24">
      <div className="mx-auto grid w-[min(1120px,92vw)] gap-8 lg:grid-cols-2">
        <motion.div variants={fastItemVariant}>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#5ad2ff]">Contact</p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">Let&apos;s build your next standout product.</h2>
          <p className="mt-5 max-w-xl text-white/70 md:text-lg">
            Reach out for internships, collaboration, or product development opportunities.
          </p>
          <div className="mt-6 space-y-2 text-white/80">
            <p>
              Email: <a href="mailto:rafi.dev@email.com" className="text-[#5ad2ff]">Ahmed.rafi.dev@gmail.com</a>
            </p>
            <p>
              GitHub:{" "}
              <a href="https://github.com/Ahmed-Rafi07" target="_blank" rel="noreferrer" className="text-[#5ad2ff]">
                github.com/rafi
              </a>
            </p>
            <p>
              LinkedIn:{" "}
              <a href="https://www.linkedin.com/in/ahmed-rafi07/" target="_blank" rel="noreferrer" className="text-[#5ad2ff]">
                linkedin.com/in/rafi
              </a>
            </p>
          </div>
        </motion.div>

        <motion.form
          ref={formRef}
          variants={fastItemVariant}
          className="rounded-[2rem] border border-white/15 bg-white/5 p-6 shadow-glow backdrop-blur-md"
          onSubmit={onSubmit}
        >
          <input type="hidden" name="to_email" value={receiverEmail} />
          <label className="mb-2 block text-sm font-medium text-white/80" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={updateField}
            placeholder="Your name"
            required
            disabled={isSending}
            className="mb-4 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[#7a6cff]"
          />
          <label className="mb-2 block text-sm font-medium text-white/80" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            placeholder="yourmail@example.com"
            required
            disabled={isSending}
            className="mb-4 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[#7a6cff]"
          />
          <input type="hidden" name="reply_to" value={form.email} />
          <label className="mb-2 block text-sm font-medium text-white/80" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={form.message}
            onChange={updateField}
            placeholder="Tell me about your idea..."
            required
            disabled={isSending}
            className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[#7a6cff]"
          />
          <button
            type="submit"
            disabled={isSending}
            className="mt-5 rounded-2xl bg-gradient-to-r from-[#7a6cff] to-[#4bbdff] px-6 py-3 font-semibold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>
          {status.text && (
            <p className={`mt-4 text-sm ${status.type === "error" ? "text-red-300" : "text-emerald-300"}`}>
              {status.text}
            </p>
          )}
        </motion.form>
      </div>
    </ScrollSection>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-6 text-center text-sm text-white/50">
      © 2026 Rafi. Built with React, Tailwind, and Framer Motion.
    </footer>
  );
}
