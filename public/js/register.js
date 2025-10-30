document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const alertMessage = document.getElementById('alert-message');

    const showAlert = (message, type = 'error') => {
        alertMessage.textContent = message;
        alertMessage.className = `p-4 mb-4 text-sm rounded-lg ${type === 'error' ? 'text-red-700 bg-red-100' : 'text-green-700 bg-green-100'}`;
        alertMessage.classList.remove('hidden');
    };

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        alertMessage.classList.add('hidden');

        const username = registerForm.username.value;
        const password = registerForm.password.value;

        if (password.length < 6) {
            showAlert('Password must be at least 6 characters long.');
            return;
        }

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Registration failed.');
            }

            showAlert('Registration successful! Redirecting to login...', 'success');
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);

        } catch (error) {
            showAlert(error.message);
        }
    });
});
