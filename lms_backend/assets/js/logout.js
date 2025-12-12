// Common Logout Handler for Admin and Trainer

document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Clear all login states
            localStorage.removeItem('adminLoggedIn');
            localStorage.removeItem('adminUsername');
            localStorage.removeItem('trainerLoggedIn');
            localStorage.removeItem('trainerUsername');
            // Redirect to home page
            window.location.href = '../index.html';
        });
    }
});
