# Website Design 1: Nova portfolio

A five-page portfolio website for the designer "Nova", built from the brief and mock-ups in `design-brief/`.

## Pages

| File | What it shows |
|---|---|
| `index.html` | Home: the silhouette hero image, heading, intro and a "Work with Nova" button (links to Contact) |
| `about.html` | About: "Web Application Designer.", Nova's background and a "See my work" button (links to Portfolio) |
| `portfolio.html` | Portfolio: 8 project previews. Each one links to its own page in `projects/` |
| `services.html` | Services: four services with one-sentence captions and a "Work with Nova" button |
| `contact.html` | Contact: first name, last name and email form, plus Facebook, Instagram and X links |
| `projects/*.html` | One page per project, with a back link and a link to the next project |

Every page has the NOVA logo and the same menu, and all pages share one stylesheet, `style.css`. The layout adapts for tablets and phones.

## Folders

- `images/`: the photos from the brief, resized for the web. The pack's `gallary` files are renamed `gallery1`–`gallery8`.
- `fonts/Roboto/`: the Roboto font from the brief (Light, Regular, Medium and Bold).
- `design-brief/`: the original brief (`Summary of page design.txt`) and mock-ups (`designs/`), for reference.

## Notes

- The contact form isn't connected to a server, so clicking Submit doesn't send anything.
- The social media links go to the Facebook, Instagram and X home pages. Swap in Nova's real profile links.
- The project names and descriptions were written to match the photos.
