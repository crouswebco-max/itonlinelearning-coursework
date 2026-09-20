# Coding Challenge 11: Design to HTML

A conversion of the **Portfolio** screen from the Nova design pack into a working, responsive web page.

| File | What it is |
|---|---|
| `index.html` | The converted page |
| `style.css` | The styles, with the measured values noted in comments |
| `design/Portfolio.png` | The source design, 1366 × 768, for comparison |
| `images/` | The photos from the design pack |
| `fonts/` | Roboto Light and Regular, as supplied with the brief |

## How I worked

Rather than eyeballing the design, I measured it. I loaded `Portfolio.png` into a canvas and read the pixels directly, which gave me the exact colours and the position of every element. Those numbers are written into `style.css` as comments beside the rules that use them.

| Taken from the design | Value |
|---|---|
| Page background | `#1b1f24` |
| Menu button fill | `#3c3b37` |
| Menu button border | `#71706d`, 1px |
| Menu button text | `#dededd` |
| Logo | `#ffffff`, 36px from the left |
| Menu buttons | 107 × 38px, 8px apart |
| Tiles | 262 × 262px, four across |
| Gaps | 30px between columns, 36px between rows |
| Page margins | 116px left, 113px right |
| First row of tiles | 42px below the header |

## How close it came

Rendered at 1366 × 768 and measured against the design:

| Element | Design | My build |
|---|---|---|
| Tile row 1, left edges | 116, 405, 697, 992 | 116, 408, 700, 991 |
| Tile rows, top edges | 122 and 420 | 122 and 420 |
| Tile size | ~262px square | 262px square |
| Column / row gaps | 30 / 36px | 30 / 36px |
| Menu buttons | 107 × 38px, right edge at 1343 | 107 × 38px, right edge at 1343 |
| Background colour | `#1b1f24` | `#1b1f24` |

Everything lands within about 3px of the design, which comes from the photos in the comp having their own soft edges, so the measured edge sits a pixel or two inside the tile.

**One difference worth flagging:** the second tile in the design shows a screen of JSX code, and that photo isn't in the supplied image pack. I used the closest one available, a screen of CSS code. Every other tile is the photo the design uses.

## Responsiveness

The design is a fixed 1366px comp, so it says nothing about smaller screens. Those decisions are mine, and the tiles stay square throughout:

| Screen | Layout |
|---|---|
| Over 1200px | 4 columns, exactly as designed |
| 900–1200px | 3 columns, narrower page margins |
| 620–900px | 2 columns |
| Under 620px | 1 column, menu centred under the logo with buttons sharing the row |

Checked at 1366, 820 and 375px wide: no sideways scrolling, no broken images, no console errors.

## Notes

- The menu buttons all point back at this page, since only the Portfolio screen was converted. In a full build they'd link to the other four pages.
- The design shows no hover state, so the buttons only lighten slightly, and nothing moves.
- The page heading is there for screen readers but hidden visually, because the design doesn't show one.
