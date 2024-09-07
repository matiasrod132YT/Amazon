// login-register.js

import { registerUser, loginUser, checkAuthState } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    // Handle registration
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;

            registerUser(name, email, password)
                .then(() => {
                    // Redirect to dashboard on successful registration
                    window.location.href = 'dashboard.html';
                })
                .catch((error) => {
                    // Handle errors here
                    alert("Error: " + error.message);
                });
        });
    }

    // Handle login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            loginUser(email, password)
                .then(() => {
                    // Redirect to dashboard on successful login
                    window.location.href = 'dashboard.html';
                })
                .catch((error) => {
                    // Handle errors here
                    alert("Error: " + error.message);
                });
        });
    }

    // Check authentication state
    checkAuthState((user) => {
        if (user) {
            // Redirect authenticated users from index to dashboard
            if (window.location.pathname.includes('index.html')) {
                window.location.href = 'dashboard.html';
            }
        } else {
            // Redirect unauthenticated users from dashboard to index
            if (window.location.pathname.includes('dashboard.html')) {
                window.location.href = 'index.html';
            }
        }
    });
});
