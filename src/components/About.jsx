import { motion } from "framer-motion";

const chips = ["React", "JavaScript", "Python", "MongoDB", "Node.js", "UI/UX"];

function About() {
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <motion.div
          className="about-visual glass"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80"
            alt="Developer workspace with laptop and code"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          className="about-copy"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">About Me</p>
          <h3>Building sleek, scalable products from backend to pixel.</h3>
          <p>
            I design and build full-stack web experiences with clean architecture,
            polished visuals, and performance-first thinking. I enjoy translating complex
            ideas into delightful interfaces that feel fast and intentional.
          </p>
          <div className="chip-wrap">
            {chips.map((chip) => (
              <span key={chip} className="chip">
                {chip}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
