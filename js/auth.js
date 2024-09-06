// auth.js
auth.onAuthStateChanged(async user => {
    if (user) {
        const userRef = database.ref('users/' + user.uid);
        const snapshot = await userRef.once('value');
        const userData = snapshot.val();

        // Cargar detalles del usuario
        loadUserDetails(userData);

        if (userData.role === 'admin') {
            document.querySelector('.admin_actions').classList.remove('hidden');
            document.querySelector('.creditHistory').classList.remove('hidden');
            loadCreditHistory();
            loadCreditRequests();
            loadRecentTransactions();
        }
        
        loadChart(user.uid);
        loadRecentTransactions();
    } else {
        window.location.href = 'index.html';
    }
});


// Manejo del menú lateral (sidebar)
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.sidebar a');
    const sections = document.querySelectorAll('.selector');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('data-target');

            // Ocultar la sección activa
            const activeSection = document.querySelector('.selector.active');
            if (activeSection) {
                activeSection.classList.remove('active');
                activeSection.style.display = 'none'; // Ocultar completamente después de la animación
            }

            // Mostrar la nueva sección
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block'; // Mostrar antes de activar la animación
                setTimeout(() => {
                    targetSection.classList.add('active');
                }, 10); // Pequeña demora para asegurar la transición
            }
        });
    });

    // Mostrar la primera sección por defecto
    if (sections.length > 0) {
        sections[0].style.display = 'block';
        sections[0].classList.add('active');
    }
});
