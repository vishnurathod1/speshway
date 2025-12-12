// admin.js - handles modals, buttons, search, and interactions on admin dashboard

// Modal handling - Note: openAddModal is now handled in dashboard.js to avoid conflicts
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = 'none';
}

// Close modals when clicking outside modal content
window.onclick = function(event) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
};

// Delete row from table
function deleteRow(button) {
  const row = button.closest('tr');
  if (row) row.remove();
}

// Search/filter table rows by input
function setupSearch(inputId, tableId) {
  const input = document.getElementById(inputId);
  const table = document.getElementById(tableId);
  if (!input || !table) return;
  input.addEventListener('input', () => {
    const filter = input.value.toLowerCase();
    const rows = table.tBodies[0].rows;
    for (let row of rows) {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(filter) ? '' : 'none';
    }
  });
}

// Add clear button to search inputs
function addClearButtonToSearch(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const wrapper = input.parentElement;
  if (!wrapper) return;

  // Create clear button
  const clearBtn = document.createElement('span');
  clearBtn.textContent = '×';
  clearBtn.style.position = 'absolute';
  clearBtn.style.right = '10px';
  clearBtn.style.top = '50%';
  clearBtn.style.transform = 'translateY(-50%)';
  clearBtn.style.cursor = 'pointer';
  clearBtn.style.color = '#666';
  clearBtn.style.fontSize = '16px';
  clearBtn.style.userSelect = 'none';
  clearBtn.style.display = 'none';

  wrapper.appendChild(clearBtn);

  // Show/hide clear button based on input value
  input.addEventListener('input', () => {
    clearBtn.style.display = input.value ? 'inline' : 'none';
  });

  // Clear input on click
  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.style.display = 'none';
    input.dispatchEvent(new Event('input')); // Trigger input event to update filters
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupSearch('assignmentSearch', 'assignmentTable');
  setupSearch('studentSearch', 'studentTable');
  setupSearch('trainerSearch', 'trainerTable');
  setupSearch('recordedSearch', 'recordedTable');
  setupSearch('liveSearch', 'liveTable');

  // Add clear buttons to search inputs
  addClearButtonToSearch('assignmentSearch');
  addClearButtonToSearch('studentSearch');
  addClearButtonToSearch('trainerSearch');
  addClearButtonToSearch('recordedSearch');
  addClearButtonToSearch('liveSearch');
  addClearButtonToSearch('globalSearch');

  // Enhanced global search to filter multiple tables on dashboard
  const globalSearch = document.getElementById('globalSearch');
  if (globalSearch) {
    globalSearch.addEventListener('input', () => {
      const term = globalSearch.value.toLowerCase();

      const filterTable = (tableId) => {
        const table = document.getElementById(tableId);
        if (!table) return;
        const rows = table.tBodies[0].rows;
        for (let row of rows) {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(term) ? '' : 'none';
        }
      };

      filterTable('studentTable');
      filterTable('trainerTable');
      filterTable('assignmentTable');
      filterTable('recordedTable');
      filterTable('liveTable');
    });
  }

  // Logout button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('adminLoggedIn');
      localStorage.removeItem('adminUsername');
      // Redirect to login page
      window.location.href = '../login.html';
    });
  }

  // Notification bell click
  const notifBell = document.getElementById('notifBell');
  if (notifBell) {
    notifBell.addEventListener('click', () => {
      alert('No new notifications');
      // Implement notification panel toggle here
    });
  }

  // Sidebar toggle for mobile
  const menuBtn = document.querySelector('.menu-btn');
  const sidebar = document.querySelector('.sidebar');
  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Profile modal
  window.openProfileModal = function() {
    alert('Profile modal not implemented yet');
    // Implement profile modal here
  };
});

// Video play modal handling
function openVideoModal(url) {
  let modal = document.getElementById('modalVideoPlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modalVideoPlay';
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
    modal.style.zIndex = '1000';

    const content = document.createElement('div');
    content.style.position = 'relative';
    content.style.width = '80%';
    content.style.maxWidth = '800px';
    content.style.backgroundColor = '#fff';
    content.style.padding = '10px';
    content.style.borderRadius = '8px';

    const closeBtn = document.createElement('span');
    closeBtn.textContent = '×';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '15px';
    closeBtn.style.fontSize = '28px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.userSelect = 'none';
    closeBtn.onclick = () => {
      modal.style.display = 'none';
      const iframe = modal.querySelector('iframe');
      if (iframe) iframe.src = '';
    };

    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.width = '100%';
    iframe.height = '450';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    content.appendChild(closeBtn);
    content.appendChild(iframe);
    modal.appendChild(content);
    document.body.appendChild(modal);
  } else {
    modal.style.display = 'flex';
    const iframe = modal.querySelector('iframe');
    if (iframe) iframe.src = url;
  }
}
