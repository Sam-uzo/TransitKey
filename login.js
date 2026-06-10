// ============================================================
// login.js — passenger-login.html logic
// ============================================================
import {
  signUpBtnHandler,
  showError,
  clearError,
  isValidEmail,
  showToast,
} from "./script.js";

document.addEventListener("DOMContentLoaded", () => {
  signUpBtnHandler();

  const emailPhoneInput = document.querySelector('input[placeholder="e.g. name@gmail.com"]');
  const passwordInput   = document.querySelector('input[type="password"]');
  const loginBtn        = document.querySelector("button.bg-\\[\\#2563EB\\]");
  const googleBtn       = document.querySelector("button.bg-\\[\\#98B5F5\\]");

  // Clear errors on input
  [emailPhoneInput, passwordInput].forEach((el) => {
    el?.addEventListener("input", () => clearError(el));
  });

  // LOGIN button
  loginBtn?.addEventListener("click", () => {
    let hasError = false;

    // Email or phone check
    if (!emailPhoneInput?.value.trim()) {
      showError(emailPhoneInput, "Email or phone number is required.");
      hasError = true;
    }

    // Password check
    if (!passwordInput?.value) {
      showError(passwordInput, "Password is required.");
      hasError = true;
    } else if (passwordInput.value.length < 8) {
      showError(passwordInput, "Password must be at least 8 characters.");
      hasError = true;
    }

    if (!hasError) {
      // Backend login would go here — redirecting for now
      showToast("Logging in...");
      setTimeout(() => {
        window.location.href = "./passenger-home.html";
      }, 1500);
    }
  });

  // LOGIN WITH GOOGLE — stub
  googleBtn?.addEventListener("click", () => {
    showToast("Google login coming soon.", "error");
  });

  // Forgot password link — stub
  const forgotLink = document.querySelector('a[href="#"]');
  forgotLink?.addEventListener("click", (e) => {
    e.preventDefault();
    showToast("Password reset coming soon.", "error");
  });
});
