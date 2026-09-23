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
// GETDATA: makes an AJAX request and returns a PROMISE.
// resolve() when the data arrives, reject() if it fails
// ============================================
function getData(url) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);

        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(`Request failed with status ${xhr.status}`);
            }
        };

        xhr.onerror = function () {
            reject("Network error. Are you online?");
        };

        xhr.send();
    });
}

// ============================================
// 1. AWAIT: the function pauses on the await line until the user arrives
// ============================================
async function getUser() {
    startDemo();
    log("Asking for user 1...", "wait");

    const user = await getData(`${API}/users/1`);
    log(`Got ${user.name} from ${user.address.city}`, "success");
}

document.getElementById("userButton").addEventListener("click", getUser);

// ============================================
// 2. TRY / CATCH: a rejected promise jumps straight to catch
// ============================================
async function getMissingUser() {
    startDemo();
    log("Asking for user 9999...", "wait");

    try {
        const user = await getData(`${API}/users/9999`);
        log(`Got ${user.name}`, "success");      // skipped, because the line above failed
    } catch (error) {
        log(`Caught an error: ${error}`, "error");
    } finally {
        log("Finally: this runs either way.");
    }
}

document.getElementById("errorButton").addEventListener("click", getMissingUser);

// ============================================
// 3. USER -> POSTS -> COMMENTS: the same chain as the Promises example,
// but it reads like normal code, top to bottom
// ============================================
async function getUserPostsAndComments() {
    startDemo();

    try {
        log("Asking for user 2...", "wait");
        const user = await getData(`${API}/users/2`);
        log(`Got user: ${user.name}`, "success");

        const posts = await getData(`${API}/posts?userId=${user.id}`);
        log(`Got ${posts.length} posts`, "success");

        const comments = await getData(`${API}/comments?postId=${posts[0].id}`);
        log(`Got ${comments.length} comments. First by ${comments[0].email}`, "success");
    } catch (error) {
        log(`Something went wrong: ${error}`, "error");
    }
}

document.getElementById("chainButton").addEventListener("click", getUserPostsAndComments);

// ============================================
// 4. ONE AFTER ANOTHER: each await waits for the request before it
// ============================================
async function getUsersInSequence() {
    startDemo();

    try {
        for (let id = 1; id <= 3; id++) {
            const user = await getData(`${API}/users/${id}`);
            log(`Got user ${id}: ${user.name}`, "success");
        }
        log(`One after another took ${Date.now() - startTime} ms. Now try "All at once".`, "wait");
    } catch (error) {
        log(`Something went wrong: ${error}`, "error");
    }
}

document.getElementById("sequenceButton").addEventListener("click", getUsersInSequence);

// ============================================
// 5. ALL AT ONCE: start every request, then await them together
// ============================================
async function getUsersInParallel() {
    startDemo();

    try {
        const users = await Promise.all([
            getData(`${API}/users/1`),
            getData(`${API}/users/2`),
            getData(`${API}/users/3`)
        ]);

        users.forEach(function (user) {
            log(`Got user ${user.id}: ${user.name}`, "success");
        });
        log(`All at once took ${Date.now() - startTime} ms, usually faster than one after another.`, "wait");
    } catch (error) {
        log(`Something went wrong: ${error}`, "error");
    }
}

document.getElementById("parallelButton").addEventListener("click", getUsersInParallel);
