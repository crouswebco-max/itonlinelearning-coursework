# Section 5: Forms and Validation

**Practises:** Module 5 (`form`, `label`, input types, `select`, `textarea`, checkboxes, radio buttons, `required`, `pattern`, validation styles)

The starter files here are the finished Section 4 site.

## Part 1: New page

1. Create `booking.html`: copy `contact.html`, delete everything inside `<main>`, and change the title to `Book a Table | Sunny Side Café`.
2. Add a **Book a Table** link (`booking.html`) to the menu on **all four** pages, between Menu and Contact.
3. On `contact.html`, add a paragraph with a link that says `Book a table online`.

## Part 2: The form (`booking.html`)

4. Inside `<main>`, add:
   - an `<h1>` "Book a Table", an `<hr />` and a short intro paragraph
   - a `<div class="booking-container">`
   - inside that div, `<form id="booking-form" action="#" method="POST">`
5. Put each field below in its own `<div class="form-group">`, with a `<label for="...">`. The `for` must match the field's `id`.

   | Label | Field |
   |---|---|
   | Full Name | `type="text"`, `required`, `minlength="2"` |
   | Email Address | `type="email"`, `required` |
   | Phone Number (optional) | `type="tel"`, `pattern="[0-9]{11}"`, `title="11 digits, no spaces"` |
   | Date | `type="date"`, `required` |
   | Time | a `<select>` with `required`. The first option has `value=""` and says "Please choose a time", then 9:00am, 11:00am, 1:00pm and 3:00pm |
   | Number of Guests | `type="number"`, `min="1"`, `max="8"`, `value="2"`, `required` |
   | Special Requests | a `<textarea>` with `rows="4"` and `maxlength="300"` |

   Give the name, email, phone and special requests fields a `placeholder` example, e.g. `placeholder="e.g. Sam Smith"`.
6. Seating choice:
   - add a `<fieldset class="form-group">` with a `<legend>` that says "Where would you like to sit?"
   - inside it, add two radio buttons, "Inside" and "Outside", that both have `name="seating"`
   - wrap each one in `<label class="radio-option">`
   - add `checked` to "Inside"
7. Add a newsletter checkbox wrapped in `<label class="checkbox-option">`, then `<button type="submit">Book Table</button>`.

## Part 3: CSS

8. `.booking-container`: `max-width: 600px; margin: 20px auto; padding: 30px;`, a white background, rounded corners and a shadow.
9. `.form-group`: `margin-bottom: 20px;`
10. Labels:
    - `label`: `display: block; margin-bottom: 6px; font-weight: 600;`
    - `.radio-option, .checkbox-option`: `display: inline-block; font-weight: normal; margin-right: 20px;`
11. One rule for the fields: text, email, tel, date and number inputs, plus `select` and `textarea`.

    ```css
    input[type="text"],
    input[type="email"],
    ... the other types ...,
    select,
    textarea {
    ```

    Give them `width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px; font-family: inherit;`

    `width: 100%` fits neatly because of the `* { box-sizing: border-box; }` rule you've had since Section 1.
12. `fieldset`: `border: 1px solid #ccc; border-radius: 4px; padding: 10px 15px;`. `legend`: bold, `padding: 0 5px;`
13. `button[type="submit"]`:
    - background `#b5651d` and white text
    - `border: none; padding: 12px 24px; border-radius: 4px; font-size: 16px; cursor: pointer;`
    - on hover (`button[type="submit"]:hover`), background `#8b4513`
14. Validation colours:

    ```css
    input:user-valid,
    select:user-valid,
    textarea:user-valid {
      border-color: #28a745;
    }

    input:user-invalid,
    select:user-invalid,
    textarea:user-invalid {
      border-color: #dc3545;
    }
    ```

    `:user-invalid` only turns a field red *after* someone has typed in it or tried to send the form, so the page doesn't open covered in red borders.

## Bug hunt

```html
<!-- A: clicking the label doesn't put the cursor in the box -->
<label for="email">Email</label>
<input type="email" id="e-mail" name="email">

<!-- B: "hello" is accepted as an email address -->
<input type="text" id="email" name="email" required>

<!-- C: a UK mobile number like 07700900123 is rejected -->
<input type="tel" id="phone" name="phone" pattern="[0-9]{10}">

<!-- D: both radio buttons can be ticked at the same time -->
<label><input type="radio" name="inside"> Inside</label>
<label><input type="radio" name="outside"> Outside</label>
```

<details>
<summary>Show the answers</summary>

- **A:** `for="email"` has to match the input's `id` exactly, so change `id="e-mail"` to `id="email"`.
- **B:** `type="text"` doesn't check anything. Use `type="email"`.
- **C:** `{10}` means exactly 10 digits, but UK numbers have 11. Use `[0-9]{11}`, or `[0-9]{10,11}` to allow 10 or 11.
- **D:** Radio buttons only work as a group when they share the same `name`. Give both `name="seating"`.

</details>

## Check your work

- [ ] "Book a Table" is in the menu on all four pages
- [ ] Clicking **Book Table** on an empty form shows a "Please fill in this field" message
- [ ] A bad email address turns red once you've typed it, and a good one turns green
- [ ] Only one seating option can be picked at a time
- [ ] The number box won't go below 1 or above 8 with its arrows
- [ ] The form fits nicely at phone size

The form doesn't send anywhere yet. Clicking Book Table with valid details just reloads the page, because sending needs a server.

When you're done, compare your work with the `solution/` folder.
