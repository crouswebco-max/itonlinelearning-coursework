# Activity 6.1: Manipulating Arrays

A page for practising array methods. Type a value, then add it to the start or end of an array, remove from either end, or remove by index. The array updates on screen after every change. Open `index.html` in a browser.

## Where each method is in `script.js`

| Method | Function | Button |
|---|---|---|
| `push()` | `addElement()` | **Add Last** (or press Enter in the value box) |
| `unshift()` | `addFirstElement()` | **Add First** |
| `pop()` | `removeLastElement()` | **Remove Last** |
| `shift()` | `removeFirstElement()` | **Remove First** |
| `splice(index, 1)` | `removeElement(index)` | **Remove at Index**, or the **Remove** button next to any element |
| `forEach()` | `displayArray()` | Runs after every change, showing each element as "Element 1: value (index 0)" |

The array starts empty with `let array = [];`.

## Validation and edge cases

- **Empty value:** "Please type a value first." Nothing is added.
- **Removing from an empty array:** a message says there's nothing to remove.
- **Invalid index:** a negative, decimal or too-large index shows the allowed range (for example, "0 to 2").
- **Errors show in red, successes in green**, and each success message names the method that ran.

## Things to notice

- **"Element 1" is at index 0.** The page shows both, so you can see arrays count from 0.
- **`splice()` returns an array** of what it removed, so the removed value is `removed[0]`.
- **The "In code" line** shows the real array (for example `["a","b"]`) after each change.
