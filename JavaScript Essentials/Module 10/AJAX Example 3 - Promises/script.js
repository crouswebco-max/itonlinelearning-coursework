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
// 1. A PROMISE THAT RESOLVES: .then() runs
// ============================================
document.getElementById("userButton").addEventListener("click", function () {
    startDemo();
    log("Asking for user 1. The promise is pending...", "wait");

    getData(`${API}/users/1`)
        .then(function (user) {
            log(`Fulfilled: got ${user.name} from ${user.address.city}`, "success");
        })
        .catch(function (error) {
            log(`Rejected: ${error}`, "error");
        })
        .finally(function () {
            log("Finally: this runs either way.");
        });

    log("This line ran while the promise was still pending.");
});

// ============================================
// 2. A PROMISE THAT REJECTS: user 9999 doesn't exist, so .catch() runs
// ============================================
document.getElementById("errorButton").addEventListener("click", function () {
    startDemo();
    log("Asking for user 9999...", "wait");

    getData(`${API}/users/9999`)
        .then(function (user) {
            log(`Fulfilled: got ${user.name}`, "success");
        })
        .catch(function (error) {
            log(`Rejected: ${error}`, "error");
        })
        .finally(function () {
            log("Finally: this runs either way.");
        });
});

// ============================================
// 3. CHAINING: user -> posts -> comments, the same as callback hell but flat.
// Returning a promise from .then() passes its result to the next .then()
// ============================================
document.getElementById("chainButton").addEventListener("click", function () {
    startDemo();
    log("Asking for user 2...", "wait");

    getData(`${API}/users/2`)
        .then(function (user) {
            log(`Got user: ${user.name}. Now asking for their posts...`, "success");
            return getData(`${API}/posts?userId=${user.id}`);
        })
        .then(function (posts) {
            log(`Got ${posts.length} posts. Now asking for comments on the first one...`, "success");
            return getData(`${API}/comments?postId=${posts[0].id}`);
        })
        .then(function (comments) {
            log(`Got ${comments.length} comments. First by ${comments[0].email}`, "success");
        })
        .catch(function (error) {
            // One .catch() handles an error from ANY step above
            log(`The chain stopped: ${error}`, "error");
        });
});

// ============================================
// 4. PROMISE.ALL: send three requests at once, wait for all of them
// ============================================
document.getElementById("allButton").addEventListener("click", function () {
    startDemo();
    log("Asking for users 1, 2 and 3 at the same time...", "wait");

    Promise.all([
        getData(`${API}/users/1`),
        getData(`${API}/users/2`),
        getData(`${API}/users/3`)
    ])
        .then(function (users) {
            const names = users.map(function (user) {
                return user.name;
            });
            log(`All three arrived: ${names.join(", ")}`, "success");
        })
        .catch(function (error) {
            log(`One failed, so Promise.all failed: ${error}`, "error");
        });
});
