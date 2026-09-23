// The free practice API
const API = "https://jsonplaceholder.typicode.com";

// Elements from the page
const loadUsersButton = document.getElementById("loadUsersButton");
const brokenButton = document.getElementById("brokenButton");
const statusMessage = document.getElementById("status");
const usersContainer = document.getElementById("users");
const postsSection = document.getElementById("postsSection");
const postsHeading = document.getElementById("postsHeading");
const postsList = document.getElementById("posts");

// ============================================
// SHOW STATUS: a message above the results, red if it's an error
// ============================================
function showStatus(message, isError = false) {
    statusMessage.textContent = message;
    statusMessage.classList.toggle("error", isError);
}

// ============================================
// GETJSON: fetches a URL and returns the data as a JavaScript object.
// fetch() only fails on a network error, so we check response.ok for errors like 404
// ============================================
async function getJSON(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();      // also a promise: turns the JSON text into an object
}

// ============================================
// LOAD USERS: fetches all the users and shows a card for each
// ============================================
async function loadUsers() {
    showStatus("Loading users...");
    loadUsersButton.disabled = true;
    usersContainer.textContent = "";
    postsSection.hidden = true;

    try {
        const users = await getJSON(`${API}/users`);
        console.log("Users from the API:", users);

        users.forEach(function (user) {
            const card = document.createElement("article");
            card.className = "card";

            const name = document.createElement("h3");
            name.textContent = user.name;

            const email = document.createElement("p");
            email.textContent = user.email;

            const city = document.createElement("p");
            city.textContent = user.address.city;

            const postsButton = document.createElement("button");
            postsButton.type = "button";
            postsButton.textContent = "View posts";
            postsButton.addEventListener("click", function () {
                loadPosts(user);
            });

            card.append(name, email, city, postsButton);
            usersContainer.appendChild(card);
        });

        showStatus(`Loaded ${users.length} users. Click "View posts" on any of them.`);
    } catch (error) {
        showStatus(`Couldn't load users: ${error.message}`, true);
    } finally {
        loadUsersButton.disabled = false;
    }
}

// ============================================
// LOAD POSTS: fetches one user's posts and lists them
// ============================================
async function loadPosts(user) {
    showStatus(`Loading posts by ${user.name}...`);

    try {
        const posts = await getJSON(`${API}/posts?userId=${user.id}`);
        console.log(`Posts by ${user.name}:`, posts);

        postsHeading.textContent = `Posts by ${user.name}`;
        postsList.textContent = "";

        posts.forEach(function (post) {
            const item = document.createElement("li");
            const title = document.createElement("strong");
            title.textContent = post.title;
            const body = document.createElement("p");
            body.textContent = post.body;
            item.append(title, body);
            postsList.appendChild(item);
        });

        postsSection.hidden = false;
        showStatus(`Showing ${posts.length} posts by ${user.name}.`);
        postsSection.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
        showStatus(`Couldn't load posts: ${error.message}`, true);
    }
}

// ============================================
// BROKEN REQUEST: asks for an address that doesn't exist, to show the error handling
// ============================================
async function loadBroken() {
    showStatus("Requesting a page that doesn't exist...");

    try {
        await getJSON(`${API}/this-does-not-exist`);
    } catch (error) {
        showStatus(`Error caught: ${error.message}`, true);
        console.log("The error:", error);
    }
}

// Connect the buttons
loadUsersButton.addEventListener("click", loadUsers);
brokenButton.addEventListener("click", loadBroken);
