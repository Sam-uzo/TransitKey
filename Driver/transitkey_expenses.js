// ══════════════════════════════════════════════
    // EXPENSES DATA — replace with API fetch when ready
    // e.g. fetch('/api/driver/expenses').then(r => r.json()).then(data => renderExpenses(data))
    // ══════════════════════════════════════════════
    const EXPENSES_DATA = {
      total: 28,
      perPage: 4,
      currentPage: 1,
      expenses: [
        { id: 1, date: "March 24, 2026",  type: "Fuel Purchase",    description: "Fuel refill at NNPC Ojota",          amount: "₦45,000", status: "Pending"  },
        { id: 2, date: "April 20, 2026",  type: "Park Levy",        description: "Oshodi terminal loading fee",        amount: "₦3,500",  status: "Approved" },
        { id: 3, date: "May 10, 2026",    type: "Bus Repair",       description: "Brake adjustment at Yaba workshop",  amount: "₦18,000", status: "Rejected" },
        { id: 4, date: "May 20, 2026",    type: "Tyre Replacement", description: "Front tyre replacement",             amount: "₦65,000", status: "Approved" },
      ],
    };

    let filteredExpenses = [...EXPENSES_DATA.expenses];
    let currentPage = 1;
    const perPage = EXPENSES_DATA.perPage;

    // ── RENDER TABLE ──
    function renderTable(data, page) {
      const tbody = document.getElementById('expenseTableBody');
      const start = (page - 1) * perPage;
      const pageData = data.slice(start, start + perPage);

      tbody.innerHTML = '';

      if (pageData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:32px;color:var(--gray-400);">No expenses found.</td></tr>`;
        return;
      }

      pageData.forEach(exp => {
        const statusClass = exp.status.toLowerCase();
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${exp.date}</td>
          <td>${exp.type}</td>
          <td class="description">${exp.description}</td>
          <td class="amount">${exp.amount}</td>
          <td>
            <span class="status-pill ${statusClass}">
              <span class="status-dot-sm"></span>
              ${exp.status}
            </span>
          </td>
          <td>
            <div class="action-btns">
              <button class="action-btn" onclick="viewExpense(${exp.id})">View</button>
              ${exp.status === 'Pending' ? `<button class="action-btn" onclick="editExpense(${exp.id})">Edit</button>` : ''}
              <button class="action-btn delete" onclick="deleteExpense(${exp.id})">Delete</button>
            </div>
          </td>`;
        tbody.appendChild(tr);
      });

      // Update pagination info
      const totalShown = Math.min(start + perPage, data.length);
      document.getElementById('paginationInfo').textContent =
        `Showing ${start + 1}–${totalShown} of ${data.length} submitted expenses`;

      renderPagination(data.length, page);
    }

    // ── RENDER PAGINATION ──
    function renderPagination(total, page) {
      const totalPages = Math.ceil(total / perPage);
      const container = document.getElementById('pagination');
      container.innerHTML = '';

      const prev = document.createElement('button');
      prev.className = 'page-btn';
      prev.innerHTML = '&lsaquo;';
      prev.disabled = page === 1;
      prev.onclick = () => goToPage(page - 1);
      container.appendChild(prev);

      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = 'page-btn' + (i === page ? ' active' : '');
        btn.textContent = i;
        btn.onclick = () => goToPage(i);
        container.appendChild(btn);
      }

      const next = document.createElement('button');
      next.className = 'page-btn';
      next.innerHTML = '&rsaquo;';
      next.disabled = page === totalPages;
      next.onclick = () => goToPage(page + 1);
      container.appendChild(next);
    }

    function goToPage(page) {
      currentPage = page;
      renderTable(filteredExpenses, currentPage);
    }

    // ── APPLY FILTERS ──
    function applyFilters() {
      const type   = document.getElementById('filterType').value.trim().toLowerCase();
      const status = document.getElementById('filterStatus').value;

      filteredExpenses = EXPENSES_DATA.expenses.filter(exp => {
        if (type   && !exp.type.toLowerCase().includes(type))   return false;
        if (status && exp.status !== status) return false;
        return true;
      });

      currentPage = 1;
      renderTable(filteredExpenses, currentPage);
    }

    // ── ACTION HANDLERS — wire to API when ready ──
    function viewExpense(id) {
      // TODO: fetch(`/api/driver/expenses/${id}`) then show modal
      alert(`View expense #${id} — connect to API`);
    }

    function editExpense(id) {
      // TODO: open edit form pre-filled with expense data
      alert(`Edit expense #${id} — connect to API`);
    }

    function deleteExpense(id) {
      if (!confirm('Delete this expense?')) return;
      // TODO: fetch(`/api/driver/expenses/${id}`, { method: 'DELETE' })
      filteredExpenses = filteredExpenses.filter(e => e.id !== id);
      renderTable(filteredExpenses, currentPage);
    }

    function openSubmitModal() {
      // TODO: open submit new expense modal/form
      alert('Submit New Expense — connect to API');
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
      btn.setAttribute('aria-expanded', menu.classList.contains('open'));
    }

    // ── INIT ──
    renderTable(filteredExpenses, currentPage);