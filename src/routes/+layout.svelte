<script>
	import "@drop-in/graffiti";
	import favicon from '$lib/assets/favicon.svg';
	let { children } = $props();
</script>

<svelte:head>
	<title>Calculadoras Financieras México</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="header border sticky split">
	<h6>🇲🇽 Finanzas MX</h6>
	<nav class="">
		<ul class="no-list">
			<li><a href="/">Inicio</a></li>
			<li><a href="sueldo">Sueldo</a></li>
			<li><a href="aguinaldo">Aguinaldo</a></li>
			<li><a href="finiquito">Finiquito</a></li>
			<li><a href="minimo">Mínimo</a></li>
		</ul>
	</nav>
</header>

<main class="container p-m">
	{@render children?.()}
</main>

<footer class="footer stack">
	<p>	Actualizado con datos de 2025. Los cálculos son estimaciones.</p>
	<p>© Derechos Reservados <b>🇲🇽 Finanzas MX</b></p>
</footer>


<style>
	footer{
		padding: var(--pad-xl);
		text-align: center;
	}
</style>

