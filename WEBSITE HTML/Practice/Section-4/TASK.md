# Section 4: Semantic HTML, Flexbox and Grid

**Practises:** Module 4 (`header`, `main`, `section`, `article`, `aside`, `footer`, a fixed header, flexbox, grid, a phone layout)

The starter files here are the finished Section 3 site. The `images` folder has four new photos: `barista.jpg`, `breakfast.jpg`, `cookies.jpg` and `cafe-inside.jpg`.

## Part 1: Header, main and footer (all three pages)

1. Wrap the `<nav>` in a `<header>`. Inside the header, above the nav, add a logo link:

   ```html
   <a href="index.html" class="logo">☕ Sunny Side Café</a>
   ```

2. Change `<div class="content">` to `<main>`, and don't forget to change the closing `</div>` to `</main>` as well.
3. Below `</main>`, add a `<footer>` with:
   - the copyright line `&copy; 2026 Sunny Side Café. All rights reserved.`
   - a `<ul class="social-links">` with links to Instagram, Facebook and TikTok, each opening in a new tab

## Part 2: Home page layout (`index.html`)

4. Inside `<main>`, wrap the existing content in `<section class="hero">`.
5. After the hero, add `<section class="favourites">` containing:
   - an `<h2>` "Customer Favourites"
   - a `<div class="card-grid">` holding three `<article class="card">`s
   - in each card: an `<img>` (`barista.jpg`, `breakfast.jpg`, `cookies.jpg`), an `<h3>` and a short `<p>`
6. After the favourites section (still inside `<main>`), add an `<aside class="info-box">` with an `<h2>` "Opening Hours" and a `<ul>` of the hours.

## Part 3: The other pages

7. `menu.html`: change each `<div class="menu-item">` to `<article class="menu-item">`.
8. `contact.html`:
   - add `cafe-inside.jpg` under the intro paragraph
   - change `<div class="contact-details">` to a `<section>` with an `<h2>` "Get in Touch"
   - put the details in an `<address>`, with a `<br>` at the end of each line
   - move the opening hours into an `<aside class="info-box">`

## Part 4: CSS (`style.css`)

9. `header`:
   - pin it to the top: `position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;`
   - lay it out in a row: `display: flex; justify-content: space-between; align-items: center;`
   - `padding: 15px 30px;`
   - give it the brown background, moving that rule from `nav` (you can delete the `nav` rule)
10. `.logo`: white, no underline, Montserrat, `font-size: 22px;` and bold.
11. `nav ul`: change `padding` to `0`, because the header has the padding now.
12. `body`: add `padding-top: 80px;`. A fixed header floats over the page, so this stops it covering your heading.
13. `main`: `max-width: 1000px; margin: 0 auto; padding: 20px;`. Delete the old `.content` rule.
14. `.card-grid`: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;`
15. `.card`: white background, `border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);`
16. `.card img`: `display: block; width: 100%; height: 180px; object-fit: cover; border-radius: 0;`
    - `object-fit: cover` fills the box without squashing the photo.
17. `.card h3, .card p`: `padding: 0 15px;`
18. `.info-box`: white background, `padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 5px solid #b5651d;`
19. `address`: `font-style: normal; font-size: 18px;`. Addresses are italic unless you change them.
20. Footer:
    - `footer`: brown background, white text, `text-align: center; padding: 20px;`
    - `footer p`: colour `white`. Without this, your `p` rule turns the footer text grey.
    - `footer ul`: no bullets, `padding: 0;`, and a centred flex row with `gap: 20px;`
    - `footer a`: colour `#ffd27f`
21. Phone layout. Add this at the bottom of the file:

    ```css
    @media (max-width: 700px) {
      header {
        position: sticky;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
      }

      body {
        padding-top: 0;
      }

      nav ul {
        flex-wrap: wrap;
        gap: 10px 20px;
      }

      .card-grid {
        grid-template-columns: 1fr;
      }

      h1 {
        font-size: 36px;
      }
    }
    ```

    On a phone the header stacks and gets taller. `sticky` still keeps it at the top while you scroll, but unlike `fixed` it doesn't float over the page, so nothing gets covered.

    To test it, press **Cmd+Option+I** in Chrome, then click the phone icon.

## Bug hunt

```css
/* A: the border doesn't show */
.info-box { border: #b5651d; }

/* B: the bottom padding is 10px, not 5px */
nav a { padding-bottom: 5px; padding: 10px 0; }

/* C: the cards stay stacked instead of making 3 columns */
.card-grid { grid-template-columns: repeat(3, 1fr); }

/* D: the menu links vanish when you hover over them */
nav a:hover { color: #4b2e1e; }
```

<details>
<summary>Show the answers</summary>

- **A:** A border needs a width, a style and a colour: `border: 2px solid #b5651d;`
- **B:** The `padding` shorthand comes second, so it replaces `padding-bottom`. Put `padding-bottom` after it.
- **C:** `grid-template-columns` only works once the element is a grid. Add `display: grid;`
- **D:** That's the same brown as the header, so the text disappears. Use a light colour such as `#ffd27f`.

</details>

## Check your work

- [ ] The header stays at the top when you scroll, and doesn't cover the page heading
- [ ] The three favourite cards sit side by side on a computer and stack on a phone
- [ ] The footer shows on all three pages
- [ ] Nothing scrolls sideways at phone size

When you're done, compare your work with the `solution/` folder.
