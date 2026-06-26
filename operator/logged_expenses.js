const EXPENSES_DATA = [
      { id: 1, driver: "Adewale Musa", type: "Fuel Purchase", description: "Fuel refill at NNPC Ojota", amount: "₦45,000", date: "Mar 24, 2026" },
      { id: 2, driver: "Chinedu Okafor", type: "Bus Repair", description: "Brake adjustment at Yaba workshop", amount: "₦18,000", date: "May 10, 2026" },
      { id: 3, driver: "Fatima Bello", type: "Tyre Replacement", description: "Front tyre replacement", amount: "₦65,000", date: "May 20, 2026" },
      { id: 4, driver: "Emeka Nwosu", type: "Park Levy", description: "Oshodi terminal loading fee", amount: "₦3,500", date: "Apr 20, 2026" },
      { id: 5, driver: "Yusuf Ademola", type: "Fuel Purchase", description: "Fuel at Conoil station, Ibadan", amount: "₦52,000", date: "Jun 1, 2026" },
      { id: 6, driver: "Debola Isaac", type: "Bus Repair", description: "Side mirror replacement", amount: "₦9,000", date: "Jun 5, 2026" },
      { id: 7, driver: "Peter Abu", type: "Other", description: "Toll gate fees, Sagamu interchange", amount: "₦1,200", date: "Jun 8, 2026" },
      { id: 8, driver: "Adewale Musa", type: "Tyre Replacement", description: "Rear tyre, Lamata depot", amount: "₦58,000", date: "Jun 10, 2026" }
    ];

    let filteredData = [...EXPENSES_DATA];
    let currentPage = 1;
    const PER_PAGE = 8;

    function renderMetrics(data) {
      const total = data.length;
      const totalAmt = data.reduce((sum, e) => {
        const num = parseInt(e.amount.replace(/[^0-9]/g, '')) || 0;
        return sum + num;
      }, 0);
      const drivers = new Set(data.map(e => e.driver)).size;
      const types = new Set(data.map(e => e.type)).size;

      document.getElementById('metricsRow').innerHTML = `
        <div class="metric-card">
          <div class="label">Total Submissions <span style="margin-left:auto;">📄</span></div>
          <div class="value">${total}</div>
          <div class="sub">All drivers combined</div>
        </div>
        <div class="metric-card">
          <div class="label">Total Amount <span style="margin-left:auto;">₦</span></div>
          <div class="value">₦${totalAmt.toLocaleString()}</div>
          <div class="sub">Filtered results</div>
        </div>
        <div class="metric-card">
          <div class="label">Drivers <span style="margin-left:auto;">👥</span></div>
          <div class="value">${drivers}</div>
          <div class="sub">In current view</div>
        </div>
        <div class="metric-card">
          <div class="label">Expense Types <span style="margin-left:auto;">📋</span></div>
          <div class="value">${types}</div>
          <div class="sub">Categories logged</div>
        </div>
      `;
    }

    function renderTable(data) {
      const tbody = document.getElementById('expenseTableBody');
      tbody.innerHTML = '';

      if (!data.length) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:60px;color:#64748b;">No expenses found.</td></tr>`;
        return;
      }

      data.forEach(exp => {
        const row = document.createElement('tr');
        row.style.cursor = 'pointer';
        row.onclick = () => viewExpense(exp.id);
        row.innerHTML = `
          <td class="driver-name">${exp.driver}</td>
          <td>${exp.type}</td>
          <td class="description">${exp.description}</td>
          <td class="amount">${exp.amount}</td>
          <td>${exp.date}</td>
        `;
        tbody.appendChild(row);
      });
    }

    function applyFilters() {
      const type = document.getElementById('filterType').value;
      const search = document.getElementById('filterSearch').value.toLowerCase().trim();
      const from = document.getElementById('filterDateFrom').value;
      const to = document.getElementById('filterDateTo').value;

      filteredData = EXPENSES_DATA.filter(exp => {
        if (type && exp.type !== type) return false;
        if (search && !exp.driver.toLowerCase().includes(search) && !exp.description.toLowerCase().includes(search)) return false;
        if (from && new Date(exp.date) < new Date(from)) return false;
        if (to && new Date(exp.date) > new Date(to)) return false;
        return true;
      });

      renderMetrics(filteredData);
      renderTable(filteredData);
    }

    function viewExpense(id) {
      const exp = EXPENSES_DATA.find(e => e.id === id);
      if (!exp) return;

      document.getElementById('modalBody').innerHTML = `
        <div class="modal-row"><span class="modal-key">Driver</span><span class="modal-val">${exp.driver}</span></div>
        <div class="modal-row"><span class="modal-key">Expense Type</span><span class="modal-val">${exp.type}</span></div>
        <div class="modal-row"><span class="modal-key">Description</span><span class="modal-val">${exp.description}</span></div>
        <div class="modal-row"><span class="modal-key">Amount</span><span class="modal-val">${exp.amount}</span></div>
        <div class="modal-row"><span class="modal-key">Date</span><span class="modal-val">${exp.date}</span></div>
      `;
      document.getElementById('modalOverlay').style.display = 'flex';
    }

    function closeModal() {
      document.getElementById('modalOverlay').style.display = 'none';
    }

    function handleOverlayClick(e) {
      if (e.target.id === 'modalOverlay') closeModal();
    }

    // Live Clock
    function updateClock() {
      const now = new Date();
      document.getElementById('navClock').textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
      });
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Initialize
    renderMetrics(EXPENSES_DATA);
    renderTable(filteredData);
// ── OPERATOR EXPENSE LOG ──
const OP_EXPENSES = [];

function submitOpExpense() {
  const type   = document.getElementById('opExpType').value;
  const amount = document.getElementById('opExpAmount').value;
  const date   = document.getElementById('opExpDate').value;
  const desc   = document.getElementById('opExpDesc').value.trim();
  const errEl  = document.getElementById('opExpError');

  if (!type || !amount || !date || !desc) {
    errEl.textContent = 'Please fill in all fields.';
    errEl.style.display = 'block';
    return;
  }

  errEl.style.display = 'none';

  // TODO: fetch('/api/operator/expenses', { method: 'POST', body: JSON.stringify({type, amount, date, desc}) })
  OP_EXPENSES.unshift({
    type, desc,
    amount: '₦' + Number(amount).toLocaleString(),
    date: new Date(date).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' })
  });

  renderOpExpenses();

  // Reset
  document.getElementById('opExpType').value = '';
  document.getElementById('opExpAmount').value = '';
  document.getElementById('opExpDate').value = '';
  document.getElementById('opExpDesc').value = '';
}

function renderOpExpenses() {
  const tbody = document.getElementById('opExpTableBody');
  if (!OP_EXPENSES.length) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:28px;color:#94a3b8;font-size:14px;">No expenses logged yet.</td></tr>';
    return;
  }
  tbody.innerHTML = OP_EXPENSES.map(e => `
    <tr>
      <td style="padding:12px 16px;font-size:13px;font-weight:600;border-bottom:1px solid #f1f5f9;">${e.type}</td>
      <td style="padding:12px 16px;font-size:13px;font-style:italic;color:#475569;border-bottom:1px solid #f1f5f9;">${e.desc}</td>
      <td style="padding:12px 16px;font-size:13px;font-weight:700;border-bottom:1px solid #f1f5f9;">${e.amount}</td>
      <td style="padding:12px 16px;font-size:13px;color:#64748b;border-bottom:1px solid #f1f5f9;">${e.date}</td>
    </tr>`).join('');
}

// Set today's date as default
document.addEventListener('DOMContentLoaded', () => {
  const d = document.getElementById('opExpDate');
  if (d) d.valueAsDate = new Date();
});
