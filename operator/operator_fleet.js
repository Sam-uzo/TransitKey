// ══════════════════════════════════════════════
    // FLEET DATA — replace with API fetch when ready
    // e.g. fetch('/api/operator/fleet').then(r => r.json()).then(data => init(data))
    // ══════════════════════════════════════════════
    const FLEET_DATA = {
      buses: [
        { plate: "LND 472 YK", model: "Lamata BRT",  capacity: 40, driver: "Adewale Musa",    status: "On Route"    },
        { plate: "B-8829-KL",  model: "Higer Bus",   capacity: 33, driver: "Chinedu Okafor",  status: "On Route"    },
        { plate: "LAG-9901-B", model: "Lamata BRT",  capacity: 40, driver: "Yusuf Ademola",   status: "On Route"    },
        { plate: "LAG-4288-C", model: "Coaster Bus",  capacity: 18, driver: "Peter Abu",       status: "On Route"    },
        { plate: "LAG-1102-A", model: "Higer Bus",   capacity: 33, driver: "Debola Isaac",    status: "On Route"    },
        { plate: "LAG-8872-X", model: "Lamata BRT",  capacity: 40, driver: "Chinedu Eze",     status: "On Route"    },
        { plate: "LND 201 AB", model: "Coaster Bus",  capacity: 18, driver: "Fatima Bello",    status: "Maintenance" },
        { plate: "AKD 034 ZX", model: "Lamata BRT",  capacity: 40, driver: "—",               status: "Idle"        },
        { plate: "KJA 881 TY", model: "Higer Bus",   capacity: 33, driver: "Emeka Nwosu",     status: "Idle"        },
      ],
      drivers: [
        { name: "Adewale Musa",   id: "TMS-8821", phone: "+234 080 9587 4832", bus: "LND 472 YK", status: "Active"     },
        { name: "Chinedu Okafor", id: "TMS-8842", phone: "+234 081 2345 6789", bus: "B-8829-KL",  status: "Active"     },
        { name: "Yusuf Ademola",  id: "TMS-9010", phone: "+234 070 1234 5678", bus: "LAG-9901-B", status: "Active"     },
        { name: "Peter Abu",      id: "TMS-7701", phone: "+234 081 9876 5432", bus: "LAG-4288-C", status: "Active"     },
        { name: "Debola Isaac",   id: "TMS-6612", phone: "+234 090 1111 2222", bus: "LAG-1102-A", status: "Active"     },
        { name: "Chinedu Eze",    id: "TMS-8889", phone: "+234 080 3333 4444", bus: "LAG-8872-X", status: "Active"     },
        { name: "Fatima Bello",   id: "TMS-7712", phone: "+234 081 5555 6666", bus: "LND 201 AB", status: "Off Duty"   },
        { name: "Emeka Nwosu",    id: "TMS-9903", phone: "+234 070 7777 8888", bus: "KJA 881 TY", status: "Idle"       },
        { name: "Ngozi Eze",      id: "TMS-5501", phone: "+234 090 9999 0000", bus: "—",          status: "Unassigned" },
        { name: "Bayo Adewale",   id: "TMS-4421", phone: "+234 081 2222 3333", bus: "—",          status: "Unassigned" },
      ],
    };

    // ── STATUS HELPERS ──
    const busStatusDot = {
      "On Route":    "dot-active",
      "Idle":        "dot-idle",
      "Maintenance": "dot-maintenance",
    };

    const busStatusColor = {
      "On Route":    "status-active",
      "Idle":        "status-idle",
      "Maintenance": "status-maintenance",
    };

    const driverStatusDot = {
      "Active":     "dot-active",
      "Idle":       "dot-idle",
      "Off Duty":   "dot-offduty",
      "Unassigned": "dot-unassigned",
    };

    const driverStatusColor = {
      "Active":     "status-active",
      "Idle":       "status-idle",
      "Off Duty":   "status-offduty",
      "Unassigned": "status-unassigned",
    };

    // ── METRICS ──
    function renderMetrics() {
      const buses   = FLEET_DATA.buses;
      const drivers = FLEET_DATA.drivers;

      const totalBuses    = buses.length;
      const onRoute       = buses.filter(b => b.status === 'On Route').length;
      const totalDrivers  = drivers.length;
      const activeDrivers = drivers.filter(d => d.status === 'Active').length;

      document.getElementById('metricsRow').innerHTML = `
        <div class="metric-card">
          <div class="mc-label">Total Buses
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          </div>
          <div class="mc-value">${totalBuses}</div>
          <div class="mc-sub">${buses.filter(b => b.status === 'Maintenance').length} in maintenance</div>
        </div>
        <div class="metric-card">
          <div class="mc-label">On Route Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="5 12 12 5 19 12"/><line x1="12" y1="5" x2="12" y2="19"/></svg>
          </div>
          <div class="mc-value" style="color:var(--success);">${onRoute}</div>
          <div class="mc-sub">Active right now</div>
        </div>
        <div class="metric-card">
          <div class="mc-label">Total Drivers
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
          </div>
          <div class="mc-value">${totalDrivers}</div>
          <div class="mc-sub">${drivers.filter(d => d.status === 'Unassigned').length} unassigned</div>
        </div>
        <div class="metric-card">
          <div class="mc-label">Active Drivers
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div class="mc-value" style="color:var(--accent);">${activeDrivers}</div>
          <div class="mc-sub">On shift today</div>
        </div>`;
    }

    // ── BUSES ──
    function renderBuses() {
      const search = document.getElementById('busSearch').value.trim().toLowerCase();
      const status = document.getElementById('busStatusFilter').value;

      const filtered = FLEET_DATA.buses.filter(b => {
        if (status && b.status !== status) return false;
        if (search && !b.plate.toLowerCase().includes(search) && !b.model.toLowerCase().includes(search)) return false;
        return true;
      });

      const tbody = document.getElementById('busTableBody');

      if (!filtered.length) {
        tbody.innerHTML = `<tr class="empty-row"><td colspan="5">No buses found.</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map(b => `
        <tr>
          <td class="bold">${b.plate}</td>
          <td>${b.model}</td>
          <td>${b.capacity} seats</td>
          <td class="${b.driver === '—' ? 'muted' : ''}">${b.driver}</td>
          <td>
            <div class="status-cell">
              <span class="dot ${busStatusDot[b.status] || 'dot-idle'}"></span>
              <span class="${busStatusColor[b.status] || 'status-idle'}">${b.status}</span>
            </div>
          </td>
        </tr>`).join('');
    }

    // ── DRIVERS ──
    function renderDrivers() {
      const search = document.getElementById('driverSearch').value.trim().toLowerCase();
      const status = document.getElementById('driverStatusFilter').value;

      const filtered = FLEET_DATA.drivers.filter(d => {
        if (status && d.status !== status) return false;
        if (search && !d.name.toLowerCase().includes(search) && !d.id.toLowerCase().includes(search)) return false;
        return true;
      });

      const tbody = document.getElementById('driverTableBody');

      if (!filtered.length) {
        tbody.innerHTML = `<tr class="empty-row"><td colspan="5">No drivers found.</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map(d => `
        <tr>
          <td class="bold">${d.name}</td>
          <td style="color:var(--gray-500);">${d.id}</td>
          <td style="color:var(--gray-500);">${d.phone}</td>
          <td class="${d.bus === '—' ? 'muted' : ''}">${d.bus}</td>
          <td>
            <div class="status-cell">
              <span class="dot ${driverStatusDot[d.status] || 'dot-idle'}"></span>
              <span class="${driverStatusColor[d.status] || 'status-idle'}">${d.status}</span>
            </div>
          </td>
        </tr>`).join('');
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
    renderMetrics();
    renderBuses();
    renderDrivers();