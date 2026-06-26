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
        try {
          showToast("Logging in...");
          let userDetails;
          let response = await postMidWife(
            "https://transitkey-be.onrender.com/api/auth/passenger/register",
            "POST",
            { "Content-Type": "application/json" },
            "include",
            loginEmail.includes("@")
              ? { email: loginEmail, password: loginPassword }
              : { number: loginEmail, password: loginPassword },
          );

          userDetails = await response.json();

          console.log(userDetails);
          if (userDetails.message == "Success") {
            showToast(`${userDetails.message}!`);
            console.log(userDetails.user.name, userDetails.user.number);
            sessionStorage.setItem("name", userDetails.user.name);
            sessionStorage.setItem("number", userDetails.user.number);
            setTimeout(() => {
              window.location.href = "./passenger-home.html";
            }, 1500);
          } else {
            console.log(userDetails.message);
            showToast(`${userDetails.message}`);
            sessionStorage.clear();
          }
        } catch (error) {
          showToast("Encountered error! Login failed", "Failure");
        }
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
