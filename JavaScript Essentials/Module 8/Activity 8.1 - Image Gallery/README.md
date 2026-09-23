# Activity 8.1: Interactive Image Gallery

Paste an image URL and click **Add Image** (or press Enter) to add it to the gallery. Each image has a **Remove** button. Open `index.html` in a browser.

Try `https://picsum.photos/400/300` for a random photo. Add it a few times to see different pictures.

## How `addImage()` follows the steps

| Step | Code |
|---|---|
| **Get the URL** | `const imageUrl = document.getElementById("imageUrl").value.trim();` |
| **One-condition `if`** | `if (imageUrl)`: an empty input is skipped |
| **Get the gallery** | `const gallery = document.getElementById("gallery");` |
| **New gallery item** | `document.createElement("div")`, then `galleryItem.classList.add("gallery-item")` |
| **New image** | `document.createElement("img")`, then `image.src = imageUrl` |
| **Remove button** | `createElement("button")`, `textContent = "Remove"`, `classList.add("remove-button")` |
| **Arrow function on click** | `removeButton.onclick = () => gallery.removeChild(galleryItem);` |
| **Append** | The image and button go into the item with `appendChild()`, then the item goes into the gallery |
| **Clear the input** | `document.getElementById("imageUrl").value = "";` |
| **Event listener** | `document.getElementById("addImageButton").addEventListener("click", addImage);` |

## Things to notice

- **Each remove button remembers its own image.** The arrow function is made inside `addImage()`, so it keeps a link to that `galleryItem`.
- **The "No images yet" message is pure CSS.** `.gallery:empty::before` only shows when the gallery has nothing in it.
- **`object-fit: cover`** makes every image fill the same size box without stretching.
