# AJAX Example 4: Async / Await

The same promise-based `getData(url)`, used with `async` and `await`, so the code reads top to bottom. Open `index.html` in a browser (you need to be online).

| Button | What it shows |
|---|---|
| **Get a user** | `const user = await getData(...)`: the function waits on that line |
| **try / catch error** | A 404 jumps straight to `catch`, and `finally` runs either way |
| **User, posts, comments** | The same three requests as the chain, written as three ordinary lines |
| **One after another** | A `for` loop with `await` fetches the users one by one, then logs how long it took |
| **All at once** | `await Promise.all([...])` fetches them together. Compare the time with the one above |

## Things to notice

- **`await` only works inside an `async` function.**
- **`await` only pauses that function.** The rest of the page keeps working.
- **Only use "one after another" when a request needs the result of the one before.** Otherwise "all at once" is faster.
