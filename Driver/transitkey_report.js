// ══════════════════════════════════════════════
    // REPORT DATA — replace with API fetch when ready
    // e.g. fetch('/api/driver/profile-summary').then(r => r.json()).then(data => renderSidebar(data))
    // ══════════════════════════════════════════════
    const SIDEBAR_DATA = {
      driverId: "8821",
      status: "Active",
    };

    function renderSidebar(d) {
      document.getElementById('sidebarDriverId').textContent = `Driver ID: ${d.driverId}`;
      document.getElementById('sidebarStatus').textContent   = `Status: ${d.status}`;
    }

    let selectedUrgency = 'low';

    function selectUrgency(btn) {
      document.querySelectorAll('.urgency-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedUrgency = btn.dataset.level;
    }

    function submitComplaint() {
      const category    = document.getElementById('category').value;
      const description = document.getElementById('description').value.trim();

      if (!category)    { showError('Please select a complaint category.'); return; }
      if (!description) { showError('Please describe the issue.');          return; }

      clearError();

      const btn = document.querySelector('.btn-submit');
      btn.textContent = 'Submitting...';
      btn.disabled = true;

      // TODO: replace with -> fetch('/api/driver/complaints', { method: 'POST', body: JSON.stringify({ category, description, urgency: selectedUrgency }) })
      setTimeout(() => {
        btn.textContent = 'Submit Complaint';
        btn.disabled = false;
        showToast('✓ Complaint submitted successfully');
        resetForm();
      }, 1200);
    }

    function cancelComplaint() {
      if (confirm('Discard this complaint?')) {
        resetForm();
      }
    }

    function resetForm() {
      document.getElementById('category').value = '';
      document.getElementById('category').classList.remove('filled');
      document.getElementById('description').value = '';
      document.querySelectorAll('.urgency-btn').forEach(b => b.classList.remove('selected'));
      document.querySelector('.urgency-btn[data-level="low"]').classList.add('selected');
      selectedUrgency = 'low';
    }

    function showError(msg) {
      const el = document.getElementById('formError');
      el.textContent = msg;
      el.classList.add('visible');
    }

    function clearError() {
      const el = document.getElementById('formError');
      el.textContent = '';
      el.classList.remove('visible');
    }

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
    renderSidebar(SIDEBAR_DATA);