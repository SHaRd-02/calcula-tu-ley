export function formatToPesos(amount) {
    const formatter = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    });

    return formatter.format(amount);
}