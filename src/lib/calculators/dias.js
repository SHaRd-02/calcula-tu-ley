export function calcularDiasLaborados(fechaIngreso, fechaSalida) {
    const today = new Date(fechaSalida);
    const ingreso = new Date(fechaIngreso);

    let lastAniversary = new Date(
        today.getFullYear(),
        ingreso.getMonth(),
        ingreso.getDate()
    );

    if (today < lastAniversary){
        lastAniversary.setFullYear(today.getFullYear() -1);
    }

    const diff = today - lastAniversary;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function calcularDiasTranscurridos(fechaIngreso, fechaSalida) {
    const hoy = new Date(fechaSalida);
    const ingreso = new Date(fechaIngreso);

    // Último aniversario
    const ultimoAniversario = new Date(
        hoy.getFullYear(),
        ingreso.getMonth(),
        ingreso.getDate()
    );

    // Si aún no ha pasado este año, usar el anterior
    if (hoy < ultimoAniversario) {
        ultimoAniversario.setFullYear(hoy.getFullYear() - 1);
    }

    const diff = hoy - ultimoAniversario;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}