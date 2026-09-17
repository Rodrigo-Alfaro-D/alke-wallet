/**
 * menu.js - Funcionalidad del menú principal
 * Usando jQuery
 */

$(document).ready(function() {
    // Verificar sesión
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'index.html';
        return;
    }

    // Mostrar email del usuario
    const email = localStorage.getItem('userEmail') || 'usuario@ejemplo.com';
    $('#userEmail').text(email);

    // Mostrar saldo
    let saldo = parseFloat(localStorage.getItem('walletBalance')) || 5250.00;
    $('#balanceDisplay').text('$' + saldo.toFixed(2));

    // Función para redirigir
    function redirigir(pagina, nombre) {
        $('#redirectMessage').removeClass('d-none').text('Redirigiendo a ' + nombre + '...');
        $('.btn').prop('disabled', true);

        setTimeout(function() {
            window.location.href = pagina;
        }, 1500);
    }

    // Eventos de botones
    $('#btnDeposit').on('click', function() {
        redirigir('deposit.html', 'Depósito');
    });

    $('#btnSendMoney').on('click', function() {
        redirigir('sendmoney.html', 'Enviar Dinero');
    });

    $('#btnTransactions').on('click', function() {
        redirigir('transactions.html', 'Últimos Movimientos');
    });

    // Cerrar sesión
    $('#btnLogout').on('click', function() {
        if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            window.location.href = 'index.html';
        }
    });
});