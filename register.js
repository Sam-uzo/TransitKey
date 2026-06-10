// ============================================================
// register.js — index.html (Create Account) form validation
// ============================================================
import {
  signUpBtnHandler,
  showError,
  clearError,
  checkPasswordStrength,
  isValidEmail,
  isValidPhone,
  showToast,
} from "./script.js";

document.addEventListener("DOMContentLoaded", () => {
  signUpBtnHandler();

  const fullNameInput   = document.querySelector('input[placeholder="Isaiah Adebayo"]');
  const phoneInput      = document.querySelector('input[type="tel"]');
  const emailInput      = document.querySelector('input[type="email"]');
  const passwordInputs  = document.querySelectorAll('input[type="password"]');
  const passwordInput   = passwordInputs[0];
  const confirmInput    = passwordInputs[1];
  const termsCheckbox   = document.querySelector('input[type="checkbox"]');
  const createBtn       = document.querySelector("button.bg-\\[\\#2563EB\\]");

  // Clear errors as user types
  [fullNameInput, phoneInput, emailInput, passwordInput, confirmInput].forEach((el) => {
    el?.addEventListener("input", () => clearError(el));
  });

  // Live password strength feedback
  passwordInput?.addEventListener("input", () => {
    const result = checkPasswordStrength(passwordInput.value);
    if (!result.valid && passwordInput.value.length > 0) {
      showError(passwordInput, result.message);
    } else {
      clearError(passwordInput);
    }
  });

  // CREATE ACCOUNT button
  createBtn?.addEventListener("click", () => {
    let hasError = false;

    // Full name
    if (!fullNameInput?.value.trim()) {
      showError(fullNameInput, "Full name is required.");
      hasError = true;
    }

    // Phone
    if (!phoneInput?.value.trim()) {
      showError(phoneInput, "Phone number is required.");
      hasError = true;
    } else if (!isValidPhone(phoneInput.value)) {
      showError(phoneInput, "Enter a valid Nigerian phone number (e.g. 08012345678).");
      hasError = true;
    }

    // Email
    if (!emailInput?.value.trim()) {
      showError(emailInput, "Email address is required.");
      hasError = true;
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, "Enter a valid email address.");
      hasError = true;
    }

    // Password strength
    const strengthResult = checkPasswordStrength(passwordInput?.value || "");
    if (!passwordInput?.value) {
      showError(passwordInput, "Password is required.");
      hasError = true;
    } else if (!strengthResult.valid) {
      showError(passwordInput, strengthResult.message);
      hasError = true;
    }

    // Confirm password
    if (!confirmInput?.value) {
      showError(confirmInput, "Please confirm your password.");
      hasError = true;
    } else if (passwordInput?.value !== confirmInput?.value) {
      showError(confirmInput, "Passwords do not match.");
      hasError = true;
    }

    // Terms checkbox
    if (!termsCheckbox?.checked) {
      showToast("You must agree to the Terms of Service and Privacy Policy.", "error");
      hasError = true;
    }

    if (!hasError) {
      // Backend would handle actual registration here
      showToast("Account created! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "./passenger-login.html";
      }, 1800);
    }
  });
});
