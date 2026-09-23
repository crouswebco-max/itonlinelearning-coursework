import styles from './Footer.module.css';

// Bonus 3: a basic footer
function Footer() {
  return (
    <footer id="about" className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.brand}>
          Reel<span>Talk</span>
        </p>
        <p className={styles.text}>Honest movie reviews from people who love films. Built with React and Vite.</p>
        <p className={styles.small}>© {new Date().getFullYear()} ReelTalk</p>
      </div>
    </footer>
  );
}

export default Footer;
