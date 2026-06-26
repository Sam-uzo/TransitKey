// ══════════════════════════════════════════════
    // BOOKING DATA — replace with API fetch when ready
    // e.g. fetch('/api/operator/booking/summary').then(r => r.json()).then(data => init(data))
    // ══════════════════════════════════════════════
    const BOOKING_DATA = {
      metrics: {
        totalPassengers:  1284,
        walkinToday:      37,
        codesVerified:    92,
        routesActive:     6,
      },
      routes: {
        "jibowu-ibadan": { label: "Jibowu → Ibadan Terminal", booked: 22, capacity: 30 },
        "oshodi-berger":  { label: "Oshodi → Berger",          booked: 28, capacity: 33 },
        "ikorodu-tbs":    { label: "Ikorodu → TBS",            booked: 14, capacity: 18 },
        "lagos-abuja":    { label: "Lagos → Abuja",            booked: 38, capacity: 40 },
        "imo-enugu":      { label: "Imo → Enugu",              booked: 5,  capacity: 40 },
      },
      // Simulated booking codes — backend provides real data
      codes: {
        "TK-4821": { passenger: "Ngozi Okonkwo",  route: "Jibowu → Ibadan", seat: "14B", status: "Paid",    confirmed: false },
        "TK-3302": { passenger: "Emeka Nwosu",    route: "Oshodi → Berger", seat: "07A", status: "Paid",    confirmed: false },
        "TK-9910": { passenger: "Amaka Obi",      route: "Lagos → Abuja",   seat: "22C", status: "Pending", confirmed: false },
        "TK-1177": { passenger: "Bola Adeyemi",   route: "Imo → Enugu",     seat: "03B", status: "Paid",    confirmed: true  },
      },
      walkinLog: [],
    };

    // ── METRICS ──
    function renderMetrics(d) {
      document.getElementById('metricsRow').innerHTML = `
        <div class="metric-card">
          <div class="mc-label">Total Passengers Today
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
          </div>
          <div class="mc-value">${d.metrics.totalPassengers.toLocaleString()}</div>
          <div class="mc-sub">Across all routes</div>
        </div>
        <div class="metric-card">
          <div class="mc-label">Walk-ins Added Today
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </div>
          <div class="mc-value" style="color:var(--accent);">${d.metrics.walkinToday}</div>
          <div class="mc-sub">Offline payments logged</div>
        </div>
        <div class="metric-card">
          <div class="mc-label">Codes Verified
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="mc-value" style="color:var(--success);">${d.metrics.codesVerified}</div>
          <div class="mc-sub">Confirmed seats today</div>
        </div>
        <div class="metric-card">
          <div class="mc-label">Active Routes
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z"/></svg>
          </div>
          <div class="mc-value">${d.metrics.routesActive}</div>
          <div class="mc-sub">Running today</div>
        </div>`;
    }

    // ── SEAT BAR ──
    function updateSeatBar() {
      const routeKey = document.getElementById('walkinRoute').value;
      if (!routeKey) {
        document.getElementById('seatBarRoute').textContent = 'Select a route to view seat count';
        document.getElementById('seatBarCount').textContent = '— / —';
        document.getElementById('seatBarFill').style.width = '0%';
        document.getElementById('seatBarSub').textContent = '—';
        return;
      }
      const r = BOOKING_DATA.routes[routeKey];
      renderSeatBar(r);
    }

    function renderSeatBar(r, preview = 0) {
      const taken = Math.min(r.booked + preview, r.capacity);
      const pct   = Math.round((taken / r.capacity) * 100);
      const free  = r.capacity - taken;

      document.getElementById('seatBarRoute').textContent = r.label;
      document.getElementById('seatBarCount').textContent = `${taken} / ${r.capacity}`;

      const fill = document.getElementById('seatBarFill');
      fill.style.width = pct + '%';
      fill.className = 'seat-bar-fill' + (pct >= 100 ? ' full' : pct >= 85 ? ' almost-full' : '');

      document.getElementById('seatBarSub').textContent =
        pct >= 100 ? 'Fully booked' : `${free} seat${free !== 1 ? 's' : ''} remaining`;
    }

    function previewSeatBar() {
      const routeKey = document.getElementById('walkinRoute').value;
      if (!routeKey) return;
      const count = parseInt(document.getElementById('walkinCount').value) || 0;
      renderSeatBar(BOOKING_DATA.routes[routeKey], count);
    }

    // ── ADD WALK-IN ──
    function addWalkinPassengers() {
      const routeKey = document.getElementById('walkinRoute').value;
      const date     = document.getElementById('walkinDate').value;
      const count    = parseInt(document.getElementById('walkinCount').value);

      if (!routeKey) { showWalkinError('Please select a route.'); return; }
      if (!date)     { showWalkinError('Please select a date.');   return; }
      if (!count || count < 1) { showWalkinError('Enter a valid passenger count.'); return; }

      clearWalkinError();

      const route = BOOKING_DATA.routes[routeKey];
      const available = route.capacity - route.booked;

      if (count > available) {
        showWalkinError(`Only ${available} seat${available !== 1 ? 's' : ''} available on this route.`);
        return;
      }

      // TODO: fetch('/api/operator/booking/walkin', { method: 'POST', body: JSON.stringify({ routeKey, date, count }) })
      route.booked += count;
      BOOKING_DATA.metrics.walkinToday += count;

      // Log entry
      const now = new Date();
      BOOKING_DATA.walkinLog.unshift({
        route: route.label,
        count,
        addedBy: 'Operator',
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      });

      renderMetrics(BOOKING_DATA);
      updateSeatBar();
      renderWalkinLog();

      document.getElementById('walkinCount').value = '';
      showToast(`✓ ${count} walk-in passenger${count !== 1 ? 's' : ''} added`);
    }

    function renderWalkinLog() {
      const tbody = document.getElementById('walkinLog');
      if (!BOOKING_DATA.walkinLog.length) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:var(--gray-400);padding:16px;">No walk-ins logged yet.</td></tr>`;
        return;
      }
      tbody.innerHTML = BOOKING_DATA.walkinLog.slice(0, 5).map(e => `
        <tr>
          <td>${e.route}</td>
          <td style="font-weight:600;">+${e.count}</td>
          <td style="color:var(--gray-500);">${e.addedBy}</td>
          <td style="color:var(--gray-500);">${e.time}</td>
        </tr>`).join('');
    }

    // ── CODE FORMATTING ──
    function formatCode(input) {
      let v = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
      if (v.length > 2) v = v.slice(0, 2) + '-' + v.slice(2, 6);
      input.value = v;
    }

    // ── VERIFY CODE ──
    function verifyCode() {
      const code = document.getElementById('bookingCode').value.trim().toUpperCase();

      if (!code || code.length < 5) { showVerifyError('Please enter a valid booking code.'); return; }
      clearVerifyError();

      // TODO: fetch(`/api/operator/booking/verify/${code}`)
      const result = document.getElementById('verifyResult');
      const entry = BOOKING_DATA.codes[code];

      result.className = 'verify-result visible';
      document.getElementById('verifyCodeDisplay').textContent = code;

      if (!entry) {
        result.className = 'verify-result visible invalid';
        document.getElementById('verifyStatusText').className = 'verify-status invalid-text';
        document.getElementById('verifyStatusText').textContent = '✕ Invalid code — not found';
        document.getElementById('verifyDetails').innerHTML = '';
        document.getElementById('confirmSeatBtn').style.display = 'none';
        return;
      }

      const isPaid = entry.status === 'Paid';
      result.className = `verify-result visible ${isPaid ? 'valid' : 'invalid'}`;

      document.getElementById('verifyStatusText').className = `verify-status ${isPaid ? 'valid-text' : 'invalid-text'}`;
      document.getElementById('verifyStatusText').textContent = isPaid
        ? (entry.confirmed ? '✓ Already confirmed' : '✓ Valid — seat not yet confirmed')
        : '⚠ Pending payment — do not confirm seat';

      document.getElementById('verifyDetails').innerHTML = `
        <div class="verify-row"><span class="vr-key">Passenger</span><span class="vr-val">${entry.passenger}</span></div>
        <div class="verify-row"><span class="vr-key">Route</span><span class="vr-val">${entry.route}</span></div>
        <div class="verify-row"><span class="vr-key">Seat</span><span class="vr-val">${entry.seat}</span></div>
        <div class="verify-row"><span class="vr-key">Payment</span><span class="vr-val" style="color:${isPaid ? 'var(--success)' : 'var(--warning)'};">${entry.status}</span></div>`;

      const confirmBtn = document.getElementById('confirmSeatBtn');
      confirmBtn.style.display = (isPaid && !entry.confirmed) ? 'block' : 'none';
      confirmBtn.dataset.code = code;
    }

    function confirmSeat() {
      const code  = document.getElementById('confirmSeatBtn').dataset.code;
      const entry = BOOKING_DATA.codes[code];
      if (!entry) return;

      // TODO: fetch(`/api/operator/booking/confirm/${code}`, { method: 'POST' })
      entry.confirmed = true;
      BOOKING_DATA.metrics.codesVerified += 1;
      renderMetrics(BOOKING_DATA);
      verifyCode(); // re-render result
      showToast(`✓ Seat ${entry.seat} confirmed for ${entry.passenger}`);
    }

    // ── ERRORS ──
    function showWalkinError(msg) {
      const el = document.getElementById('walkinError');
      el.textContent = msg; el.classList.add('visible');
    }
    function clearWalkinError() {
      const el = document.getElementById('walkinError');
      el.textContent = ''; el.classList.remove('visible');
    }
    function showVerifyError(msg) {
      const el = document.getElementById('verifyError');
      el.textContent = msg; el.classList.add('visible');
    }
    function clearVerifyError() {
      const el = document.getElementById('verifyError');
      el.textContent = ''; el.classList.remove('visible');
    }

    // ── TOAST ──
    function showToast(msg) {
      const t = document.getElementById('toast');
      t.textContent = msg; t.classList.add('show');
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
    document.getElementById('walkinDate').valueAsDate = new Date();
    renderMetrics(BOOKING_DATA);
    renderWalkinLog();