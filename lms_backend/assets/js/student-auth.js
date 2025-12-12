// Student authentication
document.addEventListener('DOMContentLoaded', function() {
  // Initialize with a default student if no students exist
  let allStudents = JSON.parse(localStorage.getItem('students') || '[]');
  if (allStudents.length === 0) {
    allStudents = [{
      name: 'Default Student',
      username: 'student',
      password: 'password',
      course: 'Mathematics',
      dateOfJoining: new Date().toISOString().split('T')[0],
      status: 'Active',
      age: 20,
      qualification: 'High School',
      location: 'Local'
    }];
    localStorage.setItem('students', JSON.stringify(allStudents));
  }
  // Note: Do not overwrite existing students; only initialize if empty
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Check all students (admin-added and approved self-registered)
  const allStudents = JSON.parse(localStorage.getItem('students') || '[]');
    const student = allStudents.find(s => {
    // For students with username (self-registered approved), check username (case insensitive)
    if (s.username) {
      return s.username.toLowerCase() === username.toLowerCase() && s.password.toLowerCase() === password.toLowerCase();
    }
    // For admin-added students, check name (without spaces, case insensitive)
    return s.name.toLowerCase().replace(/\s+/g, '') === username.toLowerCase() && s.password.toLowerCase() === password.toLowerCase();
  });

  if (student) {
    localStorage.setItem('studentLoggedIn', 'true');
    localStorage.setItem('studentUsername', username);
    localStorage.setItem('studentData', JSON.stringify(student));
    window.location.href = 'dashboard.html';
    return;
  }

  // If not found, show invalid credentials message
  alert('Invalid username or password. Please check your credentials and try again.');
});
