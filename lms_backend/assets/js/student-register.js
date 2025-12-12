// Student registration
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const age = document.getElementById('age').value;
  const qualification = document.getElementById('qualification').value;
  const location = document.getElementById('location').value;
  const course = document.getElementById('course').value;

  // Validation
  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  if (password.length < 6) {
    alert('Password must be at least 6 characters long.');
    return;
  }

  // Check if username already exists
  const existingStudents = JSON.parse(localStorage.getItem('students') || '[]');
  const usernameExists = existingStudents.some(student => student.username === username);

  if (usernameExists) {
    alert('Username already exists. Please choose a different username.');
    return;
  }

  // Create student object
  const newStudent = {
    name: fullName,
    email,
    username,
    password,
    course,
    dateOfJoining: new Date().toISOString().split('T')[0],
    status: 'Active',
    age: parseInt(age),
    qualification,
    location
  };

  // Save directly to students array
  existingStudents.push(newStudent);
  localStorage.setItem('students', JSON.stringify(existingStudents));

  alert('Registration successful! You can now login with your credentials.');

  // Redirect to login page
  window.location.href = 'student-login.html';
});
