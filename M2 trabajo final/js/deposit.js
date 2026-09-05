$(document).ready(function() {
    // Mostrar saldo actual
    const balance = getBalance();
    $('#currentBalanceDisplay').text('$' + balance.toFixed(2));

    $('#depositForm').on('submit', function(e) {
        e.preventDefault();

        const amount = parseFloat($('#depositAmount').val());
        const concept = $('#depositConcept').val().trim() || 'Depósito sin concepto';

        if (isNaN(amount) || amount <= 0) {
            $('#depositMessage').html('<div class="alert alert-danger">Ingresa un monto válido mayor a 0.</div>');
            return;
        }

        // Actualizar saldo
        const newBalance = getBalance() + amount;
        updateBalance(newBalance);
        $('#currentBalanceDisplay').text('$' + newBalance.toFixed(2));

        // Registrar transacción
        addTransaction('Depósito', concept, amount);

        // Mensaje de éxito con jQuery
        $('#depositMessage').html('<div class="alert alert-success">Depósito de $' + amount.toFixed(2) + ' realizado con éxito.</div>');

        // Limpiar campo
        $('#depositAmount').val('');
        $('#depositConcept').val('');

        // Efecto de resaltado
        $('#currentBalanceDisplay').parent().fadeOut(200).fadeIn(200);
    });
});