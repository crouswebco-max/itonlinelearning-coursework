/** @type {import('tailwindcss').Config} */
// Tell Tailwind which files use its classes. This project is an ES module, so it uses `export default`
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
