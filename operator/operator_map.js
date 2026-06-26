// ══════════════════════════════════════════════
    // MAP DATA — replace with API fetch when ready
    // e.g. fetch('/api/operator/map').then(r => r.json()).then(data => renderMap(data))
    // ══════════════════════════════════════════════
    const MAP_DATA = {
      criticalCount: 3,
      delays: [
        {
          id: "ROUTE S-09",
          delay: "+14m",
          body: "Mechanical failure reported near Central St.",
          critical: true,
        },
        {
          id: "ROUTE R-102",
          delay: "+9m",
          body: "Heavy congestion on Ikorodu Bridge approach.",
          critical: false,
        },
      ],
      drivers: {
        active: 42,
        idle: 8,
        list: [
          { name: "Adewale Musa",  id: "402", status: "Active" },
          { name: "Yakubu Lawal",  id: "118", status: "Active" },
          { name: "Chinedu Eze",   id: "889", status: "Idle"   },
        ],
      },
      vehicles: [
        { id: "R-102", x: "33%", y: "30%", critical: false,
          details: { route: "Route R-102", driver: "Yakubu Lawal", plate: "LND 472 YK", status: "In Transit", eta: "09:45 AM", passengers: "28 / 40" }},
        { id: "S-09",  x: "19%", y: "60%", critical: true,
          details: { route: "Route S-09",  driver: "Chinedu Eze",  plate: "B-8829-KL",  status: "Delayed",    eta: "10:20 AM", passengers: "22 / 33" }},
        { id: "X-45",  x: "72%", y: "72%", critical: false,
          details: { route: "Route X-45",  driver: "Adewale Musa", plate: "AKD 034 ZX", status: "In Transit", eta: "10:05 AM", passengers: "15 / 40" }},
      ],
    };

    function renderDelays(data) {
      document.getElementById('criticalBadge').textContent = `${data.criticalCount} CRITICAL`;
      const container = document.getElementById('delaysList');
      container.innerHTML = '';
      data.delays.forEach(d => {
        const div = document.createElement('div');
        div.className = 'delay-item' + (d.critical ? ' critical' : '');
        div.innerHTML = `
          <div class="delay-top">
            <div class="delay-id-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${d.critical ? 'var(--error)' : 'var(--black)'}" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span class="delay-id${d.critical ? ' critical' : ''}">${d.id}</span>
            </div>
            <span class="delay-time">${d.delay}</span>
          </div>
          <p class="delay-body">${d.body}</p>`;
        container.appendChild(div);
      });
    }

    function renderDriverStatus(data) {
      document.getElementById('activeCount').textContent = String(data.active).padStart(2, '0');
      document.getElementById('idleCount').textContent   = String(data.idle).padStart(2, '0');

      const list = document.getElementById('driverList');
      list.innerHTML = '';
      data.list.forEach(d => {
        const div = document.createElement('div');
        div.className = 'driver-row';
        div.innerHTML = `
          <span class="d-name">${d.name} (ID ${d.id})</span>
          <span class="${d.status === 'Active' ? 'd-active' : 'd-idle'}">${d.status}</span>`;
        list.appendChild(div);
      });
    }

    function renderMarkers(vehicles) {
      const container = document.getElementById('markersContainer');
      container.innerHTML = '';
      vehicles.forEach(v => {
        const el = document.createElement('div');
        el.className = 'vehicle-marker';
        el.style.left = v.x;
        el.style.top  = v.y;
        el.innerHTML = `
          <div class="marker-label${v.critical ? ' critical' : ''}">
            ${v.id}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="none">
              <rect x="1" y="6" width="14" height="10" rx="2"/>
              <path d="M15 10h4l3 3v4h-7v-7z"/>
              <circle cx="5" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>
            </svg>
            ${v.critical ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="white" stroke="none"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><circle cx="12" cy="9" r="1" fill="rgba(255,255,255,0.9)"/><rect x="11.25" y="11" width="1.5" height="4" rx="0.5" fill="rgba(255,255,255,0.9)"/></svg>` : ''}
          </div>
          <div class="marker-pin${v.critical ? ' critical' : ''}"></div>`;
        el.onclick = () => selectVehicle(v);
        container.appendChild(el);
      });
    }

    function selectVehicle(v) {
      document.getElementById('routePlaceholder').style.display = 'none';
      const detail = document.getElementById('routeDetail');
      detail.className = 'route-detail visible';
      detail.innerHTML = `
        <div class="route-detail-row"><span class="rd-key">Route</span><span class="rd-val">${v.details.route}</span></div>
        <div class="route-detail-row"><span class="rd-key">Driver</span><span class="rd-val">${v.details.driver}</span></div>
        <div class="route-detail-row"><span class="rd-key">Plate Number</span><span class="rd-val">${v.details.plate}</span></div>
        <div class="route-detail-row"><span class="rd-key">Status</span><span class="rd-val" style="color:${v.critical ? 'var(--error)' : 'var(--black)'};">${v.details.status}</span></div>
        <div class="route-detail-row"><span class="rd-key">ETA</span><span class="rd-val">${v.details.eta}</span></div>
        <div class="route-detail-row"><span class="rd-key">Passengers</span><span class="rd-val">${v.details.passengers}</span></div>`;
    }

    function toggleOverlay() {
      // TODO: integrate with real map SDK to show/hide layers
      const routes   = document.getElementById('overlayRoutes').checked;
      const traffic  = document.getElementById('overlayTraffic').checked;
      const stations = document.getElementById('overlayStations').checked;
      console.log('Overlay:', { routes, traffic, stations });
    }

    // Zoom placeholders — wire to map SDK when ready
    function zoomIn()  { /* TODO: map.zoomIn() */ }
    function zoomOut() { /* TODO: map.zoomOut() */ }

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
    renderDelays(MAP_DATA);
    renderDriverStatus(MAP_DATA.drivers);
    renderMarkers(MAP_DATA.vehicles);