// Función para obtener el saldo actual desde localStorage
function getBalance() {
    return parseFloat(localStorage.getItem('walletBalance')) || 0.00;
}

// Función para actualizar el saldo en localStorage y en la UI
function updateBalance(newBalance) {
    localStorage.setItem('walletBalance', newBalance.toFixed(2));
    // Actualizar elementos que muestran el saldo
    $('.balance-display').text('$' + newBalance.toFixed(2));
}

// Función para agregar una transacción al historial
function addTransaction(type, concept, amount) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const newTransaction = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        type: type, // 'Depósito', 'Envío', 'Recepción'
        concept: concept || '',
        amount: parseFloat(amount).toFixed(2),
        status: 'Completado'
    };
    transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Función para obtener todas las transacciones
function getTransactions() {
    return JSON.parse(localStorage.getItem('transactions')) || [];
}

// Inicializar datos de ejemplo si no existen
if (!localStorage.getItem('walletBalance')) {
    localStorage.setItem('walletBalance', '1500.00');
}

if (!localStorage.getItem('transactions')) {
    const sampleTransactions = [
        { id: 1, date: '2026-08-28 10:30', type: 'Depósito', concept: 'Transferencia recibida', amount: '500.00', status: 'Completado' },
        { id: 2, date: '2026-08-27 15:45', type: 'Envío', concept: 'Pago de servicios', amount: '200.00', status: 'Completado' },
        { id: 3, date: '2026-08-26 09:15', type: 'Depósito', concept: 'Ahorro mensual', amount: '300.00', status: 'Completado' },
    ];
    localStorage.setItem('transactions', JSON.stringify(sampleTransactions));
}