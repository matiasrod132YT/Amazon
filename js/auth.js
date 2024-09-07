// auth.js

import { auth, db } from './firebase.js';

// Register user
export function registerUser(name, email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Store user information in Firestore
            return db.collection('users').doc(user.uid).set({
                name: name,
                email: email
            }).then(() => user);
        })
        .catch((error) => {
            console.error("Error during registration:", error.message);
            throw error;
        });
}

// Login user
export function loginUser(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
            console.error("Error during login:", error.message);
            throw error;
        });
}

// Check if user is authenticated
export function checkAuthState(callback) {
    auth.onAuthStateChanged(callback);
}

// Sign out user
export function signOutUser() {
    return auth.signOut()
        .catch((error) => {
            console.error("Error during sign out:", error.message);
            throw error;
        });
}
