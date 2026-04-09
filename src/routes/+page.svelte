<script>
	const calculators = [
		{ id: 'sueldo', title: 'Sueldo Bruto a Neto', desc: 'Calcula ISR, IMSS y subsidio.', img: "/salario.jpg" },
		{ id: 'aguinaldo', title: 'Aguinaldo', desc: 'Mínimo 15 días proporcionales.', img: "/aguinaldo.jpg" },
		{ id: 'finiquito', title: 'Finiquito', desc: 'Estimación por renuncia o despido.', img: "/finiquito.jpeg" },
		{ id: 'minimo', title: 'Salario Mínimo', desc: 'Verifica si te pagan lo legal.', img: "/minimo.jpg" }
	];

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Calcula tu Ley 2026",
        "url": "https://calcula-tu-ley.vercel.app/",
        "description": "Calculadoras laborales precisas para México: sueldo neto, aguinaldo, finiquito y salario mínimo 2026.",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://calcula-tu-ley.vercel.app/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };
</script>

<svelte:head>
    <title>Calcula tu Ley 2026 | Calculadoras Laborales México - Sueldo, Aguinaldo y más</title>
    <meta name="description" content="La mejor herramienta gratuita para trabajadores en México. Calcula tu sueldo neto, aguinaldo proporcional, finiquito y consulta el salario mínimo 2026 actualizado.">
    <meta name="keywords" content="calculadoras laborales méxico, calcula tu ley, calcular sueldo neto 2026, calcular aguinaldo méxico, calcular finiquito gratis">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://calcula-tu-ley.vercel.app/">
    <meta property="og:title" content="Calcula tu Ley 2026 - Herramientas Laborales Gratuitas">
    <meta property="og:description" content="Calcula tus prestaciones de ley en México de forma fácil y precisa.">
    <meta property="og:image" content="https://calcula-tu-ley.vercel.app/salario.jpg">

    <script type="application/ld+json">
        {JSON.stringify(schema)}
    </script>
</svelte:head>

<main class="gradient-surface">
	<h1 class="gradient-text gradient-sunset layout-readable">Calculadoras Laborales México 2026</h1>
    <section class="layout-readable intro-text stack">
        <p class="h5">
            Herramientas gratuitas para que los trabajadores en México conozcan sus derechos y calculen sus percepciones de forma precisa.
        </p>
        <p>
            En un entorno laboral complejo, entender cómo se compone tu salario y qué prestaciones te corresponden es fundamental. Nuestras calculadoras están actualizadas con las tablas de <strong>ISR 2026</strong> y el <strong>Salario Mínimo vigente</strong>, permitiéndote tomar decisiones informadas sobre tu carrera profesional.
        </p>
    </section>

	<section class="layout-card layout-readable center">
		
		{#each calculators as calc}
			<a class="card linked" href="/{calc.id}">
				<figure>
					<img src={calc?.img} alt={calc?.title}>
				</figure>
				<header>
					<h4>{calc?.title}</h4>
				</header>
				<div class="card-body stack">
					{calc?.desc}
				</div>
			</a>
		{/each}
		
	</section>

    <section class="layout-readable stack content-section">
        <h2>¿Por qué usar nuestras calculadoras laborales?</h2>
        <p>
            Muchos trabajadores desconocen la diferencia entre su <strong>sueldo bruto</strong> (antes de impuestos) y su <strong>sueldo neto</strong> (lo que realmente llega a su cuenta). Además, prestaciones como el aguinaldo o el cálculo de un finiquito pueden generar dudas.
        </p>

        <div class="grid-2">
            <article class="box callout ghost">
                <h3>Transparencia Salarial</h3>
                <p>Calcula exactamente cuánto te debe retener el SAT por concepto de ISR y cuánto debes aportar al IMSS. Evita sorpresas en tu nómina.</p>
            </article>
            <article class="box callout ghost">
                <h3>Derechos de Ley</h3>
                <p>Asegúrate de que tu aguinaldo y finiquito se calculen conforme a la Ley Federal del Trabajo (LFT), garantizando tus 15 días mínimos de ley.</p>
            </article>
        </div>

        <h3>Información Actualizada</h3>
        <p>
            Nuestras fórmulas se ajustan anualmente conforme a las publicaciones del Diario Oficial de la Federación (DOF). Esto incluye las nuevas tablas de retención de impuestos y los incrementos al salario mínimo en la Zona Libre de la Frontera Norte y el resto del país.
        </p>
        
        <div class="box info-box">
            <p><strong>Nota importante:</strong> Los resultados obtenidos son estimaciones. Te recomendamos consultar siempre con un profesional contable o legal para casos específicos.</p>
        </div>
    </section>
</main>

<style>

	main{
		padding: var(--pad-xl);
	}

    .intro-text {
        margin-top: 2rem;
        line-height: 1.6;
    }

    .content-section {
        margin-top: 4rem;
        padding-bottom: 4rem;
    }

    .grid-2 {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin: 2rem 0;
    }

    .info-box {
        background: rgba(0,0,0,0.05);
        border-radius: 8px;
        padding: 1.5rem;
        font-style: italic;
    }

	figure{
		height: 50%;
        overflow: hidden;
	}

	img{
		object-fit: cover;
		width: 100%;
        height: 100%;
        transition: transform 0.3s ease;
	}

    .card:hover img {
        transform: scale(1.05);
    }

	section{
		margin: var(--vs-xl) auto;
	}

</style>
