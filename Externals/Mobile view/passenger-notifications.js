// passenger-notifications.js
// Builds the notification list (grouped by category) and handles filtering + mark all read

document.addEventListener("DOMContentLoaded", function () {

  // Notification data, each item belongs to one category
  var notifications = [
    {
      category: "trips",
      groupLabel: "TRIP UPDATES",
      iconBackground: "bg-blue-100",
      iconColor: "text-[#2563EB]",
      title: "Bus approaching your stop",
      message: "The BRT 204 from Lagos is 200m from Ibadan Terminal. Please prepare for boarding.",
      time: "2 mins ago",
      highlighted: false,
    },
    {
      category: "traffic",
      groupLabel: "TRAFFIC ALERTS",
      iconBackground: "bg-red-100",
      iconColor: "text-red-500",
      title: "Heavy traffic reported along Lagos-Ibadan Expressway",
      message: "Major congestion along Lagos-Ibadan Expressway. Expect 25 mins delay on routes through this area.",
      time: "12 mins ago",
      highlighted: true,
    },
    {
      category: "payments",
      groupLabel: "FARE UPDATES",
      iconBackground: "bg-blue-100",
      iconColor: "text-[#2563EB]",
      title: "Fare Update: All Routes",
      message: "There has been a hike in fare rates for all routes due to increase in fuel price. Please prepare accordingly.",
      time: "1 hour ago",
      highlighted: false,
    },
    {
      category: "trips",
      groupLabel: "SYSTEM NOTIFICATIONS",
      iconBackground: "bg-gray-100",
      iconColor: "text-gray-500",
      title: "System Maintenance",
      message: "App updates completed successfully. We've improved map loading speeds for all routes.",
      time: "Yesterday",
      highlighted: false,
    },
  ];

  var iconIndicator = '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/></svg>';
  var iconBus = '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>';
  var iconMoney = '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"/></svg>';

  // ---- Pick the right icon based on category ----
  function getIconForNotification(item) {
    if (item.category === "trips" && item.title.indexOf("System") === -1) {
      return iconBus;
    }
    if (item.category === "traffic") {
      return iconBus;
    }
    if (item.category === "payments") {
      return iconMoney;
    }
    return iconIndicator;
  }

  // ---- Build one notification card ----
  function buildNotificationCard(item, cardId) {
    var card = document.createElement("div");
    card.id = cardId;
    card.className = "bg-white rounded-xl p-4 shadow-sm border flex gap-3";
    card.classList.add(item.highlighted ? "border-red-200" : "border-gray-100");
    if (item.highlighted) {
      card.classList.add("border-l-4", "border-l-red-500");
    }
    card.setAttribute("data-category", item.category);

    var iconWrap = document.createElement("div");
    iconWrap.className = "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 " + item.iconBackground + " " + item.iconColor;
    iconWrap.innerHTML = getIconForNotification(item);

    var textWrap = document.createElement("div");
    textWrap.className = "flex-1";

    var topRow = document.createElement("div");
    topRow.className = "flex items-start justify-between gap-2";

    var titleText = document.createElement("p");
    titleText.className = "font-bold text-gray-900 text-sm";
    titleText.textContent = item.title;

    var timeText = document.createElement("p");
    timeText.className = "text-xs text-gray-400 flex-shrink-0";
    timeText.textContent = item.time;

    topRow.appendChild(titleText);
    topRow.appendChild(timeText);

    var messageText = document.createElement("p");
    messageText.className = "text-sm text-gray-500 mt-1";
    messageText.textContent = item.message;

    textWrap.appendChild(topRow);
    textWrap.appendChild(messageText);

    card.appendChild(iconWrap);
    card.appendChild(textWrap);

    return card;
  }

  // ---- Render all notifications grouped by category label ----
  function renderNotifications(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    var seenGroups = [];

    for (var i = 0; i < notifications.length; i++) {
      var item = notifications[i];

      // Add a group label heading if this is a new group
      if (seenGroups.indexOf(item.groupLabel) === -1) {
        seenGroups.push(item.groupLabel);
        var groupHeading = document.createElement("p");
        groupHeading.className = "text-xs font-bold text-gray-400 uppercase tracking-wide mt-2 group-heading";
        groupHeading.textContent = item.groupLabel;
        groupHeading.setAttribute("data-category", item.category);
        container.appendChild(groupHeading);
      }

      var card = buildNotificationCard(item, containerId + "-card-" + i);
      container.appendChild(card);
    }
  }

  renderNotifications("notif-mobile-list");
  renderNotifications("notif-desktop-list");

  // ---- Filter tab logic ----
  function setupFilterTabs(tabSelector, listId) {
    var tabs = document.querySelectorAll(tabSelector);

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        // Reset all tabs to inactive style
        tabs.forEach(function (t) {
          t.classList.remove("bg-[#2563EB]", "text-white");
          t.classList.add("bg-white", "text-gray-600", "border", "border-gray-200");
        });

        // Activate clicked tab
        tab.classList.remove("bg-white", "text-gray-600", "border", "border-gray-200");
        tab.classList.add("bg-[#2563EB]", "text-white");

        var selectedFilter = tab.getAttribute("data-filter");
        var listContainer = document.getElementById(listId);
        var allItems = listContainer.children;

        for (var i = 0; i < allItems.length; i++) {
          var element = allItems[i];
          var itemCategory = element.getAttribute("data-category");

          if (selectedFilter === "all" || itemCategory === selectedFilter) {
            element.style.display = "";
          } else {
            element.style.display = "none";
          }
        }
      });
    });
  }

  setupFilterTabs(".filter-tab-mobile", "notif-mobile-list");
  setupFilterTabs(".filter-tab-desktop", "notif-desktop-list");

  // ---- Mark all as read (demo: dims the unread indicator styling) ----
  function handleMarkAllRead(listId) {
    var listContainer = document.getElementById(listId);
    var cards = listContainer.querySelectorAll("[data-category]");

    cards.forEach(function (card) {
      if (card.classList.contains("border-l-4")) {
        card.classList.remove("border-l-4", "border-l-red-500", "border-red-200");
        card.classList.add("border-gray-100");
      }
    });
  }

  var mobileMarkReadBtn = document.getElementById("notif-mobile-mark-read-btn");
  var desktopMarkReadBtn = document.getElementById("notif-desktop-mark-read-btn");

  if (mobileMarkReadBtn) {
    mobileMarkReadBtn.addEventListener("click", function () {
      handleMarkAllRead("notif-mobile-list");
    });
  }
  if (desktopMarkReadBtn) {
    desktopMarkReadBtn.addEventListener("click", function () {
      handleMarkAllRead("notif-desktop-list");
    });
  }

});
