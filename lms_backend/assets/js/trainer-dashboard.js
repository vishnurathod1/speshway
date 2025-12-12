// Trainer Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Check if trainer is logged in
    if (!localStorage.getItem('trainerLoggedIn')) {
        window.location.href = '../trainer-login.html';
    }

    // Sidebar toggle
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('trainerLoggedIn');
        localStorage.removeItem('trainerUsername');
        window.location.href = '../index.html';
    });

    // Load data
    loadDashboardData();
});

// Load dashboard data
function loadDashboardData() {
    // Simulate loading data
    document.getElementById('courseCount').textContent = '2';
    document.getElementById('studentCount').textContent = '15';
    document.getElementById('assignmentCount').textContent = '5';
    document.getElementById('classCount').textContent = '10';
}

// Open modal
function openAddModal(type) {
    const modal = document.getElementById('modal' + type.charAt(0).toUpperCase() + type.slice(1).replace('-', ''));
    if (modal) modal.style.display = 'flex';
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

// Save assignment
function saveAssignment() {
    const title = document.getElementById('assignmentTitle').value;
    const course = document.getElementById('assignmentCourse').value;
    const due = document.getElementById('assignmentDue').value;
    const desc = document.getElementById('assignmentDesc').value;

    if (!title || !course || !due) {
        alert('Please fill all fields');
        return;
    }

    // Simulate saving
    alert('Assignment created successfully!');
    closeModal('modalAssignment');

    // Reset form
    document.getElementById('assignmentTitle').value = '';
    document.getElementById('assignmentCourse').value = '';
    document.getElementById('assignmentDue').value = '';
    document.getElementById('assignmentDesc').value = '';
}

// Profile modal (placeholder)
function openProfileModal() {
    alert('Profile modal not implemented yet');
}
