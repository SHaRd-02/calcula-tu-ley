/**
 * Lógica de prestaciones laborales en México (Aguinaldo, Vacaciones, Prima)
 */

export const MINIMO_2025 = {
	general: 278.8,
	frontera: 419.88
};

/**
 * Calcula el aguinaldo proporcional
 * @param {number} salarioMensual 
 * @param {number} diasTrabajadosEnElAño (0-365)
 * @returns {number} Aguinaldo
 */
export function calcularAguinaldo(salarioMensual, diasTrabajadosEnElAño = 365) {
	const salarioDiario = salarioMensual / 30;
	const aguinaldoAnual = salarioDiario * 15; // Mínimo legal
	return Number(((aguinaldoAnual / 365) * diasTrabajadosEnElAño).toFixed(2));
}

/**
 * Obtiene los días de vacaciones según antigüedad (Ley de Vacaciones Dignas)
 * @param {number} añosAntiguedad 
 * @returns {number} Días de vacaciones
 */
export function obtenerDiasVacaciones(añosAntiguedad) {
	if (añosAntiguedad < 1) return 0;
	if (añosAntiguedad === 1) return 12;
	if (añosAntiguedad === 2) return 14;
	if (añosAntiguedad === 3) return 16;
	if (añosAntiguedad === 4) return 18;
	if (añosAntiguedad === 5) return 20;
	if (añosAntiguedad >= 6 && añosAntiguedad <= 10) return 22;
	if (añosAntiguedad >= 11 && añosAntiguedad <= 15) return 24;
	if (añosAntiguedad >= 16 && añosAntiguedad <= 20) return 26;
	if (añosAntiguedad >= 21 && añosAntiguedad <= 25) return 28;
	if (añosAntiguedad >= 26 && añosAntiguedad <= 30) return 30;
	return 32;
}

/**
 * Calcula la prima vacacional
 * @param {number} salarioMensual 
 * @param {number} diasVacaciones 
 * @returns {number} Prima vacacional
 */
export function calcularPrimaVacacional(salarioMensual, diasVacaciones) {
	const salarioDiario = salarioMensual / 30;
	const montoVacaciones = salarioDiario * diasVacaciones;
	return Number((montoVacaciones * 0.25).toFixed(2));
}

/**
 * Calcula un finiquito estimado
 * @param {number} salarioMensual 
 * @param {number} diasLaboradosUltimoAño (para aguinaldo)
 * @param {number} diasTranscurridosCicloVacaciones (para vacaciones proporcionales)
 * @param {number} añosAntiguedad 
 * @returns {object} Detalle del finiquito
 */
export function calcularFiniquito(salarioMensual, diasLaboradosUltimoAño, diasTranscurridosCicloVacaciones, añosAntiguedad) {
	const aguinaldoProporcional = calcularAguinaldo(salarioMensual, diasLaboradosUltimoAño);
	
	const diasVacacionesTotales = obtenerDiasVacaciones(añosAntiguedad + 1); // Se calcula sobre el siguiente año que está cursando
	const vacacionesProporcionalesDias = (diasVacacionesTotales / 365) * diasTranscurridosCicloVacaciones;
	const vacacionesProporcionalesMonto = (salarioMensual / 30) * vacacionesProporcionalesDias;
	const primaVacacionalProporcional = vacacionesProporcionalesMonto * 0.25;

	const total = aguinaldoProporcional + vacacionesProporcionalesMonto + primaVacacionalProporcional;

	return {
		aguinaldo: Number(aguinaldoProporcional.toFixed(2)),
		vacaciones: Number(vacacionesProporcionalesMonto.toFixed(2)),
		primaVacacional: Number(primaVacacionalProporcional.toFixed(2)),
		total: Number(total.toFixed(2))
	};
}
