/**
 * transactions.js - Funcionalidad de últimos movimientos
 * Con protección contra datos corruptos
 */

$(document).ready(function() {

    // Verificar sesión
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
        return;
    }

    // ============================================
    // 1. Cargar saldo
    // ============================================
    function actualizarSaldo() {
        let saldo = parseFloat(localStorage.getItem('walletBalance')) || 5250.00;
        $('#currentBalance').text('$' + saldo.toFixed(2));
    }

    // ============================================
    // 2. Cargar transacciones (con limpieza)
    // ============================================
    function cargarTransacciones() {
        const data = localStorage.getItem('transactions');
        
        // Si no existe, crear ejemplos
        if (!data) {
            const ejemplos = [
                { type: 'deposit', amount: 500, from: 'Transferencia bancaria', date: new Date().toLocaleString(), status: 'completado' },
                { type: 'send', amount: 150, to: 'Ana Martínez', date: new Date().toLocaleString(), status: 'completado' }
            ];
            localStorage.setItem('transactions', JSON.stringify(ejemplos));
            return ejemplos;
        }
        
        try {
            let transacciones = JSON.parse(data);
            
            // Asegurar que sea un array
            if (!Array.isArray(transacciones)) {
                transacciones = [];
            }
            
            // ============================================
            // LIMPIAR transacciones corruptas
            // ============================================
            transacciones = transacciones.filter(function(t) {
                // Debe tener type y amount válidos
                const tieneType = t && typeof t.type === 'string';
                const tieneAmount = t && typeof t.amount === 'number' && !isNaN(t.amount);
                
                if (!tieneType || !tieneAmount) {
                    console.warn('⚠️ Transacción corrupta eliminada:', t);
                    return false;
                }
                return true;
            });
            
            // Guardar versión limpia
            localStorage.setItem('transactions', JSON.stringify(transacciones));
            
            return transacciones;
            
        } catch (error) {
            console.error('❌ Error al parsear transacciones:', error);
            localStorage.setItem('transactions', JSON.stringify([]));
            return [];
        }
    }

    // ============================================
    // 3. Renderizar transacciones (CON PROTECCIÓN)
    // ============================================
    function mostrarTransacciones(filtro) {
        filtro = filtro || 'all';

        // Cargar transacciones
        const transacciones = cargarTransacciones();

        // Filtrar
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

        // Actualizar contador
        $('#totalMovimientos').text(filtradas.length);

        // Generar HTML
        let html = '';
        filtradas.forEach(function(t) {
            // ============================================
            // PROTECCIÓN CONTRA DATOS FALTANTES
            // ============================================
            const esDeposito = t.type === 'deposit';
            const monto = typeof t.amount === 'number' ? t.amount : 0;
            const fecha = t.date || 'Fecha no disponible';
            const estado = t.status || 'completado';
            
            const titulo = esDeposito 
                ? 'Depósito' + (t.from ? ' - ' + t.from : '') 
                : 'Envío a ' + (t.to || 'destinatario');
            
            const signo = esDeposito ? '+' : '-';
            const color = esDeposito ? 'text-success' : 'text-danger';
            const badgeClass = esDeposito ? 'badge-success' : 'badge-danger';

            html += `
                <div class="d-flex justify-content-between align-items-center p-3 mb-2 bg-light rounded">
                    <div>
                        <strong>${titulo}</strong><br>
                        <small class="text-muted">${fecha}</small>
                    </div>
                    <div class="text-right">
                        <div class="font-weight-bold ${color}">
                            ${signo}$${monto.toFixed(2)}
                        </div>
                        <span class="badge ${badgeClass}">${estado}</span>
                    </div>
                </div>
            `;
        });

        $('#transactionsList').html(html);
    }

    // ============================================
    // 4. INICIALIZAR
    // ============================================
    actualizarSaldo();
    mostrarTransacciones('all');

    // ============================================
    // 5. Evento: Filtros
    // ============================================
    $('.filter-btn').on('click', function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        mostrarTransacciones($(this).data('filter'));
    });

    // ============================================
    // 6. Detectar cambios
    // ============================================
    $(window).on('storage', function(e) {
        if (e.originalEvent.key === 'transactions' || e.originalEvent.key === 'walletBalance') {
            actualizarSaldo();
            const activeFilter = $('.filter-btn.active').data('filter') || 'all';
            mostrarTransacciones(activeFilter);
        }
    });

});
