// register.js — index.html (Create Account) form validation

import {
  signUpBtnHandler,
  showError,
  clearError,
  checkPasswordStrength,
  isValidEmail,
  isValidPhone,
  showToast,
  postMidWife,
} from "./script.js";

document.addEventListener("DOMContentLoaded", () => {
  signUpBtnHandler();

  const fullNameInput = document.querySelector(
    'input[placeholder="Isaiah Adebayo"]',
  );
  const phoneInput = document.querySelector('input[type="tel"]');
  const emailInput = document.querySelector('input[type="email"]');
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  const passwordInput = passwordInputs[0];
  const confirmInput = passwordInputs[1];
  const termsCheckbox = document.querySelector('input[type="checkbox"]');
  const createBtn = document.querySelector(".register-submit");

  // Clear errors as user types
  [fullNameInput, phoneInput, emailInput, passwordInput, confirmInput].forEach(
    (el) => {
      el?.addEventListener("input", () => clearError(el));
    },
  );

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
    let name;
    let phone;
    let email;
    let password1;
    let password2;
    let checked;

    // Full name
    if (!fullNameInput?.value.trim()) {
      showError(fullNameInput, "Full name is required.");
      hasError = true;
    } else {
      name = fullNameInput.value.trim();
    }

    // Phone
    if (!phoneInput?.value.trim()) {
      showError(phoneInput, "Phone number is required.");
      hasError = true;
    } else if (!isValidPhone(phoneInput.value)) {
      showError(
        phoneInput,
        "Enter a valid Nigerian phone number (e.g. 08012345678).",
      );
      hasError = true;
    } else {
      phone = phoneInput.value.trim();
    }

    // Email
    if (!emailInput?.value.trim()) {
      showError(emailInput, "Email address is required.");
      hasError = true;
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, "Enter a valid email address.");
      hasError = true;
    } else {
      email = emailInput.value.trim();
    }

    // Password strength
    const strengthResult = checkPasswordStrength(passwordInput?.value || "");
    if (!passwordInput?.value) {
      showError(passwordInput, "Password is required.");
      hasError = true;
    } else if (!strengthResult.valid) {
      showError(passwordInput, strengthResult.message);
      hasError = true;
    } else {
      password1 = passwordInput.value;
    }

    // Confirm password
    if (!confirmInput?.value) {
      showError(confirmInput, "Please confirm your password.");
      hasError = true;
    } else if (passwordInput?.value !== confirmInput?.value) {
      showError(confirmInput, "Passwords do not match.");
      hasError = true;
    } else {
      password2 = confirmInput.value;
    }

    //Passwords match
    if (password1 != password2) {
      showError(confirmInput, "Passwords do not match.");
      hasError = true;
    } else {
      clearError(confirmInput);
      password1 = password2;
    }

    // Terms checkbox
    if (!termsCheckbox?.checked) {
      showToast(
        "You must agree to the Terms of Service and Privacy Policy.",
        "error",
      );
      hasError = true;
    }

    if (!hasError) {
      // Backend registration
      showToast("Please wait....")
      registerUser();
    }
    async function registerUser() {
      await postMidWife(
        "https://transitkey-backend.onrender.com/api/auth/register",
        "POST",
        { "Content-Type": "application/json" },
        "include",
        {
          name: name,
          email: email,
          number: phone,
          password: password1,
        },
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.message == "Success") {
            showToast(`${data.message}! Redirecting to login...`);
            setTimeout(() => {
              window.location.href = "./passenger-login.html";
            }, 1800);
          }else{
            showToast(`${data.message}`,"failure")
          }
        }).catch(error=>{
          showToast("Sorry! There was a problem creating this account","failure")
        });


    }
  });
});


