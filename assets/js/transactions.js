/**
 * transactions.js - Funcionalidad de últimos movimientos
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

    // Transacciones
    let transacciones = JSON.parse(localStorage.getItem('transactions')) || [
        { type: 'deposit', amount: 500, from: 'Transferencia bancaria', date: new Date().toLocaleString(), status: 'completado' },
        { type: 'send', amount: 150, to: 'Ana Martínez', date: new Date().toLocaleString(), status: 'completado' }
    ];

    // Renderizar transacciones
    function mostrarTransacciones(filtro) {
        filtro = filtro || 'all';

        let filtradas = transacciones;
        if (filtro !== 'all') {
            filtradas = transacciones.filter(function(t) {
                return t.type === filtro;
            });
        }

        // Si no hay transacciones
        if (filtradas.length === 0) {
            $('#transactionsList').html('');
            $('#emptyMessage').removeClass('d-none');
            return;
        }

        $('#emptyMessage').addClass('d-none');

        // Generar HTML
        let html = '';
        filtradas.forEach(function(t) {
            const esDeposito = t.type === 'deposit';
            const titulo = esDeposito ? 'Depósito' : 'Envío a ' + (t.to || '');
            const signo = esDeposito ? '+' : '-';
            const color = esDeposito ? 'text-success' : 'text-danger';

            html += `
                <div class="d-flex justify-content-between align-items-center p-3 mb-2 bg-light rounded">
                    <div>
                        <strong>${titulo}</strong><br>
                        <small class="text-muted">${t.date}</small>
                    </div>
                    <div class="text-end">
                        <div class="fw-bold ${color}">${signo}$${t.amount.toFixed(2)}</div>
                        <span class="badge bg-success">${t.status}</span>
                    </div>
                </div>
            `;
        });

        $('#transactionsList').html(html);
    }

    // Mostrar todas al inicio
    mostrarTransacciones();

    // Evento: Filtros
    $('.filter-btn').on('click', function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        mostrarTransacciones($(this).data('filter'));
    });

});