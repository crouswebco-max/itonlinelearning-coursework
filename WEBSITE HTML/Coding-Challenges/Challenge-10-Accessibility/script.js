/* ---------- Tabs: WAI-ARIA Authoring Practices keyboard pattern ---------- */
const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));

function selectTab(newTab) {
  tabs.forEach((tab, i) => {
    const selected = tab === newTab;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    panels[i].hidden = !selected;
  });
  newTab.focus();
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => selectTab(tab));

  tab.addEventListener('keydown', (event) => {
    const currentIndex = tabs.indexOf(tab);
    let targetIndex = null;

    if (event.key === 'ArrowRight') targetIndex = (currentIndex + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') targetIndex = 0;
    else if (event.key === 'End') targetIndex = tabs.length - 1;

    if (targetIndex !== null) {
      event.preventDefault();
      selectTab(tabs[targetIndex]);
    }
  });
});

/* ---------- Sign-up form: validate, and announce errors/success ---------- */
const form = document.getElementById('signupForm');
const status = document.getElementById('formStatus');

const fields = [
  { input: document.getElementById('name'), error: document.getElementById('name-error'), message: 'Please enter your name.' },
  { input: document.getElementById('email'), error: document.getElementById('email-error'), message: 'Please enter a valid email address.' },
];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let firstInvalid = null;

  fields.forEach(({ input, error, message }) => {
    if (input.validity.valid) {
      error.textContent = '';
      input.removeAttribute('aria-invalid');
    } else {
      error.textContent = message;
      input.setAttribute('aria-invalid', 'true');
      if (!firstInvalid) firstInvalid = input;
    }
  });

  if (firstInvalid) {
    status.textContent = '';
    firstInvalid.focus();
    return;
  }

  status.textContent = 'Thanks — we\'ll be in touch by email to confirm.';
  form.reset();
});
