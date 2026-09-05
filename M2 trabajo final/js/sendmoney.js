$(document).ready(function() {
    // Lista de contactos (simulada)
    const contacts = [
        { name: 'Ana Pérez', email: 'ana@mail.com' },
        { name: 'Carlos Gómez', email: 'carlos@mail.com' },
        { name: 'Laura Fernández', email: 'laura@mail.com' }
    ];

    // Inicializar autocomplete en el campo de búsqueda
    $('#contactSearch').autocomplete({
        source: contacts.map(c => c.name),
        minLength: 1,
        select: function(event, ui) {
            // Al seleccionar un contacto, podemos mostrar su correo (simulado)
            const selectedName = ui.item.value;
            const contact = contacts.find(c => c.name === selectedName);
            if (contact) {
                $('#contactSearch').val(contact.name);
                // Podríamos almacenar el email seleccionado para usarlo en el envío
                $('#contactSearch').data('selected-email', contact.email);
            }
        }
    });

    // Envío de dinero
    $('#sendMoneyForm').on('submit', function(e) {
        e.preventDefault();

        const contactName = $('#contactSearch').val().trim();
        const amount = parseFloat($('#sendAmount').val());
        const concept = $('#sendConcept').val().trim() || 'Transferencia';

        if (!contactName) {
            $('#sendMessage').html('<div class="alert alert-danger">Selecciona un contacto válido.</div>');
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            $('#sendMessage').html('<div class="alert alert-danger">Ingresa un monto válido mayor a 0.</div>');
            return;
        }

        const currentBalance = getBalance();
        if (amount > currentBalance) {
            $('#sendMessage').html('<div class="alert alert-danger">Saldo insuficiente. Disponible: $' + currentBalance.toFixed(2) + '</div>');
            return;
        }

        // Actualizar saldo
        const newBalance = currentBalance - amount;
        updateBalance(newBalance);

        // Registrar transacción
        addTransaction('Envío', concept + ' a ' + contactName, -amount);

        // Mensaje de éxito
        $('#sendMessage').html('<div class="alert alert-success">Envío de $' + amount.toFixed(2) + ' a ' + contactName + ' realizado con éxito.</div>');

        // Limpiar campos
        $('#sendAmount').val('');
        $('#sendConcept').val('');
        $('#contactSearch').val('');
    });

    // Agregar nuevo contacto (modal)
    $('#addContactForm').on('submit', function(e) {
        e.preventDefault();
        const name = $('#newContactName').val().trim();
        const email = $('#newContactEmail').val().trim();

        if (name && email) {
            // Agregar a la lista de contactos (simulado)
            contacts.push({ name, email });
            // Actualizar la lista visual
            $('#contactList').append('<li class="list-group-item">' + name + ' - ' + email + '</li>');
            // Actualizar fuente del autocomplete
            $('#contactSearch').autocomplete('option', 'source', contacts.map(c => c.name));

            // Cerrar modal y limpiar
            $('#addContactModal').modal('hide');
            $('#newContactName').val('');
            $('#newContactEmail').val('');

            // Mensaje de éxito con efecto
            $('#sendMessage').html('<div class="alert alert-success">Contacto ' + name + ' agregado.</div>').fadeIn(300);
        } else {
            alert('Completa todos los campos.');
        }
    });
});