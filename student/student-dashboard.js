// Sample data for student dashboard
const sampleCourses = [
  { title: "Mathematics", progress: "75%", instructor: "Dr. Smith", status: "In Progress" },
  { title: "Physics", progress: "60%", instructor: "Prof. Johnson", status: "In Progress" }
];

const sampleAssignments = [
  { title: "Algebra Homework", course: "Mathematics", due: "2024-10-15", status: "Pending", progress: "0%", score: "-" },
  { title: "Physics Lab Report", course: "Physics", due: "2024-10-18", status: "Submitted", progress: "100%", score: "85/100" },
  { title: "Geometry Quiz", course: "Mathematics", due: "2024-10-20", status: "Overdue", progress: "50%", score: "-" },
  { title: "Mechanics Problem Set", course: "Physics", due: "2024-10-22", status: "Pending", progress: "20%", score: "-" },
  { title: "Calculus Assignment", course: "Mathematics", due: "2024-10-25", status: "Pending", progress: "10%", score: "-" }
];

const sampleAttendance = [
  { date: "2024-10-01", status: "Present", course: "Mathematics" },
  { date: "2024-10-02", status: "Present", course: "Physics" },
  { date: "2024-10-03", status: "Absent", course: "Mathematics" },
  { date: "2024-10-04", status: "Present", course: "Physics" },
  { date: "2024-10-05", status: "Present", course: "Mathematics" }
];

const sampleRecordedClasses = [
  { title: "Introduction to Algebra", course: "Mathematics", duration: "45 min" },
  { title: "Newton's Laws", course: "Physics", duration: "50 min" },
  { title: "Geometry Basics", course: "Mathematics", duration: "40 min" },
  { title: "Electricity Fundamentals", course: "Physics", duration: "55 min" },
  { title: "Trigonometry", course: "Mathematics", duration: "48 min" }
];

const sampleLiveClasses = [
  { title: "Advanced Calculus", trainer: "Dr. Smith", date: "2024-10-15 10:00 AM" },
  { title: "Quantum Physics", trainer: "Prof. Johnson", date: "2024-10-16 2:00 PM" },
  { title: "Statistics", trainer: "Dr. Smith", date: "2024-10-17 11:00 AM" },
  { title: "Thermodynamics", trainer: "Prof. Johnson", date: "2024-10-18 3:00 PM" },
  { title: "Linear Algebra", trainer: "Dr. Smith", date: "2024-10-19 9:00 AM" }
];

const samplePendingTasks = [
  { task: "Submit Physics Lab Report", type: "Assignment", date: "2024-10-18" },
  { task: "Review Mathematics Quiz", type: "Assessment", date: "2024-10-20" },
  { task: "Complete Geometry Homework", type: "Assignment", date: "2024-10-22" }
];

const sampleActivities = [
  "Submitted Algebra Homework",
  "Watched Introduction to Algebra video",
  "Attended Physics live class",
  "Downloaded Mathematics study materials",
  "Completed Geometry quiz"
];

const sampleHolidays = [
  "Diwali - Oct 31, 2024",
  "Christmas - Dec 25, 2024",
  "New Year - Jan 1, 2025"
];

const sampleNotifications = [
  "Assignment deadline extended",
  "New course material uploaded",
  "Live class scheduled for tomorrow"
];

// Student dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
  // Check if student is logged in
  if (!localStorage.getItem('studentLoggedIn')) {
    window.location.href = 'student-login.html';
  }

  // Sidebar toggle
  document.getElementById('menuBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('active');
  });

  // Logout button
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('studentLoggedIn');
    localStorage.removeItem('studentUsername');
    window.location.href = 'student-login.html';
  });

  // Load sample data
  loadCourses();
  loadAssignments();
  loadRecordedClasses();
  loadLiveClasses();
  loadHolidays();
  loadNotifications();
  updateStats();
});

// Modal functions
function openModal(type) {
  const modal = document.getElementById('modal' + type.charAt(0).toUpperCase() + type.slice(1));
  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeModal(type) {
  const modal = document.getElementById('modal' + type.charAt(0).toUpperCase() + type.slice(1));
  if (modal) {
    modal.style.display = 'none';
  }
}

// Quick actions
function submitAssignment() {
  // Redirect to assignment submission page
  window.location.href = 'my-assignments.html';
}

function downloadMaterial() {
  // Simulate download of study material
  const link = document.createElement('a');
  link.href = 'data:text/plain;charset=utf-8,Sample study material content';
  link.download = 'study_material.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  alert('Study material downloaded successfully!');
}

function joinLiveClass(title) {
  // Redirect to Zoom meeting (placeholder meeting ID)
  window.location.href = 'https://zoom.us/j/123456789';
}

function watchRecordedClass(title) {
  // Redirect to recorded class page or open modal
  window.location.href = 'recorded-classes.html?title=' + encodeURIComponent(title);
}

function submitFeedback() {
  // Open feedback modal
  openModal('feedback');
}

function submitAssignmentForm() {
  const title = document.getElementById('assignmentTitle').value;
  const file = document.getElementById('assignmentFile').files[0];
  const notes = document.getElementById('assignmentNotes').value;
  if (title && file) {
    alert('Assignment submitted: ' + title);
    closeModal('assignment');
  } else {
    alert('Please fill in the required fields.');
  }
}

function downloadMaterial() {
  const title = document.getElementById('materialTitle').value || 'study_material';
  // Simulate download
  const link = document.createElement('a');
  link.href = 'data:text/plain;charset=utf-8,Sample study material content for ' + title;
  link.download = title.replace(/\s+/g, '_') + '.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  alert('Study material downloaded successfully!');
  closeModal('material');
}

function joinLiveClassModal() {
  const title = document.getElementById('liveClassTitle').value;
  if (title) {
    joinLiveClass(title);
    closeModal('live-class');
  } else {
    alert('Please enter a class title.');
  }
}

function watchRecordedClassModal() {
  const title = document.getElementById('recordedClassTitle').value;
  if (title) {
    watchRecordedClass(title);
    closeModal('recorded-class');
  } else {
    alert('Please enter a class title.');
  }
}

function submitFeedbackForm() {
  const feedback = document.getElementById('feedbackText').value;
  if (feedback) {
    alert('Feedback submitted: ' + feedback);
    closeModal('feedback');
  } else {
    alert('Please enter feedback.');
  }
}

// Profile modal (placeholder)
function openProfileModal() {
  alert('Profile modal would be implemented here.');
}

// Student Phase Recordings (Edureka-like functionality)
const phaseRecordings = [
  {
    title: "Phase 1: Introduction to Mathematics",
    thumbnail: "https://img.youtube.com/vi/_lK4cX7u2AQ/maxresdefault.jpg",
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    title: "Phase 2: Algebra Basics",
    thumbnail: "https://img.youtube.com/vi/ScHgGumN9c0/maxresdefault.jpg",
    video: "https://www.w3schools.com/html/movie.mp4"
  },
  {
    title: "Phase 3: Geometry Fundamentals",
    thumbnail: "https://img.youtube.com/vi/Gjnup-PuquQ/maxresdefault.jpg",
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    title: "Phase 4: Calculus Introduction",
    thumbnail: "https://img.youtube.com/vi/7Vtl2QHh8nA/maxresdefault.jpg",
    video: "https://www.w3schools.com/html/movie.mp4"
  }
];

// Load phase recordings dynamically
const phaseContainer = document.getElementById("phaseRecordingsContainer");

function loadPhaseRecordings(list) {
  phaseContainer.innerHTML = "";
  list.forEach(rec => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${rec.thumbnail}" alt="Thumbnail" class="thumbnail">
      <div class="card-body">
        <h3>${rec.title}</h3>
        <a href="#" class="play-btn" data-video="${rec.video}">▶ Play</a>
      </div>
    `;
    phaseContainer.appendChild(card);
  });
}

// Search functionality for phase recordings
document.getElementById("phaseSearchInput").addEventListener("keyup", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = phaseRecordings.filter(r => r.title.toLowerCase().includes(query));
  loadPhaseRecordings(filtered);
});

// Modal player for phase recordings
const phaseModal = document.getElementById("phaseVideoModal");
const phasePlayer = document.getElementById("phaseVideoPlayer");
const closePhaseModal = document.getElementById("closePhaseModal");

phaseContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("play-btn")) {
    e.preventDefault();
    const videoSrc = e.target.dataset.video;
    phasePlayer.src = videoSrc;
    phaseModal.style.display = "flex";
  }
});

closePhaseModal.onclick = () => {
  phaseModal.style.display = "none";
  phasePlayer.pause();
};

window.onclick = (e) => {
  if (e.target == phaseModal) {
    phaseModal.style.display = "none";
    phasePlayer.pause();
  }
};

// Load functions for sample data
function loadCourses() {
  const container = document.getElementById('topCourses');
  container.innerHTML = '';
  sampleCourses.forEach(course => {
    const courseDiv = document.createElement('div');
    courseDiv.className = 'course-card';
    courseDiv.innerHTML = `
      <h4>${course.title}</h4>
      <p>Instructor: ${course.instructor}</p>
      <p>Progress: ${course.progress}</p>
      <p>Status: ${course.status}</p>
    `;
    container.appendChild(courseDiv);
  });
}

function loadAssignments() {
  const tbody = document.getElementById('assignmentTable').querySelector('tbody');
  tbody.innerHTML = '';
  sampleAssignments.forEach(assignment => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${assignment.title}</td>
      <td>${assignment.course}</td>
      <td>${assignment.due}</td>
      <td class="status-${assignment.status.toLowerCase()}">${assignment.status}</td>
      <td>${assignment.progress}</td>
      <td>${assignment.score}</td>
    `;
    tbody.appendChild(row);
  });
}

function loadAttendance() {
  const tbody = document.getElementById('attendanceTable').querySelector('tbody');
  tbody.innerHTML = '';
  sampleAttendance.forEach(att => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${att.date}</td>
      <td class="status-${att.status.toLowerCase()}">${att.status}</td>
      <td>${att.course}</td>
      <td><button onclick="viewAttendance('${att.date}')">View</button></td>
    `;
    tbody.appendChild(row);
  });
}

function loadRecordedClasses() {
  const tbody = document.getElementById('recordedTable').querySelector('tbody');
  tbody.innerHTML = '';
  sampleRecordedClasses.forEach(cls => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${cls.title}</td>
      <td>${cls.course}</td>
      <td><button onclick="watchRecordedClass('${cls.title}')">Watch</button></td>
      <td><button class="btn btn-danger" onclick="downloadRecording('${cls.title}')">Download</button></td>
    `;
    tbody.appendChild(row);
  });
}

function loadLiveClasses() {
  const tbody = document.getElementById('liveTable').querySelector('tbody');
  tbody.innerHTML = '';
  sampleLiveClasses.forEach(cls => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${cls.title}</td>
      <td>${cls.trainer}</td>
      <td>${cls.date}</td>
      <td><button class="btn btn-primary" onclick="joinLiveClass('${cls.title}')">Join</button></td>
    `;
    tbody.appendChild(row);
  });
}

function loadPendingTasks() {
  const tbody = document.getElementById('pendingTasksTable').querySelector('tbody');
  tbody.innerHTML = '';
  samplePendingTasks.forEach(task => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${task.task}</td>
      <td>${task.type}</td>
      <td>${task.date}</td>
      <td><button onclick="completeTask('${task.task}')">Complete</button></td>
    `;
    tbody.appendChild(row);
  });
}

function loadActivities() {
  const list = document.getElementById('activityList');
  list.innerHTML = '';
  sampleActivities.forEach(activity => {
    const li = document.createElement('li');
    li.textContent = activity;
    list.appendChild(li);
  });
}

function loadHolidays() {
  const list = document.getElementById('holidaysList');
  list.innerHTML = '';
  sampleHolidays.forEach(holiday => {
    const li = document.createElement('li');
    li.textContent = holiday;
    list.appendChild(li);
  });
}

function loadNotifications() {
  const list = document.getElementById('notifList');
  list.innerHTML = '';
  sampleNotifications.forEach(notif => {
    const li = document.createElement('li');
    li.textContent = notif;
    list.appendChild(li);
  });
  updateNotifBadge(sampleNotifications.length);
}

function updateStats() {
  document.getElementById('courseCount').textContent = sampleCourses.length;
  document.getElementById('assignmentCount').textContent = sampleAssignments.length;
  document.getElementById('materialCount').textContent = '20'; // Static for now
  document.getElementById('videoCount').textContent = sampleRecordedClasses.length;
  document.getElementById('classCount').textContent = sampleLiveClasses.length;
}

function updateNotifBadge(count) {
  const badge = document.getElementById('notifBadge');
  badge.textContent = count;
  badge.style.display = count > 0 ? 'inline' : 'none';
}

// Additional helper functions
function viewAssignment(title) {
  // Redirect to assignment details page
  window.location.href = 'assignment-details.html?title=' + encodeURIComponent(title);
}

function viewAttendance(date) {
  // Open attendance modal or redirect
  alert(`Viewing attendance for: ${date}`);
  // Could open a modal here
}

function downloadRecording(title) {
  // Simulate download
  const link = document.createElement('a');
  link.href = 'data:text/plain;charset=utf-8,Sample video content for ' + title;
  link.download = title.replace(/\s+/g, '_') + '.mp4';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  alert(`Downloading recording: ${title}`);
}

function viewLiveClass(title) {
  // Redirect to live class page
  window.location.href = 'live-classes.html?title=' + encodeURIComponent(title);
}

function completeTask(task) {
  // Mark task as completed
  alert(`Completing task: ${task}`);
  // Could update the UI here
}



// Search functionality
document.getElementById('assignmentSearch').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const rows = document.querySelectorAll('#assignmentTable tbody tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query) ? '' : 'none';
  });
});



document.getElementById('recordedSearch').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const rows = document.querySelectorAll('#recordedTable tbody tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query) ? '' : 'none';
  });
});

document.getElementById('liveSearch').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const rows = document.querySelectorAll('#liveTable tbody tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query) ? '' : 'none';
  });
});

// Global search
document.getElementById('globalSearch').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  // Implement global search logic here
  alert(`Searching for: ${query}`);
});

// Notification bell click
document.getElementById('notifBell').addEventListener('click', function() {
  openModal('notifications');
});

// Initialize phase recordings on page load
document.addEventListener('DOMContentLoaded', function() {
  // Existing code...
  loadPhaseRecordings(phaseRecordings);
});
