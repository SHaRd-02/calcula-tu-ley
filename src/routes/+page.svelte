<script>
	const calculators = [
		{ id: 'sueldo', title: 'Sueldo Bruto a Neto', desc: 'Calcula ISR, IMSS y subsidio.', img: "https://espaciohr.com/wp-content/uploads/2023/07/diferencia-entre-sueldo-y-salario-2.jpg" },
		{ id: 'aguinaldo', title: 'Aguinaldo', desc: 'Mínimo 15 días proporcionales.', img: "https://revistafortuna.com.mx/wp-content/uploads/2023/12/VHCGHGSFSBDEBFKT5ZD2HRVN7I.jpg" },
		{ id: 'finiquito', title: 'Finiquito', desc: 'Estimación por renuncia o despido.', img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2OO3edgh26dS5O-kaM2xUnt70yhm-DpOpTw&s" },
		{ id: 'minimo', title: 'Salario Mínimo', desc: 'Verifica si te pagan lo legal.', img: "https://cambiodemichoacan.com.mx/wp-content/uploads/2021/12/salario1.jpg" }
	];
</script>

<main class="gradient-surface">
	<h1 class="gradient-text gradient-sunset">Calculadoras Laborales México</h1>

	<section class="layout-card layout-readable center">
		
		{#each calculators as calc}
			<a class="card linked" href="/{calc.id}">
				<figure>
					<img src={calc?.img} alt="Image">
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
</main>

<style>

	main{
		padding: var(--pad-xl);
	}

	figure{
		height: 50%;
	}

	img{
		max-height: 100%;
		width: 100%;
	}

	section{
		margin: var(--vs-xl) auto;
	}

</style>
