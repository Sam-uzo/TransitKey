// ══════════════════════════════════════════════
    // AUTH — replace with real API call when ready
    // e.g. fetch('/api/auth/login', { method:'POST', body: JSON.stringify({email, password}) })
    // ══════════════════════════════════════════════
    const AUTH_CONFIG = {
      loginEndpoint: '/api/auth/login',   // POST
      redirectOnSuccess: 'transitkey_dashboard.html',
    };

    function handleLogin(e) {
      e.preventDefault();
      const email    = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      if (!email || !password) {
        showError('Please fill in all fields.');
        return;
      }
      // TODO: replace with -> fetch(AUTH_CONFIG.loginEndpoint, {...})
      // Simulated loading state
      const btn = document.querySelector('.login-btn');
      btn.textContent = 'Logging in...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'LOGIN';
        btn.disabled = false;
        window.location.href = AUTH_CONFIG.redirectOnSuccess;
      }, 1200);
    }

    function showError(msg) {
      let err = document.getElementById('loginError');
      if (!err) {
        err = document.createElement('p');
        err.id = 'loginError';
        err.style.cssText = 'color:#EF4B5E;font-size:13px;margin-top:-10px;margin-bottom:14px;';
        document.querySelector('.submit-btn').before(err);
      }
      err.textContent = msg;
    }

    document.querySelector('form').addEventListener('submit', handleLogin);