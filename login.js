// ============================================================
// login.js — passenger-login.html logic
// ============================================================
import {
  signUpBtnHandler,
  showError,
  clearError,
  isValidEmail,
  showToast,
  postMidWife,
} from "./script.js";

document.addEventListener("DOMContentLoaded", () => {
  signUpBtnHandler();

  const emailPhoneInput = document.querySelector(
    'input[placeholder="e.g. name@gmail.com"]',
  );
  const passwordInput = document.querySelector('input[type="password"]');
  const loginBtn = document.querySelector(".login-btn");
  const googleBtn = document.querySelector("button.bg-\\[\\#98B5F5\\]");

  // Clear errors on input
  [emailPhoneInput, passwordInput].forEach((el) => {
    el?.addEventListener("input", () => clearError(el));
  });

  // LOGIN button
  loginBtn?.addEventListener("click", () => {
    let hasError = false;
    let loginEmail;
    let loginPassword;

    // Email or phone check
    if (!emailPhoneInput?.value.trim()) {
      showError(emailPhoneInput, "Email or phone number is required.");
      hasError = true;
    } else {
      loginEmail = emailPhoneInput.value.trim();
    }

    // Password check
    if (!passwordInput?.value) {
      showError(passwordInput, "Password is required.");
      hasError = true;
    } else if (passwordInput.value.length < 8) {
      showError(passwordInput, "Password must be at least 8 characters.");
      hasError = true;
    } else {
      loginPassword = passwordInput.value.trim();
    }

    if (!hasError) {
      // Backend login
      loginUser();
      async function loginUser() {
        showToast("Logging in...");
        await postMidWife(
          "https://transitkey-backend.onrender.com/api/auth/login",
          "POST",
          { "Content-Type": "application/json" },
          "include",
          {
            email: loginEmail,
            password: loginPassword,
          },
        ).then((response) => {
          console.log(response);
        });
        // setTimeout(() => {
        //   window.location.href = "./passenger-home.html";
        // }, 1500);
      }

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
