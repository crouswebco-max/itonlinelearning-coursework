# Practical Activity: Create a Responsive Card Component using React and Tailwind CSS

A reusable `Card` component styled only with Tailwind CSS classes, in a Vite project. It includes a hover effect, dark mode and a form for adding cards.

| Light | Dark |
|---|---|
| ![Cards in light mode](screenshots/cards-light.png) | ![Cards in dark mode](screenshots/cards-dark.png) |

## Setup (Tasks 1–3)

```text
npm create vite@latest tailwind-card-app -- --template react
cd tailwind-card-app
npm install
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

- **Tailwind version 3:** the course's commands (`npx tailwindcss init -p` and the `@tailwind` directives) are for Tailwind 3, so it's installed with `tailwindcss@3`. Tailwind 4 sets up differently.
- **`tailwind.config.js`:** `content` lists `./index.html` and `./src/**/*.{js,ts,jsx,tsx}`. It uses `export default` instead of `module.exports`, because Vite projects are ES modules (`"type": "module"`).
- **`src/index.css`:** holds the three `@tailwind` directives.

## Where each task is

| Task | Where |
|---|---|
| **4. Card component** | `src/components/Card.jsx`: `title`, `description`, `buttonText` and `imageUrl` props, styled with Tailwind classes |
| **5. App** | `src/App.jsx`: a `cardData` array rendered with `cardData.map((card, index) => <Card key={index} {...card} />)` |
| **6. Run it** | `npm run dev` |

The brief's image links (`example.com/...`) don't exist, so the cards use three images I drew as SVG files in `src/assets`.

## Bonus challenges

1. **Hover effect:** `hover:-translate-y-1 hover:shadow-2xl` lifts the card. It's turned off with `motion-reduce:` for people who prefer less motion.
2. **Dark mode:** `darkMode: 'class'` in the config. The toggle adds the `dark` class to `<html>` in a `useEffect`, and `dark:bg-slate-800`, `dark:text-white` and so on take over.
3. **Add cards:** `src/components/AddCardForm.jsx` checks every field is filled, then adds a new card.

## Run it

```text
cd tailwind-card-app
npm install
npm run dev
```
