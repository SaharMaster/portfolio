'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          Taras Kyshkar
        </Link>
        
        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <ul className={styles.navList}>
            <li><a href="#about" className={styles.navLink}>About</a></li>
            <li><a href="#projects" className={styles.navLink}>Projects</a></li>
            <li><a href="#contact" className={styles.navLink}>Contact</a></li>
            <li> {/* The button is now a list item for proper alignment */}
              <a href="placeholder" download className={styles.resumeButton}>
                Download CV
              </a>
            </li>
          </ul>
        </div>

        {/* Hamburger Icon */}
        <button onClick={toggleMenu} className={`${styles.hamburger} ${isMenuOpen ? styles.isOpen : ''}`} aria-label="Toggle menu">
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </button>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className={styles.mobileNav}>
            <ul className={styles.mobileNavList}>
              <li><a href="#about" className={styles.mobileNavLink} onClick={closeMenu}>About</a></li>
              <li><a href="#projects" className={styles.mobileNavLink} onClick={closeMenu}>Projects</a></li>
              <li><a href="#contact" className={styles.mobileNavLink} onClick={closeMenu}>Contact</a></li>
            </ul>
            <a href="placeholder" download className={styles.mobileResumeButton}>
              Download CV
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;