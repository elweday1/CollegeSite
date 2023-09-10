<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
	import { myCustomTheme } from "../../../../../theme.js";
	// @ts-nocheck
	import { fly as transition } from "svelte/transition";
	import { page } from "$app/stores";
	import Icon from "@iconify/svelte";
	import { enableCache } from "@iconify/svelte";
	enableCache("local");

	const facts = [
		{
			label: "Celesius",
			value: "60",
			icon: "tabler:sun",
		},
		{
			label: "Registered Felons",
			value: "50+",
			icon: "game-icons:desert-eagle",
		},
		{
			label: "Students",
			value: "2,000",
			icon: "ph:student-light",
		},
		{
			label: "Departments",
			value: "5",
			icon: "mingcute:department-line",
		},
		{
			label: "Campuses",
			value: "2",
			icon: "ep:school",
		},
		{
			label: "Ranking",
			value: "17",
			icon: "icon-park-outline:ranking",
		},
	];
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<article class="h-full w-full col-span-2">
			<div class="p-10">
				<h1 class="sm:text-3xl text-2xl font-bold title-font text-white text-center p-3">Egypt's one of the most prestigious faculties.</h1>
				<p class="text-center">Helwan University's Faculty of Engineering offers diverse programs like Civil, Mechanical, and Electrical Engineering. Admission details are on the website. They provide research, scholarships, and career assistance. Facilities include labs. Program durations vary.</p>
			</div>
			<div class="grid place-content-stretch grid-cols-3 gap-10 text-center w-full">
				{#each facts as { icon, value, label }, index}
					<div class="p-4 w-full" in:transition={{ duration: 800, delay: index * 100, x: "-100%" }}>
						<div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
							<Icon class="text-primary w-12 h-12 mb-3 inline-block" {icon} />
							<h2 class="title-font font-medium text-3xl text-white">{value}</h2>
							<p class="leading-relaxed">{label}</p>
						</div>
					</div>
				{/each}
			</div>
		</article>
	</div>
</div>

<style lang="postcss">
</style>
