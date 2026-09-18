// Checking that "Confirm password" matches "Password" isn't something CSS can
// do on its own (a style rule can't compare two different fields' values), so
// this is the one place this form uses a little JavaScript. It sets a custom
// validation message, which then triggers the same :invalid / :user-invalid
// CSS the rest of the form already uses.
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

function checkPasswordsMatch() {
  if (confirmPassword.value && confirmPassword.value !== password.value) {
    confirmPassword.setCustomValidity('Passwords do not match.');
  } else {
    confirmPassword.setCustomValidity('');
  }
}

password.addEventListener('input', checkPasswordsMatch);
confirmPassword.addEventListener('input', checkPasswordsMatch);
