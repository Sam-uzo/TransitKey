// ══════════════════════════════════════════════
    // NOTIFICATIONS DATA — replace with API fetch when ready
    // e.g. fetch('/api/driver/notifications').then(r => r.json()).then(data => renderNotifications(data))
    // ══════════════════════════════════════════════
    const NOTIFICATIONS_DATA = {
      emergency: [
        {
          id: 1,
          title: "SEVERE WEATHER WARNING",
          body: "All transport services in Lekki are currently suspended due to extreme weather conditions (flooding). Please seek alternative shelter immediately.",
          minsAgo: 2,
          unread: true,
        },
      ],
      groups: [
        {
          key: "trip",
          label: "Trip Updates",
          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 19V5a2 2 0 012-2h8a2 2 0 012 2v14"/><path d="M2 19h20"/><path d="M9 7h6"/></svg>`,
          items: [
            {
              id: 2,
              title: "ROUTE UPDATED",
              body: "New stop added to Route #8842: Costain Bus Stop. Please confirm arrival through the dispatch system.",
              minsAgo: 5,
              unread: true,
              icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>`,
            },
            {
              id: 3,
              title: "PASSENGER PICKUP CONFIRMED",
              body: "Passengers for Route #8840 boarded successfully at Ojota Bus Stop. Proceed to next stop: Maryland.",
              minsAgo: 25,
              unread: false,
              icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
            },
          ],
        },
        {
          key: "operator",
          label: "Operator Messages",
          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>`,
          items: [
            {
              id: 4,
              title: "OPERATIONS MESSAGE - DISPATCHER CHINEDU A.",
              body: "Please check your fuel level before starting the next trip. Fuel queue at the Oshodi depot is currently heavy.",
              minsAgo: 50,
              unread: false,
              icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a6 6 0 0112 0v2"/></svg>`,
            },
          ],
        },
        {
          key: "delays",
          label: "Delays",
          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2h12M6 22h12M6 2a4 4 0 008 0M6 22a4 4 0 018 0M8 2a8 8 0 008 16"/></svg>`,
          items: [
            {
              id: 5,
              title: "TRAFFIC ALERT",
              body: "Expected 20 minutes delay around Third Mainland Bridge due to heavy traffic. Estimated arrival time has been updated.",
              minsAgo: 60,
              unread: false,
              icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="9" y="2" width="6" height="20" rx="2"/><circle cx="12" cy="6" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="18" r="1" fill="currentColor"/></svg>`,
            },
          ],
        },
      ],
      olderAvailable: true,
    };

    // ── RENDER ──
    function formatTime(mins) {
      if (mins < 60) return `${mins}m ago`;
      const h = Math.floor(mins / 60);
      if (h < 24) return `${h}hr ago`;
      return `${Math.floor(h / 24)}d ago`;
    }

    function renderNotifications(data) {
      const container = document.getElementById('notificationsContainer');
      container.innerHTML = '';

      // Emergency section
      if (data.emergency && data.emergency.length) {
        const emWrap = document.createElement('div');
        emWrap.innerHTML = `
          <p class="section-label emergency">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Emergency Alert
          </p>`;
        data.emergency.forEach(n => {
          const card = document.createElement('div');
          card.className = 'emergency-card';
          card.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div class="emergency-content">
              <div class="emergency-title-row">
                <span class="emergency-title">${n.title}</span>
                <span class="notif-time">${formatTime(n.minsAgo)}</span>
              </div>
              <p class="emergency-body">${n.body}</p>
            </div>`;
          emWrap.appendChild(card);
        });
        container.appendChild(emWrap);
      }

      // Grouped sections
      data.groups.forEach(group => {
        if (!group.items.length) return;
        const groupWrap = document.createElement('div');
        groupWrap.className = 'section-group';

        const labelEl = document.createElement('p');
        labelEl.className = 'section-label';
        labelEl.innerHTML = `${group.icon} ${group.label}`;
        groupWrap.appendChild(labelEl);

        group.items.forEach(n => {
          const card = document.createElement('div');
          card.className = 'notif-card' + (n.unread ? ' unread' : '');
          card.onclick = () => { card.classList.remove('unread'); n.unread = false; };
          card.innerHTML = `
            ${n.icon}
            <div class="notif-content">
              <div class="notif-title-row">
                <span class="notif-title">${n.title}</span>
                <span class="notif-time">${formatTime(n.minsAgo)}</span>
              </div>
              <p class="notif-body">${n.body}</p>
            </div>`;
          groupWrap.appendChild(card);
        });

        container.appendChild(groupWrap);
      });

      document.getElementById('loadMoreBtn').style.display = data.olderAvailable ? 'block' : 'none';
    }

    // ── ACTIONS ──
    function markAllRead() {
      // TODO: fetch('/api/driver/notifications/read-all', { method: 'POST' })
      NOTIFICATIONS_DATA.emergency.forEach(n => n.unread = false);
      NOTIFICATIONS_DATA.groups.forEach(g => g.items.forEach(n => n.unread = false));
      renderNotifications(NOTIFICATIONS_DATA);
    }

    function toggleFilter() {
      document.getElementById('filterPanel').classList.toggle('open');
    }

    function selectChip(btn, groupId) {
      document.querySelectorAll(`#${groupId} .filter-chip`).forEach(c => c.classList.remove('selected'));
      btn.classList.add('selected');
    }

    function resetFilters() {
      document.querySelectorAll('#typeChips .filter-chip').forEach(c => c.classList.remove('selected'));
      document.querySelector('#typeChips .filter-chip[data-value="all"]').classList.add('selected');
      document.querySelectorAll('#statusChips .filter-chip').forEach(c => c.classList.remove('selected'));
      document.querySelector('#statusChips .filter-chip[data-value="all"]').classList.add('selected');
      applyNotifFilters();
    }

    function applyNotifFilters() {
      const type   = document.querySelector('#typeChips .filter-chip.selected').dataset.value;
      const status = document.querySelector('#statusChips .filter-chip.selected').dataset.value;

      // Build a filtered copy of NOTIFICATIONS_DATA
      const filtered = {
        emergency: type === 'all' || type === 'emergency' ? NOTIFICATIONS_DATA.emergency.filter(matchStatus) : [],
        groups: NOTIFICATIONS_DATA.groups
          .filter(g => type === 'all' || g.key === type)
          .map(g => ({ ...g, items: g.items.filter(matchStatus) })),
        olderAvailable: NOTIFICATIONS_DATA.olderAvailable,
      };

      function matchStatus(n) {
        if (status === 'unread') return n.unread;
        if (status === 'read')   return !n.unread;
        return true;
      }

      renderNotifications(filtered);
    }

    function loadOlder() {
      const btn = document.getElementById('loadMoreBtn');
      btn.textContent = 'Loading...';
      btn.disabled = true;
      // TODO: fetch('/api/driver/notifications?before=' + oldestTimestamp)
      setTimeout(() => {
        btn.textContent = 'No more notifications';
        btn.disabled = true;
      }, 1000);
    }

    // ── LIVE CLOCK ──
    function updateClock() {
      const now = new Date();
      const h = now.getHours() % 12 || 12;
      const m = String(now.getMinutes()).padStart(2,'0');
      const s = String(now.getSeconds()).padStart(2,'0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      document.getElementById('navClock').textContent = `${h}:${m}:${s} ${ampm}`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // ── MOBILE MENU ──
    function toggleMenu() {
      const menu = document.getElementById('mobileMenu');
      const btn  = document.getElementById('hamburger');
      menu.classList.toggle('open');
      btn.classList.toggle('open');
    }

    // ── INIT ──
    renderNotifications(NOTIFICATIONS_DATA);