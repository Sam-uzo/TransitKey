// passenger-profile.js
// Builds the Saved Routes cards and Settings list, and handles the Sign Out button

document.addEventListener("DOMContentLoaded", function () {

  // ---- Saved routes data ----
  var savedRoutes = [
    { label: "School Travel", routeName: "Abuja to Osun" },
    { label: "Weekend Trip", routeName: "Lagos to Ibadan" },
  ];

  // ---- Settings list data ----
  var settingsItems = [
    {
      iconSvg: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/></svg>',
      label: "Notification Preferences",
    },
    {
      iconSvg: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>',
      label: "Privacy Settings",
    },
    {
      iconSvg: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/></svg>',
      label: "Help & Support",
    },
    {
      iconSvg: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>',
      label: "Terms & Conditions",
    },
  ];

  // ---- Build one saved route card ----
  function buildRouteCard(route, cardId) {
    var card = document.createElement("div");
    card.id = cardId;
    card.className = "bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors";

    var iconWrap = document.createElement("div");
    iconWrap.className = "w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0";
    iconWrap.innerHTML = '<svg class="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>';

    var textWrap = document.createElement("div");
    textWrap.className = "flex-1";

    var labelText = document.createElement("p");
    labelText.className = "text-xs text-gray-400";
    labelText.textContent = route.label;

    var routeNameText = document.createElement("p");
    routeNameText.className = "font-bold text-gray-900 text-sm";
    routeNameText.textContent = route.routeName;

    textWrap.appendChild(labelText);
    textWrap.appendChild(routeNameText);

    var arrowIcon = document.createElement("svg");
    arrowIcon.setAttribute("class", "w-4 h-4 text-gray-300 flex-shrink-0");
    arrowIcon.setAttribute("fill", "none");
    arrowIcon.setAttribute("viewBox", "0 0 24 24");
    arrowIcon.setAttribute("stroke", "currentColor");
    arrowIcon.setAttribute("stroke-width", "2");
    arrowIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>';

    card.appendChild(iconWrap);
    card.appendChild(textWrap);
    card.appendChild(arrowIcon);

    card.addEventListener("click", function () {
      window.location.href = "./passenger-route.html";
    });

    return card;
  }

  // ---- Build one settings row ----
  function buildSettingsRow(item, rowId, isLastRow) {
    var row = document.createElement("div");
    row.id = rowId;
    row.className = "flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors";
    if (!isLastRow) {
      row.classList.add("border-b", "border-gray-100");
    }

    var iconWrap = document.createElement("div");
    iconWrap.className = "text-gray-500 flex-shrink-0";
    iconWrap.innerHTML = item.iconSvg;

    var labelText = document.createElement("p");
    labelText.className = "flex-1 text-sm font-semibold text-gray-700";
    labelText.textContent = item.label;

    var arrowIcon = document.createElement("svg");
    arrowIcon.setAttribute("class", "w-4 h-4 text-gray-300 flex-shrink-0");
    arrowIcon.setAttribute("fill", "none");
    arrowIcon.setAttribute("viewBox", "0 0 24 24");
    arrowIcon.setAttribute("stroke", "currentColor");
    arrowIcon.setAttribute("stroke-width", "2");
    arrowIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>';

    row.appendChild(iconWrap);
    row.appendChild(labelText);
    row.appendChild(arrowIcon);

    return row;
  }

  // ---- Render saved routes into both containers ----
  function renderSavedRoutes(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    for (var i = 0; i < savedRoutes.length; i++) {
      container.appendChild(buildRouteCard(savedRoutes[i], containerId + "-route-" + i));
    }
  }

  renderSavedRoutes("profile-mobile-routes-list");
  renderSavedRoutes("profile-desktop-routes-list");

  // ---- Render settings list into both containers ----
  function renderSettingsList(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    for (var i = 0; i < settingsItems.length; i++) {
      var isLast = i === settingsItems.length - 1;
      container.appendChild(buildSettingsRow(settingsItems[i], containerId + "-setting-" + i, isLast));
    }
  }

  renderSettingsList("profile-mobile-settings-list");
  renderSettingsList("profile-desktop-settings-list");

  // ---- Mark all as read button (demo only — no unread state shown here) ----
  var mobileMarkReadBtn = document.getElementById("profile-mobile-mark-read-btn");
  var desktopMarkReadBtn = document.getElementById("profile-desktop-mark-read-btn");

  function handleMarkRead(buttonEl) {
    var originalText = buttonEl.textContent;
    buttonEl.textContent = "All routes marked!";
    setTimeout(function () {
      buttonEl.textContent = originalText;
    }, 1500);
  }

  if (mobileMarkReadBtn) {
    mobileMarkReadBtn.addEventListener("click", function () {
      handleMarkRead(mobileMarkReadBtn);
    });
  }
  if (desktopMarkReadBtn) {
    desktopMarkReadBtn.addEventListener("click", function () {
      handleMarkRead(desktopMarkReadBtn);
    });
  }

  // ---- Sign Out button ----
  function handleSignOut() {
    var confirmed = window.confirm("Are you sure you want to sign out?");
    if (confirmed) {
      window.location.href = "./passenger-login.html";
    }
  }

  var mobileSignOutBtn = document.getElementById("profile-mobile-signout-btn");
  var desktopSignOutBtn = document.getElementById("profile-desktop-signout-btn");

  if (mobileSignOutBtn) mobileSignOutBtn.addEventListener("click", handleSignOut);
  if (desktopSignOutBtn) desktopSignOutBtn.addEventListener("click", handleSignOut);

});
