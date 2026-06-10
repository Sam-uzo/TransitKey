// ============================================================
// map.js — passenger-map.html logic
// ============================================================
import { showToast } from "./script.js";

document.addEventListener("DOMContentLoaded", () => {

  // ------- REPORT AN ISSUE button → report page (complaint screen) -------
  const reportIssueBtn = document.querySelector("button.bg-\\[\\#93C5FD\\]");
  if (reportIssueBtn) {
    reportIssueBtn.addEventListener("click", () => {
      window.location.href = "./passenger-report.html?screen=complaint";
    });
  }

  // ------- EMERGENCY REPORT button → report page (emergency screen) -------
  const allButtons = document.querySelectorAll("button");
  allButtons.forEach((btn) => {
    if (btn.textContent.trim() === "EMERGENCY REPORT") {
      btn.addEventListener("click", () => {
        window.location.href = "./passenger-report.html?screen=emergency";
      });
    }
  });

  // ------- Zoom + / - buttons (visual only — no real map yet) -------
  const zoomBtns = document.querySelectorAll("button");
  zoomBtns.forEach((btn) => {
    if (btn.textContent.trim() === "+") {
      btn.addEventListener("click", () => showToast("Zoom in — live map coming soon."));
    }
    if (btn.textContent.trim() === "−") {
      btn.addEventListener("click", () => showToast("Zoom out — live map coming soon."));
    }
  });
});
