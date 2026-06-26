// ══════════════════════════════════════════════
    // DRIVER DATA — replace with API fetch when ready
    // e.g. fetch('/api/driver/dashboard').then(r => r.json()).then(data => renderDashboard(data))
    // ══════════════════════════════════════════════
    const DRIVER_DATA = {
      name:             "Adewale",
      shiftStart:       { hours: 7, minutes: 30 },
      shiftEnd:         { hours: 15, minutes: 30 },
      tripsRemaining:   3,
      currentTrip: {
        route:          "Abeokuta - Lagos",
        scheduledTime:  "08:15 AM - 09:45 AM",
        nextStop:       "Ojota Bus Stop",
        status:         "in_progress", // "not_started" | "in_progress" | "ended"
      },
      traffic: {
        level:          "Moderate",
        roadCondition:  "No hazards reported on current route.",
        delayRisk:      "Low", // "Low" | "Medium" | "High"
      },
      activity: {
        tripsCompleted:     2,
        passengersCarried:  148,
        completedRoutes:    3,
        totalFare:          "₦84,500",
        nextBreak:          "12:30 PM",
        routeStatus:        "In Progress",
      },
      notifications: [
        {
          id: 1,
          title: "Traffic Alert",
          body: "Heavy traffic at 3rd Mainland Bridge. Use Carter Bridge instead.",
          minsAgo: 2,
          unread: true,
          icon: "warning",
        },
        {
          id: 2,
          title: "Route Schedule Updated",
          body: "Tomorrow's Imo to Enugu timing has been adjusted.",
          minsAgo: 60,
          unread: true,
          icon: "calendar",
        },
      ],
    };

    // ── RENDER DASHBOARD FROM DATA ──
    function renderDashboard(d) {
      // Greeting
      const h = new Date().getHours();
      const greet = h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening';
      document.getElementById('greetingText').textContent = `${greet}, ${d.name}`;

      // Current trip
      document.querySelector('.trip-route').textContent = d.currentTrip.route;
      document.querySelectorAll('.meta-value')[0].textContent = d.currentTrip.scheduledTime;
      document.querySelectorAll('.meta-value')[1].textContent = d.currentTrip.nextStop;
      setTripStatus(d.currentTrip.status);

      // Traffic
      document.getElementById('trafficLevel').textContent  = d.traffic.level;
      document.getElementById('roadCondition').textContent = d.traffic.roadCondition;
      const delayEl = document.getElementById('delayRisk');
      delayEl.textContent = d.traffic.delayRisk;
      delayEl.className = d.traffic.delayRisk === 'Low' ? 'delay-low' : d.traffic.delayRisk === 'Medium' ? 'delay-med' : 'delay-high';

      // Activity stats
      document.getElementById('tripsCompleted').textContent    = String(d.activity.tripsCompleted).padStart(2,'0');
      document.getElementById('passengersCarried').textContent = d.activity.passengersCarried;
      document.querySelectorAll('.row-val')[0].textContent     = d.activity.completedRoutes;
      document.querySelectorAll('.row-val')[1].textContent     = d.activity.totalFare;
      const statusVal = document.querySelectorAll('.row-val')[2];
      statusVal.textContent = d.activity.routeStatus;
      statusVal.className   = 'row-val' + (d.activity.routeStatus === 'In Progress' ? ' accent' : '');
      document.getElementById('nextBreak').textContent         = d.activity.nextBreak;

      // Notifications
      renderNotifications(d.notifications);
    }

    function renderNotifications(notifs) {
      const container = document.getElementById('notifsContainer');
      container.innerHTML = '';
      const icons = {
        warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
        calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
      };
      notifs.forEach(n => {
        const div = document.createElement('div');
        div.className = 'notif-item' + (n.unread ? ' unread' : '');
        div.onclick = () => { div.classList.remove('unread'); n.unread = false; };
        div.innerHTML = `
          <div class="notif-icon">${icons[n.icon] || icons.warning}</div>
          <div class="notif-content">
            <p class="notif-title">${n.title}</p>
            <p class="notif-body">${n.body}</p>
            <p class="notif-time" data-mins="${n.minsAgo}">${formatTime(n.minsAgo)}</p>
          </div>`;
        container.appendChild(div);
      });
    }

    function formatTime(mins) {
      if (mins < 60) return `${mins} min${mins !== 1 ? 's' : ''} ago`;
      const h = Math.floor(mins / 60);
      return `${h} hour${h !== 1 ? 's' : ''} ago`;
    }

    // ── LIVE CLOCK ──
    function updateClock() {
      const now = new Date();
      const h = now.getHours();
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      document.getElementById('navClock').textContent = `${h12}:${m}:${s} ${ampm}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // ── GREETING based on time of day ──
    function updateGreeting() {
      const h = new Date().getHours();
      const greet = h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening';
      document.getElementById('greetingText').textContent = `${greet}, Adewale`;
    }
    updateGreeting();

    // ── SHIFT ELAPSED TIMER ──
    // Shift start: 07:30 AM, duration: 8 hours
    function updateShift() {
      const now = new Date();
      const shiftStart = new Date(now);
      shiftStart.setHours(7, 30, 0, 0);
      const shiftEnd = new Date(now);
      shiftEnd.setHours(15, 30, 0, 0);

      const totalMs = shiftEnd - shiftStart;      // 8 hrs in ms
      const elapsedMs = Math.max(0, now - shiftStart);
      const pct = Math.min(100, (elapsedMs / totalMs) * 100);

      const elapsedMins = Math.floor(elapsedMs / 60000);
      const hrs = Math.floor(elapsedMins / 60);
      const mins = elapsedMins % 60;

      document.getElementById('shiftFill').style.width = pct.toFixed(1) + '%';
      document.getElementById('shiftElapsed').textContent =
        hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;

      // Live hours worked in stat box
      const hoursWorked = (elapsedMs / 3600000).toFixed(1);
      document.getElementById('hoursWorked').textContent = hoursWorked;

      // Update greeting subtitle
      document.getElementById('greetingSub').textContent =
        `Your shift started ${elapsedMins} minute${elapsedMins !== 1 ? 's' : ''} ago. You have 3 trips remaining today.`;
    }
    setInterval(updateShift, 60000);
    updateShift();

    // ── NOTIFICATION TIMESTAMPS tick up ──
    function updateNotifTimes() {
      document.querySelectorAll('.notif-time[data-mins]').forEach(el => {
        let mins = parseInt(el.dataset.mins) + 1;
        el.dataset.mins = mins;
        if (mins < 60) {
          el.textContent = `${mins} min${mins !== 1 ? 's' : ''} ago`;
        } else {
          const h = Math.floor(mins / 60);
          el.textContent = `${h} hour${h !== 1 ? 's' : ''} ago`;
        }
      });
    }
    setInterval(updateNotifTimes, 60000);

    // ── OPEN LIVE ROUTE button ──
    function handleOpenRoute() {
      const btn = document.querySelector('.route-btn');
      btn.textContent = 'Loading Map...';
      btn.style.background = 'var(--primary)';
      setTimeout(() => {
        btn.textContent = 'Open Live Route';
        btn.style.background = '';
      }, 2000);
    }

    /**
     * setTripStatus(status)
     * Called by the backend integration to update the trip badge.
     * @param {'in_progress'|'not_started'|'ended'} status
     */
    function setTripStatus(status) {
      const badge = document.getElementById('tripStatusBadge');
      const label = document.getElementById('tripStatusLabel');
      const labels = {
        in_progress: 'In Progress',
        not_started: 'Not Started',
        ended: 'Ended'
      };
      badge.dataset.status = status;
      label.textContent = labels[status] || 'Unknown';
    }

    // ── AUTO-DERIVE STATUS from shift time (frontend fallback) ──
    function autoStatus() {
      const now = new Date();
      const shiftStart = new Date(now); shiftStart.setHours(7, 30, 0, 0);
      const tripStart  = new Date(now); tripStart.setHours(8, 15, 0, 0);
      const tripEnd    = new Date(now); tripEnd.setHours(9, 45, 0, 0);

      if (now < tripStart) {
        setTripStatus('not_started');
      } else if (now >= tripStart && now <= tripEnd) {
        setTripStatus('in_progress');
      } else {
        setTripStatus('ended');
      }
    }
    autoStatus();

    // ── MOBILE MENU TOGGLE ──
    function toggleMenu() {
      const menu = document.getElementById('mobileMenu');
      const btn = document.getElementById('hamburger');
      menu.classList.toggle('open');
      btn.classList.toggle('open');
      btn.setAttribute('aria-expanded', menu.classList.contains('open'));
    }