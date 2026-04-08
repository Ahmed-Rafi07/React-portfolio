import { motion } from "framer-motion";

const skills = [
  { name: "React", value: 88, level: "★★★★☆" },
  { name: "Node", value: 84, level: "★★★★☆" },
  { name: "MongoDB", value: 74, level: "★★★☆☆" },
  { name: "Python", value: 78, level: "★★★★☆" }
];

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <p className="eyebrow">Core Skills</p>
        <h3 className="section-title">A stack built for shipping fast</h3>

        <div className="skills-list glass">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              className="skill-row"
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
            >
              <div className="skill-top">
                <span>{skill.name}</span>
                <span>{skill.level}</span>
              </div>
              <div className="skill-track">
                <motion.div
                  className="skill-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.value}%` }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.8, delay: idx * 0.08 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
