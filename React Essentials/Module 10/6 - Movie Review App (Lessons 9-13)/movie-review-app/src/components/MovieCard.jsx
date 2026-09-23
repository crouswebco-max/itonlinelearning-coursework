import { IMAGE_URL } from '../api/tmdb';
import styles from './MovieCard.module.css';

// Lesson 11: one movie. It links to the movie's TMDB page, shows the poster,
// and shows the title, date, rating and summary over the poster on hover (or keyboard focus)
function MovieCard({ movie }) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'TBA';
  const summary = movie.overview && movie.overview.length > 120 ? `${movie.overview.slice(0, 120)}…` : movie.overview;

  return (
    <a href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank" rel="noreferrer" className={styles.card}>
      {movie.poster_path ? (
        <img src={`${IMAGE_URL}${movie.poster_path}`} alt={`${movie.title} poster`} className={styles.poster} loading="lazy" />
      ) : (
        <div className={styles.noPoster}>{movie.title}</div>
      )}

      <div className={styles.details}>
        <h3 className={styles.title}>{movie.title}</h3>
        <div className={styles.meta}>
          <span>{movie.release_date || 'Release date TBA'}</span>
          <span className={styles.rating}>
            {movie.vote_average ? movie.vote_average.toFixed(1) : '–'} <span aria-hidden="true">⭐</span>
          </span>
        </div>
        {summary && <p className={styles.overview}>{summary}</p>}
      </div>

      <span className={styles.visuallyHidden}>
        {movie.title} ({year}), rated {movie.vote_average ? movie.vote_average.toFixed(1) : 'not yet rated'}. Opens TMDB in a new tab.
      </span>
    </a>
  );
}

export default MovieCard;
