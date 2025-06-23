// FILE: components/Intro/Intro.tsx
'use client'; // This is required for components with hooks like animation

import { motion } from 'framer-motion';
import styles from './Intro.module.scss';

const Intro = () => {
  return (
    <motion.section
      className={styles.intro}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles.content}>
        <h1 className={styles.headline}>
          I don&apos;t just write code.
          <br />
          <span className={styles.highlightedText}>I build digital solutions.</span>
        </h1>
        <p className={styles.subhead}>
          Focused on crafting clean, efficient, and memorable web experiences.
          <br/>
          No shortcuts, no excuses. Just results.
        </p>
      </div>
    </motion.section>
  );
};

export default Intro;