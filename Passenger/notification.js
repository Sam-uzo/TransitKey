// ============================================================
// notification.js — passenger-notification.html logic
// ============================================================
import { showToast } from "./script.js";

document.addEventListener("DOMContentLoaded", () => {
  // ------- Mark all as read -------
  const markAllBtn = document.querySelector("button.border-2");
  if (markAllBtn && markAllBtn.textContent.includes("Mark all")) {
    markAllBtn.addEventListener("click", () => {
      showToast("All notifications marked as read.");
    });
  }

  // ------- Dismiss buttons -------
  document.querySelectorAll("button").forEach((btn) => {
    if (btn.textContent.trim() === "Dismiss") {
      btn.addEventListener("click", () => {
        // Remove the parent notification card
        const card = btn.closest(".border-2.border-gray-300");
        if (card) {
          card.style.opacity = "0";
          card.style.transition = "opacity 0.3s";
          setTimeout(() => card.remove(), 300);
        }
        showToast("Notification dismissed.");
      });
    }

    // View Safety Protocol
    if (btn.textContent.includes("View Safety Protocol")) {
      btn.addEventListener("click", () => {
        showToast("Safety protocol information coming soon.");
      });
    }

    // Fare Update
    if (btn.textContent.trim() === "Fare Update") {
      btn.addEventListener("click", () => {
        showToast("Fare update details coming soon.");
      });
    }

    // Transport Alert
    if (btn.textContent.trim() === "Transport Alert") {
      btn.addEventListener("click", () => {
        showToast("Transport alert details coming soon.");
      });
    }

    // Load older notifications
    if (btn.textContent.includes("Load older")) {
      btn.addEventListener("click", () => {
        showToast("No older notifications at this time.");
      });
    }

    // Filter button
    if (btn.textContent.trim() === "Filter") {
      btn.addEventListener("click", () => {
        showToast("Filter feature coming soon.");
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
