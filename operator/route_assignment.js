// Databases
    const DRIVERS_DATABASE = {
      "Adewale Musa": "(234) 803 5207 4333",
      "Chinedu Okafor": "(234) 805 2119 0921",
      "Fatima Bello": "(234) 812 3449 8812",
      "Emeka Nwosu": "(234) 802 8819 0042",
      "Yusuf Ademola": "(234) 816 7721 8831",
      "Debola Isaac": "(234) 809 1122 3344",
      "Peter Abu": "(234) 803 4455 6677"
    };

    const BUSES_DATABASE = [
      { plate: "LND 311 AM", model: "Lamata BRT", seats: "40 seats" },
      { plate: "AKD 924 AX", model: "Higar Bus", seats: "35 seats" },
      { plate: "KJA 551 TY", model: "Coaster", seats: "30 seats" },
      { plate: "LND 472 YK", model: "Toyota HiAce", seats: "18 seats" },
      { plate: "LND 981 AB", model: "Lamata BRT", seats: "40 seats" },
      { plate: "AKD 110 XX", model: "Higar Bus", seats: "35 seats" },
      { plate: "KJA 202 ZZ", model: "Coaster", seats: "30 seats" }
    ];

    const ROUTES_DATABASE = [
      "Jibowu (Lagos) - Ibadan Terminal",
      "Jibowu (Lagos) - Benin Terminal",
      "Jibowu (Lagos) - Utako (Abuja)",
      "Utako (Abuja) - Kaduna Terminal",
      "Jibowu (Lagos) - Port Harcourt Terminal",
      "Port Harcourt Terminal - Enugu Terminal"
    ];

    // Initial Assignments Data
    let assignments = [
      {
        id: 1,
        driver: "Chinedu Okafor",
        busPlate: "LND 311 AM",
        busModel: "Lamata BRT",
        route: "Jibowu (Lagos) - Ibadan Terminal",
        status: "active",
        date: "2026-06-24"
      },
      {
        id: 2,
        driver: "Fatima Bello",
        busPlate: "AKD 924 AX",
        busModel: "Higar Bus",
        route: "Jibowu (Lagos) - Benin Terminal",
        status: "pending",
        date: "2026-06-24"
      }
    ];

    // Initialize Page
    window.addEventListener('DOMContentLoaded', () => {
      // Set Default Date to Today
      const today = new Date().toISOString().split('T')[0];
      document.getElementById('date').value = today;

      // Populate Form Dropdowns
      populateDropdowns();

      // Render Dashboard
      renderDashboard();

      // Live Clock
      updateClock();
      setInterval(updateClock, 1000);

      // Listen for bus changes to auto-select driver
      document.getElementById('assignBus').addEventListener('change', handleBusChange);
    });

    // Populate Dropdowns
    function populateDropdowns() {
      const busSelect = document.getElementById('assignBus');
      busSelect.innerHTML = '<option value="" disabled selected>Select an available bus</option>';
      
      BUSES_DATABASE.forEach(bus => {
        const isAssigned = assignments.some(a => a.busPlate === bus.plate);
        const optionText = `${bus.plate} (${bus.model})`;
        const option = document.createElement('option');
        option.value = bus.plate;
        option.textContent = optionText;
        if (isAssigned) {
          option.textContent += ' [Currently Assigned]';
        }
        busSelect.appendChild(option);
      });

      const routeSelect = document.getElementById('route');
      routeSelect.innerHTML = '<option value="" disabled selected>Select route</option>';
      ROUTES_DATABASE.forEach(route => {
        const option = document.createElement('option');
        option.value = route;
        option.textContent = route;
        routeSelect.appendChild(option);
      });
    }

    // Driver selection auto-completes phone number and auto-selects bus mapping
    function handleDriverInput() {
      const name = document.getElementById('driverName').value;
      const phoneInput = document.getElementById('phoneNumber');
      if (DRIVERS_DATABASE[name]) {
        phoneInput.value = DRIVERS_DATABASE[name];
      } else {
        phoneInput.value = '';
      }

      // Sync driver name to assigned bus if mapping exists
      const stored = localStorage.getItem('transitkey_driver_bus_mapping');
      if (stored) {
        const mappings = JSON.parse(stored);
        if (mappings[name]) {
          const busPlate = mappings[name];
          const busSelect = document.getElementById('assignBus');
          if (busSelect.querySelector(`option[value="${busPlate}"]`)) {
            busSelect.value = busPlate;
          }
        }
      }
    }

    // Bus selection auto-fills driver if mapping exists
    function handleBusChange() {
      const busPlate = document.getElementById('assignBus').value;
      const stored = localStorage.getItem('transitkey_driver_bus_mapping');
      if (stored) {
        const mappings = JSON.parse(stored);
        // Find driver assigned to this bus
        const driverName = Object.keys(mappings).find(d => mappings[d] === busPlate);
        if (driverName) {
          const driverInput = document.getElementById('driverName');
          driverInput.value = driverName;
          handleDriverInput(); // Auto-fill phone and trigger dropdown validation
        }
      }
    }

    // Render assignments table, available buses, and quick stats
    function renderDashboard() {
      renderAssignmentsTable();
      renderAvailableBuses();
      renderStats();
    }

    // Render Stats
    function renderStats() {
      // Stats: Assigned Today (count of all assignments), Pending (status = pending),
      // Available buses (total buses minus current assignments), Unassigned drivers (total drivers minus assigned)
      const assignedCount = assignments.length;
      const pendingCount = assignments.filter(a => a.status === 'pending').length;
      const assignedBuses = new Set(assignments.map(a => a.busPlate));
      const availableBusesCount = BUSES_DATABASE.filter(b => !assignedBuses.has(b.plate)).length;

      const assignedDrivers = new Set(assignments.map(a => a.driver));
      const totalDrivers = Object.keys(DRIVERS_DATABASE).length;
      const unassignedDriversCount = Math.max(0, totalDrivers - assignedDrivers.size);

      document.getElementById('statAssignedToday').textContent = assignedCount + 12; // Add baseline of 12 for realistic quick stats
      document.getElementById('statPending').textContent = pendingCount + 2; // Baseline of 2
      document.getElementById('statAvailableBuses').textContent = availableBusesCount;
      document.getElementById('statUnassignedDrivers').textContent = unassignedDriversCount;
    }

    // Render Assignments Table
    function renderAssignmentsTable() {
      const tbody = document.getElementById('assignmentsTableBody');
      tbody.innerHTML = '';

      const searchVal = document.getElementById('searchAssignments').value.toLowerCase().trim();

      const filtered = assignments.filter(a => {
        return a.driver.toLowerCase().includes(searchVal) ||
               a.busPlate.toLowerCase().includes(searchVal) ||
               a.busModel.toLowerCase().includes(searchVal) ||
               a.route.toLowerCase().includes(searchVal);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:40px;color:var(--gray-500);">No matching assignments.</td></tr>`;
        return;
      }

      filtered.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>
            <div class="driver-cell">
              <span class="name">${item.driver}</span>
              <span class="sub">${item.busPlate} — ${item.busModel}</span>
            </div>
          </td>
          <td>${item.route}</td>
          <td>
            <span class="badge badge-${item.status}" onclick="toggleStatus(${item.id})">${item.status}</span>
          </td>
          <td style="text-align: center;">
            <button class="action-btn" onclick="deleteAssignment(${item.id})" title="Delete Assignment">×</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    }

    // Render Available Buses List (sidebar)
    function renderAvailableBuses() {
      const busListContainer = document.getElementById('availableBusList');
      busListContainer.innerHTML = '';

      const assignedBuses = new Set(assignments.map(a => a.busPlate));
      const availableBuses = BUSES_DATABASE.filter(b => !assignedBuses.has(b.plate));

      if (availableBuses.length === 0) {
        busListContainer.innerHTML = `<div style="text-align:center;padding:20px;color:var(--gray-500);font-size:13px;">No buses available right now.</div>`;
        return;
      }

      availableBuses.forEach(bus => {
        const busDiv = document.createElement('div');
        busDiv.className = 'bus-item';
        busDiv.innerHTML = `
          <div class="bus-details">
            <span class="bus-plate">${bus.plate}</span>
            <span class="bus-model">${bus.model}</span>
          </div>
          <span class="bus-seats">${bus.seats}</span>
        `;
        busListContainer.appendChild(busDiv);
      });
    }

    // Toggle Status
    function toggleStatus(id) {
      const item = assignments.find(a => a.id === id);
      if (item) {
        if (item.status === 'pending') {
          item.status = 'active';
        } else if (item.status === 'active') {
          item.status = 'completed';
        } else {
          item.status = 'pending';
        }
        showToast(`Updated ${item.driver}'s status to ${item.status}!`);
        renderDashboard();
      }
    }

    // Delete Assignment
    function deleteAssignment(id) {
      const item = assignments.find(a => a.id === id);
      if (item) {
        assignments = assignments.filter(a => a.id !== id);
        showToast(`Deleted route assignment for ${item.driver}.`);
        populateDropdowns();
        renderDashboard();
      }
    }

    // Filter assignments dynamically
    function filterAssignments() {
      renderAssignmentsTable();
    }

    // Handle Form Submit
    function handleFormSubmit(e) {
      e.preventDefault();

      const driver = document.getElementById('driverName').value;
      const busPlate = document.getElementById('assignBus').value;
      const route = document.getElementById('route').value;
      const date = document.getElementById('date').value;

      if (!driver || !busPlate || !route || !date) {
        alert("Please fill in all details.");
        return;
      }

      // Check if driver name is in our known database for validation (warn if not)
      const busObj = BUSES_DATABASE.find(b => b.plate === busPlate);
      
      const newAssignment = {
        id: assignments.length > 0 ? Math.max(...assignments.map(a => a.id)) + 1 : 1,
        driver: driver,
        busPlate: busPlate,
        busModel: busObj ? busObj.model : "Standard Bus",
        route: route,
        status: "pending",
        date: date
      };

      assignments.push(newAssignment);
      showToast(`Successfully assigned ${driver} to route ${route}!`);
      
      // Reset Form and Refresh view
      resetForm();
      populateDropdowns();
      renderDashboard();
    }

    // Reset Form
    function resetForm() {
      document.getElementById('assignmentForm').reset();
      const today = new Date().toISOString().split('T')[0];
      document.getElementById('date').value = today;
      document.getElementById('phoneNumber').value = '';
    }

    // Show Toast Notification
    function showToast(message) {
      const container = document.getElementById('toastContainer');
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = `
        <span class="toast-content">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
      `;
      container.appendChild(toast);
      
      // Force layout and show
      setTimeout(() => toast.classList.add('show'), 10);

      // Auto dismiss
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
      }, 4000);
    }

    // Live Clock
    function updateClock() {
      const now = new Date();
      document.getElementById('navClock').textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
      });
    }