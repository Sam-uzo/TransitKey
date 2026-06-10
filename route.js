// ============================================================
// route.js — Passenger-route.html logic
// ============================================================
import { signUpBtnHandler, showToast } from "./script.js";

document.addEventListener("DOMContentLoaded", () => {
  signUpBtnHandler();

  // Pre-fill from/to if coming from home search
  const params = new URLSearchParams(window.location.search);
  const fromParam = params.get("from");
  const toParam = params.get("to");

  const fromInput = document.querySelector('input[placeholder="Central Business Area"]');
  const toInput   = document.querySelector('input[placeholder="Enter Destination"]');

  if (fromParam && fromInput) fromInput.value = fromParam;
  if (toParam && toInput)     toInput.value = toParam;

  // ------- CHECK ROUTES button -------
  const checkBtn = document.querySelector("button.bg-blue-500");
  if (checkBtn) {
    checkBtn.addEventListener("click", () => {
      const from = fromInput?.value.trim();
      const to   = toInput?.value.trim();

      if (!from) {
        fromInput?.classList.add("border-red-500");
        showToast("Please enter your current location.", "error");
        return;
      }
      if (!to) {
        toInput?.classList.add("border-red-500");
        showToast("Please enter a destination.", "error");
        return;
      }

      fromInput?.classList.remove("border-red-500");
      toInput?.classList.remove("border-red-500");
      showToast("Routes updated!");
    });
  }

  // Clear red border on type
  [fromInput, toInput].forEach((input) => {
    input?.addEventListener("input", () => input.classList.remove("border-red-500"));
  });

  // ------- SELECT ROUTE buttons → details page -------
  const selectBtns = document.querySelectorAll("button.border-2");
  selectBtns.forEach((btn) => {
    if (btn.textContent.includes("Select Route")) {
      btn.addEventListener("click", () => {
        window.location.href = "./passenger-details.html";
      });
    }
  });
});
