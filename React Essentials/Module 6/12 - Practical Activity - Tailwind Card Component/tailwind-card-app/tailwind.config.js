/** @type {import('tailwindcss').Config} */
// Task 2: tell Tailwind which files use its classes.
// This project is an ES module ("type": "module" in package.json), so it uses `export default` instead of `module.exports`
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // Bonus 2: dark mode is switched on by adding the "dark" class to <html>
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};
