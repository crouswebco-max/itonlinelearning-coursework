// ============================================
// HOME.JS: shows the 5 most recent entries as cards (Milestone 4)
// ============================================
const entryGrid = document.querySelector("#entryGrid");
const emptyState = document.querySelector("#emptyState");
const sampleButton = document.querySelector("#sampleButton");
const viewAll = document.querySelector("#viewAll");
const totalCount = document.querySelector("#totalCount");

// Builds one card for the grid
function createCard(entry) {
    const card = createElement("article", "entry-card");

    card.appendChild(createElement("p", "entry-date", formatDate(entry.createdAt)));
    card.appendChild(createElement("h2", "entry-title", entry.title));

    // Private entries keep their text hidden on the home page
    if (entry.isPrivate) {
        card.appendChild(createElement("p", "entry-body private-note", "🔒 This entry is private. Open the Vault to read it."));
    } else {
        card.appendChild(createElement("p", "entry-body", entry.body));
    }

    if (entry.tags.length > 0) {
        card.appendChild(createTagList(entry.tags));
    }

    return card;
}

// Reads the entries, then shows the newest 5
function renderRecentEntries() {
    // Get the saved entries, newest first (JSON.parse happens inside getEntries)
    const entries = getNewestFirst();

    // Clear out the hard-coded placeholder cards
    entryGrid.textContent = "";

    if (entries.length === 0) {
        emptyState.hidden = false;
        entryGrid.hidden = true;
        return;
    }

    // Only the 5 most recent
    const recentEntries = entries.slice(0, 5);

    // Loop through them and add a card for each
    recentEntries.forEach(function (entry) {
        entryGrid.appendChild(createCard(entry));
    });

    // If there are more than 5, link to the full vault
    if (entries.length > 5) {
        totalCount.textContent = entries.length;
        viewAll.hidden = false;
    }
}

sampleButton.addEventListener("click", addSampleEntries);

renderRecentEntries();
