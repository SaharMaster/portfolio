'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './About.module.scss';

// A simple checkmark icon component
const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
    />
  </svg>
);

const About = () => {
  const principles = [
    'Clarity over complexity',
    'Function before flash',
    'Honest communication, always',
  ];

  return (
    <motion.section
      id="about"
      className={styles.about}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles.gridContainer}>
        <div className={styles.textContainer}>
          <h2 className={styles.heading}>A bit about me.</h2>
          <p className={styles.bio}>
            I’m a developer who builds things for the web, desktop and mobile platforms. I don't believe in buzzwords or trends, just in solving real problems with clean, efficient code. My approach is simple: understand the goal, plan the execution, and build a solution that lasts.
          </p>
          <div className={styles.principles}>
            {principles.map((principle) => (
              <div key={principle} className={styles.principleItem}>
                <CheckIcon />
                <span>{principle}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/profile-pic2(512).png"
            alt="A picture of me, didn't load for some reason, maybe it's a bad haircut..."
            width={200}
            height={200}
            className={styles.profileImage}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default About;