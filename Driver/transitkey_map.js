// ══════════════════════════════════════════════
    // MAP DATA — replace with API fetch when ready
    // e.g. fetch('/api/driver/map').then(r => r.json()).then(data => renderMap(data))
    // ══════════════════════════════════════════════
    const MAP_DATA = {
      alert: {
        visible: true,
        message: "Congestion ahead on RCCG road is causing a 4-minute delay for all routes.",
      },
      currentRoute:   "Redemption Camp",
      trafficWarning: "Heavy traffic on Maryland Highway",
      nextStop:       "Maryland",
      eta:            "09:25 AM",
      etaDelayMins:   1,
      distanceKm:     1.2,
      currentLocation: "REDEMPTION CAMP ROAD",
      stops: [
        { name: "Akowu Motor Park", status: "done",     meta: "Origin · Departed 09:10 AM" },
        { name: "Mowe",             status: "done",     meta: "Completed" },
        { name: "Redemption Camp",  status: "active",   meta: "Estimated Arrival: 09:25 AM" },
        { name: "Ibadan Bus Terminal", status: "upcoming", meta: "Estimated: 10:10 AM" },
      ],
    };

    // ── RENDER MAP PANEL FROM DATA ──
    function renderMap(d) {
      // Alert
      const banner = document.getElementById('alertBanner');
      if (!d.alert.visible) { banner && banner.remove(); }
      else if (banner) banner.querySelector('p').textContent = d.alert.message;

      // Route info
      document.getElementById('routeName').textContent       = d.currentRoute;
      document.getElementById('trafficWarning').textContent  = d.trafficWarning;
      document.getElementById('nextStopName').textContent    = d.nextStop;
      document.getElementById('etaValue').textContent        = d.eta;
      document.getElementById('etaDelay').textContent        = d.etaDelayMins > 0 ? `+${d.etaDelayMins} min` : '';
      document.getElementById('distValue').textContent       = `${d.distanceKm} km`;
      document.getElementById('locationBar').textContent     = `📍 CURRENT LOCATION: ${d.currentLocation}`;

      // Stops
      renderStops(d.stops);
    }

    function renderStops(stops) {
      const container = document.getElementById('stopsList');
      container.innerHTML = '';
      stops.forEach((stop, i) => {
        const isLast = i === stops.length - 1;
        const lineHTML = isLast ? '' : `<div class="stop-line${stop.status === 'done' ? ' done' : ''}"></div>`;
        const div = document.createElement('div');
        div.className = 'stop-item';
        div.innerHTML = `
          <div class="stop-indicator">
            <div class="stop-dot ${stop.status}"></div>
            ${lineHTML}
          </div>
          <div class="stop-info">
            <p class="stop-name${stop.status === 'upcoming' ? ' muted' : ''}">${stop.name}</p>
            <p class="stop-meta${stop.status === 'done' ? ' success' : ''}">${stop.meta}</p>
          </div>`;
        container.appendChild(div);
      });
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
    setInterval(updateClock, 1000);
    updateClock();

    // ── DISMISS ALERT ──
    function dismissAlert() {
      const el = document.getElementById('alertBanner');
      el.style.transition = 'opacity 0.3s ease, max-height 0.4s ease, margin 0.4s ease, padding 0.4s ease';
      el.style.opacity = '0';
      el.style.maxHeight = '0';
      el.style.padding = '0';
      el.style.margin = '0';
      setTimeout(() => el.remove(), 400);
    }

    // ── MOBILE MENU TOGGLE ──
    function toggleMenu() {
      const menu = document.getElementById('mobileMenu');
      const btn  = document.getElementById('hamburger');
      menu.classList.toggle('open');
      btn.classList.toggle('open');
      btn.setAttribute('aria-expanded', menu.classList.contains('open'));
    }

    // ── MARK AS ARRIVED ──
    function markArrived() {
      const btn = document.querySelector('.arrived-btn');
      btn.textContent = 'Marking...';
      btn.disabled = true;
      btn.style.background = 'var(--success)';

      setTimeout(() => {
        // Update active stop to done
        const activeDot = document.querySelector('.stop-dot.active');
        const activeLine = activeDot?.nextElementSibling;
        if (activeDot) {
          activeDot.classList.remove('active');
          activeDot.classList.add('done');
        }
        if (activeLine) activeLine.classList.add('done');

        // Update next stop to active
        const upcomingDot = document.querySelector('.stop-dot.upcoming');
        if (upcomingDot) {
          upcomingDot.classList.remove('upcoming');
          upcomingDot.classList.add('active');
          const nameEl = upcomingDot.closest('.stop-item').querySelector('.stop-name');
          if (nameEl) nameEl.classList.remove('muted');
        }

        btn.textContent = 'Arrived ✓';
        btn.style.background = 'var(--success)';
      }, 1000);
    }

    // ── ETA DELAY TICK (simulates backend update) ──
    let delayMins = 1;
    setInterval(() => {
      // Randomly fluctuate delay ±1 for realism
      delayMins = Math.max(0, delayMins + (Math.random() > 0.5 ? 1 : -1));
      const el = document.getElementById('etaDelay');
      if (el) el.textContent = delayMins > 0 ? `+${delayMins} min` : '';
    }, 30000);
    renderMap(MAP_DATA);