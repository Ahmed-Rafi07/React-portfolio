import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import TypingHeadline from "./TypingHeadline";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80";

const filters = ["All", "Full Stack", "Frontend", "Data Science", "UI/UX"];

const projects = [
  {
    title: "Smart College Campaign",
    type: "Full Stack",
    tech: "React, Node.js, MongoDB",
    description: "A campaign platform for colleges with event workflows and student engagement tracking.",
    status: "Live",
    isNew: true,
    problem: "Colleges needed a single platform to run campaigns, track participation, and monitor outcomes.",
    solution: "Built a full-stack app with role-based access, campaign timelines, and real-time update flows.",
    features: ["Role-based dashboard", "Campaign tracking", "Registration management", "Performance analytics"],
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=80",
    live: "https://smart-college-campaign.vercel.app/",
    github: "https://github.com/Ahmed-Rafi07/smart-college-campaign.git"
  },
  {
    title: "Amazon Clone",
    type: "Frontend",
    tech: "React, Firebase",
    description: "E-commerce flow with auth, product browsing, and polished checkout interactions.",
    status: "Live",
    isNew: false,
    problem: "Wanted to replicate modern e-commerce UX with fast browsing and account workflows.",
    solution: "Implemented Firebase-backed auth and cart flows with a responsive storefront UI.",
    features: ["Auth and protected routes", "Cart workflow", "Responsive storefront", "Checkout experience"],
    image:
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1400&q=80",
    live: "https://rafi-amazon.netlify.app/",
    github: "https://github.com/Ahmed-Rafi07/Amzon.com.git"
  },
  {
    title: "Portfolio",
    type: "UI/UX",
    tech: "React, Framer Motion",
    description: "Interactive personal brand site with animation systems and modern storytelling layout.",
    status: "Live",
    isNew: true,
    problem: "A static portfolio did not communicate craft, depth, or product-thinking.",
    solution: "Designed and built an animated portfolio system with reusable motion patterns.",
    features: ["Motion-first UI", "Component storytelling", "Performance-focused sections", "Responsive layout"],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
    live: "https://ahmedrafi.me/",
    github: "https://github.com/Ahmed-Rafi07/-My-portfolio"
  },
  {
    title: "Insights Dashboard",
    type: "Data Science",
    tech: "React, Python, Pandas",
    description: "Analytics interface with trend cards, KPI breakdowns, and dataset-driven insights.",
    status: "In Progress",
    isNew: true,
    problem: "Manual reporting consumed time and lacked visual clarity for decision-making.",
    solution: "Combined Python data processing with React dashboards for fast insights.",
    features: ["KPI modules", "Trend visualization", "Dataset summaries", "Export-ready views"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    live: "https://example.com/insights-dashboard",
    github: "https://github.com/Ahmed-Rafi07"
  },
  {
    title: "Live Data Dashboard",
    type: "Full Stack",
    tech: "React, APIs, Framer Motion",
    description: "Real-time weather and crypto boards with auto-refresh, loaders, and graceful error states.",
    status: "Live",
    isNew: true,
    problem: "Needed to prove production-style API handling, fallback logic, and refresh behavior.",
    solution: "Implemented dual-source weather strategy and robust API error handling patterns.",
    features: ["Live weather + crypto", "Auto-refresh loop", "Provider fallback", "Card-level error states"],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    live: "https://example.com/live-data-dashboard",
    github: "https://github.com/Ahmed-Rafi07"
  },
  {
    title: "Mini UI Experiment",
    type: "UI/UX",
    tech: "React, Motion, CSS",
    description: "A rapid prototyping playground for interaction experiments, transitions, and visual systems.",
    status: "Concept",
    isNew: false,
    problem: "Needed a sandbox to prototype interactions before shipping them to production features.",
    solution: "Created focused micro-experiments for transitions, hover systems, and layout animations.",
    features: ["Micro-interactions", "Animation prototypes", "Reusable UI blocks", "Theme experiments"],
    image:
      "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1400&q=80",
    live: "https://example.com/mini-ui-experiment",
    github: "https://github.com/Ahmed-Rafi07"
  },
  {
    title: "GitHub Stats Dashboard",
    type: "Frontend",
    tech: "React, GitHub API, Charts",
    description: "Tracks repository metrics, contribution patterns, and language usage in one dashboard.",
    status: "In Progress",
    isNew: true,
    problem: "Wanted an at-a-glance engineering profile beyond basic repository lists.",
    solution: "Designed a modular dashboard powered by GitHub APIs with chart-based breakdowns.",
    features: ["Repo trend cards", "Language insights", "Contribution timeline", "Profile benchmarking"],
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80",
    live: "https://example.com/github-stats-dashboard",
    github: "https://github.com/Ahmed-Rafi07"
  },
  {
    title: "Mini Data Analysis Project",
    type: "Data Science",
    tech: "Python, Pandas, Matplotlib",
    description: "Small but complete data analysis workflow from cleaning to insight visualization.",
    status: "Concept",
    isNew: false,
    problem: "Needed a compact project to demonstrate practical analytics workflow end-to-end.",
    solution: "Built reproducible notebooks and visual summaries with clear findings and assumptions.",
    features: ["Data cleaning", "Exploratory analysis", "Insight charts", "Summary reporting"],
    image:
      "https://images.unsplash.com/photo-1551281044-8b4a0f56f81d?auto=format&fit=crop&w=1400&q=80",
    live: "https://example.com/mini-data-analysis",
    github: "https://github.com/Ahmed-Rafi07"
  }
];

const containerVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

function ProjectCard({ project }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(project.image);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, x: 50, y: 50 });

  useEffect(() => {
    setImageLoaded(false);
    setImageSrc(project.image);
  }, [project.image]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const rotateY = ((x - 50) / 50) * 6;
    const rotateX = -((y - 50) / 50) * 6;

    setTilt({ rotateX, rotateY, x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, x: 50, y: 50 });
  };

  const statusClassMap = {
    Live: "border-emerald-300/35 bg-emerald-300/12 text-emerald-200",
    "In Progress": "border-amber-300/35 bg-amber-300/12 text-amber-200",
    Concept: "border-sky-300/35 bg-sky-300/12 text-sky-200"
  };

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.99 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1100px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_18px_45px_rgba(0,0,0,0.32)] backdrop-blur-xl"
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(340px circle at ${tilt.x}% ${tilt.y}%, rgba(90,210,255,0.18), transparent 46%)`
        }}
      />

      <div className="relative h-56 overflow-hidden border-b border-white/10">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-[linear-gradient(120deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04),rgba(255,255,255,0.12))]" />
        )}
        <motion.img
          src={imageSrc}
          alt={project.title}
          loading="lazy"
          className={`h-full w-full object-cover transition duration-500 group-hover:scale-110 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            if (imageSrc !== FALLBACK_IMAGE) {
              setImageLoaded(false);
              setImageSrc(FALLBACK_IMAGE);
            }
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(7,10,20,0.78)_100%)]" />
        {project.isNew && (
          <span className="absolute right-3 top-3 rounded-full border border-cyan-300/35 bg-cyan-300/12 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-100">
            NEW
          </span>
        )}
      </div>

      <div className="relative z-20 p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h4 className="text-xl font-semibold text-white">{project.title}</h4>
          <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.17em] text-cyan-200">
            {project.type}
          </span>
        </div>

        <div className="mb-3">
          <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] ${statusClassMap[project.status]}`}>
            {project.status === "Live" ? "Live 🔥" : project.status === "In Progress" ? "In Progress ⚡" : "Concept 🧠"}
          </span>
        </div>

        <p className="mb-2 text-sm text-white/70">{project.tech}</p>
        <p className="mb-5 text-sm leading-relaxed text-white/62">{project.description}</p>

        <div className="flex flex-wrap gap-3">
          <motion.a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6a7bff] to-[#46c9ff] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(70,201,255,0.34)]"
            aria-label={`Open live demo for ${project.title}`}
          >
            <span>Live Demo</span>
            <span aria-hidden="true">↗</span>
          </motion.a>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 shadow-[0_0_18px_rgba(255,255,255,0.1)]"
            aria-label={`Open GitHub repository for ${project.title}`}
          >
            <span>GitHub</span>
            <span aria-hidden="true">⌁</span>
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectDetailsModal({ project, onClose }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!project) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[140] grid place-items-center bg-black/75 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="w-[min(860px,92vw)] overflow-hidden rounded-2xl border border-white/15 bg-[#0c1022] shadow-[0_30px_70px_rgba(0,0,0,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-56 border-b border-white/10">
          <img src={project.image} alt={project.title} className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(8,10,20,0.85)_100%)]" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full border border-white/25 bg-black/35 px-3 py-1 text-sm font-semibold text-white"
          >
            Close
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <h4 className="text-2xl font-bold text-white">{project.title}</h4>
            <p className="mt-1 text-sm text-white/70">{project.tech}</p>
          </div>
        </div>

        <div className="grid gap-5 p-5 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Problem</p>
            <p className="mt-2 text-sm leading-relaxed text-white/78">{project.problem}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Solution</p>
            <p className="mt-2 text-sm leading-relaxed text-white/78">{project.solution}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Features</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/85"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 flex flex-wrap gap-3">
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6a7bff] to-[#46c9ff] px-4 py-2 text-sm font-semibold text-white"
            >
              <span>Live Demo</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90"
            >
              <span>GitHub</span>
              <span aria-hidden="true">⌁</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [animatedCount, setAnimatedCount] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter((project) => project.type === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    let frameId;

    const animate = () => {
      setAnimatedCount((prev) => {
        if (prev === filteredProjects.length) {
          return prev;
        }

        const diff = filteredProjects.length - prev;
        return prev + Math.sign(diff);
      });

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, [filteredProjects.length]);

  return (
    <section id="projects" className="section relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_10%,rgba(93,114,255,0.2),transparent_35%),radial-gradient(circle_at_88%_14%,rgba(55,196,255,0.16),transparent_34%),radial-gradient(circle_at_50%_96%,rgba(90,210,255,0.11),transparent_36%)]" />

      <div className="mx-auto w-[min(1120px,92vw)]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p variants={cardVariants} className="text-xs font-bold uppercase tracking-[0.26em] text-[#7fdcff]">
            Featured Work
          </motion.p>
          <motion.h3 variants={cardVariants} className="mt-3 text-3xl font-bold text-white md:text-5xl">
            <TypingHeadline
              words={["Crafted to feel premium", "Engineered for impact", "Built like real products"]}
            />
          </motion.h3>
          <motion.p variants={cardVariants} className="mt-4 text-base text-white/70 md:text-lg">
            Production-focused projects with animation craft, API integration, and clean product execution.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-8 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <motion.button
                  key={filter}
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "border-cyan-300/50 bg-cyan-300/14 text-cyan-100 shadow-[0_0_20px_rgba(90,210,255,0.25)]"
                      : "border-white/15 bg-white/5 text-white/75 hover:border-white/35 hover:text-white"
                  }`}
                >
                  {filter}
                </motion.button>
              );
            })}
          </div>

          <motion.p variants={cardVariants} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80">
            Showing <span className="font-bold text-white">{animatedCount}</span> project{animatedCount === 1 ? "" : "s"}
          </motion.p>
        </motion.div>

        <motion.div
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <div key={project.title} className="space-y-3">
              <ProjectCard project={project} />
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedProject(project)}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
              >
                View Details
              </motion.button>
            </div>
          ))}
        </motion.div>
      </div>

      {selectedProject && <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
}

export default Projects;
