// ══════════════════════════════════════════════
    // PROFILE DATA — replace with API fetch when ready
    // e.g. fetch('/api/driver/profile').then(r => r.json()).then(data => renderProfile(data))
    // ══════════════════════════════════════════════
    const PROFILE_DATA = {
      identity: {
        name:          "Adewale Musa",
        driverId:      "TMS-DR-9921",
        licenseType:   "Commercial Driver License",
        licenseNumber: "LAG-20491-X",
        expiryDate:    "December 2026",
        status:        "active",
      },
      vehicle: {
        plateNumber:   "LND 472 YK",
        model:         "Lamata BRT Bus",
        capacity:      "40 Seats",
        lastInspection:"24 April 2026",
      },
      performance: {
        totalDistanceKm: "12,280",
        completedTrips:  412,
        passengerRating: "4.8/5",
      },
      settings: {
        phone: "+234 080 9587 4832",
        email: "adewale.musa@transitkey.com",
      },
    };

    function renderProfile(d) {
      document.getElementById('driverName').textContent    = d.identity.name;
      document.getElementById('driverId').textContent      = d.identity.driverId;
      document.getElementById('licenseType').textContent   = d.identity.licenseType;
      document.getElementById('licenseNumber').textContent = d.identity.licenseNumber;
      document.getElementById('expiryDate').textContent    = d.identity.expiryDate;

      document.getElementById('busPlate').textContent      = d.vehicle.plateNumber;
      document.getElementById('vehicleModel').textContent  = d.vehicle.model;
      document.getElementById('passengerCap').textContent  = d.vehicle.capacity;
      document.getElementById('lastInspection').textContent= d.vehicle.lastInspection;

      document.getElementById('totalDistance').innerHTML   = `${d.performance.totalDistanceKm} <span>km</span>`;
      document.getElementById('completedTrips').textContent= d.performance.completedTrips;
      document.getElementById('passengerRating').textContent= d.performance.passengerRating;

      document.getElementById('phoneNumber').textContent  = d.settings.phone;
      document.getElementById('emailAddress').textContent = d.settings.email;
    }

    // ── ACTIONS ──
    function handleLogout() {
      if (confirm('Are you sure you want to log out?')) {
        // TODO: fetch('/api/auth/logout', { method: 'POST' })
        window.location.href = 'transitkey_login.html';
      }
    }

    // ── TOAST ──
    function showToast(msg) {
      const t = document.getElementById('toast');
      t.textContent = msg;
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 3000);
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

    // ── MOBILE MENU ──
    function toggleMenu() {
      const menu = document.getElementById('mobileMenu');
      const btn  = document.getElementById('hamburger');
      menu.classList.toggle('open');
      btn.classList.toggle('open');
    }

    // ── INIT ──
    renderProfile(PROFILE_DATA);