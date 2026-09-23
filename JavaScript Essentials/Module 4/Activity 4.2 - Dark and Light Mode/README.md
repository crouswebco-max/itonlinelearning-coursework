# Activity 4.2: Dark and Light Mode Page Template

**Pixel Press** is a gaming news page with a button that switches the whole page between a clean light mode and a neon dark mode. Open `index.html` in a browser and click the button at the top right.

## Features

- **One button toggles the theme.** The button's icon and text change to show the other mode (🌙 Dark mode / ☀️ Light mode).
- **Every section changes:** the header, featured story, news cards, reviews, release table and footer. Dark mode also switches to a different heading font and uses cyan instead of purple.
- **The page remembers your choice** with `localStorage`, so it opens in the same mode next time.
- **On a first visit it follows your computer's setting**, using `prefers-color-scheme`.
- **Smooth fades** between the two modes, using CSS `transition`.
- **Accessible:** the button uses `aria-pressed`, so screen readers can tell if dark mode is on. Both modes have strong contrast between text and background.

## Files

| File | What it does |
|---|---|
| `index.html` | The page content: header with the toggle, a featured story, news cards, reviews and a release table |
| `styles.css` | Both colour schemes at the top as CSS variables. `body` holds the light colours, and `body.dark-mode` replaces them |
| `script.js` | The toggle. Every function has a comment explaining it |

## How the JavaScript works

- **`setTheme(isDark)`** adds or removes the `dark-mode` class on `<body>` with `classList.toggle()`, then changes the button's `textContent` and `aria-pressed`.
- **`saveTheme(isDark)`** stores the choice in `localStorage`, only when the button is clicked.
- **`getStartingTheme()`** checks for a saved choice. If there isn't one, it uses `window.matchMedia("(prefers-color-scheme: dark)")`.
- **The click listener** checks `classList.contains("dark-mode")` and switches to the opposite mode.

## Things to notice

- **JavaScript only changes one class.** All the colours live in `styles.css`, so a third theme would only need one more block of variables.
- **To test the first-visit behaviour,** clear the saved choice in the console with `localStorage.removeItem("theme")`, then reload.
