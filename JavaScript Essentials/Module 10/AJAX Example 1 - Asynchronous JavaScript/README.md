# AJAX Example 1: Asynchronous JavaScript

What "asynchronous" means, shown with a real AJAX request using `XMLHttpRequest`. Open `index.html` in a browser (you need to be online) and click the buttons.

| Button | What it shows |
|---|---|
| **Synchronous code** | Normal code runs line by line, in order |
| **AJAX request** | `open()`, `onload`, `send()` and `JSON.parse()`. The line after `send()` is logged *before* the data arrives |
| **Watch readyState** | `onreadystatechange` logs each stage of the request, from 1 (opened) to 4 (done) |

## Things to notice

- **The times in the output** show how long the server took to answer, while the page carried on.
- **The server sends text.** `JSON.parse()` turns it into an object, so you can use `user.name`.
- **`xhr.status === 200`** means it worked. `onerror` only runs when there's no connection at all.
