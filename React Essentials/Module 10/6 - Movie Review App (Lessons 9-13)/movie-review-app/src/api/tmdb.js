// Lessons 9–10: talking to The Movie Database (TMDB) API.
// The key comes from .env.local (VITE_TMDB_API_KEY), so it isn't written in the code or pushed to GitHub.
// Vite only shares variables that start with VITE_ with the browser code.
export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

// True when a real key has been added
export const hasApiKey = Boolean(API_KEY) && API_KEY !== 'your_api_key_here';

// Gets one list of movies: "popular", "top_rated" or "upcoming".
// The key goes in the URL as ?api_key=..., the way the course does it
export async function fetchMovies(type) {
  const response = await fetch(`${BASE_URL}/movie/${type}?api_key=${API_KEY}`);

  // fetch only fails on network errors, so check the status too (401 = wrong key, 404 = wrong address)
  if (!response.ok) {
    throw new Error(response.status === 401 ? 'The API key was rejected. Check VITE_TMDB_API_KEY in .env.local.' : `TMDB answered with status ${response.status}.`);
  }

  const data = await response.json();
  return data.results; // TMDB puts the movies in a "results" array
}
