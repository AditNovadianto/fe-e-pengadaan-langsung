const API_URL = 'http://127.0.0.1:8000/api';

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const type = document.getElementById('loginType').value;
    const btn = e.target.querySelector('button');

    // Determine the correct endpoint and payload keys
    const endpoint = type === 'user' ? '/auth/user/login' : '/auth/penyedia/login';
    const payload = type === 'user' 
        ? { email_user: email, password_user: password }
        : { email_penyedia: email, password_penyedia: password };

    try {
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Memproses...';
        btn.disabled = true;

        const response = await fetch(API_URL + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            showToast('Login Berhasil!', 'success');
            
            // Save token and user info
            localStorage.setItem('auth_token', data.access_token);
            localStorage.setItem('user_data', JSON.stringify(data.data));
            localStorage.setItem('user_type', type);

            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            showToast(data.message || 'Email atau password salah', 'error');
            btn.innerHTML = '<span>Masuk Sistem</span> <i class="fa-solid fa-arrow-right"></i>';
            btn.disabled = false;
        }

    } catch (error) {
        showToast('Koneksi server gagal', 'error');
        btn.innerHTML = '<span>Masuk Sistem</span> <i class="fa-solid fa-arrow-right"></i>';
        btn.disabled = false;
    }
});

// Check if already logged in
window.onload = () => {
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        if (localStorage.getItem('auth_token')) {
            window.location.href = 'dashboard.html';
        }
    }
};
