# Module 1: Adding CSS, Comments, Selectors, Colours

A plain page for **Brushstroke Paints**, a made-up paint shop. Open `index.html` in Chrome.

## Where each topic is

| Topic | Where to look |
|---|---|
| **Inline CSS** | `index.html`: the `style="..."` on the footer paragraph |
| **Internal CSS** | `index.html`: the `<style>` block in `<head>` |
| **External CSS** | `index.html`: `<link rel="stylesheet" href="style.css">`, and all of `style.css` |
| **Comments** | `style.css` uses `/* ... */`. `index.html` uses `<!-- ... -->` |
| **Universal selector** `*` | `style.css`: sets Arial on every element |
| **Element selectors** | `body`, `h2`, `footer`, `code` |
| **Grouping** `h1, h2` | Both headings get Georgia |
| **ID selectors** `#` | `#site-header`, `#shop-name`, and the five `#swatch-...` rules |
| **Class selectors** `.` | `.tagline`, `.highlight`, `.note`, `.swatch` |
| **Descendant selectors** | `nav a`, `footer p` |
| **Colours** | The five swatches: named (`tomato`), hex (`#1e6fa8`), `rgb()`, `rgba()`, `hsl()` |

## Things to notice

- **Which way of adding CSS wins?** `footer p` in `style.css` says white, but the footer text is grey, because inline CSS beats the stylesheet.
- **Later rules win.** The `<style>` block makes `h2` green, but `style.css` is linked after it, so the headings end up blue. Move the `<link>` above the `<style>` and they turn green.
- **More specific rules win.** `*` sets Arial on everything, but `code` still gets Courier New, because an element selector beats the universal one.
- **Two classes at once.** "Free parking" has `class="note highlight"`, so it gets both rules.

## Try it (undo each one afterwards)

1. Put `// Selectors` on the line above the `h2` rule. The headings go green, because CSS doesn't understand `//`, so it throws that whole rule away.
2. Remove the `.` from `.note`. Nothing matches, because there's no `<note>` tag.
3. Delete the semicolon after `color: #555555` in `.note`. Both lines stop working.
4. Change `href="style.css"` to `href="styles.css"`. All the external CSS disappears.
5. Change the `0.5` in `#swatch-rgba` to `0.1`, then `1`.
6. Change the hue in `#swatch-hsl` from `270` to `0`, `120`, then `200`.
