// The elements from the page
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");
const errorMessage = document.getElementById("error-message");
const emptyMessage = document.getElementById("empty-message");
const taskCount = document.getElementById("task-count");

// Adds a new task to the list
function addTask() {
    const text = taskInput.value.trim();

    // Don't add empty tasks
    if (text === "") {
        errorMessage.textContent = "Please type a task first.";
        taskInput.focus();
        return;
    }
    errorMessage.textContent = "";

    // Create the list item and its parts
    const task = document.createElement("li");
    task.className = "task";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "complete-checkbox";
    checkbox.setAttribute("aria-label", "Mark as done");

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = text;       // textContent, so typed HTML shows as plain text

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "edit-button";
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";

    // Put the parts into the list item, then add it to the list
    task.append(checkbox, taskText, editButton, deleteButton);
    taskList.appendChild(task);

    // Clear the input, ready for the next task
    taskInput.value = "";
    taskInput.focus();
    updateCount();
}

// Removes a task, after its fade-out animation finishes
function removeTask(task) {
    task.classList.add("removing");
    task.addEventListener("animationend", function () {
        task.remove();
        updateCount();
    });
}

// Marks a task as done or not done
function toggleComplete(task) {
    task.classList.toggle("completed");
    updateCount();
}

// Swaps the task text for an input box, or saves the edited text
function editTask(task) {
    const editButton = task.querySelector(".edit-button");
    const editInput = task.querySelector(".task-edit");

    if (editInput) {
        // Saving: put the new text back in a span
        const newText = editInput.value.trim();
        if (newText === "") {
            editInput.focus();
            return;
        }
        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = newText;
        editInput.replaceWith(taskText);
        editButton.textContent = "Edit";
    } else {
        // Editing: replace the span with an input holding the current text
        const taskText = task.querySelector(".task-text");
        const input = document.createElement("input");
        input.type = "text";
        input.className = "task-edit";
        input.value = taskText.textContent;
        input.maxLength = 100;
        input.setAttribute("aria-label", "Edit task");
        taskText.replaceWith(input);
        editButton.textContent = "Save";
        input.focus();
    }
}

// Shows how many tasks are left, and the message when the list is empty
function updateCount() {
    const total = taskList.querySelectorAll(".task:not(.removing)").length;
    const done = taskList.querySelectorAll(".task.completed:not(.removing)").length;

    emptyMessage.hidden = total > 0;
    taskCount.textContent = total > 0 ? `${total - done} of ${total} tasks left to do` : "";
}

// Add a task when the button is clicked
addButton.addEventListener("click", addTask);

// Add a task when Enter is pressed in the input
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Event delegation: one listener on the list handles clicks for every task,
// including tasks added later
taskList.addEventListener("click", function (event) {
    const task = event.target.closest(".task");
    if (!task) {
        return;
    }

    if (event.target.classList.contains("delete-button")) {
        removeTask(task);
    } else if (event.target.classList.contains("edit-button")) {
        editTask(task);
    } else if (event.target.classList.contains("complete-checkbox")) {
        toggleComplete(task);
    }
});

// Save an edit when Enter is pressed in the edit box
taskList.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && event.target.classList.contains("task-edit")) {
        editTask(event.target.closest(".task"));
    }
});

updateCount();
