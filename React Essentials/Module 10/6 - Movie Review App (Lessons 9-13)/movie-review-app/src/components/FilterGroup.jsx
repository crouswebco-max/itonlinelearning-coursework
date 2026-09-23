import styles from './FilterGroup.module.css';

// Lesson 13: a reusable group of rating buttons.
// It doesn't know anything about movies: the ratings, the chosen one and the click handler all come from props,
// so the same component can be used in every MovieList
function FilterGroup({ minRating, onRatingClick, ratings }) {
  return (
    <ul className={styles.group} aria-label="Minimum rating">
      {ratings.map((rate) => (
        <li key={rate}>
          <button
            type="button"
            className={minRating === rate ? `${styles.item} ${styles.active}` : styles.item}
            aria-pressed={minRating === rate}
            onClick={() => onRatingClick(rate)}
          >
            {rate}+ Star
          </button>
        </li>
      ))}
    </ul>
  );
}

export default FilterGroup;
