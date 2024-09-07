// firebase.js
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

// Export Firebase Auth and Firestore
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
