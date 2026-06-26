// Initial Seed Data
    let tickets = [
      {
        id: 1,
        reporter: "Adewale Musa",
        reporterType: "driver",
        type: "emergency",
        desc: "Severe radiator leak detected on Jibowu-Benin route. Vehicle overheating. Pulled over safely at expressway checkpoint.",
        status: "open",
        date: "2026-06-24 14:10"
      },
      {
        id: 2,
        reporter: "Passenger in Seat 14",
        reporterType: "passenger",
        type: "complaint",
        desc: "Air conditioning is blowing warm air on the Abuja-Kaduna shuttle (Plate: KJA 551 TY).",
        status: "open",
        date: "2026-06-24 13:45"
      },
      {
        id: 3,
        reporter: "Fatima Bello",
        reporterType: "driver",
        type: "complaint",
        desc: "Delay at Benin Terminal loading bay due to double-parked third-party logistics vehicle.",
        status: "escalated",
        date: "2026-06-24 11:20"
      },
      {
        id: 4,
        reporter: "Passenger in Seat 03",
        reporterType: "passenger",
        type: "feedback",
        desc: "Excellent, smooth driving style from driver Chinedu Okafor on the Lagos-Ibadan run today.",
        status: "resolved",
        date: "2026-06-24 09:15"
      },
      {
        id: 5,
        reporter: "Emeka Nwosu",
        reporterType: "driver",
        type: "feedback",
        desc: "Recommend installing a fast-charge USB dock on the newer Coaster buses for driver conveniences.",
        status: "open",
        date: "2026-06-24 08:30"
      }
    ];

    let currentFilter = 'all';

    window.addEventListener('DOMContentLoaded', () => {
      renderDashboard();
      updateClock();
      setInterval(updateClock, 1000);
    });

    function updateClock() {
      const now = new Date();
      const h = now.getHours() % 12 || 12;
      const m = String(now.getMinutes()).padStart(2,'0');
      const s = String(now.getSeconds()).padStart(2,'0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      document.getElementById('navClock').textContent = `${h}:${m}:${s} ${ampm}`;
    }

    function renderDashboard() {
      // Calculate Stats
      const activeEmergencies = tickets.filter(t => t.type === 'emergency' && t.status !== 'resolved').length;
      const openComplaints = tickets.filter(t => t.type === 'complaint' && t.status !== 'resolved').length;
      const totalFeedback = tickets.filter(t => t.type === 'feedback').length;

      document.getElementById('stat-emergency').textContent = activeEmergencies;
      document.getElementById('stat-complaint').textContent = openComplaints;
      document.getElementById('stat-feedback').textContent = totalFeedback;

      // Group tickets
      const emergencyList = document.getElementById('list-emergency');
      const complaintList = document.getElementById('list-complaint');
      const feedbackList = document.getElementById('list-feedback');

      emergencyList.innerHTML = '';
      complaintList.innerHTML = '';
      feedbackList.innerHTML = '';

      const counts = { emergency: 0, complaint: 0, feedback: 0 };
      const searchVal = document.getElementById('searchInput').value.toLowerCase();

      tickets.forEach(ticket => {
        // Filter by Status Tab
        if (currentFilter !== 'all' && ticket.status !== currentFilter) {
          return;
        }

        // Filter by Search Query
        if (searchVal && 
            !ticket.reporter.toLowerCase().includes(searchVal) && 
            !ticket.desc.toLowerCase().includes(searchVal)) {
          return;
        }

        counts[ticket.type]++;

        const card = document.createElement('div');
        card.className = 'ticket-card';
        card.onclick = () => openDetails(ticket);
        card.innerHTML = `
          <div class="ticket-meta">
            <span class="reporter-info">${ticket.reporter}</span>
            <span class="reporter-type">${ticket.reporterType}</span>
          </div>
          <p class="ticket-desc">${ticket.desc}</p>
          <div class="ticket-footer">
            <span class="ticket-date">${ticket.date}</span>
            <span class="badge ${ticket.status}">${ticket.status}</span>
          </div>
        `;

        if (ticket.type === 'emergency') {
          emergencyList.appendChild(card);
        } else if (ticket.type === 'complaint') {
          complaintList.appendChild(card);
        } else if (ticket.type === 'feedback') {
          feedbackList.appendChild(card);
        }
      });

      // Update Column Headers Counts
      document.getElementById('count-emergency').textContent = counts.emergency;
      document.getElementById('count-complaint').textContent = counts.complaint;
      document.getElementById('count-feedback').textContent = counts.feedback;
    }

    function setFilter(status, btn) {
      currentFilter = status;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderDashboard();
    }

    function filterTickets() {
      renderDashboard();
    }

    // Modal Control
    function openDetails(ticket) {
      const modal = document.getElementById('detailsModal');
      const body = document.getElementById('modalDetailsBody');

      body.innerHTML = `
        <div class="detail-row">
          <span class="detail-label">Reporter</span>
          <span class="detail-value">${ticket.reporter} (${ticket.reporterType})</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Category</span>
          <span class="detail-value" style="text-transform: capitalize;">${ticket.type}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Reported Date</span>
          <span class="detail-value">${ticket.date}</span>
        </div>
        <div class="detail-row" style="flex-direction: column; align-items: flex-start; gap: 6px;">
          <span class="detail-label">Situation / Description</span>
          <span class="detail-value" style="font-weight: normal; line-height: 1.5; margin-top: 4px;">${ticket.desc}</span>
        </div>
        <div class="detail-row" style="align-items: center;">
          <span class="detail-label">Change Status</span>
          <select id="statusSelect" onchange="updateTicketStatus(${ticket.id}, this.value)" style="padding: 6px 10px; border-radius: 4px; border: 1px solid var(--gray-300); font-weight: 600;">
            <option value="open" ${ticket.status === 'open' ? 'selected' : ''}>Open</option>
            <option value="resolved" ${ticket.status === 'resolved' ? 'selected' : ''}>Resolved</option>
            <option value="escalated" ${ticket.status === 'escalated' ? 'selected' : ''}>Escalated</option>
          </select>
        </div>
      `;

      modal.style.display = 'flex';
      modal.offsetHeight;
      modal.classList.add('show');
    }

    function closeDetailsModal() {
      const modal = document.getElementById('detailsModal');
      modal.classList.remove('show');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 200);
    }

    function updateTicketStatus(id, newStatus) {
      const ticket = tickets.find(t => t.id === id);
      if (ticket) {
        ticket.status = newStatus;
        showToast(`Updated ticket status to ${newStatus}`);
        renderDashboard();
        closeDetailsModal();
      }
    }

    function openNewTicketModal() {
      const modal = document.getElementById('newTicketModal');
      modal.style.display = 'flex';
      modal.offsetHeight;
      modal.classList.add('show');
    }

    function closeNewTicketModal() {
      const modal = document.getElementById('newTicketModal');
      modal.classList.remove('show');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 200);
    }

    function handleNewTicketSubmit(e) {
      e.preventDefault();
      const reporter = document.getElementById('newReporter').value;
      const reporterType = document.getElementById('newReporterType').value;
      const type = document.getElementById('newType').value;
      const desc = document.getElementById('newDesc').value;

      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const dateStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

      const newId = tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1;
      const newTicket = {
        id: newId,
        reporter,
        reporterType,
        type,
        desc,
        status: 'open',
        date: dateStr
      };

      tickets.unshift(newTicket);
      showToast('Logged new ticket successfully');
      renderDashboard();
      closeNewTicketModal();

      // Reset form
      e.target.reset();
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }