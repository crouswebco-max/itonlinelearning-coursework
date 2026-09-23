// ============================================
// HELPER: shows each message on the page and in the console,
// with the time since the button was clicked, so you can see the order things happen in
// ============================================
const output = document.getElementById("output");
let startTime = Date.now();

// Clears the output and restarts the timer
function startDemo() {
    output.textContent = "";
    startTime = Date.now();
}

// type can be "", "success", "error" or "wait" (it changes the colour)
function log(message, type = "") {
    const ms = Date.now() - startTime;

    const line = document.createElement("li");
    const time = document.createElement("span");
    time.className = "time";
    time.textContent = `[${String(ms).padStart(5, " ")} ms] `;

    const text = document.createElement("span");
    text.className = type;
    text.textContent = message;

    line.append(time, text);
    output.appendChild(line);
    console.log(`[${ms} ms] ${message}`);
}

// The free practice API used in these examples
const API = "https://jsonplaceholder.typicode.com";

// ============================================
// 1. SYNCHRONOUS CODE: each line finishes before the next one starts
// ============================================
document.getElementById("syncButton").addEventListener("click", function () {
    startDemo();
    log("1. First line");
    log("2. Second line");
    log("3. Third line. Always in order, one after another.", "success");
});

// ============================================
// 2. AN AJAX REQUEST: asynchronous, so JavaScript doesn't wait for it
// ============================================
document.getElementById("ajaxButton").addEventListener("click", function () {
    startDemo();
    log("1. Before the request");

    // Create the request and say what to get
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API}/users/1`);

    // onload runs LATER, when the server answers
    xhr.onload = function () {
        if (xhr.status === 200) {
            // The answer arrives as text, so turn it into an object
            const user = JSON.parse(xhr.responseText);
            log(`3. The data arrived: ${user.name}, ${user.email}`, "success");
        } else {
            log(`3. The server answered with an error: status ${xhr.status}`, "error");
        }
    };

    // onerror runs if there's no connection at all
    xhr.onerror = function () {
        log("The request failed. Are you online?", "error");
    };

    xhr.send();
    log("2. After send(). This ran before the data arrived!", "wait");
});

// ============================================
// 3. READYSTATE: the stages of a request, from 1 (opened) to 4 (done)
// ============================================
document.getElementById("stateButton").addEventListener("click", function () {
    startDemo();

    const stages = {
        1: "OPENED: open() has been called",
        2: "HEADERS_RECEIVED: the server has started answering",
        3: "LOADING: the data is downloading",
        4: "DONE: the request is complete"
    };

    const xhr = new XMLHttpRequest();

    // Runs every time readyState changes
    xhr.onreadystatechange = function () {
        log(`readyState ${xhr.readyState}: ${stages[xhr.readyState]}`, xhr.readyState === 4 ? "success" : "wait");

        if (xhr.readyState === 4 && xhr.status === 200) {
            const post = JSON.parse(xhr.responseText);
            log(`Post title: "${post.title}"`, "success");
        }
    };

    xhr.open("GET", `${API}/posts/1`);
    xhr.send();
});
