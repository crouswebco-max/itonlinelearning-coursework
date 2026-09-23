// ============================================
// DATA: an empty array to hold the tasks
// ============================================
let tasks = [];

// ============================================
// ELEMENTS: the parts of the page we use
// ============================================
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const message = document.getElementById("message");

// ============================================
// ADD: gets the input value, adds it to the array, then redraws the list
// ============================================
function addTask() {
    const task = taskInput.value.trim();

    // Don't add an empty task
    if (task === "") {
        message.textContent = "Please type a task first.";
        return;
    }

    message.textContent = "";
    tasks.push(task);
    taskInput.value = "";      // clear the input for the next task
    displayTasks();
}

// ============================================
// DISPLAY: loops through the array and shows each task with a Remove button
// ============================================
function displayTasks() {
    // Clear the list first, so tasks aren't shown twice
    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        const listItem = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = tasks[i];

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = function () {
            removeTask(i);
        };

        listItem.appendChild(taskText);
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
    }
}

// ============================================
// REMOVE: takes the task out of the array by its index, then redraws the list
// ============================================
function removeTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

// ============================================
// EVENTS: run addTask() on a button click or the Enter key
// ============================================
addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
