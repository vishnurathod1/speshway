// Student Management JavaScript

// Sample student data
let students = [
  { id: 1, name: 'John Doe', email: 'john@example.com', course: 'Mathematics', dateOfJoining: '2024-01-15', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', course: 'Science', dateOfJoining: '2024-02-10', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', course: 'History', dateOfJoining: '2024-03-05', status: 'Inactive' }
];

// DOM elements
const studentTableBody = document.getElementById('studentTableBody');
const searchInput = document.getElementById('tableSearch');
const studentModal = document.getElementById('studentModal');
const modalTitle = document.getElementById('modalTitle');
const studentName = document.getElementById('studentName');
const studentEmail = document.getElementById('studentEmail');
const studentCourse = document.getElementById('studentCourse');
const studentDateOfJoining = document.getElementById('studentDateOfJoining');
const studentStatus = document.getElementById('studentStatus');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  renderStudents();
  updateCounts();
});

// Render students table
function renderStudents(filteredStudents = students) {
  studentTableBody.innerHTML = '';
  if (filteredStudents.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="6" style="text-align: center; color: #666;">No data found</td>`;
    studentTableBody.appendChild(row);
  } else {
    filteredStudents.forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.course}</td>
        <td>${student.dateOfJoining}</td>
        <td><span class="status ${student.status.toLowerCase()}">${student.status}</span></td>
        <td style="text-align: center;">
          <button onclick="editStudent(${student.id})" class="btn-edit">Edit</button>
          <button onclick="deleteStudent(${student.id})" class="btn-delete">Delete</button>
        </td>
      `;
      studentTableBody.appendChild(row);
    });
  }
}

// Update counts
function updateCounts() {
  const total = students.length;
  const active = students.filter(s => s.status === 'Active').length;
  const inactive = total - active;

  document.getElementById('total-students').textContent = total;
  document.getElementById('active-students').textContent = active;
  document.getElementById('inactive-students').textContent = inactive;
}

// Search functionality
searchInput.addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const filtered = students.filter(student =>
    student.name.toLowerCase().includes(query) ||
    student.email.toLowerCase().includes(query)
  );
  renderStudents(filtered);
});

function openStudentModal() {
  modalTitle.textContent = 'Add Student';
  studentName.value = '';
  studentEmail.value = '';
  studentCourse.value = '';
  studentDateOfJoining.value = '';
  studentStatus.value = 'Active';
  studentModal.style.display = 'flex';
}

function closeStudentModal() {
  studentModal.style.display = 'none';
}



// Edit student
let editingStudentId = null;

function editStudent(id) {
  const student = students.find(s => s.id === id);
  if (student) {
    editingStudentId = id;
    modalTitle.textContent = 'Edit Student';
    studentName.value = student.name;
    studentEmail.value = student.email;
    studentCourse.value = student.course;
    studentDateOfJoining.value = student.dateOfJoining;
    studentStatus.value = student.status;
    studentModal.style.display = 'flex';
  }
}

// Save student (updated to handle edit)
function saveStudent() {
  const name = studentName.value.trim();
  const email = studentEmail.value.trim();
  const course = studentCourse.value.trim();
  const dateOfJoining = studentDateOfJoining.value;
  const status = studentStatus.value;

  if (!name || !email || !course || !dateOfJoining) {
    alert('Please fill all fields');
    return;
  }

  if (editingStudentId !== null) {
    // Update existing student
    const index = students.findIndex(s => s.id === editingStudentId);
    if (index !== -1) {
      students[index] = {
        id: editingStudentId,
        name,
        email,
        course,
        dateOfJoining,
        status
      };
    }
    editingStudentId = null;
  } else {
    // Add new student
    const newStudent = {
      id: Date.now(),
      name,
      email,
      course,
      dateOfJoining,
      status
    };
    students.push(newStudent);
  }

  renderStudents();
  updateCounts();
  closeModal();
}

// Delete student
function deleteStudent(id) {
  if (confirm('Are you sure you want to delete this student?')) {
    students = students.filter(s => s.id !== id);
    renderStudents();
    updateCounts();
  }
}
