// ============================================
// VAULT.JS: shows every entry in full-width rows (Milestone 5)
// ============================================
const vaultList = document.querySelector("#vaultList");
const emptyState = document.querySelector("#emptyState");
const sampleButton = document.querySelector("#sampleButton");
const entryCount = document.querySelector("#entryCount");

// Builds one row for the list
function createRow(entry) {
    const row = createElement("article", "vault-row");
    row.dataset.id = entry.id;

    // Date, tags and a private label
    const meta = createElement("div", "row-meta");
    meta.appendChild(createElement("span", "entry-date", formatDate(entry.createdAt)));
    entry.tags.forEach(function (tag) {
        meta.appendChild(createElement("span", "tag", tag));
    });
    if (entry.isPrivate) {
        meta.appendChild(createElement("span", "tag", "🔒 Private"));
    }
    row.appendChild(meta);

    row.appendChild(createElement("h2", "entry-title", entry.title));
    row.appendChild(createElement("p", "entry-body", entry.body));

    // Long entries are cut to 2 lines, with a button to read the rest
    if (entry.body.length > 150 || entry.body.includes("\n")) {
        const readMore = createElement("button", "read-more", "Read more");
        readMore.type = "button";
        readMore.setAttribute("aria-expanded", "false");
        row.appendChild(readMore);
    }

    // The "..." menu with a Delete option
    const moreButton = createElement("button", "more-button", "•••");
    moreButton.type = "button";
    moreButton.setAttribute("aria-label", `Options for "${entry.title}"`);
    moreButton.setAttribute("aria-expanded", "false");

    const menu = createElement("div", "row-menu");
    menu.hidden = true;
    const deleteButton = createElement("button", "delete-button", "Delete entry");
    deleteButton.type = "button";
    menu.appendChild(deleteButton);

    row.append(moreButton, menu);
    return row;
}

// Reads the entries and shows every one of them (no slice this time)
function renderAllEntries() {
    const entries = getNewestFirst();

    // Clear out the hard-coded placeholder rows
    vaultList.textContent = "";

    entryCount.textContent = entries.length === 1 ? "1 entry" : `${entries.length} entries`;
    emptyState.hidden = entries.length > 0;
    vaultList.hidden = entries.length === 0;

    entries.forEach(function (entry) {
        vaultList.appendChild(createRow(entry));
    });
}

// Removes one entry from the array and saves the array again
function deleteEntry(id) {
    const remaining = getEntries().filter(function (entry) {
        return entry.id !== id;
    });
    saveEntries(remaining);
    renderAllEntries();
}

// Closes any open "..." menu
function closeMenus() {
    vaultList.querySelectorAll(".row-menu").forEach(function (menu) {
        menu.hidden = true;
    });
    vaultList.querySelectorAll(".more-button").forEach(function (button) {
        button.setAttribute("aria-expanded", "false");
    });
}

// Event delegation: one click listener handles the buttons on every row
vaultList.addEventListener("click", function (event) {
    const row = event.target.closest(".vault-row");
    if (!row) {
        return;
    }

    // Read more / Show less
    if (event.target.closest(".read-more")) {
        const button = event.target.closest(".read-more");
        const expanded = row.classList.toggle("expanded");
        button.textContent = expanded ? "Show less" : "Read more";
        button.setAttribute("aria-expanded", expanded);
    }

    // Open or close this row's menu
    if (event.target.closest(".more-button")) {
        const button = event.target.closest(".more-button");
        const menu = row.querySelector(".row-menu");
        const wasOpen = !menu.hidden;
        closeMenus();
        menu.hidden = wasOpen;
        button.setAttribute("aria-expanded", !wasOpen);
        if (!wasOpen) {
            menu.querySelector("button").focus();
        }
    }

    // Delete, after checking
    if (event.target.closest(".delete-button")) {
        const title = row.querySelector(".entry-title").textContent;
        if (confirm(`Delete "${title}"? This can't be undone.`)) {
            deleteEntry(Number(row.dataset.id));
        } else {
            closeMenus();
        }
    }
});

// Clicking anywhere else, or pressing Escape, closes the menus
document.addEventListener("click", function (event) {
    if (!event.target.closest(".more-button, .row-menu")) {
        closeMenus();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeMenus();
    }
});

sampleButton.addEventListener("click", addSampleEntries);

renderAllEntries();
