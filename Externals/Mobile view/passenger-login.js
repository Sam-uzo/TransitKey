// passenger-login.js
// Handles login form validation and password show/hide
// Works for both the mobile and desktop versions of the form

document.addEventListener("DOMContentLoaded", function () {

  // ---- Helper: validate a single email input and show/hide its error ----
  function validateEmail(emailInput, errorEl) {
    var value = emailInput.value.trim();

    if (value.length === 0) {
      emailInput.classList.add("border-red-400");
      errorEl.textContent = "Email address is required.";
      errorEl.classList.remove("hidden");
      return false;
    }

    // Simple email check: must contain @ and a dot after it
    var hasAt = value.indexOf("@") !== -1;
    var hasDot = value.indexOf(".") !== -1;

    if (!hasAt || !hasDot) {
      emailInput.classList.add("border-red-400");
      errorEl.textContent = "Please enter a valid email address.";
      errorEl.classList.remove("hidden");
      return false;
    }

    emailInput.classList.remove("border-red-400");
    errorEl.classList.add("hidden");
    return true;
  }

  // ---- Helper: validate a password input ----
  function validatePassword(passwordInput, errorEl) {
    if (passwordInput.value.length === 0) {
      passwordInput.classList.add("border-red-400");
      errorEl.classList.remove("hidden");
      return false;
    }
    passwordInput.classList.remove("border-red-400");
    errorEl.classList.add("hidden");
    return true;
  }

  // ---- Helper: toggle password visibility ----
  function setupPasswordToggle(eyeBtn, passwordInput) {
    if (!eyeBtn || !passwordInput) return;

    eyeBtn.addEventListener("click", function () {
      var isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
    });
  }

  // ---- Setup: MOBILE form ----
  var mobileEmail    = document.getElementById("mobile-email");
  var mobilePassword = document.getElementById("mobile-password");
  var mobileEmailErr = document.getElementById("mobile-email-error");
  var mobilePassErr  = document.getElementById("mobile-password-error");
  var mobileLoginBtn = document.getElementById("mobile-login-btn");
  var mobileEyeBtn   = document.getElementById("mobile-eye-btn");

  if (mobileLoginBtn) {
    mobileLoginBtn.addEventListener("click", function () {
      var emailOk    = validateEmail(mobileEmail, mobileEmailErr);
      var passwordOk = validatePassword(mobilePassword, mobilePassErr);

      if (emailOk && passwordOk) {
        // Backend would verify credentials here
        window.location.href = "./passenger-dashboard.html";
      }
    });
  }

  setupPasswordToggle(mobileEyeBtn, mobilePassword);

  // Clear errors as user types
  if (mobileEmail) {
    mobileEmail.addEventListener("input", function () {
      mobileEmail.classList.remove("border-red-400");
      mobileEmailErr.classList.add("hidden");
    });
  }
  if (mobilePassword) {
    mobilePassword.addEventListener("input", function () {
      mobilePassword.classList.remove("border-red-400");
      mobilePassErr.classList.add("hidden");
    });
  }

  // ---- Setup: DESKTOP form ----
  var desktopEmail    = document.getElementById("desktop-email");
  var desktopPassword = document.getElementById("desktop-password");
  var desktopEmailErr = document.getElementById("desktop-email-error");
  var desktopPassErr  = document.getElementById("desktop-password-error");
  var desktopLoginBtn = document.getElementById("desktop-login-btn");
  var desktopEyeBtn   = document.getElementById("desktop-eye-btn");

  if (desktopLoginBtn) {
    desktopLoginBtn.addEventListener("click", function () {
      var emailOk    = validateEmail(desktopEmail, desktopEmailErr);
      var passwordOk = validatePassword(desktopPassword, desktopPassErr);

      if (emailOk && passwordOk) {
        window.location.href = "./passenger-dashboard.html";
      }
    });
  }

  setupPasswordToggle(desktopEyeBtn, desktopPassword);

  if (desktopEmail) {
    desktopEmail.addEventListener("input", function () {
      desktopEmail.classList.remove("border-red-400");
      desktopEmailErr.classList.add("hidden");
    });
  }
  if (desktopPassword) {
    desktopPassword.addEventListener("input", function () {
      desktopPassword.classList.remove("border-red-400");
      desktopPassErr.classList.add("hidden");
    });
  }

});
