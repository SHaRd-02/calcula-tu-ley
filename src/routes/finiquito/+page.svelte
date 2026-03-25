<script>
    import { calcularFiniquito } from "$lib/calculators/laboral";
    import { calcularDiasLaborados, calcularDiasTranscurridos, calcularAniosTrabajados } from "$lib/calculators/dias";
    import { formatToPesos } from "$lib/calculators/format";

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

    }
</script>


<main class="gradient-surface stack" >
    <h1 class="layout-readable">
        Calcula tu Finiquito
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
                
                <canvas bind:this={canvas} ></canvas>
            </article>
    </section>

    <div class="layout-readable  table">
        <table>
            <thead>
                <tr>
                    <th class="table-title h5">
                        Finiquito
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="h5">
                        Aguinaldo: 
                    </td>
                    <td>
                        {aguinaldo}
                    </td>
                </tr>

                <tr>
                    <td class="h5">
                        Vacaciones: 
                    </td>
                    <td>
                        {vacaciones}
                    </td>
                </tr>

                <tr>
                    <td class="h5">
                        Prima Vacacional: 
                    </td>
                    <td>
                        {primaVacacional}
                    </td>
                </tr>

                <tr>
                    <td class="h5">
                        Total: 
                    </td>
                    <td>
                        <span class="tag success" >
                            {total}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>


</main>


<style>
    .table-title{
        text-align: center;
        width: 100%;
    }


    .layout-readable{
        margin: 20px auto;
    }
</style>