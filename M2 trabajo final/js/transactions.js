$(document).ready(function() {
    const transactions = getTransactions();

    if (transactions.length === 0) {
        $('#transactionsTableBody').html('<tr><td colspan="5" class="text-center">No hay transacciones registradas.</td></tr>');
    } else {
        // Mostrar las últimas 10 transacciones (ordenadas por fecha descendente)
        const latest = transactions.slice(-10).reverse();
        let html = '';
        latest.forEach(t => {
            html += `<tr>
                        <td>${t.date}</td>
                        <td><span class="badge ${t.type === 'Depósito' ? 'bg-success' : t.type === 'Envío' ? 'bg-danger' : 'bg-info'}">${t.type}</span></td>
                        <td>${t.concept}</td>
                        <td class="${t.type === 'Depósito' ? 'text-success' : t.type === 'Envío' ? 'text-danger' : 'text-primary'}">${t.type === 'Depósito' ? '+' : ''} $${t.amount}</td>
                        <td><span class="badge bg-success">${t.status}</span></td>
                    </tr>`;
        });
        $('#transactionsTableBody').html(html);
    }

    // Simular actualización dinámica del saldo
    const balance = getBalance();
    $('#transactionMessage').html('<p class="text-muted">Saldo actual: <strong>$' + balance.toFixed(2) + '</strong></p>');
});