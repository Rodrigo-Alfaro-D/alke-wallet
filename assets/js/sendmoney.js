/**
 * sendmoney.js - Funcionalidad de enviar dinero
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

    // Contactos
    let contactos = JSON.parse(localStorage.getItem('contacts')) || [
        { name: 'Ana Martínez', cbu: '1234567890123456789012', alias: 'ana.martinez', bank: 'Banco Nación' },
        { name: 'Carlos Gómez', cbu: '2345678901234567890123', alias: 'carlos.gomez', bank: 'Banco Provincia' }
    ];

    // Renderizar contactos
    function mostrarContactos(filtro) {
        filtro = filtro || '';

        let filtrados = contactos.filter(function(c) {
            return c.name.toLowerCase().includes(filtro.toLowerCase()) ||
                   c.alias.toLowerCase().includes(filtro.toLowerCase());
        });

        if (filtrados.length === 0) {
            $('#contactList').html('<p class="text-center text-muted">No se encontraron contactos</p>');
            return;
        }

        let html = '';
        filtrados.forEach(function(c) {
            html += `
                <div class="d-flex justify-content-between align-items-center p-2 mb-2 bg-light rounded">
                    <div>
                        <strong>${c.name}</strong><br>
                        <small class="text-muted">${c.bank} - ${c.alias}</small>
                    </div>
                    <button class="btn btn-sm btn-success enviar-btn" data-name="${c.name}">Enviar</button>
                </div>
            `;
        });
        $('#contactList').html(html);
    }

    mostrarContactos();

    // Buscar contacto
    $('#searchContact').on('keyup', function() {
        mostrarContactos($(this).val());
    });

    // Click en Enviar de un contacto
    $(document).on('click', '.enviar-btn', function() {
        const nombre = $(this).data('name');
        $('#transferTarget').text(nombre);
        $('#transferArea').removeClass('d-none');
        $('#transferAmount').focus();
    });

    // Guardar nuevo contacto
    $('#saveContactBtn').on('click', function() {
        const name = $('#contactName').val().trim();
        const cbu = $('#contactCbu').val().trim();
        const alias = $('#contactAlias').val().trim();
        const bank = $('#contactBank').val().trim();

        if (!name || !cbu || !alias || !bank) {
            alert('Completa todos los campos');
            return;
        }

        contactos.push({ name, cbu, alias: alias.toLowerCase(), bank });
        localStorage.setItem('contacts', JSON.stringify(contactos));

        // Limpiar campos
        $('#contactName, #contactCbu, #contactAlias, #contactBank').val('');

        // Cerrar modal (Bootstrap 4 - usa jQuery)
        $('#addContactModal').modal('hide');

        mostrarContactos();

        alert('Contacto agregado: ' + name);
    });

    // Enviar dinero
    $('#sendTransferBtn').on('click', function() {
        const monto = parseFloat($('#transferAmount').val());
        const destinatario = $('#transferTarget').text();

        // Validar monto
        if (isNaN(monto) || monto <= 0) {
            alert('Ingresa un monto válido');
            return;
        }

        // Validar saldo
        if (monto > saldo) {
            alert('Saldo insuficiente. Tu saldo es $' + saldo.toFixed(2));
            return;
        }

        // Confirmar
        if (!confirm('¿Enviar $' + monto.toFixed(2) + ' a ' + destinatario + '?')) {
            return;
        }

        // ============================================
        // ACTUALIZAR SALDO
        // ============================================
        const nuevoSaldo = saldo - monto;
        localStorage.setItem('walletBalance', nuevoSaldo.toString());
        saldo = nuevoSaldo;
        $('#currentBalance').text('$' + nuevoSaldo.toFixed(2));

        // ============================================
        // REGISTRAR TRANSACCIÓN
        // ⚠️ IMPORTANTE: usar la misma clave 'transactions'
        // ============================================
        let transacciones = JSON.parse(localStorage.getItem('transactions')) || [];
        
        transacciones.unshift({
            type: 'send',                             // ← Tipo
            amount: monto,                            // ← Monto
            to: destinatario,                         // ← Destinatario
            date: new Date().toLocaleString(),        // ← Fecha
            status: 'completado'                      // ← Estado
        });
        
        localStorage.setItem('transactions', JSON.stringify(transacciones));

        alert('Transferencia de $' + monto.toFixed(2) + ' a ' + destinatario + ' realizada');

        // Ocultar área
        $('#transferArea').addClass('d-none');
        $('#transferAmount').val('');
    });

});