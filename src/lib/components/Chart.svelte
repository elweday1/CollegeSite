<script>
	// @ts-nocheck
	import { Chart, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController, Filler } from "chart.js";

	import { BoxPlotController, BoxAndWiskers } from "@sgratzl/chartjs-chart-boxplot";
	import { onMount } from "svelte";
	export let type;
	export let data;
	export let direction = "x";
	export let maxHeight = "200px"
	export let showLegend = false
	Chart.register(BoxPlotController, BoxAndWiskers, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, Filler, LineController, BarController);
	let ctx;
	const config = {
		type: type,
		data: data,
		
		options: {
			indexAxis: direction,
			animation: {
				duration: 500,
				delay: 300,
				easing: "ease-in-out",
			},
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				x: {
					grid: {
						color: "rgba(255,255,255,0.05)",
					},
					ticks: {
						color: "rgba(255,255,255,0.5)",
					},
				},
				y: {
					grid: {
						color: "rgba(255,255,255,0.05)",
					},
					ticks: {
						color: "rgba(255,255,255,0.5)",
					},
				},
			},
			title: {
				display: false,
			},
			plugins: {
				legend: {
					display: showLegend,
				},
				tooltip: {
					intersect: false,
				},
			},
		},
	};

	onMount(() => {
		new Chart(ctx, config).clear();
	});
</script>

<canvas class=" h-full w-full max-h-[{maxHeight}]" bind:this={ctx} style:max-height={maxHeight} />
