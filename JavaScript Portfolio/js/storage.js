// ============================================
// STORAGE.JS: shared by all three pages
// localStorage is shared by every page on the same site, so an entry saved
// on new-entry.html can be read on index.html and vault.html
// ============================================

// The key the entries are saved under in localStorage
const STORAGE_KEY = "entries";

// Reads the entries array. localStorage only holds strings, so JSON.parse turns
// the saved text back into an array. Returns [] if nothing is saved or the data is broken
function getEntries() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(saved) ? saved : [];
    } catch (error) {
        console.error("Could not read the saved entries:", error);
        return [];
    }
}

// Saves the entries array. JSON.stringify turns it into a string first.
// Returns true if it worked, false if storage is full or blocked
function saveEntries(entries) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
        return true;
    } catch (error) {
        console.error("Could not save the entries:", error);
        return false;
    }
}

// Returns a copy of the entries with the newest first, sorted by the date they were written
function getNewestFirst() {
    return getEntries().sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
}

// Turns a saved date into text like "March 24, 2026"
function formatDate(isoDate) {
    return new Date(isoDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}

// Creates an element with a class and text in one step.
// textContent is used (not innerHTML) so anything the user typed shows as plain text
function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    if (text !== undefined) {
        element.textContent = text;
    }
    return element;
}

// Builds a <ul> of tag labels for an entry
function createTagList(tags) {
    const list = createElement("ul", "tags");
    tags.forEach(function (tagText) {
        const item = createElement("li");
        item.appendChild(createElement("span", "tag", tagText));
        list.appendChild(item);
    });
    return list;
}

// ============================================
// SAMPLE ENTRIES: the examples from the design, so the pages can be tried
// without typing lots of entries first. Only offered when the vault is empty
// ============================================
const SAMPLE_ENTRIES = [
    {
        title: "The Simple Joy of a Perfect Peach",
        body: "It's the small things that anchor us. Today it was a peach from the farmer's market. Sweet, sun-warmed, and heavy with juice. A reminder that beauty doesn't need to be profound to be important.",
        tags: ["Gratitude"],
        createdAt: "2023-08-12T09:00:00"
    },
    {
        title: "Fragmented Dreams",
        body: "There was a library with no books, only clocks. Each one ticked at a different speed, a cacophony of time passing all at once. I woke up with the sound of a pendulum still ringing in my ears.",
        tags: ["Morning"],
        createdAt: "2023-09-30T07:30:00"
    },
    {
        title: "Kyoto's Golden Hour",
        body: "Walking through the Arashiyama bamboo grove. The light filtering through the stalks felt like being inside a green cathedral. I must remember the specific smell of the air after the mist cleared.",
        tags: ["Idea", "Travel"],
        createdAt: "2023-10-18T17:45:00"
    },
    {
        title: "The Weight of Silence",
        body: "Today the city felt quieter than usual. I sat by the window and watched the rain trace patterns on the glass, wondering if the thoughts we keep hidden are the ones that define us most.",
        tags: ["Reflection"],
        createdAt: "2023-10-24T20:10:00"
    },
    {
        title: "The rain in the city.",
        body: "The way the neon lights reflect on the wet pavement tonight is mesmerizing.",
        tags: ["Poetry"],
        createdAt: "2025-08-21T22:00:00"
    },
    {
        title: "Notes on intentionality and the digital space.",
        body: "Why do we feel the need to document everything? Perhaps it's an anchor against the fleeting nature of time. If we don't write it down, did it really happen in the way we remember? Memory is a fluid thing, reshaped by our current emotions.",
        tags: ["Reflection"],
        createdAt: "2025-08-23T10:15:00"
    },
    {
        title: "Rethinking the project architecture.",
        body: "Spent the afternoon sketching out new user flows. Simplification is harder than complexity.",
        tags: ["Work", "Ideas"],
        createdAt: "2025-12-25T15:00:00"
    },
    {
        title: "The silence of the early morning is where the best ideas are born.",
        body: "I woke up at 5:00 AM today. There is a specific kind of stillness that exists before the city wakes up. It feels like the world is holding its breath. I spent an hour just watching the light change from a deep indigo to a soft, hazy gold.",
        tags: ["Thoughtful"],
        createdAt: "2026-03-24T05:30:00"
    }
];

// Adds the sample entries to storage, then reloads the page to show them
function addSampleEntries() {
    const entries = getEntries();

    SAMPLE_ENTRIES.forEach(function (sample, index) {
        entries.push({
            id: Date.now() + index,
            title: sample.title,
            body: sample.body,
            tags: sample.tags,
            isPrivate: false,
            createdAt: new Date(sample.createdAt).toISOString()
        });
    });

    saveEntries(entries);
    location.reload();
}
