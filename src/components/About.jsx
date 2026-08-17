import { motion } from "framer-motion";

const chips = [
  "React",
  "JavaScript",
  "Node.js",
  "MongoDB",
  "Python",
  "NumPy",
  "Pandas",
  "Data Science",
  "Machine Learning"
];
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
  <p className="eyebrow">About Ahmed Rafi</p>

  <h3>
    Full-Stack Developer & Data Science Enthusiast
  </h3>

  <p>
    I&apos;m Ahmed Rafi, a student and aspiring Full-Stack Developer
    passionate about building practical, modern web applications.
    I work with React, JavaScript, Node.js, Express.js, MongoDB,
    HTML, and CSS to create responsive and user-focused experiences.
  </p>

  <p>
    Alongside web development, I&apos;m exploring Data Science using
    Python, NumPy, Pandas, Matplotlib, Seaborn, SQL, statistics,
    data analysis, machine learning, and artificial intelligence.
    I enjoy turning ideas and data into useful solutions while
    continuously improving my programming and problem-solving skills.
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
