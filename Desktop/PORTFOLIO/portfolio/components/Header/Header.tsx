'use client';

import Link from 'next/link';
import styles from './Header.module.scss';

const Header = () => {
    return (
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            Your Name
          </Link>
          <div className={styles.navLinks}>
            <ul className={styles.navList}>
              <li><a href="#about" className={styles.navLink}>About</a></li>
              <li><a href="#expertise" className={styles.navLink}>Expertise</a></li>
              <li><a href="#projects" className={styles.navLink}>Projects</a></li>
              <li><a href="#contact" className={styles.navLink}>Contact</a></li>
            </ul>
            <a href="\Kyshkar Taras - CV.pdf" download className={styles.resumeButton}>
              Download CV
            </a>
          </div>
        </nav>
      </header>
    );
  };
  
  export default Header;
