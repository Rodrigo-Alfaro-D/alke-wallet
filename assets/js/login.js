/**
 * login.js - Validación del inicio de sesión
 */

$(document).ready(function() {

    const VALID_EMAIL = 'demo@wallet.com';
    const VALID_PASSWORD = '123456';

    // Enfocar email
    $('#email').focus();

    // Submit del formulario
    $('#loginForm').on('submit', function(event) {
        event.preventDefault();

        const email = $('#email').val().trim();
        const password = $('#password').val().trim();

        // Validar campos vacíos
        if (!email || !password) {
            $('#errorMessage').removeClass('d-none').text('Por favor, completa todos los campos');
            $('#successMessage').addClass('d-none');
            return;
        }

        // Validar credenciales
        if (email === VALID_EMAIL && password === VALID_PASSWORD) {
            $('#successMessage').removeClass('d-none').text('Inicio de sesión exitoso. Redirigiendo...');
            $('#errorMessage').addClass('d-none');

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);

            setTimeout(function() {
                window.location.href = 'menu.html';
            }, 1500);
        } else {
            $('#errorMessage').removeClass('d-none').text('Credenciales incorrectas');
            $('#successMessage').addClass('d-none');
            $('#password').val('').focus();
        }
    });

});