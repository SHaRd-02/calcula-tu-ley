/**
 * Lógica de estimación de cuotas obreras del IMSS (2025)
 */

import { UMA_2025 } from './isr.js';

/**
 * Estima la cuota obrera mensual del IMSS
 * @param {number} sueldoBruto 
 * @returns {number} Cuota total obrera
 */
export function calcularIMSSMensual(sueldoBruto) {
	if (sueldoBruto <= 0) return 0;

	// SBC (Salario Base de Cotización) - Simplificado como sueldo bruto para este cálculo
	const sbc = sueldoBruto;
	
	// 1. Enfermedad y Maternidad (Gastos Médicos para pensionados y beneficiarios)
	// Se aplica 0.375% sobre el SBC
	const gastosMedicos = sbc * 0.00375;

	// 2. Enfermedad y Maternidad (Prestaciones en dinero)
	// Se aplica 0.25% sobre el SBC
	const prestacionesDinero = sbc * 0.0025;

	// 3. Enfermedad y Maternidad (Excedente a 3 UMAS)
	// Se aplica 0.40% sobre (SBC - 3 UMAS)
	const tresUmasMensuales = UMA_2025.diaria * 3 * 30.4;
	let excedenteUmas = 0;
	if (sbc > tresUmasMensuales) {
		excedenteUmas = (sbc - tresUmasMensuales) * 0.004;
	}

	// 4. Invalidez y Vida
	// Se aplica 0.625% sobre el SBC
	const invalidezVida = sbc * 0.00625;

	// 5. Cesantía en Edad Avanzada y Vejez
	// Se aplica 1.125% sobre el SBC
	const cesantiaVejez = sbc * 0.01125;

	const total = gastosMedicos + prestacionesDinero + excedenteUmas + invalidezVida + cesantiaVejez;

	return Number(total.toFixed(2));
}
