/**
 * login.js - Validación del inicio de sesión
 * Usando jQuery
 */

$(document).ready(function() {

    // Credenciales válidas
    const VALID_EMAIL = 'demo@wallet.com';
    const VALID_PASSWORD = '123456';

    // Enfocar el email
    $('#email').focus();

    // Evento submit del formulario
    $('#loginForm').on('submit', function(event) {
        event.preventDefault();

        const email = $('#email').val().trim();
        const password = $('#password').val().trim();

        // Validar campos vacíos
        if (!email || !password) {
            mostrarError('Por favor, completa todos los campos');
            return;
        }

        // Validar credenciales
        if (email === VALID_EMAIL && password === VALID_PASSWORD) {
            // Mostrar éxito
            $('#successMessage').removeClass('d-none').text('Inicio de sesión exitoso. Redirigiendo...');
            $('#errorMessage').addClass('d-none');

            // Guardar sesión
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);

            // Redirigir
            setTimeout(function() {
                window.location.href = 'menu.html';
            }, 1500);

        } else {
            mostrarError('Credenciales incorrectas');
            $('#password').val('').focus();
        }
    });

    // Función para mostrar error
    function mostrarError(mensaje) {
        $('#errorMessage').removeClass('d-none').text(mensaje);
        $('#successMessage').addClass('d-none');
    }

});