# AJAX Example 3: Promises

The same AJAX requests, with `getData(url)` returning a **promise**. It calls `resolve(data)` when the answer arrives, or `reject(error)` if it fails. Open `index.html` in a browser (you need to be online).

| Button | What it shows |
|---|---|
| **Get a user** | `.then()`, `.catch()` and `.finally()`. A line logged after the request runs while the promise is still pending |
| **Missing user** | A 404 rejects the promise, so `.catch()` runs |
| **Chain of .then()** | User, posts, comments, like callback hell but flat. Each `.then()` returns the next request |
| **Promise.all()** | Three requests sent at once. The results arrive together as an array |

## Things to notice

- **One `.catch()` at the end handles an error from any step** in the chain.
- **`Promise.all()` fails if any one request fails.**
