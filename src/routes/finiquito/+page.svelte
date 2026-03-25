<script>
    import { calcularFiniquito } from "$lib/calculators/laboral";

    let salarioMensual;
    let diasLaborados;
</script>


<main class="gradient-surface" >
    <h1 class="layout-readable">
        Calcula tu Finiquito
    </h1>
    <section class="layout-readable layout-split">
        <article class="stack">
        <!-- Salario Mensual -->
            <label for="salario-mensual">
                Ingresa tu salario mensual bruto
            </label>
            <input type="number" name="salario-mensual" id="" inputmode="numeric" step="any" placeholder="$20,000" bind:value={salarioMensual} >
            
            <!-- Dias laborados en el año -->
            <label for="dias-laborados">Días laborados en el ultimo año</label>
            <input type="number" name="dias-laborados" id="" inputmode="numeric" step="any" placeholder="100" bind:value={diasLaborados}>
        </article>
    </section>
</main>