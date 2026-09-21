# Tailwind CSS Portfolio Checkpoint

My portfolio site, built with Tailwind CSS through the Play CDN.

**Live site:** https://crouswebco-max.github.io/itonlinelearning-coursework/Portfolio%20Checkpoint/ It's a four-page site for Crous WebCo, my web development studio, and it doubles as the Tailwind checkpoint project.

## Pages

| File | What's on it |
|---|---|
| `home.html` | Full-screen hero with my photo, what I work with, and three featured projects |
| `projects.html` | Client work (So Bella, Alpha Projects) and four course projects with screenshots |
| `gallery.html` | Nine-image responsive grid: one column on a phone, two on a tablet, three on a computer |
| `contact.html` | Contact form, email and GitHub links, and what happens after you get in touch |
| `index.html` | Sends visitors to `home.html`, so the site opens on the home page when it's published |
| `images/` | Gallery photos, my photo, and screenshots of the course projects |

Every page shares the same header, menu and footer.

## Tailwind features used

- Responsive layouts with Grid and Flexbox, using the `sm:`, `md:` and `lg:` breakpoints
- Spacing, typography, borders and colour utilities
- Custom `brand-red` and `deep-charcoal` colours in an `@theme` block
- Hover effects with `transition`, `hover:bg-*`, `hover:text-*` and image scaling
- Alt text on every image, and a labelled menu on every page

## View locally

Open `home.html` in a browser, or run a local server from this folder:

```text
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Before publishing

- [x] Replace the placeholder email on `contact.html` with a real address
- [ ] Connect the contact form to a form service, or remove it and leave the email link

## Publishing checklist

- [x] Push the full folder to a public GitHub repository
- [x] Deploy the site with GitHub Pages
- [x] Add the live URL to this README
- [x] Desktop and mobile screenshots taken (`screenshots/`)
- [ ] Write and publish the blog post — draft ready in `blog-post.md`
- [ ] Record and publish the YouTube walkthrough
- [ ] Share on LinkedIn and social media — draft ready in `social-post.md`
- [ ] Add the project links to the CV and portfolio

## Extra files

| File | What it is |
|---|---|
| `blog-post.md` | Draft of the blog post, to put in your own words |
| `social-post.md` | Draft LinkedIn and short social posts |
| `screenshots/` | Desktop and mobile screenshots of every page |
