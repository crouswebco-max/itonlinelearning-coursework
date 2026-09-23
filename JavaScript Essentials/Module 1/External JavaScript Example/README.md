# External JavaScript Example

A page whose JavaScript lives in a separate file, `script.js`, instead of inside the HTML. Open `index.html` in a browser.

## How it's linked

In the `<head>` of `index.html`:

```html
<script src="script.js" defer></script>
```

- **`src`** tells the browser which JavaScript file to load.
- **`defer`** waits until the HTML has loaded before running the script, so the elements it changes already exist.

## What `script.js` does

1. Logs "script.js has loaded!" to the console (F12, then **Console**).
2. Changes the blue sentence on the page.
3. Shows today's date.
4. Counts clicks on the **Click me** button.

## Why use an external file?

- **The HTML stays tidy:** structure in `.html`, behaviour in `.js`.
- **One file can be reused** on many pages.
- **The browser can cache it**, so it loads faster the second time.
