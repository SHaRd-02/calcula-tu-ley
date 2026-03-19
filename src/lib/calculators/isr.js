/**
 * Lógica de cálculo de ISR y Subsidio al Empleo para México (2025)
 */

export const UMA_2025 = {
	diaria: 113.14,
	mensual: 3439.46
};

// Tabla ISR Mensual 2025
export const ISR_TABLE_2025 = [
	{ limiteInferior: 0.01, limiteSuperior: 746.04, cuotaFija: 0.0, porcentaje: 1.92 },
	{ limiteInferior: 746.05, limiteSuperior: 6332.05, cuotaFija: 14.32, porcentaje: 6.4 },
	{ limiteInferior: 6332.06, limiteSuperior: 11128.01, cuotaFija: 371.83, porcentaje: 10.88 },
	{ limiteInferior: 11128.02, limiteSuperior: 12935.82, cuotaFija: 893.63, porcentaje: 16.0 },
	{ limiteInferior: 12935.83, limiteSuperior: 15487.71, cuotaFija: 1182.88, porcentaje: 17.92 },
	{ limiteInferior: 15487.72, limiteSuperior: 31236.49, cuotaFija: 1640.18, porcentaje: 21.36 },
	{ limiteInferior: 31236.5, limiteSuperior: 49233.0, cuotaFija: 5004.12, porcentaje: 23.52 },
	{ limiteInferior: 49233.01, limiteSuperior: 93993.9, cuotaFija: 9236.89, porcentaje: 30.0 },
	{ limiteInferior: 93993.91, limiteSuperior: 125325.2, cuotaFija: 22665.17, porcentaje: 32.0 },
	{ limiteInferior: 125325.21, limiteSuperior: 375975.61, cuotaFija: 32691.18, porcentaje: 34.0 },
	{ limiteInferior: 375975.62, limiteSuperior: Infinity, cuotaFija: 117912.32, porcentaje: 35.0 }
];

/**
 * Calcula el ISR mensual basado en el sueldo bruto (base gravable)
 * @param {number} sueldoBruto 
 * @returns {object} { isrDeterminado, subsidio, isrARetener }
 */
export function calcularISRMensual(sueldoBruto) {
	if (sueldoBruto <= 0) return { isrDeterminado: 0, subsidio: 0, isrARetener: 0 };

	// 1. Encontrar el renglón de la tabla
	const renglon = ISR_TABLE_2025.find(
		(r) => sueldoBruto >= r.limiteInferior && sueldoBruto <= r.limiteSuperior
	);

	if (!renglon) return { isrDeterminado: 0, subsidio: 0, isrARetener: 0 };

	// 2. Calcular ISR Determinado
	const excedente = sueldoBruto - renglon.limiteInferior;
	const impuestoMarginal = excedente * (renglon.porcentaje / 100);
	const isrDeterminado = renglon.cuotaFija + impuestoMarginal;

	// 3. Calcular Subsidio al Empleo (Regla Mayo 2024)
	// Aplica solo si ingresos <= 9,081.00
	let subsidio = 0;
	if (sueldoBruto <= 9081.0) {
		// Monto: 11.82% de la UMA mensual
		subsidio = UMA_2025.mensual * 0.1182;
	}

	// 4. Calcular ISR Final (no puede ser menor a 0 en el nuevo esquema)
	const isrARetener = Math.max(0, isrDeterminado - subsidio);

	return {
		isrDeterminado: Number(isrDeterminado.toFixed(2)),
		subsidio: Number(subsidio.toFixed(2)),
		isrARetener: Number(isrARetener.toFixed(2))
	};
}
