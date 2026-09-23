# Practical Activity: Debugging in React

Two investment calculators side by side. One has the bug from the brief (numbers stored as text), for practising with the browser's debugger. The other is the fixed version, with error handling, console logs and a custom hook.

![The buggy and fixed calculators](screenshots/debugging.png)

The brief says to copy a provided `InvestmentCalculator` component, but its code wasn't included, so I wrote one with exactly the bug the brief describes.

## Task 1: See the bug

Run the app, change the initial investment in the **Buggy calculator** (to 2000, say), and click **Calculate**. Instead of money, you get `"2000100100"`: the numbers have been joined together like text.

## Tasks 2 and 3: Find it with the debugger

1. Open DevTools (F12) and go to **Sources**. With Vite, open `localhost:5173` → `src` → `components` → `InvestmentCalculatorBuggy.jsx`.
2. Click the line numbers next to the two 🔴 comments to set breakpoints in `handleInputChange` and `calculateInvestment`.
3. Type in the initial investment box. The code pauses in `handleInputChange`. Hover over `value`: it's `"2000"`, **in quotes**, so it's a string. It's saved into state as it is.
4. Click **Calculate**. It pauses in `calculateInvestment`. Step over (F10) and watch `investmentValue`. `"2000" + 100` gives `"2000100"`, because `+` between a string and anything else **joins** them.

## Task 4: The fix

In `src/hooks/useInvestmentForm.js`, the value is converted before it's stored:

```js
const numberValue = value === '' ? '' : +value; // or parseFloat(value)
```

The **Fixed calculator** gives $2,200, $2,410 and $2,631 for the same steps.

## Task 5: Error handling and logging

- Empty boxes, negative numbers and a duration under 1 each show a red message, and **Calculate** is disabled.
- The console shows every change (the raw value and its type, then the stored value and its type), warnings for invalid input, and `console.table` of the inputs and results for each calculation.

## Bonus challenges

1. **Custom hook:** `useInvestmentForm(initialValues)` returns `values`, `errors`, `isValid` and `handleChange`, with the number conversion and validation built in.
2. **React DevTools:** with the React Developer Tools extension, the **Components** tab shows each calculator's state. In the buggy one, `initialInvestment` turns into `"2000"`, a string, as soon as you type.

## Run it

```text
cd moneybuilderapp
npm install
npm run dev
```
