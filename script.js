// ============================================================
// script.js — Shared utilities for all TransitKey pages
// ============================================================

// ------- Sign-up / Login button handler -------
export const signUpBtn = document.querySelector(".SignUp-btn");

export function signUpBtnHandler() {
  if (!signUpBtn) return;

  if (document.title === "Create Account") {
    signUpBtn.addEventListener("click", () => {
      window.location.href = "./passenger-login.html";
    });
  } else if (document.title === "Login") {
    signUpBtn.addEventListener("click", () => {
      window.location.href = "./index.html";
    });
  } else {
    signUpBtn.addEventListener("click", () => {
      window.location.href = "./index.html";
    });
  }
}

// ------- Show error below an input -------
export function showError(inputEl, message) {
  clearError(inputEl);
  inputEl.classList.add("border-red-500");
  const errorEl = document.createElement("p");
  errorEl.classList.add("text-red-500", "text-xs", "mt-1", "error-msg");
  errorEl.textContent = message;
  inputEl.parentElement.appendChild(errorEl);
}

// ------- Clear error from an input -------
export function clearError(inputEl) {
  inputEl.classList.remove("border-red-500");
  const existing = inputEl.parentElement.querySelector(".error-msg");
  if (existing) existing.remove();
}

// ------- Password strength checker -------
export function checkPasswordStrength(password) {
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters." };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Must include at least one uppercase letter." };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Must include at least one number." };
  }
  return { valid: true, message: "" };
}

// ------- Email validator -------
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ------- Nigerian phone validator -------
export function isValidPhone(phone) {
  return /^(\+?234|0)[789][01]\d{8}$/.test(phone.replace(/\s/g, ""));
}

// ------- Toast notification -------
export function showToast(message, type = "success") {
  const existing = document.querySelector(".transitkey-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = `transitkey-toast fixed bottom-6 right-6 z-50 px-6 py-3 text-sm font-semibold shadow-lg ${
    type === "success" ? "bg-[#2563EB] text-white" : "bg-red-500 text-white"
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

document.addEventListener("DOMContentLoaded", () => {
  signUpBtnHandler();
});
