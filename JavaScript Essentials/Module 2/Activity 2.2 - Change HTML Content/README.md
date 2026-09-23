# Activity 2.2: Change HTML Content with JavaScript

A heading and a button. Click the button and JavaScript changes the heading's text. Open `index.html` in a browser to try it.

## How it works

- `index.html` links the JavaScript file with `<script src="script.js"></script>`.
- The heading has `id="main-heading"`, so JavaScript can find it.
- `script.js` has one function, `changeHeading()`, named in camel case.
- Inside the function, `document.getElementById("main-heading")` finds the heading and stores it in the variable `heading`. Then `heading.textContent = "..."` gives it new text.
- The button's `onclick="changeHeading()"` calls the function when you click it.

## Things to notice

- **The script can go in the `<head>`** here. It only creates the function, and the function doesn't run until you click. By then the heading has loaded.
- **The id must match exactly.** `getElementById("main-heading")` would not find `id="Main-Heading"`.
