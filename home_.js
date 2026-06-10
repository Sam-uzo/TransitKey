// ============================================================
// home_.js — passenger-home.html logic
// ============================================================
import { signUpBtnHandler, showToast } from "./script.js";

document.addEventListener("DOMContentLoaded", () => {
  signUpBtnHandler();

  // ------- FIND ROUTE button -------
  const fromInput = document.querySelector('input[placeholder="Origin Station"]');
  const toInput = document.querySelector('input[placeholder="Destination Station"]');
  const findRouteBtn = document.querySelector("button.bg-blue-500");

  if (findRouteBtn) {
    findRouteBtn.addEventListener("click", () => {
      const from = fromInput?.value.trim();
      const to = toInput?.value.trim();

      if (!from && !to) {
        showToast("Please enter an origin and destination.", "error");
        fromInput?.classList.add("border-red-500");
        toInput?.classList.add("border-red-500");
        return;
      }
      if (!from) {
        showToast("Please enter an origin station.", "error");
        fromInput?.classList.add("border-red-500");
        return;
      }
      if (!to) {
        showToast("Please enter a destination station.", "error");
        toInput?.classList.add("border-red-500");
        return;
      }

      // Clear errors and go to route page
      fromInput?.classList.remove("border-red-500");
      toInput?.classList.remove("border-red-500");
      window.location.href = `./Passenger-route.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
    });
  }

  // Clear red border on input when user types
  [fromInput, toInput].forEach((input) => {
    input?.addEventListener("input", () => {
      input.classList.remove("border-red-500");
    });
  });

  // ------- VIEW ALL NOTIFICATIONS button -------
  const viewNotifsBtn = document.querySelector("button.border-4");
  if (viewNotifsBtn && viewNotifsBtn.textContent.includes("NOTIFICATIONS")) {
    viewNotifsBtn.addEventListener("click", () => {
      window.location.href = "./passenger-notification.html";
    });
  }
});
