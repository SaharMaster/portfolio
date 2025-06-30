import styles from './Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>
        &copy; {currentYear} Taras Kyshkar. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;