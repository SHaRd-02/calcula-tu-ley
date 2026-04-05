<script>
    let zona = '';
    let salarioDiario = '';
    let salarioMensual = '';
    let state;

    // Valores 2024 (puedes actualizar después)
    const MIN_FRONTERA = 374.89;
    const MIN_RESTO = 248.93;

    $: salarioMinimo = zona === 'frontera'
        ? MIN_FRONTERA
        : zona === 'resto'
        ? MIN_RESTO
        : 0;

    $: salarioUsuario = salarioDiario
        ? Number(salarioDiario)
        : salarioMensual
        ? Number(salarioMensual) / 30
        : 0;

    $: resultado = salarioUsuario && salarioMinimo
        ? salarioUsuario >= salarioMinimo
            ? 'Cumple con el salario mínimo'
            : 'No cumple con el salario mínimo'
        : '';
</script>
<main class="gradient-surface stack" >
    <h1 class="layout-readable">
        Verifica el Salario Mínimo en México
    </h1>

    <section class="layout-readable">
        <p class="callout fill" >
            En México, el salario mínimo depende de la zona en la que vives.
            Existen dos principales zonas: la Zona Libre de la Frontera Norte (ZLFN)
            y el resto del país.
        </p>
    </section>

    <section class="layout-readable">
        <h2>1. Selecciona tu zona</h2>
        <div class="callout success fill stack">
            <label>
                <input type="radio" name="zona" value="frontera" bind:group={zona} />
                Zona Libre de la Frontera Norte
            </label>
    
            <label>
                <input type="radio" name="zona" value="resto" bind:group={zona} />
                Resto del país
            </label>
        </div>
    </section>

    <section class="layout-readable">
        <h2>2. Ingresa tu salario neto</h2>

        <label>
            Salario diario (MXN):
            <input type="number" placeholder="Ej. 250" bind:value={salarioDiario} />
        </label>

        <label>
            Salario mensual (opcional):
            <input type="number" placeholder="Ej. 7500" bind:value={salarioMensual} />
        </label>
    </section>

    <section class="layout-readable">
        <h2>3. Resultado</h2>

        <p class="callout ghost" >
            Aquí podrás ver si tu salario está por encima o por debajo del salario mínimo correspondiente a tu zona.
        </p>

        <div class="table">
            <table>
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Salario mínimo actual</td>
                        <td>{salarioMinimo ? salarioMinimo.toFixed(2) + ' MXN/día' : '-'}</td>
                    </tr>
                    <tr>
                        <td>Tu salario</td>
                        <td>{salarioUsuario ? salarioUsuario.toFixed(2) + ' MXN/día' : '-'}</td>
                    </tr>
                    <tr>
                        <td>Resultado</td>
                        <td>{resultado || '-'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <section class="layout-readable">
        <h2>¿Cómo se calcula?</h2>
        <p class="callout warning fill">
            El salario mínimo se establece por día. Para compararlo con tu salario mensual,
            puedes dividir tu ingreso mensual entre 30 días.
        </p>
    </section>
</main>