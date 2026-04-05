<script>
    import { calcularAguinaldo } from "$lib/calculators/laboral";
    import { calcularDiasLaborados } from "$lib/calculators/dias";
    import { formatToPesos } from "$lib/calculators/format";

    let salarioMensual;
    let fechaEntrada;
    let diasLaborados;
    let aguinaldo = 0;
  
   


    function getFiniquito() {
        const hoy = new Date().toISOString().split('T')[0];

        const fechaIngresoDate = new Date(fechaEntrada);
        const anioActual = new Date().getFullYear();

        // 1 de enero del año actual
        const inicioAnioActual = new Date(anioActual, 0, 1);

        let fechaBase;

        // Si entró antes de este año, usar 1 de enero
        if (fechaIngresoDate < inicioAnioActual) {
            fechaBase = inicioAnioActual;
        } else {
            fechaBase = fechaIngresoDate;
        }

        const fechaBaseISO = fechaBase.toISOString().split('T')[0];

        diasLaborados = calcularDiasLaborados(fechaBaseISO, hoy);

        aguinaldo = calcularAguinaldo(salarioMensual, diasLaborados);
    }
</script>


<main class="gradient-surface stack" >
    <h1 class="layout-readable">
        Calcula tu Aguinaldo
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


             <button type="submit" class="success" >
                Calcular Finiquito
             </button>
            </form>

            <article  class="table">
    <table>
        <thead>
            <tr>
                <th>Concepto</th>
                <th>Valor</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Días trabajados en el año</td>
                <td>{diasLaborados || '-'}</td>
            </tr>
            <tr>
                <td>Aguinaldo estimado</td>
                <td>{aguinaldo ? formatToPesos(aguinaldo) : '-'}</td>
            </tr>
        </tbody>
    </table>
            </article>
    </section>

    <section class="layout-readable">
        <h2>¿Cómo se calcula el aguinaldo?</h2>

        <p>
            En México, el aguinaldo es una prestación obligatoria por ley equivalente
            a un mínimo de 15 días de salario por año trabajado.
        </p>

        <h3>Periodo legal</h3>
        <p>
            El cálculo del aguinaldo se basa en el tiempo trabajado dentro del año calendario,
            es decir:
        </p>
        <p>
            <strong>Del 1 de enero al 31 de diciembre del año actual.</strong>
        </p>

        <h3>¿Qué pasa si no trabajaste todo el año?</h3>
        <p>
            Si no trabajaste todo el año, tienes derecho a la parte proporcional del aguinaldo.
            Esto significa que solo se consideran los días que trabajaste durante el año actual.
        </p>

        <h3>¿Cómo lo calcula este sistema?</h3>
        <ul>
            <li>
                Si entraste antes del año actual, se toma como inicio el <strong>1 de enero</strong>.
            </li>
            <li>
                Si entraste durante este año, se toma tu <strong>fecha real de ingreso</strong>.
            </li>
            <li>
                Se cuentan los días trabajados desde esa fecha hasta hoy.
            </li>
            <li>
                Se calcula tu salario diario (salario mensual / 30).
            </li>
            <li>
                Se calcula el aguinaldo proporcional en base a 15 días de salario por año.
            </li>
        </ul>

        <h3>Fórmula simplificada</h3>
        <p class="callout fill">
            Aguinaldo = (Salario diario × 15) × (Días trabajados / 365)
        </p>

        <p>
            Este cálculo es una estimación y puede variar dependiendo de prestaciones
            superiores a la ley o políticas internas de la empresa.
        </p>
    </section>

    <section class="layout-readable">
        <h2>¿Quién tiene derecho al aguinaldo?</h2>

        <p>
            En México, <strong>todas las personas trabajadoras tienen derecho a aguinaldo</strong>,
            incluso si no han cumplido un año completo en la empresa.
        </p>

        <h3>Tiempo mínimo</h3>
        <p>
            <strong>No existe un tiempo mínimo obligatorio</strong> para tener derecho al aguinaldo.
            Desde el primer día que trabajas, generas el derecho a la parte proporcional.
        </p>

        <h3>Ejemplo</h3>
        <p>
            Si entraste a trabajar en noviembre, aún así tienes derecho a recibir aguinaldo
            proporcional por los días que trabajaste en ese año.
        </p>

        <h3>¿Qué pasa con el periodo de prueba o entrenamiento?</h3>
        <p>
            Legalmente, si estás recibiendo un salario, <strong>sí cuenta como relación laboral</strong>,
            aunque estés en capacitación, entrenamiento o periodo de prueba.
        </p>

        <ul>
            <li>
                Si te están pagando → <strong>debe contar para aguinaldo</strong>.
            </li>
            <li>
                Si ya estás trabajando aunque no hayas firmado contrato formal →
                <strong>sigue existiendo relación laboral</strong>.
            </li>
        </ul>

        <div class="callout warning fill stack">
            <h3>⚠️ Importante</h3>
        <p  >
            Algunas empresas intentan no considerar periodos de entrenamiento o contratos
            cortos (como de 30 días), pero esto <strong>no elimina tu derecho legal</strong>
            al aguinaldo proporcional.
        </p>

        <p>
            Si trabajaste y recibiste salario, ese tiempo debe considerarse para el cálculo.
        </p>
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
</style>