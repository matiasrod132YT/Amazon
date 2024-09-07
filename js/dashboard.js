// dashboard.js

import { auth, db } from './firebase.js';
import { signOutUser, checkAuthState } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const signOutButton = document.getElementById('signOutButton');
    if (signOutButton) {
        signOutButton.addEventListener('click', () => {
            signOutUser()
                .then(() => {
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    console.error("Error during sign out:", error.message);
                });
        });
    }

    checkAuthState((user) => {
        if (!user) {
            window.location.href = 'index.html';
        } else {
            cargarProductos();
        }
    });
});
