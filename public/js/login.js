document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const alertMessage = document.getElementById('alert-message');

    const showAlert = (message, type = 'error') => {
        alertMessage.textContent = message;
        alertMessage.className = `p-4 mb-4 text-sm rounded-lg ${type === 'error' ? 'text-red-700 bg-red-100' : 'text-green-700 bg-green-100'}`;
        alertMessage.classList.remove('hidden');
    };

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        alertMessage.classList.add('hidden');

        const username = loginForm.username.value;
        const password = loginForm.password.value;

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed.');
            }

            localStorage.setItem('token', data.token);
            window.location.href = '/dashboard';

        } catch (error) {
            showAlert(error.message);
        }
    });
});
