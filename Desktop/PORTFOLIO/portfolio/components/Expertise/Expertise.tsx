'use client';

import { motion } from 'framer-motion';
import styles from './Expertise.module.scss';

const expertiseData = {
  "Languages": ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3 / SCSS"],
  "Frameworks & Libraries": ["React", "Next.js", "Node.js", "Express"],
  "Tools & Platforms": ["Git & GitHub", "Docker", "Vercel", "Jest", "Figma"],
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const Expertise = () => {
  return (
    <section id="expertise" className={styles.expertise}>
      <div className={styles.container}>
        <h2 className={styles.heading}>My Toolkit</h2>
        <div className={styles.grid}>
          {Object.entries(expertiseData).map(([category, skills]) => (
            <div key={category} className={styles.category}>
              <h3 className={styles.categoryTitle}>{category}</h3>
              <motion.ul 
                className={styles.skillList}
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {skills.map((skill) => (
                  <motion.li key={skill} className={styles.skillItem} variants={itemVariants}>
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;