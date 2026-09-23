# Activity 2.4: Practise JavaScript Syntax

Practice code for the basic parts of JavaScript. Every section is commented and logs its results. Open `index.html` in a browser, then open the console (F12, or right-click the page, choose **Inspect**, then the **Console** tab).

## Where each topic is in `script.js`

| Section | What it covers |
|---|---|
| **1. Variables** | `var`, `let` and `const`, holding a string, number, boolean, `undefined` and `null`, with `typeof` |
| **2. Functions** | A named function (`greet`), an anonymous function stored in a variable (`addNumbers`) and built-in ones (`Math.round`, `Math.max`, `parseInt`, `toUpperCase`) |
| **3. Conditionals** | `if` / `else if` / `else` to pick a grade, and `switch` to check the day |
| **4. Arrays** | Arrays of strings, numbers and booleans, a mixed array, reading by index and `push()` |
| **5. Loops** | A `for` loop, a `for...of` loop that adds up numbers, and `forEach()` |

## Things to notice

- **`let` and `var` can be changed, `const` can't.** Try `pi = 3;` after the `const` line and the console shows an error.
- **Arrays start at 0**, so `fruits[0]` is the first item.
- **`break` in a `switch`** stops the code falling through to the next case. Saturday and Sunday share one case on purpose.
- **`typeof null` says `object`.** That is an old bug in JavaScript that was never fixed, not a mistake in this code.
