import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const words = ["React", "Node", "MongoDB", "UI/UX"];

function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const isWordComplete = typedText === currentWord;

    const typingDelay = isDeleting ? 55 : 120;
    const pauseDelay = isWordComplete && !isDeleting ? 1200 : typingDelay;

    const timer = setTimeout(() => {
      if (!isDeleting && typedText !== currentWord) {
        setTypedText(currentWord.slice(0, typedText.length + 1));
      } else if (isDeleting && typedText !== "") {
        setTypedText(currentWord.slice(0, typedText.length - 1));
      } else if (isWordComplete) {
        setIsDeleting(true);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }, pauseDelay);

    return () => clearTimeout(timer);
  }, [typedText, wordIndex, isDeleting]);

  return (
    <section id="home" className="hero section">
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="container hero-grid">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow">Available for internship and freelance</p>
          <h1>
            Hi, I&apos;m Rafi <span className="wave">👋</span>
          </h1>
          <h2>Full Stack Developer</h2>
          <p className="typing-line">
            <span className="typing-prefix">Stack:</span> {typedText}
            <span className="cursor">|</span>
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn btn-ghost">
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-image-wrap"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="hero-glow" aria-hidden="true" />
          <img
            className="hero-image"
            src="https://api.dicebear.com/9.x/notionists/svg?seed=Rafi"
            alt="Portrait avatar of Rafi"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
