import { auth, db } from './auth.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore.js";

const provider = new firebase.auth.GoogleAuthProvider();

// Validate Functions
function validateEmail(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateField(field) {
    return field && field.length > 0;
}

const googlelogin = document.getElementById("google-login");

googlelogin.addEventListener("click", function(){
    auth.signInWithPopup(provider)
    .then((result) => {
        const user = result.user;

        // Referencia a la base de datos
        const databaseRef = database.ref();

        // Verificar si el usuario ya existe en la base de datos
        databaseRef.child('users/' + user.uid).once('value').then((snapshot) => {
            if (!snapshot.exists()) {
                // Si no existe, creamos un nuevo registro para el usuario
                const userData = {
                    email: user.email,
                    nombre: user.displayName || "Nombre no especificado",
                    avatar: user.photoURL || '',
                    last_login: Date.now(),
                    role: 'user',
                    balance: 0,
                    conectado: 'si'
                };

                // Generar un número de cuenta único
                generateUniqueAccountNumber(databaseRef).then(accountNumber => {
                    userData.numero_cuenta = accountNumber;

                    // Guardar la información del usuario en la base de datos
                    databaseRef.child('users/' + user.uid).set(userData)
                        .then(() => {
                            console.log("Datos de usuario guardados correctamente.");
                            window.location.href = "dashboard.html";
                        })
                        .catch((error) => {
                            console.error("Error al guardar los datos del usuario: ", error);
                            Swal.fire('Error', 'No se pudieron guardar los datos del usuario', 'error');
                        });
                });
            } else {
                // Si ya existe, simplemente actualizamos el estado de conexión
                databaseRef.child('users/' + user.uid).update({
                    conectado: 'si',
                    last_login: Date.now()
                }).then(() => {
                    console.log("Usuario existente, datos actualizados.");
                    window.location.href = "dashboard.html";
                }).catch((error) => {
                    console.error("Error al actualizar los datos del usuario: ", error);
                    Swal.fire('Error', 'No se pudieron actualizar los datos del usuario', 'error');
                });
            }
        });

    }).catch((error) => {
        console.error("Error al iniciar sesión con Google: ", error);
        Swal.fire('Error', 'No se pudo iniciar sesión con Google', 'error');
    });
});

// Set up our register function
function register() {
    // Get all our input fields
    const email = document.getElementById('register_email').value;
    const password = document.getElementById('register_password').value;
    const name = document.getElementById('register_full_name').value;

    // Validate input fields
    if (!validateEmail(email) || !validatePassword(password)) {
        Swal.fire('Error', 'Email o Contraseña no válidos', 'error');
        return;
    }
    if (!validateField(name)) {  // Cambié 'fullName' a 'name'
        Swal.fire('Error', 'El nombre completo es obligatorio', 'error');
        return;
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            // Declare user variable
            const user = auth.currentUser;  // Aseguramos que 'user' esté definido

            // Add this user to Firebase Database
            const databaseRef = database.ref();

            // Generate unique account number
            generateUniqueAccountNumber(databaseRef).then(accountNumber => {
                // Create User data
                const userData = {
                    email: email,
                    nombre: name,
                    contraseña: password,
                    descripcion: 'Descripcion',
                    avatar: '',
                    last_login: Date.now(),
                    role: 'user',
                    balance: 0,
                    numero_cuenta: accountNumber,
                    conectado: 'no',
                };

                // Push to Firebase Database
                databaseRef.child('users/' + user.uid).set(userData);

                // Done
                Swal.fire('Success', 'Usuario creado correctamente', 'success');
                document.getElementById('login_form').style.display = 'block';
                document.getElementById('register_form').style.display = 'none';
            });
        })
        .catch(error => {
            // Firebase will use this to alert of its errors
            Swal.fire('Error', error.message, 'error');
        });
}

// Function to generate a unique account number
function generateUniqueAccountNumber(databaseRef) {
    const accountNumber = Math.floor(1000000000000000 + Math.random() * 9000000000000000); // Generate a random 10-digit number
    return databaseRef.child('users').orderByChild('numero_cuenta').equalTo(accountNumber).once('value')
        .then(snapshot => {
            if (snapshot.exists()) {
                // If the account number already exists, generate a new one
                return generateUniqueAccountNumber(databaseRef);
            } else {
                // If it's unique, return it
                return accountNumber;
            }
        });
}

// Set up our login function
function login() {
    // Get all our input fields
    const email = document.getElementById('login_email').value;
    const password = document.getElementById('login_password').value;

    // Validate input fields
    if (!validateEmail(email) || !validatePassword(password)) {
        Swal.fire('Error', 'Email o Contraseña no válidos', 'error');
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
        // Get the current user
        const user = auth.currentUser;

        // Reference to the user's data in the database
        const databaseRef = database.ref('users/' + user.uid);

        // Update last_login or any other parameter you want
        databaseRef.update({
            conectado: 'si'
        });

        // Done
        Swal.fire('Success', 'Usuario logueado correctamente', 'success')
            .then(() => {
                window.location.href = 'dashboard.html';
            });
    })
    .catch(error => {
        // Firebase will use this to alert of its errors
        Swal.fire('Error', error.message, 'error');
    });
}

function toggleForm() {
    const loginForm = document.getElementById('login_form');
    const registerForm = document.getElementById('register_form');
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}
// Function to check if the user is connected and redirect accordingly
function checkUserConnection() {
    auth.onAuthStateChanged(user => {
        if (user) {
            const databaseRef = database.ref('users/' + user.uid);

            databaseRef.once('value').then(snapshot => {
                if (snapshot.exists() && snapshot.val().conectado === 'si') {
                    window.location.href = 'dashboard.html';
                }
            });
        }
    });
}

// Call this function on the index.html page load
checkUserConnection();