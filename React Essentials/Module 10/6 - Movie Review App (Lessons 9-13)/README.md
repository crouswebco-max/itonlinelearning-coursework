# Movie Review App: Lessons 9–13

ReelTalk from Module 9, now showing real movies from **The Movie Database (TMDB) API**, built the way the course does it: Popular, Top Rated and Upcoming lists, a filter by rating (8+, 7+, 6+), sorting by date or rating with lodash, and reusable `MovieList` and `FilterGroup` components.

![ReelTalk with movie lists](screenshots/movie-review-app.png)

*Real TMDB data, with the mouse over a card to show its details.*

## Add your API key

1. Get a free API key from TMDB (see Lesson 10 and the course update: profile icon, then **API subscription**, then your API key details).
2. In `movie-review-app`, copy `.env.example` to a new file called `.env.local`.
3. Paste your key after the `=`:

   ```text
   VITE_TMDB_API_KEY=your_key_here
   ```

4. Start (or restart) `npm run dev`.

**Why `.env.local`:** the course puts the key straight into the fetch URL. That works, but the key would then be published on GitHub. `.env.local` is ignored by git (the `*.local` line in `.gitignore`), and Vite shares any variable starting with `VITE_` with the app through `import.meta.env`. The request itself is the same as the course's: `...?api_key=${API_KEY}`.

Without a key, each list shows how to add one, instead of failing.

## What each lesson added

| Lesson | Where |
|---|---|
| **9. Introduction to API** | `src/api/tmdb.js`: `fetchMovies(type)` requests `https://api.themoviedb.org/3/movie/{type}`, checks `response.ok`, and returns `data.results` |
| **10. API key** | `API_KEY = import.meta.env.VITE_TMDB_API_KEY`, sent as `?api_key=`. A 401 (wrong key) gets its own message |
| **11. Practice exercise** | `src/components/MovieList.jsx` fetches in `useEffect`, with loading and error states. `src/components/MovieCard.jsx` shows the poster (`https://image.tmdb.org/t/p/w500` + `poster_path`), and on hover or keyboard focus shows the title, release date, rating and a shortened summary. Each card links to the movie's TMDB page |
| **12. Filtering and sorting** | 8+ / 7+ / 6+ buttons (click again to turn the filter off). "Sort by" Date or Rating, Ascending or Descending, using lodash's `_.orderBy` |
| **13. Reusable components** | `src/components/FilterGroup.jsx` takes `minRating`, `onRatingClick` and `ratings` props. `App.jsx` uses one `MovieList` three times: `type="popular"`, `"top_rated"` and `"upcoming"`, each with its own title and emoji. The header links jump to each list |

## Small improvements on the course code

- **Filter and sort together:** in the course, turning on a rating filter throws away the chosen sort. Here one `useEffect` filters, then sorts, whenever the movies, rating or sort change, and "Sort by" puts the API's order back.
- **Buttons for the filters:** they're `<button>`s (the course uses `<li>`), so they work with the keyboard and screen readers.
- **Safe requests:** an `ignore` flag in the effect's clean-up stops a slow, old request from overwriting newer data.

## What I tested

With the real key, all three lists load 20 movies each with their posters, and there are no errors in the console.

To test the parts real data can't easily show, I also used a fake key and made-up responses in TMDB's format:
- the key is sent as `?api_key=`
- the loading state shows
- 8+ only shows movies rated 8 or more
- both sort orders work, and a filter keeps the sort
- "Sort by" restores the order
- a rejected key shows an error
- with no key, all three lists explain what to do



## Credit

Movie data and posters come from TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB. The footer says the same.

## Run it

```text
cd movie-review-app
npm install
npm run dev
```
