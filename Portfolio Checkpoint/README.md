# Tailwind CSS Portfolio Checkpoint

My portfolio site, built with Tailwind CSS through the Play CDN. It's a four-page site for Crous WebCo, my web development studio, and it doubles as the Tailwind checkpoint project.

- **Live site:** https://crouswebco-max.github.io/itonlinelearning-coursework/Portfolio%20Checkpoint/
- **Video walkthrough:** https://youtu.be/0hTm40-tZ7c
- **Blog post:** https://crouswebco-max.github.io/itonlinelearning-coursework/Portfolio%20Checkpoint/blog.html
- **LinkedIn post:** https://www.linkedin.com/posts/juandene-crous-823737439_tailwindcss-webdevelopment-portfolio-share-7508144445826048000-Vrvg/

## Pages

| File | What's on it |
|---|---|
| `home.html` | Full-screen hero with my photo, what I work with, and two featured projects (Money Builder and Odin) |
| `projects.html` | Client work (So Bella, Alpha Projects), my JavaScript and React projects (Money Builder, Banking System, My ITOL Vault), my own projects (Odin, A Game of Consequence, Snake) and eight practice websites, each with live and code links |
| `gallery.html` | Nine-image responsive grid (one column on a phone, two on a tablet, three on a computer). Click a photo to open it full size in a lightbox, with Previous/Next, the arrow keys and Esc |
| `contact.html` | A working contact form (sent through FormSubmit to my email), email and GitHub links, and what happens after you get in touch |
| `blog.html` | The blog post about building this site with Tailwind |
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

## Screenshots

Desktop and mobile screenshots of every page are in `screenshots/`.

## Still to do

- Connect the contact form to a form service. Until then, the email link on the contact page is the way to get in touch.
