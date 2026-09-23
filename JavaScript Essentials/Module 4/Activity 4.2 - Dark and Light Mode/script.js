// Elements the toggle button changes
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");

// Switches the page to dark or light mode and updates the button to match
function setTheme(isDark) {
    // Adding or removing this class swaps all the colours in styles.css
    document.body.classList.toggle("dark-mode", isDark);

    // Change the button's icon and text to show the OTHER mode
    themeIcon.textContent = isDark ? "☀️" : "🌙";
    themeLabel.textContent = isDark ? "Light mode" : "Dark mode";

    // Tell screen readers whether dark mode is on
    themeToggle.setAttribute("aria-pressed", isDark);
}

// Remembers the chosen mode for next time (fails quietly if storage is blocked)
function saveTheme(isDark) {
    try {
        localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (error) {
        console.log("Could not save the theme:", error);
    }
}

// Works out which mode to start in: the saved choice, or the computer's setting
function getStartingTheme() {
    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem("theme");
    } catch (error) {
        console.log("Could not read the saved theme:", error);
    }

    if (savedTheme === "dark") {
        return true;
    }
    if (savedTheme === "light") {
        return false;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// Flip to the other mode when the button is clicked
themeToggle.addEventListener("click", function () {
    const isDark = document.body.classList.contains("dark-mode");
    setTheme(!isDark);
    saveTheme(!isDark);
});

// Set the starting mode when the page loads
setTheme(getStartingTheme());
