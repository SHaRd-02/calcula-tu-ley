<script>
import { calcularISRMensual } from '$lib/calculators/isr.js';
import { calcularIMSSMensual } from '$lib/calculators/imss.js';
import { formatToPesos } from '$lib/calculators/format';
import { ISR_TABLE_2025 } from '$lib/calculators/isr.js';
import Chart from 'chart.js/auto'
import { onMount, tick } from 'svelte';

const salariosPromedio = {
    "Promedio nacional": 10812,
    "Desarrollador de software": 30000,
    "Ingeniero industrial": 22000,
    "Ingeniero civil": 20000,
    "Ingeniero eléctrico": 23000,
    "Ingeniero mecánico": 22000,
    "Ingeniero mecatrónico": 24000,
    "Ingeniero en sistemas": 26000,
    "Ingeniero en software": 30000,
    "Ingeniero químico": 21000,
    "Ingeniero industrial junior": 18000,
    "Ingeniero civil senior": 28000,
    "Médico general": 25000,
    "Enfermero": 12000,
    "Maestro": 12000,
    "Contador": 18000,
    "Administrador": 15000,
    "Diseñador gráfico": 14000,
    "Operador de maquinaria": 10000,
    "Vendedor": 9000,
    "Atención al cliente": 8000,
    "Arquitecto": 21000,
    "Abogado": 20000,
    "Psicólogo": 14000,
    "Marketing digital": 18000,
    "Analista de datos": 28000,
    "QA / Tester": 22000,
    "Técnico en mantenimiento": 12000,
    "Electricista": 13000,
    "Mecánico automotriz": 11000,
    "Chef": 15000,
    "Piloto": 45000,
    "Técnico eléctrico": 12000,
    "Técnico mecánico": 11000,
    "Soldador": 10000,
    "Albañil": 9000,
    "Chofer": 9500,
    "Auxiliar administrativo": 8500
};


let ocupacion = "Promedio nacional";
let ocupacionSeleccionada = ocupacion;

$: ocupacionSeleccionada = ocupacion;

let comparacion;

$: if (sueldo) {
    const sueldoNum = Number(sueldo);
    const promedio = salariosPromedio[ocupacion] || salariosPromedio["Promedio nacional"];

    comparacion = {
        promedio,
        diferencia: sueldoNum - promedio,
        porcentaje: ((sueldoNum / promedio) * 100).toFixed(1)
    };
}

function calcularSueldoNetoFinal(sueldoBruto) {
    const isr = calcularISRMensual(sueldoBruto).isrARetener;
    const imss = calcularIMSSMensual(sueldoBruto);
    const neto = sueldoBruto - isr - imss;

    const total = sueldoBruto;

    return {
        bruto: formatToPesos(sueldoBruto),
        descuentoISR: formatToPesos(isr),
        descuentoIMSS: formatToPesos(imss),
        sueldoNeto: formatToPesos(Number(neto.toFixed(2))),

        // porcentajes
        brutoPct: 100,
        isrPct: ((isr / total) * 100).toFixed(1),
        imssPct: ((imss / total) * 100).toFixed(1),
        netoPct: ((neto / total) * 100).toFixed(1)
    };
}


let sueldo;
let resultado;
let canvas;
let chart;

async function calcular(){
    const sueldoNum = Number(sueldo);
    resultado = calcularSueldoNetoFinal(sueldoNum);

    await tick();

    if (chart) {
        chart.destroy();
    }

    const isr = calcularISRMensual(sueldoNum).isrARetener;
    const imss = calcularIMSSMensual(sueldoNum);
    const neto = sueldoNum - isr - imss;

    chart = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: ['ISR', 'IMSS', 'Neto'],
            datasets: [{
                label: 'Sueldo',
                data: [isr, imss, neto],
                backgroundColor : ['rgb(184, 106, 91)', 'rgb(204, 191, 146)', 'rgb(97, 169, 142)']
            }]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const value = context.raw;
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ${percentage}%`;
                        }
                    }
                }
            }
        }
    });
}


</script>


<main class="gradient-surface">

    <h1 class="layout-readable" >
        Calcula tu sueldo Neto Mensual
    </h1>

    <section class="layout-readable layout-split">
        
    
        <article>
            <label class="h5" for="sueldo">
                Ingresa tu sueldo Bruto Mensual
            </label>
            <div class="input-group">
                <input 
                    type="number" 
                    step="any" 
                    name="sueldo" 
                    placeholder="$20,000.00" 
                    bind:value={sueldo}
                    on:keydown={(e) => e.key === 'Enter' && calcular()}
                />
                <button  on:click={calcular} class="primary"  >Calcular</button>
            </div>
        
    
                <div class="table">
                    <table class="">
                    <thead>
                        <tr>
                            <th>
                                Categoría
                            </th>
                            <th>
                                Monto
                            </th>
                            <th>
                                Porcentaje
                            </th>
                        </tr>
                    </thead>
                        <tbody>
                            <tr>
                                <td>Sueldo Bruto</td>
                                <td class="amount">
                                    <span class="tag">{resultado?.bruto}</span>
                                </td>
                                <td class="primary" >
                                    {resultado?.brutoPct}%
                                </td>
                            </tr>
                            <tr>
                                <td>Descuento ISR</td>
                                <td class="amount">
                                    <span class="tag error">{resultado?.descuentoISR}</span>
                                </td>
                                <td class="error">
                                   - {resultado?.isrPct}%
                                </td>
                            </tr>
                            <tr>
                                <td>Descuento IMSS</td>
                                <td class="amount">
                                    <span class="tag warning">{resultado?.descuentoIMSS}</span>
                                </td>
                                <td class="warning">
                                   - {resultado?.imssPct}%
                                </td>
                            </tr>
                            <tr>
                                <td>Sueldo Neto</td>
                                <td class="amount">
                                    <span class="tag success">{resultado?.sueldoNeto}</span>
                                </td>
                                <td class="success" >
                                    {resultado?.netoPct}%
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        </article>

            {#if  resultado}
                <article>
                    <canvas bind:this={canvas} ></canvas>
                </article>
            {:else}
                <div class="box callout">
                    <p>
                        Ingresa tu sueldo para ver el gráfico.
                    </p>
                </div>
            {/if}
    </section>
    
    

    <section class="layout-readable comparacion">
        <h4>📊 ¿Cómo se compara tu sueldo bruto?</h4>

        <label>Selecciona tu ocupación</label>
        <select bind:value={ocupacion}>
            {#each Object.keys(salariosPromedio) as key}
                <option value={key}>{key}</option>
            {/each}
        </select>

        {#if comparacion}
            <div class="box callout stack">
                <p>Promedio: {formatToPesos(comparacion.promedio)}</p>
                <p>Tu sueldo: {resultado?.bruto}</p>

                <p>
                    {#if comparacion.diferencia > 0}
                        🚀 Estás arriba por {formatToPesos(comparacion.diferencia)} ({comparacion.porcentaje}%)
                    {:else}
                        ⚠️ Estás debajo por {formatToPesos(Math.abs(comparacion.diferencia))}
                    {/if}
                </p>
            </div>
        {:else}
            <p  class="box callout ghost" >Primero cálcula tu sueldo neto para ver la comparación</p>
        {/if}

        <div class="table">
            <table>
                <thead>
                    <tr>
                        <th>Ocupación</th>
                        <th>Salario Promedio Mensual</th>
                    </tr>
                </thead>
                <tbody>
                    {#each Object.entries(salariosPromedio) as [ocupacion, salario]}
                        <tr class:selected={ocupacion === ocupacionSeleccionada}>
                            <td>{ocupacion}</td>
                            <td>{formatToPesos(salario)}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </section>

    

    <section class="layout-readable  explicacion">
        <h2>📘 ¿Cómo se calcula tu sueldo neto?</h2>

        <p>
            El cálculo del sueldo neto en México se basa en la resta de impuestos y contribuciones obligatorias al salario bruto.
            Principalmente se consideran el ISR (Impuesto Sobre la Renta) y las aportaciones al IMSS.
        </p>

        <h3>Fórmula general</h3>

        <p class="callout ghost" ><strong>Sueldo Neto</strong> = <i>Sueldo Bruto - ISR - IMSS</i> </p>

        <h3>ISR (Impuesto Sobre la Renta)</h3>
        <p>
            El ISR se calcula con base en tablas progresivas del SAT, donde se aplica una tasa dependiendo del rango de ingreso.
        </p>

        <h3>📊 Tabla ISR Mensual 2025</h3>

        <div class="table">
            <table>
                <thead>
                    <tr>
                        <th>Límite Inferior</th>
                        <th>Límite Superior</th>
                        <th>Cuota Fija</th>
                        <th>%</th>
                    </tr>
                </thead>
                <tbody>
                    {#each ISR_TABLE_2025 as row}
                        <tr>
                            <td>{formatToPesos(row.limiteInferior)}</td>
                            <td>{row.limiteSuperior === Infinity ? 'En adelante' : formatToPesos(row.limiteSuperior)}</td>
                            <td>{formatToPesos(row.cuotaFija)}</td>
                            <td>{row.porcentaje}%</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>

        <h3>IMSS</h3>
        <p>
            El IMSS corresponde a las aportaciones de seguridad social, que incluyen servicios médicos y prestaciones.
        </p>

        <div class="table">
            <table>
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th>% Aproximado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Enfermedades y maternidad</td>
                        <td>~0.625%</td>
                    </tr>
                    <tr>
                        <td>Invalidez y vida</td>
                        <td>~0.625%</td>
                    </tr>
                    <tr>
                        <td>Cesantía y vejez</td>
                        <td>~1.125%</td>
                    </tr>
                    <tr>
                        <td>Total trabajador</td>
                        <td>~2% - 3%</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h2>📚 Fuente de datos de salarios</h2>

        <p>
            Los datos de salarios promedio utilizados en esta herramienta están basados en información pública de:
        </p>

       <div class="box">
            <ul class=""  >
                <li>
                    INEGI. (2024). Encuesta Nacional de Ocupación y Empleo (ENOE). Instituto Nacional de Estadística y Geografía. Recuperado de https://www.inegi.org.mx/programas/enoe/
                </li>
                <li>
                    Secretaría de Economía. (2024). Data México - Ocupaciones y salarios. Recuperado de https://datamexico.org/
                </li>
            </ul>
       </div>

        <p class="callout" >
            Nota: Los valores mostrados son estimaciones promedio y pueden variar según la región, experiencia y sector.
        </p>
    </section>

</main>

<style>
    main{
        padding: var(--pad-xl);
    }

    .table{
        margin: 40px auto;
    }
    
    

    canvas{
        max-height: 500px;
    }
    
    .error{
        color: var(--red);
    }
    .warning{
        color: var(--amber);
    }

    .primary{
        color: var(--indigo);
    }

    .success{
        color: var(--success);
    }


    .box{
        margin: 20px auto;
    }

    .selected {
        background: rgba(100, 200, 255, 0.15);
    }
</style>