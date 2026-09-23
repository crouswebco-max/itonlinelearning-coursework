// ============================================
// NEW-ENTRY.JS: reads the form and saves a new entry to localStorage
// ============================================

// Milestone 2: select the form and the Save Entry button with querySelector
const form = document.querySelector("#entryForm");
const saveButton = document.querySelector("#saveButton");

const titleInput = document.querySelector("#entryTitle");
const bodyInput = document.querySelector("#entryBody");
const dateText = document.querySelector("#entryDate");
const tagList = document.querySelector("#tagList");
const addTagButton = document.querySelector("#addTagButton");
const tagInput = document.querySelector("#tagInput");
const memoryButton = document.querySelector("#memoryButton");
const privateButton = document.querySelector("#privateButton");
const discardButton = document.querySelector("#discardButton");
const formMessage = document.querySelector("#formMessage");

// The tags on this entry. "Thoughtful" is there to start with, like in the design
let tags = ["Thoughtful"];
let isPrivate = false;

// Writing prompts used by the "Insert Memory" button
const memoryPrompts = [
    "A small moment from today I want to remember:",
    "Something that surprised me recently:",
    "A place that made me feel calm:",
    "Someone I'm grateful for, and why:",
    "What I learned this week:"
];

// ============================================
// SHOW TODAY'S DATE, e.g. "Wednesday, May 22, 2024"
// ============================================
dateText.textContent = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
});

// ============================================
// MESSAGES: green for success, red for errors
// ============================================
function showMessage(text, isError = false) {
    formMessage.textContent = text;
    formMessage.classList.toggle("error", isError);
}

// ============================================
// TAGS: draws the tag chips. Clicking a chip removes that tag
// ============================================
function renderTags() {
    tagList.textContent = "";

    tags.forEach(function (tag, index) {
        const item = document.createElement("li");
        const chip = createElement("button", "chip");
        chip.type = "button";
        chip.setAttribute("aria-label", `Remove tag ${tag}`);
        chip.append(tag, createElement("span", "remove", "×"));

        chip.addEventListener("click", function () {
            tags.splice(index, 1);
            renderTags();
            addTagButton.focus();
        });

        item.appendChild(chip);
        tagList.appendChild(item);
    });
}

// "+ Add Tag" swaps the button for a small input
addTagButton.addEventListener("click", function () {
    addTagButton.hidden = true;
    tagInput.hidden = false;
    tagInput.focus();
});

// Adds the typed tag (if it's new) and swaps the input back to the button
function finishAddingTag() {
    const newTag = tagInput.value.trim();

    if (newTag !== "" && !tags.includes(newTag) && tags.length < 5) {
        tags.push(newTag);
        renderTags();
    } else if (tags.length >= 5) {
        showMessage("An entry can have up to 5 tags.", true);
    }

    tagInput.value = "";
    tagInput.hidden = true;
    addTagButton.hidden = false;
}

tagInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();          // stop Enter from saving the whole form
        finishAddingTag();
        addTagButton.focus();
    } else if (event.key === "Escape") {
        tagInput.value = "";
        finishAddingTag();
        addTagButton.focus();
    }
});

tagInput.addEventListener("blur", finishAddingTag);

// ============================================
// INSERT MEMORY: adds a random writing prompt to the reflection
// ============================================
memoryButton.addEventListener("click", function () {
    const prompt = memoryPrompts[Math.floor(Math.random() * memoryPrompts.length)];
    const gap = bodyInput.value.trim() === "" ? "" : "\n\n";
    bodyInput.value = bodyInput.value.trimEnd() + gap + prompt + " ";
    bodyInput.focus();
});

// ============================================
// PRIVATE: marks the entry as private, so the home page hides its text
// ============================================
privateButton.addEventListener("click", function () {
    isPrivate = !isPrivate;
    privateButton.setAttribute("aria-pressed", isPrivate);
    showMessage(isPrivate ? "This entry will be private: its text won't show on the home page." : "");
});

// ============================================
// DISCARD: clears the form (after asking, if something was written) and goes home
// ============================================
discardButton.addEventListener("click", function () {
    const hasText = titleInput.value.trim() !== "" || bodyInput.value.trim() !== "";

    if (hasText && !confirm("Discard this entry? What you've written will be lost.")) {
        return;
    }

    form.reset();
    window.location.href = "index.html";
});

// ============================================
// SAVE ENTRY (Milestones 2 and 3)
// ============================================
saveButton.addEventListener("click", function (event) {
    // Stop the form from reloading the page
    event.preventDefault();

    // Milestone 2: pull the text out of the inputs with .value and log it
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();
    console.log("Title:", title);
    console.log("Reflection:", body);

    // The reflection can't be empty
    if (body === "") {
        showMessage("Please write your reflection before saving.", true);
        bodyInput.focus();
        return;
    }

    // Milestone 3: build the entry object and push it into the array
    const entry = {
        id: Date.now(),
        title: title || "Untitled Reflection",
        body: body,
        tags: tags,
        isPrivate: isPrivate,
        createdAt: new Date().toISOString()
    };

    const entries = getEntries();
    entries.push(entry);

    // Save the whole array back to localStorage as a string
    if (!saveEntries(entries)) {
        showMessage("Sorry, your entry couldn't be saved. Your browser may be blocking storage.", true);
        return;
    }

    console.log("Saved. All entries:", entries);
    saveButton.disabled = true;
    showMessage("Entry saved! Taking you back to your reflections...");

    setTimeout(function () {
        window.location.href = "index.html";
    }, 900);
});

renderTags();
