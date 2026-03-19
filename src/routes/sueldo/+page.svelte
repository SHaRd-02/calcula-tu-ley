<script>
import { calcularISRMensual } from '$lib/calculators/isr.js';
import { calcularIMSSMensual } from '$lib/calculators/imss.js';
import { formatToPesos } from '$lib/calculators/format';
import Chart from 'chart.js/auto'
import { onMount, tick } from 'svelte';

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

    <section class="layout-readable">
        <h1>
            Calcula tu sueldo Neto Mensual
        </h1>
    
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
    </section>
    
    {#if  resultado}
        <article>
            <canvas bind:this={canvas} ></canvas>
        </article>
    {/if}

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

</style>