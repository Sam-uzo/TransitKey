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

  const sessionName = sessionStorage.getItem("name");
  let anchors = document.querySelectorAll("a");
  anchors.forEach((anchor) => {
    navTags.forEach((tag) => {
      if (anchor.href.includes(tag)) {
        anchor.addEventListener("click", () => {
          if (sessionName == null && sessionName == undefined) {
            setTimeout(() => {
              showToast("Must Login", "failure");
            }, 1000);
            anchor.href.includes("home")
              ? (anchor.href = "./passenger-login.html")
              : anchor.href.includes("route")
                ? (anchor.href = "./passenger-login.html")
                : anchor.href.includes("details")
                  ? (anchor.href = "./passenger-login.html")
                  : anchor.href.includes("map")
                    ? (anchor.href = "./passenger-login.html")
                    : anchor.href.includes("report")
                      ? (anchor.href = "./passenger-login.html")
                      : anchor.href.includes("notification")
                        ? (anchor.href = "./passenger-login.html")
                        : anchor.href.includes("profile")
                          ? (anchor.href = "./passenger-login.html")
                          : (anchor.href = "#");
          } else {
            setTimeout(() => {
              showToast("You've log-in successfully", "success");
            }, 1000);
          }
        });
      }
    });
  });
});
