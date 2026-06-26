// ══════════════════════════════════════════════
    // SUBMIT EXPENSE — replace with API call when ready
    // e.g. fetch('/api/driver/expenses', { method: 'POST', body: formData })
    // ══════════════════════════════════════════════

    function submitExpense() {
      const type   = document.getElementById('expType').value;
      const amount = document.getElementById('expAmount').value;
      const desc   = document.getElementById('expDesc').value.trim();

      if (!type)   { showError('Please select an expense type.');   return; }
      if (!amount || Number(amount) <= 0) { showError('Please enter a valid amount.'); return; }
      if (!desc)   { showError('Please enter a description.');       return; }

      clearError();

      const btn = document.querySelector('.btn-submit');
      btn.textContent = 'Submitting...';
      btn.disabled = true;

      // TODO: replace setTimeout with real API call
      // const formData = new FormData();
      // formData.append('type', type);
      // formData.append('amount', amount);
      // formData.append('description', desc);
      // formData.append('receipt', document.getElementById('receiptFile').files[0]);
      // fetch('/api/driver/expenses', { method: 'POST', body: formData })

      setTimeout(() => {
        btn.textContent = 'Submit Expense';
        btn.disabled = false;
        showToast('✓ Expense submitted successfully');
        resetForm();
      }, 1200);
    }

    function cancelForm() {
      if (confirm('Discard this expense?')) {
        window.location.href = 'transitkey_expenses_simple.html';
      }
    }

    function resetForm() {
      document.getElementById('expType').value  = '';
      document.getElementById('expType').classList.remove('filled');
      document.getElementById('expAmount').value = '';
      document.getElementById('expDesc').value   = '';
      removeFile();
    }

    // ── FILE UPLOAD ──
    function handleFileSelect(input) {
      if (!input.files.length) return;
      const file = input.files[0];
      document.getElementById('fileName').textContent = file.name;
      document.getElementById('uploadPreview').classList.add('visible');
      document.getElementById('uploadArea').style.display = 'none';
    }

    function removeFile() {
      document.getElementById('receiptFile').value = '';
      document.getElementById('uploadPreview').classList.remove('visible');
      document.getElementById('uploadArea').style.display = 'flex';
    }

    // Drag & drop
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.addEventListener('dragover',  e => { e.preventDefault(); uploadArea.classList.add('dragover'); });
    uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
    uploadArea.addEventListener('drop', e => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file) {
        document.getElementById('fileName').textContent = file.name;
        document.getElementById('uploadPreview').classList.add('visible');
        uploadArea.style.display = 'none';
      }
    });

    // ── ERROR / TOAST ──
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
    setInterval(updateClock, 1000);
    updateClock();

    // ── MOBILE MENU ──
    function toggleMenu() {
      const menu = document.getElementById('mobileMenu');
      const btn  = document.getElementById('hamburger');
      menu.classList.toggle('open');
      btn.classList.toggle('open');
    }