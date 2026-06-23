// passenger-trip-details.js
// Builds the trip progress timeline (with strikethrough for completed stops)
// and wires up the Track Live, Share Trip, and Report Issue buttons

document.addEventListener("DOMContentLoaded", function () {

  // Trip stops data — status can be "done", "current", or "upcoming"
  var stops = [
    { name: "Jibowu Motor Park, Lagos", note: "Origin - Departed 08:15 AM", status: "done" },
    { name: "Berger Bus Stop", note: "Arrived 08:42 - Departed 08:48 AM", status: "done" },
    { name: "Mowe", note: "In Progress", status: "current" },
    { name: "Redemption City (RCCG Camp)", note: "Estimated 10:10 AM", status: "upcoming" },
    { name: "Sagamu Interchange", note: "Estimated 11:45 AM", status: "upcoming" },
    { name: "Iwo Road, Ibadan", note: "Estimated 12:50 PM", status: "upcoming" },
    { name: "Ibadan Motor Terminal", note: "Final Stop - 1:30 PM", status: "upcoming" },
  ];

  // ---- Build one stop row ----
  function buildStopRow(stop, isLastStop) {
    var row = document.createElement("div");
    row.className = "flex gap-3";

    // Left column: dot + connecting line
    var leftCol = document.createElement("div");
    leftCol.className = "flex flex-col items-center";

    var dot = document.createElement("div");
    if (stop.status === "done") {
      dot.className = "w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0";
      dot.innerHTML = '<svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>';
    } else if (stop.status === "current") {
      dot.className = "w-5 h-5 rounded-full bg-[#2563EB] border-4 border-blue-200 flex-shrink-0";
    } else {
      dot.className = "w-4 h-4 rounded-full bg-gray-300 flex-shrink-0 mt-0.5";
    }
    leftCol.appendChild(dot);

    if (!isLastStop) {
      var line = document.createElement("div");
      line.className = "w-0.5 flex-1 bg-gray-200 my-1";
      line.style.minHeight = "28px";
      leftCol.appendChild(line);
    }

    // Right column: text
    var rightCol = document.createElement("div");
    rightCol.className = "pb-5 flex-1";

    var nameText = document.createElement("p");
    nameText.className = "text-sm font-bold";
    if (stop.status === "done") {
      nameText.classList.add("line-through", "text-gray-400");
    } else if (stop.status === "current") {
      nameText.classList.add("text-gray-900");
    } else {
      nameText.classList.add("text-gray-900");
    }
    nameText.textContent = stop.name;

    var noteText = document.createElement("p");
    noteText.className = "text-xs";
    if (stop.status === "current") {
      noteText.classList.add("text-[#2563EB]", "font-semibold");
    } else {
      noteText.classList.add("text-gray-400");
    }
    noteText.textContent = stop.note;

    rightCol.appendChild(nameText);
    rightCol.appendChild(noteText);

    row.appendChild(leftCol);
    row.appendChild(rightCol);

    return row;
  }

  // ---- Render the stop list into both mobile and desktop containers ----
  function renderStopList(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    for (var i = 0; i < stops.length; i++) {
      var isLast = i === stops.length - 1;
      container.appendChild(buildStopRow(stops[i], isLast));
    }
  }

  renderStopList("trip-mobile-progress-list");
  renderStopList("trip-desktop-progress-list");

  // ---- Track Live button ----
  function goToLiveTracking() {
    window.location.href = "./passenger-live-tracking.html";
  }

  var mobileTrackBtn = document.getElementById("trip-mobile-track-btn");
  var desktopTrackBtn = document.getElementById("trip-desktop-track-btn");
  if (mobileTrackBtn) mobileTrackBtn.addEventListener("click", goToLiveTracking);
  if (desktopTrackBtn) desktopTrackBtn.addEventListener("click", goToLiveTracking);

  // ---- Share Trip button (demo: copies a message to clipboard) ----
  function shareTrip(buttonEl) {
    var shareMessage = "Track my TransitKey trip from Lagos to Ibadan: Bus LND 472 YK, currently at Mowe.";

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareMessage).then(function () {
        var originalText = buttonEl.textContent;
        buttonEl.textContent = "Link Copied!";
        setTimeout(function () {
          buttonEl.textContent = originalText;
        }, 1500);
      });
    }
  }

  var mobileShareBtn = document.getElementById("trip-mobile-share-btn");
  var desktopShareBtn = document.getElementById("trip-desktop-share-btn");
  if (mobileShareBtn) {
    mobileShareBtn.addEventListener("click", function () {
      shareTrip(mobileShareBtn);
    });
  }
  if (desktopShareBtn) {
    desktopShareBtn.addEventListener("click", function () {
      shareTrip(desktopShareBtn);
    });
  }

  // ---- Report Issue button ----
  function goToReportIssue() {
    window.location.href = "./passenger-notifications.html";
  }

  var mobileReportBtn = document.getElementById("trip-mobile-report-btn");
  var desktopReportBtn = document.getElementById("trip-desktop-report-btn");
  if (mobileReportBtn) mobileReportBtn.addEventListener("click", goToReportIssue);
  if (desktopReportBtn) desktopReportBtn.addEventListener("click", goToReportIssue);

});
