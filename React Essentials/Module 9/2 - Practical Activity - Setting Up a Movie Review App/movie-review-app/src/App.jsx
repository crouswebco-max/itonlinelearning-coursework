import Header from './components/Header';
import Footer from './components/Footer';
import styles from './App.module.css';

const STEPS = [
  { icon: '🔍', title: 'Find a film', text: 'Search thousands of movies by title, genre or year.' },
  { icon: '⭐', title: 'Read the reviews', text: 'See what other film fans really thought before you watch.' },
  { icon: '✍️', title: 'Share your take', text: 'Rate what you watched and add your own review.' },
];

// Task 3: the basic layout: a navbar (Header), the main content, and a footer
function App() {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>
        <section id="home" className={styles.hero}>
          <p className={styles.eyebrow}>Movie reviews</p>
          <h1 className={styles.title}>Find your next favourite film</h1>
          <p className={styles.lead}>Browse what's popular, read honest reviews, and keep track of what to watch next.</p>
          <a href="#movies" className={styles.button}>
            Browse movies
          </a>
        </section>

        <section id="movies" className={styles.section} aria-labelledby="how-heading">
          <h2 id="how-heading" className={styles.sectionTitle}>
            How ReelTalk works
          </h2>
          {/* Bonus 1: a responsive grid, one column on a phone and three on a wide screen */}
          <ul className={styles.steps}>
            {STEPS.map((step) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepIcon} aria-hidden="true">
                  {step.icon}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="reviews" className={styles.section}>
          <h2 className={styles.sectionTitle}>Latest reviews</h2>
          <p className={styles.empty}>Reviews will appear here once movies are loaded.</p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
