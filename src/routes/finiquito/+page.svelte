<script>
    import { calcularFiniquito } from "$lib/calculators/laboral";
    import { calcularDiasLaborados, calcularDiasTranscurridos, calcularAniosTrabajados } from "$lib/calculators/dias";
    import { formatToPesos } from "$lib/calculators/format";
    import Chart from 'chart.js/auto';

    let salarioMensual;
    let fechaEntrada;
    let fechaSalida;
    let diasLaborados;
    let diasTranscurridos;
    let aniosTrabajados;
    let finiquito =  formatToPesos(0);
    let aguinaldo;
    let vacaciones;
    let primaVacacional;
    let total;
    let canvas;
    let chart;


    function getFiniquito() {
        diasLaborados = calcularDiasLaborados(fechaEntrada, fechaSalida);
        diasTranscurridos = calcularDiasTranscurridos(fechaEntrada, fechaSalida);
        aniosTrabajados = calcularAniosTrabajados(fechaEntrada, fechaSalida);
        console.log(diasLaborados, diasTranscurridos, aniosTrabajados);

        finiquito = calcularFiniquito(Number(salarioMensual), diasLaborados,diasTranscurridos, aniosTrabajados);
        console.log(finiquito)
        aguinaldo = formatToPesos(finiquito?.aguinaldo);
        vacaciones = formatToPesos(finiquito?.vacaciones);
        primaVacacional = formatToPesos(finiquito?.primaVacacional);
        total = formatToPesos(finiquito?.total)

        // Crear gráfica de dona
        const data = [
            finiquito?.aguinaldo || 0,
            finiquito?.vacaciones || 0,
            finiquito?.primaVacacional || 0
        ];

        const labels = ['Aguinaldo', 'Vacaciones', 'Prima Vacacional'];

        // Destruir gráfica previa si existe
        if (chart) {
            chart.destroy();
        }

        chart = new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [
                    {
                        data
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
</script>


<main class="gradient-surface stack" >
    <h1 class="layout-readable">
        Calcula tu Finiquito Laboral
    </h1>
    <section class="layout-readable layout-split">
        <form class="stack" on:submit|preventDefault={getFiniquito} >
        <!-- Salario Mensual -->
            <label for="salario-mensual">
                Ingresa tu salario mensual bruto
            </label>
            <input type="number" name="salario-mensual" id="" inputmode="numeric" step="any" placeholder="$20,000" bind:value={salarioMensual} required >
            
            <!-- Fecha Entrada -->
             <label for="fecha-entrada">
                Fecha en la que entraste a trabajar en la empresa
             </label>
             <input type="date" name="fecha-entrada" id="" bind:value={fechaEntrada} required>


             <!-- Fecha Salida -->
             <label for="fecha-salida">
                Fecha en la que dejaste de trabajar en la empresa
             </label>
             <input type="date" name="fecha-entrada" id="" bind:value={fechaSalida} required>

             <button type="submit" class="success" >
                Calcular Finiquito
             </button>
            </form>

            <article>
                {#if total && total !== '$0.00'}
                    <canvas bind:this={canvas} ></canvas>
                {:else}
                    <div class="box callout ghost center">
                        <p>Completa los datos para ver el desglose gráfico de tu finiquito.</p>
                    </div>
                {/if}
            </article>
    </section>

    <div class="layout-readable table">
        <table>
            <thead>
                <tr>
                    <th colspan="2" class="table-title h5">
                        Resumen de Conceptos
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="h5">Aguinaldo Proporcional:</td>
                    <td>{aguinaldo || '$0.00'}</td>
                </tr>
                <tr>
                    <td class="h5">Vacaciones no Gozadas:</td>
                    <td>{vacaciones || '$0.00'}</td>
                </tr>
                <tr>
                    <td class="h5">Prima Vacacional:</td>
                    <td>{primaVacacional || '$0.00'}</td>
                </tr>
                <tr>
                    <td class="h5">Total Estimado:</td>
                    <td>
                        <span class="tag success">{total || '$0.00'}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <section class="layout-readable stack content-info">
        <h2>¿Qué es el Finiquito en México?</h2>
        <p>
            El finiquito es el pago que el patrón realiza al trabajador cuando la relación laboral termina de forma voluntaria o por causas justificadas. A diferencia de la liquidación, el finiquito se entrega siempre que dejas un empleo, sin importar el motivo de la salida.
        </p>

        <h3>¿Cuándo corresponde recibir un finiquito?</h3>
        <ul>
            <li>Renuncia voluntaria a tu empleo.</li>
            <li>Terminación de un contrato temporal.</li>
            <li>Despido justificado (por faltas o faltas graves).</li>
            <li>Invalidez por enfermedad o fallecimiento del trabajador.</li>
        </ul>

        <h3>Componentes que integran tu finiquito</h3>
        <p>
            Legalmente, tu finiquito debe incluir el pago de las prestaciones proporcionales que generaste durante el tiempo trabajado y que aún no te han sido pagadas:
        </p>

        <div class="grid-list">
            <article class="box callout fill">
                <h4>1. Aguinaldo Proporcional</h4>
                <p>La parte proporcional de los 15 días de salario que te corresponden por el tiempo trabajado en el año en curso.</p>
            </article>
            <article class="box callout fill">
                <h4>2. Vacaciones</h4>
                <p>Los días de vacaciones que ya habías ganado por tu antigüedad pero que no llegaste a disfrutar antes de salir.</p>
            </article>
            <article class="box callout fill">
                <h4>3. Prima Vacacional</h4>
                <p>El 25% adicional sobre el monto de los días de vacaciones no gozados (mínimo de ley).</p>
            </article>
        </div>

        <h3>Diferencia entre Finiquito y Liquidación</h3>
        <p>
            Es común confundirlos, pero la <strong>Liquidación</strong> (o Indemnización Constitucional) solo se paga cuando el patrón te despide sin una causa justificada o por recorte de personal. La liquidación incluye, además del finiquito, 3 meses de sueldo y 20 días por cada año trabajado.
        </p>

        <div class="box warning stack">
            <p><strong>⚠️ Plazo Legal:</strong> El patrón debe entregarte el finiquito en el momento en que se firma la renuncia o el aviso de rescisión laboral. Si se niega a pagarte, puedes acudir a la PROFEDET para recibir asesoría gratuita.</p>
        </div>
    </section>

</main>


<style>
    .table-title{
        text-align: center;
        width: 100%;
    }

    .layout-readable{
        margin: 20px auto;
    }

    .content-info {
        margin-top: 3rem;
        padding-bottom: 4rem;
        line-height: 1.6;
    }

    .grid-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        margin: 2rem 0;
    }

    main{
        padding: var(--pad-m);
    }
</style>