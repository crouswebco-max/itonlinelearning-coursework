# Coding Challenge 12: HTML Email Template

A newsletter for a made-up shop, **Thornbury Bookshop**, built the way email has to be built rather than the way a web page would be.

| File | What it is |
|---|---|
| `index.html` | The email template. Open it in a browser to preview it |
| `email.txt` | The plain-text version, which every email should be sent alongside |

## Why it looks like 2005 HTML

Email clients are years behind browsers. Outlook on Windows renders email with Microsoft Word's engine, Gmail strips parts of `<style>` blocks, and almost nothing supports Flexbox or Grid. So the template uses:

- **Tables for layout**, with `role="presentation"` so screen readers ignore them
- **Inline CSS on every element**, because a stripped `<style>` block would otherwise take the whole design with it
- **A 600px fixed width**, the widest that's safe in an Outlook reading pane
- **One `<style>` block used only for the mobile media query** and small client fixes, so the email still looks right if a client throws it away
- **A "bulletproof" button**: a coloured table cell with a padded link inside, instead of a styled `<div>`
- **Coloured cells instead of cover images**, so nothing looks broken when a client blocks images by default
- **Web-safe fonts only** (Georgia and Arial), since web fonts don't load in most clients
- **A hidden preheader**, the grey line of text an inbox shows next to the subject
- **A postal address and a working unsubscribe link**, which marketing email legally needs in the UK and EU

## Responsive behaviour

The layout is two columns on a computer. Under 620px wide, the media query turns `.stack` cells into full-width blocks, so each book's cover sits above its description, the button stretches to full width, and side padding shrinks.

This works in Apple Mail, iOS Mail, the Gmail app and the Outlook app. Gmail on **desktop** ignores media queries, but the email is only 600px wide there anyway, so it still fits.

## What I tested

Rendered in Chrome at 600px and 375px wide: the layout holds, the columns stack on the narrow size, and no styles are lost if the `<style>` block is removed.

## Still to test in real clients

Rendering in a browser is not the same as rendering in an inbox. To finish this properly, send the template to yourself and check it in:

- [ ] Gmail (web, on a computer)
- [ ] Gmail (Android or iPhone app)
- [ ] Apple Mail (Mac)
- [ ] Apple Mail (iPhone)
- [ ] Outlook on Windows — the strictest one, check the button and spacing
- [ ] Outlook.com in a browser
- [ ] With images turned off
- [ ] In dark mode, on a phone

Free tools that do this for you: [Litmus](https://litmus.com), [Email on Acid](https://www.emailonacid.com), or [Mail Tester](https://www.mail-tester.com) for spam scoring.

## If you reuse this

- Replace the `example.com` links with real ones, including a real unsubscribe link.
- Any image you add must use a full `https://` address to a hosted file. Relative paths don't work in email.
- Give every image `alt` text and a `width`, since many clients block images until the reader allows them.
