console.log('Trainer Auth.js script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded for trainer auth');
    const loginForm = document.getElementById('trainerLoginForm');
    console.log('Trainer login form found:', !!loginForm);
    if (!loginForm) return; // Exit if not trainer login page

    const showPasswordCheckbox = document.getElementById('showTrainerPassword');
    const passwordInput = document.getElementById('trainerPassword');
    const usernameInput = document.getElementById('trainerUsername');
    const errorMessage = document.getElementById('trainerErrorMessage');

    console.log('Elements found - checkbox:', !!showPasswordCheckbox, 'password:', !!passwordInput, 'username:', !!usernameInput, 'error:', !!errorMessage);

    togglePassword(showPasswordCheckbox, passwordInput);

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Trainer form submitted');
        hideError(errorMessage);

        const username = usernameInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim();
        console.log('Trainer Username:', username, 'Password length:', password.length);

        // Get trainers from localStorage or initialize with demo trainers
        let trainers = JSON.parse(localStorage.getItem('trainers') || '[]');
        if (trainers.length === 0) {
            // Initialize with demo trainers if none exist
            trainers = [
                { username: 'trainer1', password: 'pass123' },
                { username: 'alice', password: 'alice123' },
                { username: 'charlie', password: 'charlie123' },
                { username: 'venkatesh', password: '1234567' }
            ];
            localStorage.setItem('trainers', JSON.stringify(trainers));
        }

        console.log('Trainer keys:', trainers.map(t => t.username));

        if (!username || !password) {
            showError(errorMessage, 'Please fill in all fields');
            return;
        }

        const trainer = trainers.find(t => t.username.toLowerCase() === username && t.password === password);
        if (trainer) {
            console.log('Trainer login successful');
            localStorage.setItem('trainerLoggedIn', 'true');
            localStorage.setItem('trainerUsername', username);
            window.location.href = '/trainer/dashboard.html';
        } else {
            console.log('Trainer login failed');
            console.log('Entered username:', username);
            console.log('Entered password:', password);
            showError(errorMessage, 'Invalid username or password. Please try again.');
            passwordInput.value = '';
            usernameInput.focus();
        }
    });

    usernameInput.addEventListener('input', () => hideError(errorMessage));
    passwordInput.addEventListener('input', () => hideError(errorMessage));
});
