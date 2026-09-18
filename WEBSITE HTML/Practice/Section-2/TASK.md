# Section 2: Images, Links and Styling

**Practises:** Module 2 (images, links, `<hr>`, comments, `id`, CSS colours and fonts)

Your Section 1 page has been copied into this folder. In this section you'll turn it into the home page for **Sunny Side Café**, a made-up coffee shop. You'll keep building the café website in Sections 3 to 6.

## What's in this folder

- `index.html` and `style.css`: copies of your Section 1 page. Type your changes here.
- `images/coffee.jpg`: a photo to use.
- `solution/`: one finished version, to compare with when you're done.

Open `index.html` in Chrome and keep it open. Refresh after each step to see the change.

## Part 1: HTML (`index.html`)

1. As the first line inside `<head>`, add `<meta charset="UTF-8">`. Under it, add the viewport line: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
2. Change the `<title>` to `Sunny Side Café`. The é is why step 1 matters: without the charset line it can show up as `Ã©`.
3. Change the `<h1>` text to `Welcome to Sunny Side Café`, and put an `<hr />` under it.
4. Replace the lorem ipsum paragraph with two or three sentences of your own about the café.
5. Add a second paragraph with `id="special-offer"` that says: *This week only: a free cookie with every coffee!*
6. Add the photo with an `<img>` tag:
   - `src="images/coffee.jpg"`
   - `alt` text that describes the photo
   - `width="450"`
7. Change the link so that it:
   - says `See today's recipe ideas`
   - goes to `https://www.bbcgoodfood.com`
   - opens in a new tab (`target="_blank"`)
   - sits inside a `<p>`
8. Add an HTML comment (`<!--...-->`) above each part of the page.

## Part 2: CSS (`style.css`)

9. `body`: add `padding: 20px;` and `background-color: #fffaf0;`
10. `h1`: size `50px`, colour `saddlebrown`, font `"Courier New", Courier, monospace`
11. `p`: size `18px`, colour `rgb(60, 60, 60)`
12. `#special-offer`: colour `orange`, and make it bold with `font-weight`
13. `img`: `max-width: 100%;`, `height: auto;` and `border-radius: 8px;`
    - `max-width` stops the photo getting wider than the window.
    - `height: auto` keeps its shape when it shrinks.
14. `a`: colour `#b5651d`

## Bug hunt

This CSS has **4 mistakes**. Can you find them all?

```css
h1 {
  color: saddlebrown
  font-family: Courier New, monospace;
}

#specialoffer {
  color: orange;
}

p {
  font-size: 18;
}
```

<details>
<summary>Show the answers</summary>

1. There's no `;` after `saddlebrown`. The browser reads the colour and the font as one broken line and ignores both.
2. `Courier New` has a space in it, so it needs quotes: `"Courier New"`.
3. `#specialoffer` doesn't match `id="special-offer"`. The names have to be spelled exactly the same.
4. `18` needs a unit: `18px`.

</details>

## Check your work

- [ ] The tab says **Sunny Side Café**, with the é showing properly
- [ ] The photo shows, with rounded corners
- [ ] The special offer is orange and bold
- [ ] The link opens BBC Good Food in a new tab
- [ ] Nothing sticks out past the edge when you make the window narrow

When you're done, compare your work with the `solution/` folder.
