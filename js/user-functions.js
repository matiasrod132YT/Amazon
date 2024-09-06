// userFunctions.js
function loadUserDetails(userData) {
    document.querySelectorAll('.user_name').forEach(element => {
        element.innerText = userData.nombre || 'Usuario';
    });

    document.querySelectorAll('.user_email').forEach(element => {
        element.innerText = userData.email || 'Email';
    });

    document.querySelectorAll('.user_contraseña').forEach(element => {
        const contraseñaOculta = "**********";
        element.innerHTML = contraseñaOculta;
        
        element.addEventListener('click', function() {
            if (element.innerHTML === contraseñaOculta) {
                element.innerHTML = userData.contraseña;
            } else {
                element.innerHTML = contraseñaOculta;
            }
        })
    });

    document.querySelectorAll('.user_description').forEach(element => {
        element.innerText = userData.descripcion || 'Descripción';
    });

    document.querySelectorAll('.number').forEach(element => {
        const numeroCuenta = userData.numero_cuenta.toString();
        const numeroOculto = "**** **** **** " + numeroCuenta.slice(-4);
        element.innerText = numeroOculto;

        element.addEventListener('click', function() {
            if (element.innerText === numeroOculto) {
                element.innerText = numeroCuenta.replace(/(.{4})/g, '$1 ').trim();
            } else {
                element.innerText = numeroOculto;
            }
        });
    });

    const balance = parseFloat(userData.balance);
    const formattedBalance = balance.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.querySelectorAll('.user-balance').forEach(element => {
        element.innerText = `$${formattedBalance}`;
    });
}

function logout() {
    auth.signOut().then(() => {
        Swal.fire('Éxito', 'Sesión cerrada correctamente', 'success')
            .then(() => {
                window.location.href = 'index.html';
            });
    }).catch(error => {
        Swal.fire('Error', error.message, 'error');
    });
}
