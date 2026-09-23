import { useState } from 'react';
import styles from './Header.module.css';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#movies', label: 'Movies' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#about', label: 'About' },
];

// Task 6: the header with the title and navigation links.
// Bonus 1: on a phone the links fold into a menu button
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#home" className={styles.logo}>
          <span className={styles.logoMark} aria-hidden="true">▶</span>
          <span>
            Reel<span className={styles.logoAccent}>Talk</span>
          </span>
        </a>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>

        <nav id="main-nav" aria-label="Main" className={menuOpen ? `${styles.nav} ${styles.navOpen}` : styles.nav}>
          <ul>
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
