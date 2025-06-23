import styles from './Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>
        &copy; {currentYear} Your Name. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;