$(document).ready(function() {
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();

        const email = $('#email').val().trim();
        const password = $('#password').val().trim();

        // Credenciales simuladas (en un caso real, se validaría contra un backend)
        const validEmail = 'usuario@alke.com';
        const validPassword = '123456';

        if (email === validEmail && password === validPassword) {
            // Guardar sesión simulada
            localStorage.setItem('isLoggedIn', 'true');
            // Redirigir al menú
            window.location.href = 'menu.html';
        } else {
            $('#loginError').removeClass('d-none').text('Credenciales incorrectas. Intenta de nuevo.');
            // Efecto de shake con jQuery
            $('#loginForm').effect('shake', { times: 2, distance: 5 }, 300);
        }
    });
});