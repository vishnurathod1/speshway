// ================= Common Auth Functions =================
function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
    setTimeout(() => { element.style.display = 'none'; }, 5000);
}

function hideError(element) {
    element.style.display = 'none';
}

function togglePassword(checkbox, passwordInput) {
    checkbox.addEventListener('change', function() {
        passwordInput.type = this.checked ? 'text' : 'password';
    });
}

// Optional: simple demo login credentials
const demoAdmins = {
    "admin": "admin123",
    "snigdha": "password"
};
