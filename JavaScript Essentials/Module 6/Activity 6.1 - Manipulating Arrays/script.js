// The array that every button changes
let array = [];

// Elements from the page
const elementInput = document.getElementById("elementInput");
const indexInput = document.getElementById("indexInput");
const arrayElements = document.getElementById("arrayElements");
const arrayLength = document.getElementById("arrayLength");
const arrayCode = document.getElementById("arrayCode");
const message = document.getElementById("message");

// Shows a success message, or a red error message
function showMessage(text, isError = false) {
    message.textContent = text;
    message.classList.toggle("error", isError);
}

// Gets the typed value, or shows an error and returns null if it's empty
function getInputValue() {
    const element = elementInput.value.trim();
    if (element === "") {
        showMessage("Please type a value first.", true);
        elementInput.focus();
        return null;
    }
    return element;
}

// push(): adds the typed value to the end of the array
function addElement() {
    const element = getInputValue();
    if (element === null) {
        return;
    }
    array.push(element);
    elementInput.value = "";
    showMessage(`push(): added "${element}" to the end.`);
    displayArray();
}

// unshift(): adds the typed value to the start of the array
function addFirstElement() {
    const element = getInputValue();
    if (element === null) {
        return;
    }
    array.unshift(element);
    elementInput.value = "";
    showMessage(`unshift(): added "${element}" to the start.`);
    displayArray();
}

// pop(): removes the last element
function removeLastElement() {
    if (array.length === 0) {
        showMessage("The array is empty, so there's nothing to remove.", true);
        return;
    }
    const removed = array.pop();
    showMessage(`pop(): removed "${removed}" from the end.`);
    displayArray();
}

// shift(): removes the first element
function removeFirstElement() {
    if (array.length === 0) {
        showMessage("The array is empty, so there's nothing to remove.", true);
        return;
    }
    const removed = array.shift();
    showMessage(`shift(): removed "${removed}" from the start.`);
    displayArray();
}

// splice(): removes the element at a given index
function removeElement(index) {
    if (array.length === 0) {
        showMessage("The array is empty, so there's nothing to remove.", true);
        return;
    }
    if (!Number.isInteger(index) || index < 0 || index >= array.length) {
        showMessage(`Index must be a whole number from 0 to ${array.length - 1}.`, true);
        return;
    }
    const removed = array.splice(index, 1);
    showMessage(`splice(${index}, 1): removed "${removed[0]}".`);
    displayArray();
}

// Reads the index box and removes that element
function removeAtTypedIndex() {
    if (indexInput.value === "") {
        showMessage("Please type an index first.", true);
        indexInput.focus();
        return;
    }
    removeElement(Number(indexInput.value));
    indexInput.value = "";
}

// forEach(): shows every element of the array on the page
function displayArray() {
    arrayElements.textContent = "";

    if (array.length === 0) {
        const empty = document.createElement("p");
        empty.className = "empty";
        empty.textContent = "The array is empty.";
        arrayElements.appendChild(empty);
    }

    array.forEach(function (value, index) {
        const row = document.createElement("div");
        row.className = "element";

        const text = document.createElement("span");
        text.textContent = `Element ${index + 1}: ${value} `;

        const indexLabel = document.createElement("span");
        indexLabel.className = "index";
        indexLabel.textContent = `(index ${index})`;
        text.appendChild(indexLabel);

        // Each element gets its own remove button, which uses splice()
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "danger";
        removeButton.textContent = "Remove";
        removeButton.setAttribute("aria-label", `Remove element ${index + 1}, ${value}`);
        removeButton.addEventListener("click", function () {
            removeElement(index);
        });

        row.append(text, removeButton);
        arrayElements.appendChild(row);
    });

    arrayLength.textContent = array.length;
    arrayCode.textContent = JSON.stringify(array);
}

// Connect the buttons to their functions
document.getElementById("addLastButton").addEventListener("click", addElement);
document.getElementById("addFirstButton").addEventListener("click", addFirstElement);
document.getElementById("removeLastButton").addEventListener("click", removeLastElement);
document.getElementById("removeFirstButton").addEventListener("click", removeFirstElement);
document.getElementById("removeAtButton").addEventListener("click", removeAtTypedIndex);

// Pressing Enter in the value box adds to the end
elementInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addElement();
    }
});

// Pressing Enter in the index box removes at that index
indexInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        removeAtTypedIndex();
    }
});

displayArray();
