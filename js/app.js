// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCUJAubROmqsfzEYiIpMnhhEBfFwi0oLKY",
    authDomain: "fir-35ee7.firebaseapp.com",
    projectId: "fir-35ee7",
    storageBucket: "fir-35ee7.appspot.com",
    messagingSenderId: "612357174687",
    appId: "1:612357174687:web:8e8050d0c4c7cbeef7f9aa",
    measurementId: "G-BNGML4WZ75"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firestore and Auth References
const auth = firebase.auth();
const db = firebase.firestore();

// Wait for the DOM to load before running the scripts
document.addEventListener('DOMContentLoaded', () => {

    // Register new user
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;

            // Register user in Firebase Auth
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    const user = userCredential.user;

                    // Store additional user info in Firestore
                    db.collection('users').doc(user.uid).set({
                        name: name,
                        email: email
                    })
                    .then(() => {
                        console.log("User information stored in Firestore");
                        // Redirect to dashboard
                        window.location.href = 'dashboard.html';
                    })
                    .catch((error) => {
                        console.error("Error storing user information in Firestore:", error);
                    });
                })
                .catch((error) => {
                    console.error("Error during registration:", error.message);
                });
        });
    }

    // Login user
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // Sign in the user using Firebase Auth
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    console.log("User logged in");
                    // Redirect to dashboard
                    window.location.href = 'dashboard.html';
                })
                .catch((error) => {
                    console.error("Error during login:", error.message);
                });
        });
    }

    // Check if user is logged in
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log('User logged in:', user.email);
        } else {
            console.log('No user logged in');
        }
    });
});
