# AJAX Example 5: Fetching Data from an API

A small app that uses `fetch()` with `async` / `await` to load real data from the free [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API. Open `index.html` in a browser (you need to be online).

- **Load users** fetches `/users` and shows a card for each of the 10 users.
- **View posts** on a card fetches `/posts?userId=...` and lists that user's posts.
- **Try a broken request** asks for an address that doesn't exist and shows the error message.
- A **status line** shows "Loading...", the result, or an error in red. The data is also logged to the console.

## How `script.js` works

| Function | What it does |
|---|---|
| `getJSON(url)` | `await fetch(url)`, checks `response.ok`, then returns `response.json()` |
| `loadUsers()` | Gets the users and builds a card for each with `createElement()`. It disables the button while loading |
| `loadPosts(user)` | Gets that user's posts and lists them |
| `loadBroken()` | Shows `try` / `catch` handling a 404 |

## Things to notice

- **`fetch()` does not fail on a 404.** It only fails if there's no connection, so `getJSON()` checks `response.ok` and throws its own error.
- **`response.json()` is also a promise**, so it needs `await` too (here it's returned from an `async` function, which does the same thing).
- **All the text is added with `textContent`**, so data from the API can never run as HTML.
