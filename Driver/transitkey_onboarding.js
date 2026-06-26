// ══════════════════════════════════════════════
    // ONBOARDING — replace with real API call when ready
    // e.g. fetch('/api/auth/register', { method:'POST', body: JSON.stringify({...}) })
    // ══════════════════════════════════════════════
    const ONBOARDING_CONFIG = {
      registerEndpoint: '/api/auth/register',  // POST
      redirectOnSuccess: 'transitkey_dashboard.html',
    };

    function handleRegister(e) {
      e.preventDefault();
      const fullName       = document.getElementById('fullname').value.trim();
      const phone          = document.getElementById('phone').value.trim();
      const password       = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      const operatorCode   = document.getElementById('operator-code').value.trim();
      const terms          = document.getElementById('terms').checked;

      if (!fullName || !phone || !password || !operatorCode) {
        showError('Please fill in all fields.'); return;
      }
      if (password !== confirmPassword) {
        showError('Passwords do not match.'); return;
      }
      if (operatorCode.length !== 6) {
        showError('Operator code must be 6 digits.'); return;
      }
      if (!terms) {
        showError('Please accept the Terms of Service.'); return;
      }

      clearError();
      // TODO: replace with -> fetch(ONBOARDING_CONFIG.registerEndpoint, { method:'POST', body: JSON.stringify({fullName, phone, password, operatorCode}) })
      const btn = document.querySelector('.submit-btn');
      btn.textContent = 'Creating Account...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Create Account →';
        btn.disabled = false;
        window.location.href = ONBOARDING_CONFIG.redirectOnSuccess;
      }, 1500);
    }

    function showError(msg) {
      let err = document.getElementById('formError');
      if (!err) {
        err = document.createElement('p');
        err.id = 'formError';
        err.style.cssText = 'color:#EF4B5E;font-size:13px;margin-bottom:12px;';
        document.querySelector('.submit-btn').before(err);
      }
      err.textContent = msg;
    }

    function clearError() {
      const err = document.getElementById('formError');
      if (err) err.remove();
    }

    document.querySelector('form').addEventListener('submit', handleRegister);