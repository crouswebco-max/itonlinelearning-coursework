// This is an external JavaScript file.
// index.html loads it with <script src="script.js" defer></script>

// 1. Log a message to the browser console (F12 > Console)
console.log("script.js has loaded!");

// 2. Change text on the page
document.getElementById("greeting").textContent = "Hello! This sentence was written by script.js.";

// 3. Show today's date
const today = new Date();
document.getElementById("today").textContent = "Today is " + today.toDateString() + ".";

// 4. React to a button click
let clicks = 0;

document.getElementById("clickButton").addEventListener("click", function () {
    clicks = clicks + 1;
    document.getElementById("clickCount").textContent = "You have clicked " + clicks + " time(s).";
    console.log("Button clicked. Total clicks:", clicks);
});
