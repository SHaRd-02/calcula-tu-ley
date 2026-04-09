<script>
    let zona = '';
    let salarioDiario = '';
    let salarioMensual = '';
    let state;

    // Valores 2026 Estimados/Actualizados
    const MIN_FRONTERA = 470.26; 
    const MIN_RESTO = 312.25;

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
        ? salarioUsuario >= (salarioMinimo - 0.01) // Margen por redondeo
            ? 'Cumple con el salario mínimo ✅'
            : 'No cumple con el salario mínimo ⚠️'
        : '';

    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Calculadora de Salario Mínimo México 2026",
        "operatingSystem": "Any",
        "applicationCategory": "FinanceApplication",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "MXN"
        },
        "description": "Verifica si tu sueldo cumple con el salario mínimo legal 2026 en México (Zona Frontera y Resto del País)."
    };
</script>

<svelte:head>
    <title>Salario Mínimo 2026 México - Calculadora y Tabla Actualizada</title>
    <meta name="description" content="¿Cuánto es el salario mínimo en México este 2026? Verifica si tu sueldo cumple con la ley en la Zona Libre de la Frontera Norte y el resto del país.">
    <meta name="keywords" content="salario mínimo 2026 méxico, conasami 2026, zona libre frontera norte, salario mínimo diario, finanzas méxico">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="Salario Mínimo 2026 México - ¿Cumple tu sueldo con la ley?">
    <meta property="og:description" content="Consulta los nuevos montos del salario mínimo para 2026 y verifica tu nómina de forma gratuita.">
    <meta property="og:image" content="https://calcula-tu-ley.vercel.app/minimo.jpg">

    <script type="application/ld+json">
        {JSON.stringify(schema)}
    </script>
</svelte:head>

<main class="gradient-surface stack" >
    <h1 class="layout-readable">
        Calculadora de Salario Mínimo México 2026
    </h1>
    <section class="layout-readable stack">
        <p class="h5">
            Verifica si tu sueldo cumple con los estándares legales establecidos por la CONASAMI para el año 2026.
        </p>
        <p>
            En México, el salario mínimo es la cantidad menor que debe recibir en efectivo la persona trabajadora por los servicios prestados en una jornada de trabajo. Desde 2019, el país se divide en dos áreas geográficas con salarios diferenciados.
        </p>
    </section>

    <section class="layout-readable">
        <h2>1. Selecciona tu zona geográfica</h2>
        <div class="callout success fill stack">
            <label class="radio-option">
                <input type="radio" name="zona" value="frontera" bind:group={zona} />
                <strong>Zona Libre de la Frontera Norte (ZLFN)</strong>
                <span>Incluye 43 municipios de la frontera con EE.UU.</span>
            </label>
    
            <label class="radio-option">
                <input type="radio" name="zona" value="resto" bind:group={zona} />
                <strong>Resto del País</strong>
                <span>Demás municipios de México y CDMX.</span>
            </label>
        </div>
    </section>

    <section class="layout-readable">
        <h2>2. Ingresa tu salario actual</h2>
        <div class="grid-2">
            <label>
                Salario diario (Bruto):
                <input type="number" placeholder="Ej. 350" bind:value={salarioDiario} />
            </label>
            <label>
                O Salario mensual (Bruto):
                <input type="number" placeholder="Ej. 10000" bind:value={salarioMensual} />
            </label>
        </div>
    </section>

    <section class="layout-readable">
        <h2>3. Resultado de la Verificación 2026</h2>

        <div class="table">
            <table>
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th>Valor (MXN)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Salario mínimo legal 2026</td>
                        <td>{salarioMinimo ? salarioMinimo.toFixed(2) : '-'}</td>
                    </tr>
                    <tr>
                        <td>Tu salario (diario estimado)</td>
                        <td>{salarioUsuario ? salarioUsuario.toFixed(2) : '-'}</td>
                    </tr>
                    <tr class="result-row">
                        <td><strong>Estatus Legal</strong></td>
                        <td><strong>{resultado || 'Pendiente de datos'}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <section class="layout-readable stack content-info">
        <h2>¿Qué municipios integran la Zona de la Frontera Norte?</h2>
        <p>
            La Zona Libre de la Frontera Norte (ZLFN) goza de un salario mínimo superior y está integrada por los municipios que colindan con Estados Unidos, en los estados de:
        </p>
        <ul>
            <li><strong>Baja California:</strong> Ensenada, Playas de Rosarito, Tijuana, Tecate y Mexicali.</li>
            <li><strong>Sonora:</strong> San Luis Río Colorado, Puerto Peñasco, General Plutarco Elías Calles, Caborca, Altar, Sáric, Nogales, Santa Cruz, Cananea, Naco y Agua Prieta.</li>
            <li><strong>Chihuahua:</strong> Janos, Ascensión, Juárez, Praxedis G. Guerrero, Guadalupe, Coyame del Sotol, Ojinaga y Manuel Benavides.</li>
            <li><strong>Coahuila:</strong> Ocampo, Acuña, Zaragoza, Jiménez, Piedras Negras, Nava, Guerrero e Hidalgo.</li>
            <li><strong>Nuevo León:</strong> Anáhuac.</li>
            <li><strong>Tamaulipas:</strong> Nuevo Laredo, Guerrero, Mier, Miguel Alemán, Camargo, Gustavo Díaz Ordaz, Reynosa, Río Bravo, Valle Hermoso y Matamoros.</li>
        </ul>

        <h2>Consecuencias de no pagar el salario mínimo</h2>
        <p>
            Ningún contrato laboral, ya sea verbal o escrito, puede establecer un salario inferior al mínimo legal. Si tu patrón te paga menos:
        </p>
        <div class="box warning stack">
            <ol>
                <li>Es una violación directa a la Ley Federal del Trabajo.</li>
                <li>Puedes solicitar una inspección del trabajo ante la STPS.</li>
                <li>Tienes derecho a rescindir el contrato con responsabilidad para el patrón (demandar indemnización).</li>
            </ol>
        </div>
    </section>
</main>

<style>
    .layout-readable {
        margin: 1.5rem auto;
        line-height: 1.6;
    }

    .radio-option {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        cursor: pointer;
        padding: 0.5rem;
    }

    .grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    .result-row {
        background: rgba(0,0,0,0.03);
    }

    .content-info {
        margin-top: 3rem;
        padding-bottom: 4rem;
    }

    input[type="number"] {
        width: 100%;
        padding: 0.8rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-top: 0.5rem;
    }
</style>