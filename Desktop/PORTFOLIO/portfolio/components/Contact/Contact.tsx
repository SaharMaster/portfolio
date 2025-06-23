'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Contact.module.scss';

const Contact = () => {
    const [copied, setCopied] = useState(false);
    const email = 'your-email@example.com';
  
    const handleCopy = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    };
  
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
          <div className={styles.buttonContainer}>
          <a href={`mailto:${email}`} onClick={handleCopy} className={styles.emailButton}>
            {copied ? 'Email copied!' : 'Say Hello'}
          </a>
          </div>
        </div>
      </motion.section>
    );
  };
  
  export default Contact;