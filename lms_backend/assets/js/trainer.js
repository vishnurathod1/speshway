// Trainer Management JavaScript

// Sample trainer data
let trainers = [
  { id: 1, name: 'Dr. Alice Brown', email: 'alice@example.com', subject: 'Mathematics', dateOfJoining: '2023-08-15', status: 'Active' },
  { id: 2, name: 'Prof. Charlie Wilson', email: 'charlie@example.com', subject: 'Science', dateOfJoining: '2023-09-10', status: 'Active' },
  { id: 3, name: 'Ms. Diana Lee', email: 'diana@example.com', subject: 'History', dateOfJoining: '2023-10-05', status: 'Inactive' }
];

// DOM elements
const trainerCardsContainer = document.getElementById('trainerCardsContainer');
const searchInput = document.getElementById('tableSearch');
const trainerModal = document.getElementById('trainerModal');
const modalTitle = document.getElementById('modalTitle');
const trainerName = document.getElementById('trainerName');
const trainerEmail = document.getElementById('trainerEmail');
const trainerSubject = document.getElementById('trainerSubject');
const trainerDateOfJoining = document.getElementById('trainerDateOfJoining');
const trainerStatus = document.getElementById('trainerStatus');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  renderTrainers();
  updateCounts();
});

// Render trainers table
function renderTrainers(filteredTrainers = trainers) {
  trainerCardsContainer.innerHTML = '';
  if (filteredTrainers.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="6" style="text-align: center; color: #666;">No data found</td>`;
    trainerCardsContainer.appendChild(row);
  } else {
    filteredTrainers.forEach(trainer => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${trainer.name}</td>
        <td>${trainer.email}</td>
        <td>${trainer.subject}</td>
        <td>${trainer.dateOfJoining}</td>
        <td><span class="status ${trainer.status.toLowerCase()}">${trainer.status}</span></td>
        <td style="text-align: center;">
          <button onclick="editTrainer(${trainer.id})" class="btn-edit">Edit</button>
          <button onclick="deleteTrainer(${trainer.id})" class="btn-delete">Delete</button>
        </td>
      `;
      trainerCardsContainer.appendChild(row);
    });
  }
}

// Update counts
function updateCounts() {
  const total = trainers.length;
  const active = trainers.filter(t => t.status === 'Active').length;
  const inactive = total - active;

  document.getElementById('total-trainers').textContent = total;
  document.getElementById('active-trainers').textContent = active;
  document.getElementById('inactive-trainers').textContent = inactive;
}

// Search functionality
searchInput.addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const filtered = trainers.filter(trainer =>
    trainer.name.toLowerCase().includes(query) ||
    trainer.email.toLowerCase().includes(query)
  );
  renderTrainers(filtered);
});

function openTrainerModal() {
  modalTitle.textContent = 'Add Trainer';
  trainerName.value = '';
  trainerEmail.value = '';
  trainerSubject.value = '';
  trainerDateOfJoining.value = '';
  trainerStatus.value = 'Active';
  trainerModal.style.display = 'flex';
}

function closeTrainerModal() {
  trainerModal.style.display = 'none';
}

// Save trainer
function saveTrainer() {
  const name = trainerName.value.trim();
  const email = trainerEmail.value.trim();
  const subject = trainerSubject.value.trim();
  const dateOfJoining = trainerDateOfJoining.value;
  const status = trainerStatus.value;

  if (!name || !email || !subject || !dateOfJoining) {
    alert('Please fill all fields');
    return;
  }

  // For simplicity, add new trainer (in real app, would check if editing)
  const newTrainer = {
    id: Date.now(),
    name,
    email,
    subject,
    dateOfJoining,
    status
  };

  trainers.push(newTrainer);
  renderTrainers();
  updateCounts();
  closeModal();
}

// Edit trainer
function editTrainer(id) {
  const trainer = trainers.find(t => t.id === id);
  if (trainer) {
    modalTitle.textContent = 'Edit Trainer';
    trainerName.value = trainer.name;
    trainerEmail.value = trainer.email;
    trainerSubject.value = trainer.subject;
    trainerDateOfJoining.value = trainer.dateOfJoining;
    trainerStatus.value = trainer.status;
    trainerModal.style.display = 'flex';
    // For simplicity, reuse saveTrainer, but in real app, track editing
    // Here, we'll remove the old one and add new
    trainers = trainers.filter(t => t.id !== id);
  }
}

// Delete trainer
function deleteTrainer(id) {
  if (confirm('Are you sure you want to delete this trainer?')) {
    trainers = trainers.filter(t => t.id !== id);
    renderTrainers();
    updateCounts();
  }
}
