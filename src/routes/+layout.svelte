<script>
	import "@drop-in/graffiti";
	import favicon from '$lib/assets/favicon.svg';
    import { onMount } from 'svelte';
	let { children } = $props();

    let showCookieBanner = $state(false);

    onMount(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            showCookieBanner = true;
        }
    });

    function acceptCookies() {
        localStorage.setItem('cookie-consent', 'true');
        showCookieBanner = false;
    }
</script>

<svelte:head>
	<title>Calcula tu Ley 2026 | Calculadoras Laborales México</title>
    <meta name="description" content="Herramientas gratuitas para calcular sueldo neto, aguinaldo, finiquito y más en México. Datos actualizados 2026.">
    <link rel="canonical" href="https://calcula-tu-ley.vercel.app/" />
	<link rel="icon" href={favicon} />
</svelte:head>

{#if showCookieBanner}
    <div class="cookie-banner box border stack p-m">
        <p>Este sitio utiliza cookies para mejorar tu experiencia y mostrar publicidad relevante a través de Google AdSense. Al continuar navegando, aceptas nuestra <a href="/privacidad">Política de Privacidad</a>.</p>
        <button class="primary" onclick={acceptCookies}>Entendido, cerrar</button>
    </div>
{/if}

<header class="header border sticky split">
	<h6>🇲🇽 Calcula tu Ley</h6>
	<nav class="">
		<ul class="no-list">
			<li><a href="/">Inicio</a></li>
			<li><a href="/sueldo">Sueldo</a></li>
			<li><a href="/aguinaldo">Aguinaldo</a></li>
			<li><a href="/finiquito">Finiquito</a></li>
			<li><a href="/minimo">Mínimo</a></li>
		</ul>
	</nav>
</header>

<main class="container p-m">
	{@render children?.()}
</main>

<footer class="footer stack">
    <nav>
        <ul class="no-list inline center">
            <li><a href="/privacidad">Privacidad</a></li>
            <li><a href="/contacto">Contacto</a></li>
        </ul>
    </nav>
	<p>Actualizado con datos de 2026. Los cálculos son estimaciones.</p>
	<p>© Derechos Reservados 2026 <b>🇲🇽 Calcula tu Ley</b></p>
</footer>


<style>
	footer{
		padding: var(--pad-xl);
		text-align: center;
	}

    .cookie-banner {
        position: fixed;
        bottom: 20px;
        right: 20px;
        left: 20px;
        background: var(--bg-9);
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        border-radius: 12px;
        max-width: 600px;
        margin: auto;
    }

    .inline.center {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        margin-bottom: 1rem;
    }

    .inline.center a {
        text-decoration: none;
        color: var(--indigo);
        font-weight: 500;
    }
</style>

