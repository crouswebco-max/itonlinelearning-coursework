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
// GETDATA: makes an AJAX request, then calls callback(error, data)
// error is null when it works; data is null when it fails
// ============================================
function getData(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            callback(`Request failed with status ${xhr.status}`, null);
        }
    };

    xhr.onerror = function () {
        callback("Network error. Are you online?", null);
    };

    xhr.send();
}

// ============================================
// 1. A REQUEST THAT WORKS: the callback gets the user
// ============================================
document.getElementById("userButton").addEventListener("click", function () {
    startDemo();
    log("Asking for user 1...", "wait");

    getData(`${API}/users/1`, function (error, user) {
        if (error) {
            log(error, "error");
            return;
        }
        log(`Got ${user.name} from ${user.address.city}`, "success");
    });
});

// ============================================
// 2. A REQUEST THAT FAILS: user 9999 doesn't exist, so the callback gets an error
// ============================================
document.getElementById("errorButton").addEventListener("click", function () {
    startDemo();
    log("Asking for user 9999...", "wait");

    getData(`${API}/users/9999`, function (error, user) {
        if (error) {
            log(error, "error");
            return;
        }
        log(`Got ${user.name}`, "success");
    });
});

// ============================================
// 3. CALLBACK HELL: user -> their posts -> comments on the first post.
// Each request needs the one before, so each callback sits inside the last
// ============================================
document.getElementById("hellButton").addEventListener("click", function () {
    startDemo();
    log("Asking for user 2...", "wait");

    getData(`${API}/users/2`, function (error, user) {
        if (error) {
            log(error, "error");
            return;
        }
        log(`Got user: ${user.name}. Now asking for their posts...`, "success");

        getData(`${API}/posts?userId=${user.id}`, function (error, posts) {
            if (error) {
                log(error, "error");
                return;
            }
            log(`Got ${posts.length} posts. Now asking for comments on the first one...`, "success");

            getData(`${API}/comments?postId=${posts[0].id}`, function (error, comments) {
                if (error) {
                    log(error, "error");
                    return;
                }
                log(`Got ${comments.length} comments. First by ${comments[0].email}`, "success");
                log("That was 3 callbacks deep. Promises fix this.", "wait");
            });
        });
    });
});
