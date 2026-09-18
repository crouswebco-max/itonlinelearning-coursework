# Module 2: Backgrounds, Borders, Margins, Padding, Width and Height

The Brushstroke Paints page from Module 1, now with a header photo, white cards and a row of picture frames. Open `index.html` in Chrome.

The Module 1 CSS is still at the top of `style.css`. Everything new is in the **MODULE 2** block at the bottom, in five numbered parts.

## Where each topic is

| Topic | Where to look |
|---|---|
| **Background image that repeats** | `body`: the small dotted tile repeats across the whole page |
| **Background photo** | `#site-header`: `background-image`, `no-repeat`, `center`, `cover`, plus a fallback `background-color` |
| **See-through background** | `.header-text`: `rgba()`, so the text is readable on the photo |
| **Positioned background** | `#visit`: one brush, `no-repeat`, placed with `background-position` and sized with `background-size` |
| **Border shorthand** | `section`, `.swatch`: `border: 1px solid #e5ddd3` (width, style, colour) |
| **One side only** | `h2` (`border-bottom`), `.note` (`border-left`) |
| **Border longhand** | `.frame`: `border-width`, `border-style` and `border-color` set separately |
| **Border styles** | The eight frames: solid, dashed, dotted, double, groove, ridge, inset, outset |
| **Rounded corners** | `border-radius` on sections, swatches, the header box and the photo |
| **Margins** | `body { margin: 0 }`, `margin: 0 auto` to centre, and the 2-value and 4-value shorthands |
| **Padding** | `#site-header`, `section` (3 values), `.highlight`, `#visit` (room for the brush) |
| **max-width** | `main` (800px), `.header-text` (500px), `.shop-photo` (480px) |
| **Width in % and px** | `.swatch` (80%), `.frame` (140px) |
| **Height** | `.frame` (60px), and `height: auto` on the photo |

## Things to notice

- **Margin is outside the border; padding is inside.** The yellow `.highlight` background fills its padding, but never its margin.
- **Shorthand values go clockwise:** top, right, bottom, left. Two values mean top/bottom and left/right. Three values mean top, left/right, bottom.
- **`max-width` vs `width`:** `main` is never wider than 800px, but it still shrinks on a phone.

## Try it (undo each one afterwards)

1. In the first `.frame` rule, delete `border-style: solid;` and make the `.frame-solid` rule empty. The solid frame loses its border, because the default style is `none`.
2. On `main`, change `max-width: 800px` to `width: 800px`, then make the window narrow. Now the page scrolls sideways.
3. Give `.shop-photo` a `height: 150px` instead of `auto`. The photo gets squashed.
4. Add `background-repeat: repeat-x;` to `body`, then try `repeat-y` and `no-repeat`.
5. Change `background-size: cover` on the header to `contain`.
6. Add `background-attachment: fixed;` to `#site-header` and scroll.
7. Change the padding in `.highlight` to `-10px`. The padding disappears completely: padding can't be negative, so the browser ignores that line. (Margins can be negative.)
8. Right-click a swatch, choose **Inspect**, and look at the box-model diagram in the **Computed** tab. It shows the margin, border and padding.
