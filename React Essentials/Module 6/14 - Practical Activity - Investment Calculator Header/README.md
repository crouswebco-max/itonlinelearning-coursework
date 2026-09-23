# Practical Activity: Create a Header Component for an Investment Calculator App

The first part of the Investment Calculator (the Money Builder App): a `Header` component with a logo and title, in the Vite project the course provided.

![The Investment Calculator header](screenshots/header.png)

## About the starter project

The downloaded project (`moneybuilderapp.zip`) had `index.html`, `package.json` and `vite.config.js`, but **no `src` folder**, so the files it refers to were missing. I recreated them:

- `src/index.jsx`: the entry file that `index.html` loads.
- `src/util/investment.js`: `calculateInvestmentResults()` works out each year's interest and value, and `formatter` shows numbers as dollars. Module 7 uses these.
- `src/assets/investment-calculator-logo.png`: a logo I made (a growing bar chart).

If your tutor sends the original `src` files, they can replace these. The Header code is the same either way. The download's `node_modules` were for Windows, so I left them out and ran `npm install` again.

## Where each task is

| Task | Where |
|---|---|
| **1. Open and install** | `npm install` in `moneybuilderapp` |
| **2–3. components folder and Header.jsx** | `src/components/Header.jsx` |
| **4. Header component** | Imports the logo, and renders `<header id="header">` with `<img src={logo} alt="Investment Calculator Logo" />` (self-closing) and an `<h1>` |
| **5. Use it in App** | `src/App.jsx`: `import Header from './components/Header';` and `<Header />` |
| **6. CSS** | `src/index.css`: the brief's `#header` styles, plus fonts and a dark green background |
| **7. Import the CSS** | `import './index.css'` in `src/index.jsx` |
| **8. Run it** | `npm run dev` |

## Bonus challenges

1. **Custom title:** `<Header title="Money Builder" />`. It defaults to "Investment Calculator".
2. **Subtitle:** `<Header subtitle="..." />`, with a default. Passing an empty string hides it.
3. **Responsive:** a media query makes the logo and title bigger on screens 768px and wider.

## Run it

```text
cd moneybuilderapp
npm install
npm run dev
```
