/**
 * deposit.js - Funcionalidad del depósito
 * Usando jQuery
 */

$(document).ready(function() {

    // Verificar sesión
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
        return;
    }

    // Saldo actual
    let saldo = parseFloat(localStorage.getItem('walletBalance')) || 5250.00;
    $('#currentBalance').text('$' + saldo.toFixed(2));

    // Enfocar el campo
    $('#amount').focus();

    // Evento: Submit del formulario
    $('#depositForm').on('submit', function(event) {
        event.preventDefault();

        const monto = parseFloat($('#amount').val());

        // Validar monto
        if (isNaN(monto) || monto <= 0) {
            $('#errorMessage').removeClass('d-none').text('Ingresa un monto válido mayor a 0');
            $('#successMessage').addClass('d-none');
            return;
        }

        // Actualizar saldo
        const nuevoSaldo = saldo + monto;
        localStorage.setItem('walletBalance', nuevoSaldo.toString());
        saldo = nuevoSaldo;
        $('#currentBalance').text('$' + nuevoSaldo.toFixed(2));

        // Registrar transacción
        let transacciones = JSON.parse(localStorage.getItem('transactions')) || [];
        transacciones.unshift({
            type: 'deposit',
            amount: monto,
            from: 'Depósito',
            date: new Date().toLocaleString(),
            status: 'completado'
        });
        localStorage.setItem('transactions', JSON.stringify(transacciones));

        // Mostrar éxito
        $('#successMessage').removeClass('d-none').text('Depósito de $' + monto.toFixed(2) + ' realizado');
        $('#errorMessage').addClass('d-none');
        $('#amount').val('').focus();

        // Ocultar mensaje después de 3 segundos
        setTimeout(function() {
            $('#successMessage').addClass('d-none');
        }, 3000);
    });

});