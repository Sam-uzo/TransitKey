// passenger-signup.js
// Handles registration form validation for both mobile (m-) and desktop (d-) forms

document.addEventListener("DOMContentLoaded", function () {

  // ---- Helper: check if a field is empty ----
  function isEmpty(value) {
    return value.trim().length === 0;
  }

  // ---- Helper: check phone is 11 digits starting with 0 or +234 ----
  function isValidPhone(phone) {
    var cleaned = phone.trim().split(" ").join("").split("-").join("");
    // Accept: 08012345678 (11 chars starting with 0)
    // Accept: +2348012345678 (starts with +234, then 10 digits)
    var startsWithZero = cleaned.charAt(0) === "0" && cleaned.length === 11;
    var startsWithPlus234 = cleaned.substring(0, 4) === "+234" && cleaned.length === 14;
    return startsWithZero || startsWithPlus234;
  }

  // ---- Helper: check email has @ and a dot ----
  function isValidEmail(email) {
    var atIndex = email.indexOf("@");
    var dotIndex = email.lastIndexOf(".");
    return atIndex > 0 && dotIndex > atIndex + 1;
  }

  // ---- Helper: show error on an input ----
  function showError(inputEl, errorEl, message) {
    inputEl.classList.add("border-red-400");
    errorEl.textContent = message;
    errorEl.classList.remove("hidden");
  }

  // ---- Helper: clear error from an input ----
  function clearError(inputEl, errorEl) {
    inputEl.classList.remove("border-red-400");
    errorEl.classList.add("hidden");
  }

  // ---- Main validate and submit function ----
  // prefix is either "m" (mobile) or "d" (desktop)
  function handleSubmit(prefix) {
    var nameInput    = document.getElementById(prefix + "-name");
    var phoneInput   = document.getElementById(prefix + "-phone");
    var emailInput   = document.getElementById(prefix + "-email");
    var passwordInput = document.getElementById(prefix + "-password");
    var confirmInput  = document.getElementById(prefix + "-confirm");
    var termsCheckbox = document.getElementById(prefix + "-terms");

    var nameError    = document.getElementById(prefix + "-name-error");
    var phoneError   = document.getElementById(prefix + "-phone-error");
    var emailError   = document.getElementById(prefix + "-email-error");
    var passwordError = document.getElementById(prefix + "-password-error");
    var confirmError  = document.getElementById(prefix + "-confirm-error");
    var termsError   = document.getElementById(prefix + "-terms-error");

    var hasError = false;

    // Validate name
    if (isEmpty(nameInput.value)) {
      showError(nameInput, nameError, "Full name is required.");
      hasError = true;
    } else {
      clearError(nameInput, nameError);
    }

    // Validate phone
    if (isEmpty(phoneInput.value)) {
      showError(phoneInput, phoneError, "Phone number is required.");
      hasError = true;
    } else if (!isValidPhone(phoneInput.value)) {
      showError(phoneInput, phoneError, "Enter a valid Nigerian phone number.");
      hasError = true;
    } else {
      clearError(phoneInput, phoneError);
    }

    // Validate email
    if (isEmpty(emailInput.value)) {
      showError(emailInput, emailError, "Email address is required.");
      hasError = true;
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, emailError, "Enter a valid email address.");
      hasError = true;
    } else {
      clearError(emailInput, emailError);
    }

    // Validate password
    if (isEmpty(passwordInput.value)) {
      showError(passwordInput, passwordError, "Password is required.");
      hasError = true;
    } else if (passwordInput.value.length < 8) {
      showError(passwordInput, passwordError, "Password must be at least 8 characters.");
      hasError = true;
    } else {
      clearError(passwordInput, passwordError);
    }

    // Validate confirm password
    if (isEmpty(confirmInput.value)) {
      showError(confirmInput, confirmError, "Please confirm your password.");
      hasError = true;
    } else if (confirmInput.value !== passwordInput.value) {
      showError(confirmInput, confirmError, "Passwords do not match.");
      hasError = true;
    } else {
      clearError(confirmInput, confirmError);
    }

    // Validate terms
    if (!termsCheckbox.checked) {
      termsError.classList.remove("hidden");
      hasError = true;
    } else {
      termsError.classList.add("hidden");
    }

    if (!hasError) {
      // Backend would register the user here
      window.location.href = "./passenger-login.html";
    }
  }

  // ---- Attach submit buttons ----
  var mobileBtn = document.getElementById("m-create-btn");
  var desktopBtn = document.getElementById("d-create-btn");

  if (mobileBtn) {
    mobileBtn.addEventListener("click", function () {
      handleSubmit("m");
    });
  }

  if (desktopBtn) {
    desktopBtn.addEventListener("click", function () {
      handleSubmit("d");
    });
  }

  // ---- Clear errors as user types (mobile) ----
  var mobileFields = ["m-name", "m-phone", "m-email", "m-password", "m-confirm"];
  mobileFields.forEach(function (id) {
    var input = document.getElementById(id);
    if (input) {
      input.addEventListener("input", function () {
        input.classList.remove("border-red-400");
        var errorEl = document.getElementById(id + "-error");
        if (errorEl) {
          errorEl.classList.add("hidden");
        }
      });
    }
  });

  // ---- Clear errors as user types (desktop) ----
  var desktopFields = ["d-name", "d-phone", "d-email", "d-password", "d-confirm"];
  desktopFields.forEach(function (id) {
    var input = document.getElementById(id);
    if (input) {
      input.addEventListener("input", function () {
        input.classList.remove("border-red-400");
        var errorEl = document.getElementById(id + "-error");
        if (errorEl) {
          errorEl.classList.add("hidden");
        }
      });
    }
  });

});
