# Module 4: Position, z-index, Display, max-width, Overflow

The Brushstroke Paints page from Module 3, now with a sticky menu bar, a sale badge on the photo, a back-to-top button, and an **In the shop** section. Open `index.html` in Chrome.

The new CSS is in the **MODULE 4** block at the bottom of `style.css`.

## Where each topic is

| Topic | Where to look |
|---|---|
| **display: inline-block** | `.main-nav li` (menu items side by side), `.tin`, and `.frame` from Module 2 |
| **display: block** | `.main-nav a` (the whole padded area is clickable), `.shop-photo` (removes the gap under it) |
| **display: none** | `.sold-out`: the 1-litre tin is hidden, and the others close the gap |
| **position: static** | The default for everything else (explained in a comment) |
| **position: relative** | `.new-tag` ("NEW" beside "Picture frames"), nudged up 6px |
| **position: absolute** | `.sale-badge`, inside `.photo-wrap` (which is `relative`). Also the colour chips |
| **position: fixed** | `.back-to-top`: the round arrow button in the corner |
| **position: sticky** | `.main-nav`: the menu sticks to the top when you scroll |
| **z-index** | `.main-nav` (10) stays above the page. `.back-to-top` (20). The chips: the first chip has the highest number, so it's on top |
| **max-width** | `img` (100%), `.photo-wrap` (480px), `.colour-chart` (320px) |
| **overflow: hidden** | `.photo-wrap` cuts off the photo's square corners. `.chip` cuts off long names with `...` |
| **overflow: auto** | `.colour-chart`: a fixed height with a scrollbar |

## Things to notice

- **absolute needs a positioned parent.** The badge is placed inside `.photo-wrap` only because the wrap has `position: relative`.
- **Without z-index, later elements are drawn on top.** The chips' z-index numbers reverse that, so the first chip is in front.
- **`display: none` vs `visibility: hidden`:** the first removes the element completely, the second only makes it invisible and leaves a gap.
- **`scroll-margin-top`** on `section` stops the sticky menu covering a heading when you click a menu link.

## Try it (undo each one afterwards)

1. Delete `position: relative` from the **first** `.photo-wrap` rule. The badge jumps to the top-left of the whole page.
2. Change `.sold-out` to `visibility: hidden;` instead of `display: none;`.
3. Delete `z-index: 10` from `.main-nav`, then scroll down to the chips. They slide over the menu.
4. Swap the z-index numbers so `.chip-4` has 4 and `.chip-1` has 1.
5. Change `overflow-y: auto` on `.colour-chart` to `hidden`, then `scroll`, then `visible`.
6. Change `.back-to-top` from `fixed` to `absolute` and scroll. It no longer follows you.
7. Change `.main-nav li` to `display: block;`.
