// passenger-live-tracking.js
// Wires up the action buttons on the live tracking screen

document.addEventListener("DOMContentLoaded", function () {

  // ---- Emergency Help button ----
  function handleEmergencyClick() {
    var confirmed = window.confirm("This will alert TransitKey emergency support and share your live location. Continue?");
    if (confirmed) {
      window.alert("Emergency support has been notified. Stay calm, help is on the way.");
    }
  }

  var mobileEmergencyBtn = document.getElementById("live-mobile-emergency-btn");
  var desktopEmergencyBtn = document.getElementById("live-desktop-emergency-btn");
  if (mobileEmergencyBtn) mobileEmergencyBtn.addEventListener("click", handleEmergencyClick);
  if (desktopEmergencyBtn) desktopEmergencyBtn.addEventListener("click", handleEmergencyClick);

  // ---- Report Issue button ----
  function goToReportIssue() {
    window.location.href = "./passenger-notifications.html";
  }

  var mobileReportBtn = document.getElementById("live-mobile-report-btn");
  var desktopReportBtn = document.getElementById("live-desktop-report-btn");
  if (mobileReportBtn) mobileReportBtn.addEventListener("click", goToReportIssue);
  if (desktopReportBtn) desktopReportBtn.addEventListener("click", goToReportIssue);

  // ---- Share Location button ----
  function handleShareClick(buttonEl) {
    var shareMessage = "I'm on a TransitKey trip from Lagos to Ibadan, currently near Mowe. Track my live location.";

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareMessage).then(function () {
        var originalText = buttonEl.querySelector("svg").nextSibling;
        var labelSpan = buttonEl.childNodes[buttonEl.childNodes.length - 1];
        var originalLabel = labelSpan.textContent;
        labelSpan.textContent = "Copied!";
        setTimeout(function () {
          labelSpan.textContent = originalLabel;
        }, 1500);
      });
    }
  }

  var mobileShareBtn = document.getElementById("live-mobile-share-btn");
  var desktopShareBtn = document.getElementById("live-desktop-share-btn");
  if (mobileShareBtn) {
    mobileShareBtn.addEventListener("click", function () {
      handleShareClick(mobileShareBtn);
    });
  }
  if (desktopShareBtn) {
    desktopShareBtn.addEventListener("click", function () {
      handleShareClick(desktopShareBtn);
    });
  }

  // ---- Locate Me button (re-centers map — demo only) ----
  function handleLocateClick(buttonEl) {
    buttonEl.classList.add("ring-2", "ring-[#2563EB]");
    setTimeout(function () {
      buttonEl.classList.remove("ring-2", "ring-[#2563EB]");
    }, 600);
  }

  var mobileLocateBtn = document.getElementById("live-mobile-locate-btn");
  var desktopLocateBtn = document.getElementById("live-desktop-locate-btn");
  if (mobileLocateBtn) {
    mobileLocateBtn.addEventListener("click", function () {
      handleLocateClick(mobileLocateBtn);
    });
  }
  if (desktopLocateBtn) {
    desktopLocateBtn.addEventListener("click", function () {
      handleLocateClick(desktopLocateBtn);
    });
  }

});
