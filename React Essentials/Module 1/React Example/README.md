# React Example: Module 1

A one-page guide to getting started with React, built with React itself. Open `index.html` in a browser. It needs an internet connection, because React loads from a CDN.

## Lessons on the page

| Lesson | What it covers |
|---|---|
| **1. Introduction** | What Module 1 covers and what you'll be able to do by the end |
| **2. What is React?** | Components, JSX, props, state and the virtual DOM, with a live counter demo |
| **3. Software and IDE Installation** | Node.js, npm, VS Code, a browser and React Developer Tools, how to check the installs worked, and useful VS Code extensions |
| **4. Create React App** | `npx create-react-app`, `npm start`, the project's files, and Vite as the modern alternative |

## How the page uses React

- **Components:** each lesson is a function component (`Introduction`, `WhatIsReact` and so on), and they all use one shared `Lesson` component for the heading.
- **Props:** `Lesson` gets `number` and `title` as props. `Terminal` shows whatever is passed between its tags as `children`.
- **State:** `Counter` uses `useState` to remember its number. Clicking a button changes the state and React re-renders just that component.
- **Lists:** the lesson menu and the software cards are built from arrays with `.map()`, each with a `key`.
- **Rendering:** `ReactDOM.createRoot(...).render(<App />)` draws everything inside `<div id="root">`.

## Why there's no install here

This page loads React, ReactDOM and Babel (which turns JSX into normal JavaScript) from a CDN inside `<script>` tags. That's handy for trying React out, but it's slow, so real projects use a build tool like Create React App or Vite instead. That's what the practical activity sets up.
