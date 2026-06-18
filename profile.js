// profile.js — passenger-profile.html logic

import {
  showError,
  isValidEmail,
  isValidPhone,
  clearError,
  showToast,
} from "./script.js";

document.addEventListener("DOMContentLoaded", () => {
  //Toggle switch (Push Notifications)
  const toggle = document.getElementById("toggle-notif");
  const dot = toggle.querySelector("div");
  const addRouteCard = document.querySelector(".border-dashed");
  if (toggle) {
    let isOn = true;

    toggle.addEventListener("click", () => {
      isOn = !isOn;

      if (isOn) {
        toggle.classList.remove("bg-gray-300");
        toggle.classList.add("bg-[#2563EB]");
        dot.classList.add("ml-auto");
        dot.classList.remove("ml-0");
        showToast("Push notifications enabled.");
      } else {
        toggle.classList.remove("bg-[#2563EB]");
        toggle.classList.add("bg-gray-300");
        dot.classList.remove("ml-auto");
        dot.classList.add("ml-0");
        showToast("Push notifications disabled.");
      }
    });
  }

  // ------- EDIT INFORMATION button with validation -------
  const nameInput = document.querySelector(
    'input[placeholder="Isaiah Adebayo"]',
  );
  const phoneInput = document.querySelector(
    'input[placeholder="+234 08095674832"]',
  );
  const emailInput = document.querySelector(
    'input[placeholder="name@gmail.com"]',
  );
  const editBtn = document.querySelector("button.bg-\\[\\#93C5FD\\]");

  let isEditing = false;

  // Clear errors on input
  [nameInput, phoneInput, emailInput].forEach((el) => {
    el?.addEventListener("input", () => clearError(el));
  });

  editBtn?.addEventListener("click", () => {
    if (!isEditing) {
      // Switch to edit mode
      isEditing = true;
      editBtn.textContent = "SAVE CHANGES";
      editBtn.classList.remove("bg-[#93C5FD]");
      editBtn.classList.add("bg-[#2563EB]", "text-white");

      [nameInput, phoneInput, emailInput].forEach((el) => {
        if (el) {
          el.removeAttribute("disabled");
          el.classList.add("border-[#2563EB]");
          el.classList.remove("text-gray-400");
        }
      });
    }

    // Save mode — validate before saving
    let hasError = false;

    if (!nameInput?.value.trim()) {
      showError(nameInput, "Full name is required.");
      hasError = true;
    }

    if (!phoneInput?.value.trim()) {
      showError(phoneInput, "Phone number is required.");
      hasError = true;
    } else if (!isValidPhone(phoneInput.value)) {
      showError(phoneInput, "Enter a valid Nigerian phone number.");
      hasError = true;
    }

    if (!emailInput?.value.trim()) {
      showError(emailInput, "Email address is required.");
      hasError = true;
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, "Enter a valid email address.");
      hasError = true;
    }

    if (!hasError) {
      isEditing = false;
      editBtn.textContent = "EDIT INFORMATION";
      editBtn.classList.add("bg-[#93C5FD]");
      editBtn.classList.remove("bg-[#2563EB]", "text-white");

      [nameInput, phoneInput, emailInput].forEach((el) => {
        if (el) {
          el.classList.remove("border-[#2563EB]");
          el.classList.add("text-gray-400");
        }
      });

      // Backend would save changes here
      showToast("Profile updated successfully!");
    }
  });

  // ------- ADD NEW ROUTE -------

  addRouteCard?.addEventListener("click", () => {
    showToast("Route saving coming soon.");
  });

  //Contact Support
  document.querySelectorAll("button").forEach((btn) => {
    if (btn.textContent.includes("Contact Support")) {
      btn.addEventListener("click", () => {
        window.location.href = "./passenger-notification.html";
      });
    }

    // LOG OUT
    if (btn.textContent.trim() === "LOG OUT") {
      btn.addEventListener("click", () => {
        showToast("Logging out...");
        setTimeout(() => {
          window.location.href = "./passenger-login.html";
        }, 1500);
      });
    }
  });

  // Two-Factor Auth and Manage Payment links
  document.querySelectorAll("a.underline").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (link.textContent.trim() === "Enable") {
        showToast("Two-factor authentication coming soon.");
      }
      if (link.textContent.trim() === "Manage") {
        showToast("Payment management coming soon.");
      }
    });
  });
});


fetch("https://transitkey-backend.vercel.app/api/route")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });