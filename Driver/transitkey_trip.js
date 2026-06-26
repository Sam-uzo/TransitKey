// ══════════════════════════════════════════════
    // TRIP DATA — replace with API fetch when ready
    // e.g. fetch('/api/driver/trip').then(r => r.json()).then(data => renderTrip(data))
    // ══════════════════════════════════════════════
    const TRIP_DATA = {
      routeId: "TRP-9921-X",
      plateNumber: "B-8829-KL",
      progressPct: 65,
      startTerminal: "Jibowu Motor Park",
      startTime: "08:00 AM (Scheduled)",
      finalDestination: "Ibadan Terminal",
      finalTime: "11:45 AM (EST)",
      passengerLoad: { current: 22, capacity: 30 },
      currentLocation: "REDEMPTION CAMP",
      stops: [
        { name: "Jibowu Motor Park", status: "done", meta: "Origin - Departed 08:15 AM" },
        { name: "Berger Bus Stop", status: "done", meta: "Arrived 08:42 - Departed 08:48 AM" },
        { name: "Mowe", status: "active", meta: "Estimated Arrival: 09:25 AM" },
        { name: "Redemption City", status: "upcoming", meta: "Estimated 10:10 AM" },
        { name: "Sagamu Interchange", status: "upcoming", meta: "Estimated 11:45 AM" },
        { name: "Ibadan Motor Terminal", status: "upcoming", meta: "Final Stop - 12:30 PM" },
      ],
    };

    function renderTrip(d) {
      document.getElementById('routeId').textContent = d.routeId;
      document.getElementById('plateNumber').textContent = `PLATE: ${d.plateNumber}`;
      document.getElementById('progressPct').textContent = `${d.progressPct}% Complete`;
      document.getElementById('progressFill').style.width = `${d.progressPct}%`;
      document.getElementById('startTerminal').textContent = d.startTerminal;
      document.getElementById('startTime').textContent = d.startTime;
      document.getElementById('finalDest').textContent = d.finalDestination;
      document.getElementById('finalTime').textContent = d.finalTime;
      document.getElementById('passengerLoad').textContent = `${d.passengerLoad.current} / ${d.passengerLoad.capacity}`;
      document.getElementById('capacityPct').textContent = `${Math.round((d.passengerLoad.current / d.passengerLoad.capacity) * 100)}% Capacity`;
      document.getElementById('currentLocation').textContent = `CURRENT LOCATION: ${d.currentLocation}`;
      renderStops(d.stops);
    }

    function renderStops(stops) {
      const container = document.getElementById('stopsScroll');
      container.innerHTML = '';
      stops.forEach((stop, i) => {
        const isLast = i === stops.length - 1;
        const lineHTML = isLast ? '' : `<div class="stop-line${stop.status === 'done' ? ' done' : ''}"></div>`;
        const dotContent = stop.status === 'done'
          ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`
          : '';
        const div = document.createElement('div');
        div.className = 'stop-item';
        div.innerHTML = `
          <div class="stop-indicator">
            <div class="stop-dot ${stop.status}">${dotContent}</div>
            ${lineHTML}
          </div>
          <div class="stop-info">
            <p class="stop-name ${stop.status === 'done' ? 'done' : ''}">${stop.name}</p>
            <p class="stop-meta">${stop.meta}</p>
          </div>`;
        container.appendChild(div);
      });
    }

    // ── MARK AS ARRIVED ──
    function markArrived() {
      const btn = document.querySelector('.arrived-btn');
      btn.textContent = 'Marking...';
      btn.disabled = true;

      setTimeout(() => {
        const activeIdx = TRIP_DATA.stops.findIndex(s => s.status === 'active');
        if (activeIdx !== -1) {
          TRIP_DATA.stops[activeIdx].status = 'done';
          const nextIdx = activeIdx + 1;
          if (nextIdx < TRIP_DATA.stops.length) {
            TRIP_DATA.stops[nextIdx].status = 'active';
            TRIP_DATA.currentLocation = TRIP_DATA.stops[activeIdx].name.toUpperCase();
          }
          // bump progress
          TRIP_DATA.progressPct = Math.min(100, TRIP_DATA.progressPct + Math.round(100 / TRIP_DATA.stops.length));
        }
        renderTrip(TRIP_DATA);
        btn.textContent = 'Mark as Arrived';
        btn.disabled = false;
      }, 800);
    }

    // ── LIVE CLOCK ──
    function updateClock() {
      const now = new Date();
      const h = now.getHours() % 12 || 12;
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      document.getElementById('navClock').textContent = `${h}:${m}:${s} ${ampm}`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // ── MOBILE MENU ──
    function toggleMenu() {
      const menu = document.getElementById('mobileMenu');
      const btn = document.getElementById('hamburger');
      menu.classList.toggle('open');
      btn.classList.toggle('open');
    }

    // ── INIT ──
    renderTrip(TRIP_DATA);