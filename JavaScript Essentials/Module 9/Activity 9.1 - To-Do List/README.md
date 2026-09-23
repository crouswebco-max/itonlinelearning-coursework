# Activity 9.1: To-Do List Application

Type a task and click **Add Task** (or press Enter). Tasks show in a list, each with a **Remove** button. Open `index.html` in a browser.

## How `script.js` works

The file is split into commented sections:

| Section | What it does |
|---|---|
| **Data** | `let tasks = [];`: the empty array that holds the tasks |
| **Elements** | Gets the input, button, list and message with `getElementById()` |
| **`addTask()`** | Reads the input. If it's empty, shows a message and stops. Otherwise it adds the task with `push()`, clears the input and calls `displayTasks()` |
| **`displayTasks()`** | Empties the list, then a `for` loop creates an `<li>` with the task text and a Remove button for each task, added with `appendChild()` |
| **`removeTask(index)`** | Removes that task from the array with `splice(index, 1)`, then calls `displayTasks()` |
| **Events** | The button's `click` and the input's Enter key both call `addTask()` |

## Things to notice

- **The array is the real list.** The page is redrawn from the array after every change, so they always match.
- **The list is emptied before it's redrawn** (`taskList.innerHTML = ""`). Without that, every task would appear again each time.
- **Task text uses `textContent`**, so anything typed shows as plain text and never runs as HTML.
