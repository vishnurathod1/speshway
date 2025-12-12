// Trainer Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Check if trainer is logged in
    if (!localStorage.getItem('trainerLoggedIn')) {
        window.location.href = 'trainer-login.html';
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

// Save material
function saveMaterial() {
    const title = document.getElementById('materialTitle').value;
    const course = document.getElementById('materialCourse').value;
    const file = document.getElementById('materialFile').files[0];
    const desc = document.getElementById('materialDesc').value;

    if (!title || !course || !file) {
        alert('Please fill all fields');
        return;
    }

    // Simulate saving
    alert('Material uploaded successfully!');
    closeModal('modalMaterial');

    // Reset form
    document.getElementById('materialTitle').value = '';
    document.getElementById('materialCourse').value = '';
    document.getElementById('materialFile').value = '';
    document.getElementById('materialDesc').value = '';
}

// Save live class
function saveLiveClass() {
    const title = document.getElementById('liveClassTitle').value;
    const course = document.getElementById('liveClassCourse').value;
    const date = document.getElementById('liveClassDate').value;
    const time = document.getElementById('liveClassTime').value;
    const desc = document.getElementById('liveClassDesc').value;

    if (!title || !course || !date || !time) {
        alert('Please fill all fields');
        return;
    }

    // Simulate saving
    alert('Live class scheduled successfully!');
    closeModal('modalLiveclass');

    // Reset form
    document.getElementById('liveClassTitle').value = '';
    document.getElementById('liveClassCourse').value = '';
    document.getElementById('liveClassDate').value = '';
    document.getElementById('liveClassTime').value = '';
    document.getElementById('liveClassDesc').value = '';
}

// Save recorded class
function saveRecordedClass() {
    const title = document.getElementById('recordedClassTitle').value;
    const course = document.getElementById('recordedClassCourse').value;
    const file = document.getElementById('recordedClassFile').files[0];
    const desc = document.getElementById('recordedClassDesc').value;

    if (!title || !course || !file) {
        alert('Please fill all fields');
        return;
    }

    // Simulate saving
    alert('Recorded class uploaded successfully!');
    closeModal('modalRecordedclass');

    // Reset form
    document.getElementById('recordedClassTitle').value = '';
    document.getElementById('recordedClassCourse').value = '';
    document.getElementById('recordedClassFile').value = '';
    document.getElementById('recordedClassDesc').value = '';
}

// Profile modal (placeholder)
function openProfileModal() {
    alert('Profile modal not implemented yet');
}

// Open leave request modal
function openLeaveRequestModal() {
    const modal = document.getElementById('modalLeaveRequest');
    if (modal) modal.style.display = 'flex';
}

// Submit leave request
function submitLeaveRequest() {
    const startDate = document.getElementById('leaveStartDate').value;
    const endDate = document.getElementById('leaveEndDate').value;
    const reason = document.getElementById('leaveReason').value;

    if (!startDate || !endDate || !reason) {
        alert('Please fill all fields');
        return;
    }

    // Simulate submitting leave request
    alert('Leave request submitted successfully! It will be reviewed by the admin.');
    closeModal('modalLeaveRequest');

    // Reset form
    document.getElementById('leaveStartDate').value = '';
    document.getElementById('leaveEndDate').value = '';
    document.getElementById('leaveReason').value = '';
}

// View assignment
function viewAssignment(title) {
    window.location.href = 'assignment-details.html?title=' + encodeURIComponent(title);
}

// Join live class
function joinLiveClass(title) {
    window.location.href = 'live-classes.html?title=' + encodeURIComponent(title);
}

// View student details
function viewStudent(name) {
    window.location.href = 'student-details.html?name=' + encodeURIComponent(name);
}
