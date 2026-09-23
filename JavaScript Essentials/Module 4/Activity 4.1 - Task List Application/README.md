# Activity 4.1: Task List Application

A to-do list built with JavaScript DOM manipulation. Type a task, add it, tick it off, edit it or delete it. Open `index.html` in a browser.

## Features

- **Add tasks** with the **Add task** button or by pressing Enter. Empty tasks show a message instead of being added.
- **Delete tasks** with the **Delete** button. The task slides out before it's removed.
- **Mark tasks as done** with the checkbox. Done tasks turn green and get crossed out.
- **Edit tasks**: **Edit** turns the text into an input box, and **Save** (or Enter) puts it back.
- **A counter** shows how many tasks are left, and a message shows when the list is empty.

## Where each part is in `script.js`

| Part | Where to look |
|---|---|
| **Adding a task** | `addTask()`: builds an `<li>` with `createElement()`, fills it with `textContent`, then adds it with `appendChild()` |
| **Button click** | `addButton.addEventListener("click", addTask)` |
| **Removing a task** | `removeTask()`: adds the `removing` class for the animation, then calls `task.remove()` |
| **Event delegation** | One `click` listener on the `<ul>` checks `event.target` to see which button was clicked, and uses `closest(".task")` to find the task |
| **Marking as done** | `toggleComplete()`: `classList.toggle("completed")` |
| **Editing** | `editTask()`: swaps the text for an input with `replaceWith()`, and back again |

## Things to notice

- **Event delegation means one listener handles every task**, even tasks added after the page loaded. Without it, each new task would need its own listeners.
- **Task text is added with `textContent`, not `innerHTML`**, so typing `<b>hi</b>` shows those characters instead of making bold text.
- **The styles for done and removing tasks live in `style.css`.** JavaScript only adds or removes the classes.
