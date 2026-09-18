# Section 6: Maps with iframes, and a Little JavaScript

**Practises:** Module 6 (`iframe` and its attributes, a responsive map box, buttons with `onclick`, a `<script>`)

The starter files here are the finished Section 5 site.

## Part 1: New page

1. Create `find-us.html`: copy `contact.html`, delete everything inside `<main>`, and change the title to `Find Us | Sunny Side Café`.
2. Add a **Find Us** link to the menu on **all five** pages, between Book a Table and Contact.
3. On `contact.html`, add: `<p>Not sure where we are? <a href="find-us.html">See the map</a>.</p>`

## Part 2: The map (`find-us.html`)

4. Inside `<main>`, add an `<h1>` "Find Us", an `<hr />` and a paragraph that explains what the map shows.
5. Add a `<div class="map-container">`, and put this `<iframe>` inside it:

   ```html
   <iframe src="https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1sCovent+Garden+Piazza,+London+WC2E"
     title="Map showing Sunny Side Café in Covent Garden"
     width="600"
     height="450"
     loading="lazy"
     allowfullscreen=""
     referrerpolicy="no-referrer-when-downgrade"
     sandbox="allow-scripts allow-same-origin allow-popups">
     <p>Your browser can't show the map. <a href="https://www.google.com/maps/search/?api=1&query=Covent+Garden+Piazza,+London">Open it in Google Maps</a>.</p>
   </iframe>
   ```

   What the attributes do:
   - `title` tells screen reader users what the frame shows.
   - `loading="lazy"` waits to load the map until you scroll near it.
   - `sandbox` limits what the embedded page is allowed to do.
   - `referrerpolicy` controls what your page tells Google about where the visitor came from.

6. Under the map, add a `<div class="map-controls">` containing two buttons:

   ```html
   <button onclick="reloadMap()">Reload Map</button>
   <button onclick="showFullscreen()">Fullscreen</button>
   ```

7. Add an `<aside class="info-box">` with an `<h2>` "Getting Here" and a short list:
   - **Tube:** Covent Garden (Piccadilly line) or Leicester Square
   - **Bus:** several routes stop along the Strand
8. Just before `</body>`, add the script:

   ```html
   <script>
     function reloadMap() {
       const map = document.querySelector('.map-container iframe');
       map.src = map.src;
     }

     function showFullscreen() {
       const map = document.querySelector('.map-container iframe');
       if (map.requestFullscreen) {
         map.requestFullscreen();
       }
     }
   </script>
   ```

   `document.querySelector` finds the map on the page. Setting `src` to itself makes the map load again.

## Part 3: CSS

9. `.map-container`:
   - `position: relative; width: 100%; height: 0;`
   - `padding-bottom: 56.25%;`, which keeps the box widescreen (16:9)
   - `margin: 20px 0; overflow: hidden;`, rounded corners and a shadow
10. `.map-container iframe`: `position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;`
11. `.map-controls`: `display: flex; gap: 10px;`. Style `.map-controls button` like your Book Table button, including the hover colour.
12. Inside your `@media (max-width: 700px)` block, add `.map-container { padding-bottom: 75%; }` so the map is taller on phones.

## Bonus

- Move the script into a new file called `script.js`, and link it with `<script src="script.js"></script>`.
- Add a second map, from OpenStreetMap, under the first one:

  ```html
  <div class="map-container">
    <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1290%2C51.5090%2C-0.1190%2C51.5145&amp;layer=mapnik&amp;marker=51.5117%2C-0.1240"
      title="OpenStreetMap of Covent Garden"
      loading="lazy"></iframe>
  </div>
  ```

  Then think about this: which map do the Reload and Fullscreen buttons control now?

## Bug hunt

```html
<!-- A: clicking the button does nothing. The Console (Cmd+Option+J) says "reloadmap is not defined" -->
<button onclick="reloadmap()">Reload Map</button>

<!-- B: the map is just a blank box -->
<iframe src="https://www.google.com/maps/embed?..." sandbox=""></iframe>

<!-- C: a screen reader just says "frame" -->
<iframe src="https://www.google.com/maps/embed?..."></iframe>
```

```css
/* D: the map is a small box in the top corner of the big space */
.map-container { position: relative; height: 0; padding-bottom: 56.25%; }
.map-container iframe { border: none; }
```

<details>
<summary>Show the answers</summary>

- **A:** JavaScript is case-sensitive, so `reloadmap` isn't the same as `reloadMap`.
- **B:** An empty `sandbox` blocks everything, including the scripts the map needs. Allow them: `sandbox="allow-scripts allow-same-origin allow-popups"`.
- **C:** The iframe has no `title`. Add one, e.g. `title="Map of Sunny Side Café"`.
- **D:** The iframe needs `position: absolute; top: 0; left: 0; width: 100%; height: 100%;` to fill the box.
- **Bonus question:** `querySelector` only finds the *first* match, so the buttons still control the Google map.

</details>

## Check your work

- [ ] "Find Us" is in the menu on all five pages
- [ ] The map loads and shows Covent Garden
- [ ] **Reload Map** reloads it, and **Fullscreen** makes it fill the screen (press Esc to leave)
- [ ] The map keeps its shape when you resize the window, and gets taller at phone size

When you're done, compare your work with the `solution/` folder.
