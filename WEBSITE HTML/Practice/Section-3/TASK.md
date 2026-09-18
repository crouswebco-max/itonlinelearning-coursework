# Section 3: Pages, Navigation and Text Formatting

**Practises:** Module 3 (multiple pages, a menu bar, `div`s, classes, `<strong>` / `<em>` / `<span>`, Google Fonts, hover effects)

The starter files here are the finished Section 2 café page, so you can start fresh. If you'd rather keep building on your own version, copy your Section 2 files in here instead.

## Part 1: New pages

1. Create `menu.html` and `contact.html` in this folder. Copy the top of `index.html` (from `<!doctype html>` down to `<body>`) into each one, and finish each with `</body>` and `</html>`.
2. Give each page its own title: `Menu | Sunny Side Café` and `Contact | Sunny Side Café`.
3. In the `<head>` of **all three** pages, add the Montserrat font just above your `style.css` link:

   ```html
   <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
   ```

   Copy it exactly. There must be no spaces in the address.

## Part 2: Menu bar

4. At the top of `<body>` on all three pages, add a `<nav>` containing a `<ul>`. Give it one `<li><a>` each for **Home** (`index.html`), **Menu** (`menu.html`) and **Contact** (`contact.html`).
5. On `index.html`, wrap everything below the nav in `<div class="content">`.
6. In `style.css`:
   - `body`: remove the `padding`, so the menu bar can reach both edges
   - `.content`: `padding: 20px;`
   - `nav`: `background-color: #4b2e1e;`
   - `nav ul`: remove the bullets, spacing and layout defaults (`list-style: none; margin: 0; padding: 15px;`), then lay the links out in a centred row (`display: flex; justify-content: center; gap: 30px;`)
   - `nav a`: white, no underline, `font-family: "Montserrat", sans-serif;` and `transition: color 0.3s;`
   - `nav a:hover`: colour `#ffd27f`

## Part 3: Page content

7. `index.html`:
   - Add this paragraph: *Try our famous flat white or a pot of proper loose-leaf tea.* Put `<strong>` around "famous" and `<em>` around "proper".
   - Change the link paragraph so it also links to `menu.html` with the text `View our menu`.
8. `menu.html` (inside a `<div class="content">`):
   - an `<h1>` "Our Menu", an `<hr />` and a short intro paragraph
   - three `<div class="menu-item">` boxes, each with an `<h2>` and a `<p>`:
     - Coffee, £2.80
     - Breakfast Bowl, £5.50
     - Homemade Cookies, £1.50
   - put each price in `<strong>`, and one word of each description in `<em>`
   - after "Breakfast Bowl", add `<span class="highlight">New!</span>`
9. `contact.html` (inside a `<div class="content">`):
   - an `<h1>` "Contact Us", an `<hr />` and a short intro paragraph
   - a `<div class="contact-details">` with three paragraphs:
     - the email `hello@example.com`, inside `<span class="email">`
     - the phone number `020 7946 0123`
     - the address `12 Market Lane, Covent Garden, London`
   - an `<h2>` "Opening Hours", then a `<ul>` of the hours, with "Closed" in `<strong>`

   These details are made up. That phone number is reserved for use in examples.
10. In `style.css`:
    - `.menu-item`: white background, `padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 5px solid #b5651d;`
    - `.highlight`: background `#ffd27f`, `padding: 2px 6px; border-radius: 4px; font-size: 16px;`
    - `.email`: colour `#b5651d`, bold

## Bug hunt

Each snippet has one mistake. What goes wrong, and how would you fix it?

```html
<!-- A: the links won't sit in a centred row, even with nav ul { display: flex; justify-content: center; } -->
<nav>
  <a href="index.html">Home</a>
  <a href="menu.html">Menu</a>
</nav>

<!-- B: the page shows "<strong>" as text -->
<p>Try our &lt;strong&gt;famous&lt;/strong&gt; flat white.</p>

<!-- C: the box, and everything after it, disappears -->
<div class="menu-item>
  <h2>Coffee</h2>
</div>

<!-- D: the font doesn't load -->
<link href="https://fonts.googleapis.com/css2?family=montserrat & display=swap" rel="stylesheet">
```

<details>
<summary>Show the answers</summary>

- **A:** The CSS styles `nav ul`, but there's no `<ul>`. Wrap the links in `<ul>` and `<li>`.
- **B:** `&lt;` and `&gt;` are codes that *show* `<` and `>` as text. To make a tag, type real `<` and `>` characters.
- **C:** The `"` after `menu-item` is missing, so the browser reads everything after it as part of the class name.
- **D:** The address can't contain spaces. It should be `family=Montserrat&display=swap`.

</details>

## Check your work

- [ ] The menu bar appears on all three pages, and every link opens the right page
- [ ] The links turn gold when you hover over them, and use the Montserrat font
- [ ] The menu items show as white boxes with a brown stripe on the left
- [ ] "New!" has a gold background
- [ ] The £ and é signs show properly on every page

When you're done, compare your work with the `solution/` folder.
