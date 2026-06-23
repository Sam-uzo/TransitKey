// passenger-dashboard.js
// Handles route search and builds the featured route cards

document.addEventListener("DOMContentLoaded", function () {

  // Featured routes data
  var routes = [
    {
      tag: "BRT",
      name: "Ibadan to Lagos",
      fare: "₦10,000",
      eta: "15 mins",
      buses: "3 buses nearby",
    },
    {
      tag: "BRT",
      name: "Lagos to Abuja",
      fare: "₦35,000",
      eta: "15 hours",
      buses: "6 buses nearby",
    },
    {
      tag: "CAB",
      name: "Abuja to Kaduna",
      fare: "₦10,000",
      eta: "3 hours",
      buses: "5 buses nearby",
    },
  ];

  // ---- Build a single route card element ----
  function buildRouteCard(route) {
    var card = document.createElement("div");
    card.className = "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3 cursor-pointer hover:border-blue-300 transition-colors";

    // Top row: tag + name + fare
    var topRow = document.createElement("div");
    topRow.className = "flex items-center justify-between";

    var leftSide = document.createElement("div");
    leftSide.className = "flex items-center gap-2";

    var tagBadge = document.createElement("span");
    tagBadge.className = "bg-blue-100 text-[#2563EB] text-xs font-bold px-2 py-0.5 rounded";
    tagBadge.textContent = route.tag;

    var routeName = document.createElement("p");
    routeName.className = "font-bold text-gray-900";
    routeName.textContent = route.name;

    leftSide.appendChild(tagBadge);
    leftSide.appendChild(routeName);

    var fare = document.createElement("p");
    fare.className = "font-bold text-[#2563EB]";
    fare.textContent = route.fare;

    topRow.appendChild(leftSide);
    topRow.appendChild(fare);

    // Middle row: ETA + buses
    var midRow = document.createElement("div");
    midRow.className = "flex items-center gap-6 text-sm text-gray-500";

    var etaDiv = document.createElement("div");
    etaDiv.className = "flex items-center gap-1";
    etaDiv.innerHTML = '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';
    etaDiv.appendChild(document.createTextNode(" ETA " + route.eta));

    var busDiv = document.createElement("div");
    busDiv.className = "flex items-center gap-1 text-[#2563EB]";
    busDiv.innerHTML = '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>';
    busDiv.appendChild(document.createTextNode(" " + route.buses));

    midRow.appendChild(etaDiv);
    midRow.appendChild(busDiv);

    // Select button
    var selectBtn = document.createElement("button");
    selectBtn.className = "w-full border-2 border-[#2563EB] text-[#2563EB] font-semibold py-2.5 rounded-xl text-sm hover:bg-blue-50 transition-colors";
    selectBtn.textContent = "Select Route";

    selectBtn.addEventListener("click", function () {
      window.location.href = "./passenger-route.html";
    });

    card.appendChild(topRow);
    card.appendChild(midRow);
    card.appendChild(selectBtn);

    // Clicking the card also navigates
    card.addEventListener("click", function (event) {
      // Only navigate if button was not the target (button handles its own click)
      if (event.target !== selectBtn) {
        window.location.href = "./passenger-route.html";
      }
    });

    return card;
  }

  // ---- Render route cards into both mobile and desktop lists ----
  var mobileList = document.getElementById("m-routes-list");
  var desktopList = document.getElementById("d-routes-list");

  routes.forEach(function (route) {
    if (mobileList) {
      mobileList.appendChild(buildRouteCard(route));
    }
    if (desktopList) {
      desktopList.appendChild(buildRouteCard(route));
    }
  });

  // ---- Search buttons ----
  var mobileSearchBtn = document.getElementById("m-search-btn");
  var desktopSearchBtn = document.getElementById("d-search-btn");

  function handleSearch() {
    window.location.href = "./passenger-route.html";
  }

  if (mobileSearchBtn) {
    mobileSearchBtn.addEventListener("click", handleSearch);
  }
  if (desktopSearchBtn) {
    desktopSearchBtn.addEventListener("click", handleSearch);
  }

});
