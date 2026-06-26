const DRIVERS = ["Adewale Musa", "Chinedu Okafor", "Fatima Bello", "Emeka Nwosu", "Yusuf Ademola", "Debola Isaac", "Peter Abu"];
    const BUSES = [
      { plate: "LND 311 AM", model: "Lamata BRT" },
      { plate: "AKD 924 AX", model: "Higar Bus" },
      { plate: "KJA 551 TY", model: "Coaster" },
      { plate: "LND 472 YK", model: "Toyota HiAce" },
      { plate: "LND 981 AB", model: "Lamata BRT" },
      { plate: "AKD 110 XX", model: "Higar Bus" },
      { plate: "KJA 202 ZZ", model: "Coaster" }
    ];

    // Load mappings
    let mappings = {};
    const stored = localStorage.getItem('transitkey_driver_bus_mapping');
    if (stored) {
      mappings = JSON.parse(stored);
    } else {
      // Default initial mappings matching the initial state
      mappings = {
        "Chinedu Okafor": "LND 311 AM",
        "Fatima Bello": "AKD 924 AX"
      };
      localStorage.setItem('transitkey_driver_bus_mapping', JSON.stringify(mappings));
    }

    window.addEventListener('DOMContentLoaded', () => {
      populateDropdowns();
      renderMappings();
    });

    function populateDropdowns() {
      const dSelect = document.getElementById('driverSelect');
      DRIVERS.forEach(driver => {
        const opt = document.createElement('option');
        opt.value = driver;
        opt.textContent = driver;
        dSelect.appendChild(opt);
      });

      const bSelect = document.getElementById('busSelect');
      BUSES.forEach(bus => {
        const opt = document.createElement('option');
        opt.value = bus.plate;
        opt.textContent = `${bus.plate} (${bus.model})`;
        bSelect.appendChild(opt);
      });
    }

    function renderMappings() {
      const tbody = document.getElementById('mappingsTableBody');
      tbody.innerHTML = '';
      
      const keys = Object.keys(mappings);
      if (keys.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;padding:24px;color:var(--gray-500);">No active mappings found.</td></tr>`;
        return;
      }

      keys.forEach(driver => {
        const plate = mappings[driver];
        const row = document.createElement('tr');
        row.innerHTML = `
          <td style="font-weight: 600;">${driver}</td>
          <td>${plate}</td>
          <td style="text-align: right;"><button class="action-btn" onclick="removeMapping('${driver}')">Unassign</button></td>
        `;
        tbody.appendChild(row);
      });
    }

    // Custom Confirm Dialog function returning a Promise
    function showCustomConfirm(message) {
      return new Promise((resolve) => {
        const modal = document.getElementById('confirmModal');
        const msgEl = document.getElementById('confirmMessage');
        const cancelBtn = document.getElementById('confirmCancelBtn');
        const okBtn = document.getElementById('confirmOkBtn');

        msgEl.textContent = message;
        // Force reflow then show
        modal.offsetHeight;
        modal.classList.add('show');

        function cleanup() {
          modal.classList.remove('show');
          okBtn.removeEventListener('click', onOk);
          cancelBtn.removeEventListener('click', onCancel);
        }

        function onOk() {
          cleanup();
          resolve(true);
        }

        function onCancel() {
          cleanup();
          resolve(false);
        }

        okBtn.addEventListener('click', onOk);
        cancelBtn.addEventListener('click', onCancel);
      });
    }

    async function handleMappingSubmit(e) {
      e.preventDefault();
      const driver = document.getElementById('driverSelect').value;
      const bus = document.getElementById('busSelect').value;

      if (!driver || !bus) return;

      // Check if bus is already assigned to someone else
      const assignedDrivers = Object.keys(mappings);
      const duplicateDriver = assignedDrivers.find(d => mappings[d] === bus && d !== driver);
      if (duplicateDriver) {
        const confirmed = await showCustomConfirm(`${bus} is currently assigned to ${duplicateDriver}. Reassign to ${driver}?`);
        if (!confirmed) {
          return;
        }
        delete mappings[duplicateDriver];
      }

      mappings[driver] = bus;
      localStorage.setItem('transitkey_driver_bus_mapping', JSON.stringify(mappings));
      showToast(`Assigned ${driver} to ${bus}`);
      renderMappings();
      
      // Reset form
      document.getElementById('mappingForm').reset();
    }

    async function removeMapping(driver) {
      const confirmed = await showCustomConfirm(`Remove assignment for ${driver}?`);
      if (confirmed) {
        delete mappings[driver];
        localStorage.setItem('transitkey_driver_bus_mapping', JSON.stringify(mappings));
        showToast(`Removed assignment for ${driver}`);
        renderMappings();
      }
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }