<script>
	// @ts-nocheck
		import Icon from "@iconify/svelte";
	import { blur, fade, fly, slide, scale } from "svelte/transition";
		import { getModalStore } from "@skeletonlabs/skeleton";
	const modalStore = getModalStore();

	import Events from "$lib/components/modals/events.svelte";


	export let events 
	// @ts-nocheck

	function getCalendar(month, year) {
		const current = new Date(year, month, 1);
		const lastDay = new Date(current - 1);
		return {
			next: month === 12 ? [1, year + 1] : [month + 1, year],
			prev: month === 1 ? [12, year - 1] : [month - 1, year],
			ndays: lastDay.getDate(),
			dow: current.getDay(),
			month: month,
			year: year,
		};
	}

	const getEvents = (day, month, year) => events[[day, month+1, year].join("/")] || [];

	const currentDate = new Date();
	let month, year, dow, ndays;
	month = currentDate.getMonth();
	year = currentDate.getFullYear();
	let calendar = getCalendar(month, year);
	$: ({ dow, ndays, month, year } = calendar);
	const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	let rtl = true;

	const viewDate = (day, month, year) => () => {
		modalStore.trigger({
			type: "component",
			component: {
				ref: Events,
				props: { events: getEvents(day, month, year), year: year, month: month, day: day },
			},
		});
	};
	const coloring = {
		"bg-primary-500/10": (day, month, year) => getEvents(day, month, year).length !== 0,
		"bg-secondary-500/10": (day, month, year) => year === currentDate.getFullYear() && month === currentDate.getMonth() && day === currentDate.getDate(),
	};
	const getColor = (day, month, year) => {
		let item = Object.entries(coloring).find(([_, check]) => check(day, month, year));
		return item ? item[0] : "bg-black/10";
	};
	const next = () => {
		calendar = getCalendar(...calendar.next);
		rtl = true;
	};
	const prev = () => {
		calendar = getCalendar(...calendar.prev);
		rtl = false;
	};
	function keyboardHandler(e) {
		if (e.keyCode === 39) {
			return next();
		} else if (e.keyCode === 37) {
			return prev();
		}
	}

</script>

<svelte:window on:keydown|preventDefault={keyboardHandler} />
<div class="flex flex-col overflow-clip">
	<!-- Header -->
	<div class="flex flex-row justify-between">
		<button on:click={prev}>
			<Icon class="w-8 h-8 text-gray-300" icon="material-symbols:chevron-left" />
		</button>
		<p class="text-sm text-gray-300">
			{new Date(year, month).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
		</p>
		<button on:click={next}>
			<Icon class="w-8 h-8 text-gray-300" icon="material-symbols:chevron-right" />
		</button>
	</div>
	<div class="flex flex-col gap-3 place-items-center">
		<div class="w-full justify-between text-center place-content-center place-items-center grid grid-cols-7 gap-3">
			{#each week as dow}
				<p>{dow}</p>
			{/each}
		</div>
		<!-- Calendar Body -->
		{#key calendar}
			<div class="grid grid-cols-7 gap-3 w-full h-full" in:fly={{ x: `${rtl ? "-" : ""}100%` }}>
				<!-- Start Margin -->

				{#each Array(dow) as _}
					<p class="text-transparent h-9 w-9" />
				{/each}
				{#each Array.from({length: ndays}, (_, i) => i + 1) as day}
					<button class="relative rounded aspect-square lg:aspect-video w-full max-w-40 grid place-content-center hover:bg-[rgba(0,0,0,0.3)] cursor-cell  lg:bg-black/10 {getColor(day, month, year)}" on:click={viewDate(day, month, year)}>
						<span class="lg:absolute top-1 left-1 aspect-square  rounded-full p-1 h-9 bg-transparent lg:{getColor(day, month, year)}">{day}</span>
						<ul class="w-full gap-1  mt-5 hidden lg:grid overflow-y-auto h-[80%]">
								{#each getEvents(day, month, year) as event}
									<li class="w-[90%] place-self-center h-8 bg-amber-300/30 rounded text-center truncate px-2 grid place-content-center">{event}</li>
								{/each}
						</ul>
					</button>
				{/each}
				<!-- End Margin -->
				{#each Array(42 - (dow + ndays)) as _}
					<p class=" w-full aspect-square lg:aspect-video" />
				{/each}
			</div>
		{/key}
	</div>
</div>
