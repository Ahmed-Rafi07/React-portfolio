import { motion } from "framer-motion";

function Contact() {
  return (
    <section id="contact" className="section section-contact">
      <div className="container contact-grid">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
        >
          <p className="eyebrow">Contact</p>
          <h3>Let&apos;s build something that stands out.</h3>
          <p>
            Reach out for internships, freelance work, or collaboration.
            I usually reply quickly.
          </p>
          <ul className="contact-links">
            <li>
              <a href="mailto:Ahmed.rafi.dev@gmail.com">rafi.dev@email.com</a>
            </li>
            <li>
              <a href="https://github.com/Ahmed-Rafi07" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/ahmed-rafi07/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.form
          className="contact-form glass"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" placeholder="Your name" required />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@example.com" required />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Tell me about your project"
            required
          />

          <button className="btn btn-primary" type="submit">
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
}

export default Contact;
