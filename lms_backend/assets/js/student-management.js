// Student Management for Admin
document.addEventListener('DOMContentLoaded', function() {
    loadStudents();
    updateSummaryCards();
});

// Load all students
function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const tbody = document.getElementById('studentTableBody');
    tbody.innerHTML = '';

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.username || 'N/A'}</td>
            <td>${student.course}</td>
            <td>${student.dateOfJoining}</td>
            <td><span class="status ${student.status.toLowerCase()}">${student.status}</span></td>
            <td>
                <button onclick="editStudent(${index})" class="btn btn-edit">Edit</button>
                <button onclick="deleteStudent(${index})" class="btn btn-delete">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Update summary cards
function updateSummaryCards() {
    const students = JSON.parse(localStorage.getItem('students') || '[]');

    const totalStudents = students.length;
    const activeStudents = students.filter(s => s.status === 'Active').length;
    const inactiveStudents = students.filter(s => s.status === 'Inactive').length;

    document.getElementById('total-students').textContent = totalStudents;
    document.getElementById('active-students').textContent = activeStudents;
    document.getElementById('inactive-students').textContent = inactiveStudents;
}

// Existing functions from student.js
function openModal() {
    document.getElementById('studentModal').style.display = 'flex';
    document.getElementById('modalTitle').textContent = 'Add Student';
    clearForm();
}

function closeModal() {
    document.getElementById('studentModal').style.display = 'none';
}

function clearForm() {
    document.getElementById('studentName').value = '';
    document.getElementById('studentEmail').value = '';
    document.getElementById('studentCourse').value = '';
    document.getElementById('studentDateOfJoining').value = '';
    document.getElementById('studentStatus').value = 'Active';
}

function saveStudent() {
    const name = document.getElementById('studentName').value;
    const email = document.getElementById('studentEmail').value;
    const course = document.getElementById('studentCourse').value;
    const dateOfJoining = document.getElementById('studentDateOfJoining').value;
    const status = document.getElementById('studentStatus').value;

    if (!name || !email || !course || !dateOfJoining) {
        alert('Please fill all fields');
        return;
    }

    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const newStudent = { name, email, course, dateOfJoining, status, password: 'password' }; // Default password

    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));

    closeModal();
    loadStudents();
    updateSummaryCards();

    alert('Student added successfully!');
}

function editStudent(index) {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const student = students[index];

    document.getElementById('studentName').value = student.name;
    document.getElementById('studentEmail').value = student.email;
    document.getElementById('studentCourse').value = student.course;
    document.getElementById('studentDateOfJoining').value = student.dateOfJoining;
    document.getElementById('studentStatus').value = student.status;

    document.getElementById('modalTitle').textContent = 'Edit Student';
    document.getElementById('studentModal').style.display = 'flex';

    // Override save function for editing
    window.currentEditIndex = index;
}

function deleteStudent(index) {
    if (confirm('Are you sure you want to delete this student?')) {
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));

        loadStudents();
        updateSummaryCards();
    }
}

// Override save function when editing
const originalSaveStudent = saveStudent;
saveStudent = function() {
    if (window.currentEditIndex !== undefined) {
        // Editing existing student
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        const index = window.currentEditIndex;

        students[index] = {
            name: document.getElementById('studentName').value,
            email: document.getElementById('studentEmail').value,
            course: document.getElementById('studentCourse').value,
            dateOfJoining: document.getElementById('studentDateOfJoining').value,
            status: document.getElementById('studentStatus').value,
            password: students[index].password // Keep existing password
        };

        localStorage.setItem('students', JSON.stringify(students));
        delete window.currentEditIndex;

        closeModal();
        loadStudents();
        updateSummaryCards();

        alert('Student updated successfully!');
    } else {
        // Adding new student
        originalSaveStudent();
    }
};
