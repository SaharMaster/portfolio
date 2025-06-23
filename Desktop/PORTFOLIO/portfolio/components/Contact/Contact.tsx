'use client';

import { motion } from 'framer-motion';
import styles from './Contact.module.scss';

const Contact = () => {
  return (
    <motion.section
      id="contact"
      className={styles.contact}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles.container}>
        <h2 className={styles.heading}>Get In Touch</h2>
        <p className={styles.subhead}>
          Have a project or an idea? I'm always open to discussing new opportunities and collaborations.
        </p>
        <a href="mailto:your-email@example.com" className={styles.emailButton}>
          Say Hello
        </a>
      </div>
    </motion.section>
  );
};

export default Contact;