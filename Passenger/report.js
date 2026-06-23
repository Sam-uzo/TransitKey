// ============================================================
// report.js — passenger-report.html logic
// Screen switching uses window.location.href + URL params
// instead of display:none / display:flex
// ============================================================
import { showError, clearError, showToast } from "./script.js";

// ------- Screen switcher using URL params -------
function showScreen(screenName) {
  // Update the URL without reloading the page
  const url = new URL(window.location.href);
  url.searchParams.set("screen", screenName);
  window.history.pushState({}, "", url);

  // Hide all screens
  document.getElementById("screen-picker")?.classList.add("hidden");
  document.getElementById("screen-complaint")?.classList.add("hidden");
  document.getElementById("screen-emergency")?.classList.add("hidden");

  // Show the target screen
  document.getElementById(`screen-${screenName}`)?.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {

  // Read URL param on page load to decide which screen to show
  const params = new URLSearchParams(window.location.search);
  const screen = params.get("screen");

  if (screen === "complaint" || screen === "emergency") {
    showScreen(screen);
  }
  // Default: picker is already visible in HTML

  // ------- Picker screen: CONTINUE button -------
  const continueBtn = document.querySelector("#screen-picker button.border-black, #screen-picker button.border");
  document.querySelector("#screen-picker")?.querySelectorAll("button").forEach((btn) => {
    if (btn.textContent.trim() === "CONTINUE") {
      btn.addEventListener("click", () => showScreen("complaint"));
    }
    if (btn.textContent.trim() === "REPORT") {
      btn.addEventListener("click", () => showScreen("emergency"));
    }
    // X close button → go back home
    if (btn.textContent.trim() === "×") {
      btn.addEventListener("click", () => {
        window.location.href = "./passenger-home.html";
      });
    }
  });

  // ------- Complaint screen validation -------
  const categorySelect  = document.querySelector("#screen-complaint select");
  const descriptionArea = document.querySelector("#screen-complaint textarea");
  const cancelBtn       = document.querySelector("#screen-complaint button:first-of-type");
  const submitBtn       = document.querySelector("#screen-complaint button:last-of-type");

  // Find CANCEL and SUBMIT COMPLAINT properly
  document.querySelector("#screen-complaint")?.querySelectorAll("button").forEach((btn) => {
    if (btn.textContent.trim() === "CANCEL") {
      btn.addEventListener("click", () => showScreen("picker"));
    }

    if (btn.textContent.includes("SUBMIT COMPLAINT")) {
      btn.addEventListener("click", () => {
        let hasError = false;

        // Category must be selected
        if (!categorySelect?.value) {
          categorySelect?.classList.add("border-red-500");
          showToast("Please select a complaint category.", "error");
          hasError = true;
        } else {
          categorySelect?.classList.remove("border-red-500");
        }

        // Description must be filled
        if (!descriptionArea?.value.trim()) {
          descriptionArea?.classList.add("border-red-500");
          if (!hasError) showToast("Please describe the issue.", "error");
          hasError = true;
        } else if (descriptionArea.value.trim().length < 20) {
          descriptionArea?.classList.add("border-red-500");
          if (!hasError) showToast("Description is too short. Please provide more detail.", "error");
          hasError = true;
        } else {
          descriptionArea?.classList.remove("border-red-500");
        }

        if (!hasError) {
          // Backend would handle submission here
          showToast("Complaint submitted successfully!");
          setTimeout(() => {
            window.location.href = "./passenger-home.html";
          }, 2000);
        }
      });
    }
  });

  // Clear errors on change
  categorySelect?.addEventListener("change", () => categorySelect.classList.remove("border-red-500"));
  descriptionArea?.addEventListener("input", () => descriptionArea.classList.remove("border-red-500"));

  // ------- Emergency screen -------
  const emergencyBtns = document.querySelectorAll(".emergency-btn");
  let selectedEmergency = null;

  emergencyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Deselect all
      emergencyBtns.forEach((b) => {
        b.classList.remove("border-[#2563EB]", "bg-blue-50");
      });
      // Select clicked
      btn.classList.add("border-[#2563EB]", "bg-blue-50");
      selectedEmergency = btn.textContent.trim();
    });
  });

  const emergencyTextarea = document.querySelector("#screen-emergency textarea");

  document.querySelector("#screen-emergency")?.querySelectorAll("button").forEach((btn) => {
    // Back button
    if (btn.textContent.includes("Back to report type")) {
      btn.addEventListener("click", () => showScreen("picker"));
    }

    // Call emergency services — stub
    if (btn.textContent.includes("CALL EMERGENCY SERVICES")) {
      btn.addEventListener("click", () => {
        showToast("Connecting to emergency services...");
      });
    }

    // Submit emergency alert
    if (btn.textContent.includes("SUBMIT EMERGENCY ALERT")) {
      btn.addEventListener("click", () => {
        let hasError = false;

        if (!selectedEmergency) {
          showToast("Please select an emergency type.", "error");
          hasError = true;
        }

        if (!emergencyTextarea?.value.trim()) {
          emergencyTextarea?.classList.add("border-red-500");
          if (!hasError) showToast("Please provide a brief description.", "error");
          hasError = true;
        } else {
          emergencyTextarea?.classList.remove("border-red-500");
        }

        if (!hasError) {
          // Backend would handle this here
          showToast("Emergency alert sent! Help is on the way.");
          setTimeout(() => {
            window.location.href = "./passenger-home.html";
          }, 2500);
        }
      });
    }
  });

  emergencyTextarea?.addEventListener("input", () => emergencyTextarea.classList.remove("border-red-500"));
});
