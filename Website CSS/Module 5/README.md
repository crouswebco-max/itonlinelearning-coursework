# Module 5: Float and Clear, Combinators, Pseudo-classes

The Brushstroke Paints page from Module 4, now as a two-column layout built with floats, with a sidebar (opening hours, colour of the month, newsletter). Open `index.html` in Chrome.

The new CSS is in the **MODULE 5** block at the bottom of `style.css`.

## Where each topic is

| Topic | Where to look |
|---|---|
| **float: left / right** | `main` floats left (68%), `.sidebar` floats right (29%) |
| **Text wrapping round a float** | `.photo-float`: the photo floats left and the story wraps around it |
| **Float inside a line** | `.hours span`: the times float to the right of each day |
| **clear: left** | `#welcome h3` starts below the photo instead of beside it |
| **clear: both** | `footer`, and the clearfix `.page::after` |
| **Clearfix** | `.page::after` stops the wrapper collapsing around its floated columns |
| **Descendant (space)** | `.sidebar a` |
| **Child (`>`)** | `.side-box > h2`: only headings directly inside a side box |
| **Adjacent sibling (`+`)** | `h2 + p`: the paragraph straight after a heading is grey italic. Also `input:checked + label` |
| **General sibling (`~`)** | `.month-swatch ~ p`: every paragraph after the colour swatch |
| **:hover** | Frames, tins, the Sign up button, and the chips (the hovered chip comes to the front) |
| **:active** | The Sign up button while it's pressed |
| **:focus** | The email box when you click into it |
| **:checked** | Tick "Send me special offers" and the label turns green |
| **:nth-child()** | Striped opening hours (odd rows) and colour chart (even rows) |
| **:first-child / :last-child** | Opening hours: the rounded first row, and "Sunday" in red |
| **:not()** | `.main-nav li:not(:last-child)`: dividers between menu items, but not after the last one. Also `h2 + p:not(.intro)` |
| **:target** | Click a menu link, and that section gets a yellow outline |
| **Attribute selector** | `.newsletter input[type="email"]` only styles the email box, not the checkbox |

## Things to notice

- **Floats don't give their parent any height.** Without the clearfix and `clear: both`, the footer would slide up behind the columns.
- **On screens narrower than 800px, the columns stack.** That uses `@media`, which comes in a later module. It's only there so the page works on phones.
- **Combinators combine with pseudo-classes:** `input:checked + label` means "the label right after a ticked checkbox".

## Try it (undo each one afterwards)

1. Delete the `.page::after` rule **and** `clear: both` from `footer`. The footer jumps up behind the columns.
2. Delete `clear: left` from `#welcome h3`. "Why shop with us" squeezes in beside the photo.
3. Change `.photo-float` to `float: right;`.
4. Change `.side-box > h2` to `.sidebar > h2`. The sidebar headings get big again, because they're inside `.side-box`, not directly inside `.sidebar`.
5. Change `.hours li:nth-child(odd)` to `:nth-child(3n)` (every 3rd row).
6. Change `h2 + p:not(.intro)` to `h2 ~ p`. Now every paragraph after a heading turns grey, not just the first one.
7. Make the window narrower than 800px and watch the sidebar move below the main column.
