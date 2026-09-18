# Module 3: Text, Fonts, Icons, Links, Lists

The Brushstroke Paints page from Module 2, now with Google Fonts, Font Awesome icons, styled links and three kinds of list. Open `index.html` in Chrome. It needs the internet for the fonts and icons.

The new CSS is in the **MODULE 3** block at the bottom of `style.css`.

## Where each topic is

| Topic | Where to look |
|---|---|
| **Google Fonts** | `index.html` `<head>`: the `fonts.googleapis.com` link. `style.css`: Poppins on `*`, Lora on headings |
| **Fallback fonts** | `"Poppins", Arial, sans-serif` is used if Poppins can't load |
| **font-size in rem** | `#shop-name` (3rem), `h2` (1.75rem), `h3`, `.intro` |
| **font-weight / font-style** | `.tagline` (300, light), headings (600) |
| **font shorthand** | `.photo-caption`: `font: italic 0.9rem "Lora", Georgia, serif` |
| **font-variant** | `.frame`: small-caps |
| **text-shadow, letter-spacing** | `#shop-name` |
| **text-transform** | `.tagline`: uppercase |
| **text-align, text-indent** | `.story`: justify, and a 2em indent on the first line. `.highlight`: centred |
| **line-height** | `body` (1.6) |
| **Icons** | Font Awesome link in `<head>`, then `<i class="fa-solid fa-...">` in the header, menu and lists |
| **Styling icons** | `.header-icon` (size and colour), `.icon-list i`, `.contact-list i` (fixed width) |
| **Link states** | `a:link`, `a:visited`, `a:hover` (wavy underline), `a:active` |
| **Button-style link** | `.button-link` ("Come and visit") |
| **list-style-image** | `.tips-list`: a red paint drop instead of a bullet |
| **list-style-type / position** | `.steps`: `decimal-leading-zero` (01, 02…), placed `inside` |
| **::marker** | `.steps li::marker`: red, bold numbers |
| **list-style: none** | `.icon-list`, `.contact-list`: the icons replace the bullets |

## Things to notice

- **Keep link states in LoVe HAte order:** `:link`, `:visited`, `:hover`, `:active`. If `:hover` came before `:visited`, visited links would never change colour on hover.
- **`a:link` is more specific than Module 1's `nav a`**, so without the extra `nav a:link` rule, the menu links would turn blue.
- **Icons are text,** so `font-size` and `color` work on them.
- **Screen readers skip the icons.** They have `aria-hidden="true"` because they're only decoration.

## Try it (undo each one afterwards)

1. Change `.steps` to `list-style-type: upper-roman;`, then `lower-alpha;`, then `circle;`.
2. Change `list-style-position: inside` to `outside` and see where the numbers go.
3. Move the `a:hover` rule above `a:visited`, then hover a link you've already clicked.
4. Change `text-transform: uppercase` on `.tagline` to `capitalize`.
5. Change `.header-icon` to another icon: in `index.html`, swap `fa-paint-roller` for `fa-brush` or `fa-palette`. You can search for icons at fontawesome.com/icons (choose free ones).
6. Remove `"Poppins",` from the `*` rule to see the Arial fallback.
