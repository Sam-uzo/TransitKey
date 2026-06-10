// ============================================================
// details.js — passenger-details.html logic
// ============================================================
import { signUpBtnHandler } from "./script.js";

document.addEventListener("DOMContentLoaded", () => {
  signUpBtnHandler();

  // ------- TRACK IN FULLSCREEN button → map page -------
  const trackBtn = document.querySelector("button.border-4");
  if (trackBtn && trackBtn.textContent.includes("FULLSCREEN")) {
    trackBtn.addEventListener("click", () => {
      window.location.href = "./passenger-map.html";
    });
  }

  // ------- Report Driver / Fare Issue link → report page -------
  const allLinks = document.querySelectorAll("a");
  allLinks.forEach((link) => {
    if (link.textContent.includes("Report Driver")) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "./passenger-report.html?screen=complaint";
      });
    }
    if (link.textContent.includes("View Previous Trips")) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "./passenger-profile.html";
      });
    }
    if (link.textContent.includes("Contact Transport Support")) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "./passenger-notification.html";
      });
    }
  });
});
