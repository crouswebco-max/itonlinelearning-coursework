# AJAX Example 2: Callbacks

AJAX requests handled with callbacks. `getData(url, callback)` sends the request and later calls `callback(error, data)`: `error` is `null` if it worked, and `data` is `null` if it failed. Open `index.html` in a browser (you need to be online).

| Button | What it shows |
|---|---|
| **Get a user** | A request that works: the callback gets the user |
| **Missing user** | User 9999 doesn't exist, so the server answers 404 and the callback gets an error |
| **Callback hell** | A user, then their posts, then the comments. Each request needs the one before, so the callbacks nest three levels deep |

## Things to notice

- **Every callback has to check for an error**, which repeats the same `if (error)` code.
- **Callback hell gets harder to read with every step.** The Promises example does the same three requests without the nesting.
