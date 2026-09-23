import Header from './components/Header';
import Footer from './components/Footer';
import MovieList from './components/MovieList';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>
        <section id="home" className={styles.hero}>
          <p className={styles.eyebrow}>Movie reviews</p>
          <h1 className={styles.title}>Find your next favourite film</h1>
          <p className={styles.lead}>What's popular, what's rated highest, and what's coming soon, straight from The Movie Database.</p>
        </section>

        {/* Lesson 13: one reusable MovieList, used three times with different props */}
        <MovieList type="popular" title="Popular" emoji="🔥" />
        <MovieList type="top_rated" title="Top Rated" emoji="⭐" />
        <MovieList type="upcoming" title="Upcoming" emoji="🎬" />
      </main>

      <Footer />
    </div>
  );
}

export default App;
