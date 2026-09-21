# Blog post draft

A starting point for the blog post the checkpoint asks for. Put it in your own words before publishing, and add anything you found hard or surprising while building it — that's usually the part readers remember.

**Suggested title:** Building my portfolio with Tailwind CSS

**Screenshots to include:** `screenshots/home.png` and `screenshots/home-mobile.png` side by side, then `screenshots/gallery.png`.

**Live site:** https://crouswebco-max.github.io/itonlinelearning-coursework/Portfolio%20Checkpoint/

---

## Draft

I've just finished my portfolio site, built with Tailwind CSS. It's four pages: a home page, my work, an image gallery and a contact page.

### Why Tailwind

Normally I write CSS in its own file and give things class names like `.card` or `.hero`. Tailwind works the other way around: you build the design from small utility classes in the HTML, so `class="border-2 border-deep-charcoal bg-white p-5"` gives you a bordered white box with padding, without opening a stylesheet at all.

What I liked was how quickly I could try something. Changing the padding on every card meant changing one class, not hunting through a stylesheet. What took getting used to is how long the class lists get. A card can carry a dozen classes, and at first that looked messy to me. It stopped bothering me once I noticed I was no longer scrolling between two files to make one change.

### The layout

The site is a grid on a computer and a single column on a phone. Tailwind handles that with prefixes: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` means one column by default, two once the screen is tablet-sized and three on a computer. The gallery uses exactly that.

The header was the fiddliest part. On a phone the logo, menu and button wouldn't fit on one line, so the menu wraps onto a second row using `order-last w-full sm:order-none sm:w-auto` — full width and last in order on small screens, back in line on bigger ones.

### Custom colours

Tailwind ships with its own palette, but I wanted my own two colours. You can add them in an `@theme` block:

```css
@theme {
  --color-brand-red: #da373d;
  --color-deep-charcoal: #1a1a1a;
}
```

After that `bg-brand-red`, `text-brand-red` and `border-brand-red` all work, exactly like the built-in colours.

### Hover effects

Each project card has a photo that grows slightly when you hover it. That's a `group` on the card and `group-hover:scale-105` on the image, with `overflow-hidden` on the box so the photo doesn't spill out. One thing I got wrong at first: a zoom won't work on an inline element, so the thing you're scaling has to be `block` or `inline-block`.

### What I'd do next

Connect the contact form to something that actually sends the message, and add proper case studies for the two client sites rather than short descriptions.

The site is live on GitHub Pages, and the code is in my coursework repository.
