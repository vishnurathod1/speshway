document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;

    const errorDiv = document.getElementById('errorMessage');

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        hideError(errorDiv);

        const username = document.getElementById('regUsername').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value.trim();
        const confirmPassword = document.getElementById('regConfirmPassword').value.trim();
        const role = document.getElementById('regRole').value;

        if (!username || !email || !password || !confirmPassword || !role) {
            showError(errorDiv, 'Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            showError(errorDiv, 'Passwords do not match');
            return;
        }

        if (role !== 'admin' && role !== 'trainer') {
            showError(errorDiv, 'Please select a valid role');
            return;
        }

        // Get existing admins or initialize empty array
        const admins = JSON.parse(localStorage.getItem('admins') || '[]');

        // Check if username already exists
        const usernameExists = admins.some(admin => admin.username.toLowerCase() === username.toLowerCase());
        if (usernameExists) {
            showError(errorDiv, 'Username already exists. Please choose a different username.');
            return;
        }

        // Add new admin
        admins.push({username, email, password, role});
        localStorage.setItem('admins', JSON.stringify(admins));

        alert('Account created successfully!');
        if (role === 'admin') {
            window.location.href = 'login.html';
        } else if (role === 'trainer') {
            window.location.href = 'trainer-login.html';
        }
    });
});
