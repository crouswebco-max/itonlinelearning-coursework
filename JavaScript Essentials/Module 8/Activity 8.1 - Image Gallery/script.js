// Adds the image from the URL box to the gallery
function addImage() {
    // Get the URL typed into the input
    const imageUrl = document.getElementById("imageUrl").value.trim();

    // Only add an image if a URL was typed
    if (imageUrl) {
        const gallery = document.getElementById("gallery");

        // A div to hold the image and its button
        const galleryItem = document.createElement("div");
        galleryItem.classList.add("gallery-item");

        // The image itself
        const image = document.createElement("img");
        image.src = imageUrl;
        image.alt = "Gallery image";

        // A button that removes this image from the gallery
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");
        removeButton.onclick = () => gallery.removeChild(galleryItem);

        // Put the image and button in the item, then the item in the gallery
        galleryItem.appendChild(image);
        galleryItem.appendChild(removeButton);
        gallery.appendChild(galleryItem);

        // Clear the input, ready for the next URL
        document.getElementById("imageUrl").value = "";
    }
}

// Run addImage() when the Add Image button is clicked
document.getElementById("addImageButton").addEventListener("click", addImage);

// Also add the image when Enter is pressed in the input
document.getElementById("imageUrl").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addImage();
    }
});
