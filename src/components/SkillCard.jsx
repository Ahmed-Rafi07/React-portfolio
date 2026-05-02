import { motion } from "framer-motion";
import { forwardRef, useRef, useState } from "react";

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, y: 18, scale: 0.96, transition: { duration: 0.24, ease: "easeIn" } }
};

const SkillCard = forwardRef(function SkillCard(
  { skill, isActive, isDimmed, onHover, onLeave, mousePosition },
  ref
) {
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
      ref={ref || cardRef}
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
});

export default SkillCard;
