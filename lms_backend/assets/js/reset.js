document.addEventListener('DOMContentLoaded', function() {
    const resetForm = document.getElementById('resetForm');
    if (!resetForm) return;

    const emailInput = document.getElementById('resetEmail');
    const errorDiv = document.getElementById('resetErrorMessage');

    resetForm.addEventListener('submit', function(e) {
        e.preventDefault();
        hideError(errorDiv);

        const email = emailInput.value.trim();
        if (!email) {
            showError(errorDiv, 'Please enter your email');
            return;
        }

        alert(`A password reset link has been sent to ${email}`);
        window.location.href = 'login.html';
    });
});
