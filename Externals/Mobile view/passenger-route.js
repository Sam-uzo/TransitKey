// passenger-route.js
// Builds the available bus cards for both mobile and desktop, and handles the swap button

document.addEventListener("DOMContentLoaded", function () {

  // Bus data for this route search
  var buses = [
    {
      badgeText: "Recommended",
      badgeColor: "blue",
      statusText: "Available",
      statusColor: "green",
      station: "Jibowu Motor Park",
      fare: "₦10,000",
      seatType: "30 Sitter Bus",
      duration: "1hr 55mins",
      busType: "BRT Bus",
    },
    {
      badgeText: "Limited Seats",
      badgeColor: "red",
      statusText: "",
      statusColor: "",
      station: "Yaba Bus Terminal",
      fare: "₦15,000",
      seatType: "7 Sitter Car",
      duration: "1hr 55mins",
      busType: "ABC Transport",
    },
    {
      badgeText: "",
      badgeColor: "",
      statusText: "Available",
      statusColor: "green",
      station: "Ojuelegba Motor Park",
      fare: "₦12,000",
      seatType: "10 Sitter Bus",
      duration: "1hr 55mins",
      busType: "GUO Transport",
    },
  ];

  // ---- Build one bus card ----
  function buildBusCard(bus, cardIndex) {
    var card = document.createElement("div");
    card.id = "route-bus-card-" + cardIndex;
    card.className = "bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100";

    // Image placeholder header with badges
    var imageHeader = document.createElement("div");
    imageHeader.className = "h-28 bg-gray-200 relative flex items-center justify-center";
    imageHeader.innerHTML = '<svg class="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>';

    if (bus.badgeText.length > 0) {
      var leftBadge = document.createElement("span");
      var badgeColorClass = bus.badgeColor === "blue" ? "bg-[#2563EB] text-white" : "bg-red-100 text-red-600";
      leftBadge.className = "absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-full " + badgeColorClass;
      leftBadge.textContent = bus.badgeText;
      imageHeader.appendChild(leftBadge);
    }

    if (bus.statusText.length > 0) {
      var rightBadge = document.createElement("span");
      rightBadge.className = "absolute top-2 right-2 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1";
      rightBadge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-green-600"></span>' + bus.statusText;
      imageHeader.appendChild(rightBadge);
    }

    // Body content
    var body = document.createElement("div");
    body.className = "p-4 flex flex-col gap-3";

    var topRow = document.createElement("div");
    topRow.className = "flex items-center justify-between";
    var stationName = document.createElement("p");
    stationName.className = "font-bold text-gray-900";
    stationName.textContent = bus.station;
    var farePrice = document.createElement("p");
    farePrice.className = "font-black text-[#2563EB]";
    farePrice.textContent = bus.fare;
    topRow.appendChild(stationName);
    topRow.appendChild(farePrice);

    var seatRow = document.createElement("div");
    seatRow.className = "flex items-center justify-between text-sm text-gray-500";
    var seatLeft = document.createElement("div");
    seatLeft.className = "flex items-center gap-1.5";
    seatLeft.innerHTML = '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>';
    seatLeft.appendChild(document.createTextNode(" " + bus.seatType));
    var seatRight = document.createElement("p");
    seatRight.textContent = "Per Seat";
    seatRow.appendChild(seatLeft);
    seatRow.appendChild(seatRight);

    var hr = document.createElement("hr");
    hr.className = "border-gray-100";

    var detailRow = document.createElement("div");
    detailRow.className = "flex items-center justify-between text-sm text-gray-500";
    var durationDiv = document.createElement("div");
    durationDiv.className = "flex items-center gap-1.5";
    durationDiv.innerHTML = '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';
    durationDiv.appendChild(document.createTextNode(" " + bus.duration));
    var busTypeDiv = document.createElement("div");
    busTypeDiv.className = "flex items-center gap-1.5";
    busTypeDiv.innerHTML = '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>';
    busTypeDiv.appendChild(document.createTextNode(" " + bus.busType));
    detailRow.appendChild(durationDiv);
    detailRow.appendChild(busTypeDiv);

    var selectBtn = document.createElement("button");
    selectBtn.id = "route-select-btn-" + cardIndex;
    selectBtn.className = "bg-[#2563EB] text-white font-bold py-3 rounded-xl text-sm hover:bg-blue-700 transition-colors";
    selectBtn.textContent = "Select Bus";
    selectBtn.addEventListener("click", function () {
      window.location.href = "./passenger-trip-details.html";
    });

    body.appendChild(topRow);
    body.appendChild(seatRow);
    body.appendChild(hr);
    body.appendChild(detailRow);
    body.appendChild(selectBtn);

    card.appendChild(imageHeader);
    card.appendChild(body);

    return card;
  }

  // ---- Render bus cards into both lists ----
  var mobileBusList = document.getElementById("route-mobile-bus-list");
  var desktopBusList = document.getElementById("route-desktop-bus-list");

  for (var i = 0; i < buses.length; i++) {
    if (mobileBusList) {
      mobileBusList.appendChild(buildBusCard(buses[i], "mobile-" + i));
    }
    if (desktopBusList) {
      desktopBusList.appendChild(buildBusCard(buses[i], "desktop-" + i));
    }
  }

  // ---- Swap button logic (mobile only has this button) ----
  var swapBtn = document.getElementById("route-mobile-swap-btn");
  var fromText = document.getElementById("route-mobile-from-text");
  var toText = document.getElementById("route-mobile-to-text");

  if (swapBtn) {
    swapBtn.addEventListener("click", function () {
      var temp = fromText.textContent;
      fromText.textContent = toText.textContent;
      toText.textContent = temp;
    });
  }

});
