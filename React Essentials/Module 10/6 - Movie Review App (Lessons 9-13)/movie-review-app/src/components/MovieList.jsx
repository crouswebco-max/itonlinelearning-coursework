import { useEffect, useState } from 'react';
import _ from 'lodash';
import { fetchMovies, hasApiKey } from '../api/tmdb';
import MovieCard from './MovieCard';
import FilterGroup from './FilterGroup';
import styles from './MovieList.module.css';

// Lessons 11–13: one section of movies. The same component shows Popular, Top Rated and Upcoming,
// because the list type, title and emoji come in as props
function MovieList({ type, title, emoji }) {
  const [movies, setMovies] = useState([]); // everything from the API
  const [filterMovies, setFilterMovies] = useState([]); // what's shown after filtering and sorting
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState({ by: 'default', order: 'asc' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Lessons 10–11: get the movies when the component first appears (or if the type changes)
  useEffect(() => {
    if (!hasApiKey) {
      setIsLoading(false);
      return;
    }

    let ignore = false; // stops an old request updating the list after the component has gone
    setIsLoading(true);
    fetchMovies(type)
      .then((results) => {
        if (!ignore) {
          setMovies(results);
          setError('');
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message || 'Could not load the movies.');
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [type]);

  // Lesson 12: filtering. Clicking the active rating again turns the filter off
  const handleFilter = (rate) => {
    setMinRating(rate === minRating ? 0 : rate);
  };

  // Lesson 12: update the sort choice. The input's name ("by" or "order") says which part changed
  const handleSort = (event) => {
    const { name, value } = event.target;
    setSort((previous) => ({ ...previous, [name]: value }));
  };

  // Lesson 12: whenever the movies, the rating or the sort change, filter first, then sort with lodash's orderBy.
  // Doing both here means a filter never loses the sort, and "Sort by" puts the API's order back
  useEffect(() => {
    const filtered = minRating > 0 ? movies.filter((movie) => movie.vote_average >= minRating) : movies;
    setFilterMovies(sort.by === 'default' ? filtered : _.orderBy(filtered, [sort.by], [sort.order]));
  }, [movies, minRating, sort]);

  return (
    <section id={type} className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.heading}>
          {title}{' '}
          <span aria-hidden="true" className={styles.emoji}>
            {emoji}
          </span>
        </h2>

        <div className={styles.controls}>
          {/* Lesson 13: the reusable FilterGroup */}
          <FilterGroup minRating={minRating} onRatingClick={handleFilter} ratings={[8, 7, 6]} />

          <label className={styles.visuallyHidden} htmlFor={`${type}-sort-by`}>
            Sort by
          </label>
          <select id={`${type}-sort-by`} name="by" value={sort.by} onChange={handleSort} className={styles.select}>
            <option value="default">Sort by</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>

          <label className={styles.visuallyHidden} htmlFor={`${type}-sort-order`}>
            Order
          </label>
          <select id={`${type}-sort-order`} name="order" value={sort.order} onChange={handleSort} className={styles.select}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>

      {!hasApiKey && (
        <div className={styles.message}>
          <p>
            <strong>Add your TMDB API key to see movies.</strong>
          </p>
          <p>
            Copy <code>.env.example</code> to <code>.env.local</code>, paste your key after <code>VITE_TMDB_API_KEY=</code>, then restart{' '}
            <code>npm run dev</code>.
          </p>
        </div>
      )}

      {hasApiKey && isLoading && <p className={styles.message}>Loading movies…</p>}
      {hasApiKey && error && (
        <p className={`${styles.message} ${styles.error}`} role="alert">
          {error}
        </p>
      )}

      {hasApiKey && !isLoading && !error && (
        <>
          {filterMovies.length === 0 ? (
            <p className={styles.message}>No movies with {minRating}+ stars in this list.</p>
          ) : (
            <div className={styles.cards}>
              {filterMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default MovieList;
