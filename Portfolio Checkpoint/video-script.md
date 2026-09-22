# Video walkthrough: script and shot list

For the YouTube walkthrough the checkpoint asks for. Aim for **three to four minutes**. Don't read this word for word — it's here so you know what to click and roughly what to cover.

**Before you record**
- Open the live site: https://crouswebco-max.github.io/itonlinelearning-coursework/Portfolio%20Checkpoint/
- Close other tabs, and hide your bookmarks bar.
- Have the code open in VS Code in a second window, on `home.html`.
- Record at 1920×1080 if you can. QuickTime (**File → New Screen Recording**) or OBS both work.

---

## 1. Opening (20 seconds)

*On the home page.*

Say who you are and what this is: your portfolio, built with Tailwind CSS as the checkpoint project for the ITonlinelearning course. Mention it's four pages and it's live on GitHub Pages.

## 2. The home page (40 seconds)

*Scroll slowly from the hero down to the footer.*

Point out the hero with your photo, the four-column strip of what you work with, and the featured projects. Hover a project card so the photo zooms — mention that's `group-hover:scale-105` with `overflow-hidden` on the box.

## 3. Show it working on a phone (30 seconds)

*Drag the browser window narrower, or open DevTools (Cmd+Option+I) and switch on the device toolbar.*

This is the bit tutors and clients care about most. Show the menu wrapping onto its own row and the columns stacking. Say that Tailwind handles it with prefixes like `sm:` and `lg:`, so one class controls one screen size.

## 4. The other three pages (50 seconds)

- **Work** — your two client sites and four course projects.
- **Gallery** — the nine-image grid, one column on a phone, two on a tablet, three on a computer. Hover a photo to bring its colour back.
- **Contact** — the form, and be honest that it isn't connected to anything yet.

## 5. A look at the code (50 seconds)

*Switch to VS Code, on `home.html`.*

Show one element's class list and read out what a few of them do, for example `border-2 border-deep-charcoal bg-white p-5`. Then scroll to the `@theme` block in the `<head>` and explain that's where `brand-red` and `deep-charcoal` come from, which is why `bg-brand-red` works like a built-in colour.

Worth saying out loud: at first the long class lists looked messy to you, and what changed your mind was not having to jump between two files to make one change.

## 6. Close (20 seconds)

Say where it lives (GitHub Pages), what you'd do next (connect the contact form, write up the client projects properly), and ask people to leave a comment.

---

## Checklist before you upload

- [ ] Sound is clear, no background noise
- [ ] No personal tabs, emails or messages on screen
- [ ] Title: something like "Building a portfolio site with Tailwind CSS"
- [ ] Description includes the live link and the GitHub link
- [ ] Set to Public or Unlisted, not Private, so your tutor can open it
- [ ] Add the video link to `README.md` in this folder once it's up
