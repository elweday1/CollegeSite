<script>
	//@ts-nocheck
	import Icon from "@iconify/svelte";
	export let sessionLength = 90;
	export let startHour = 9;
	export let sessionData 
	let time = new Date(0, 0, 0, startHour, 0, 0);
	Date.prototype.addMinutes = function (m) {
		let time = new Date();
		time.setTime(this.getTime() + m * 60 * 1000);
		return time;
	};
	let icon = {Lecture:"mdi:lecture", Section:"ph:chalkboard-teacher-fill", Lab:"icomoon-free:lab"};
	let item
</script>

<div class="grid grid-cols-7 md:w-full w-[50rem] gap-1 md:gap-2 place-content-center">
	<div />
	{#each [0, 1, 2, 3, 4, 5] as period}
		<div class="text-center p-1">
			{time
				.addMinutes(sessionLength * period)
				.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
				.replace("AM", "")
				.replace("PM", "")}
		</div>
	{/each}
	{#each ["SAT", "SUN", "MON", "TUE", "WEN", "THU"] as day, dow}
		<div class="text-center p-1">
			{day}
		</div>
		{#each [1, 2, 3, 4, 5, 6] as period}
		<template class="hidden">
			{item = sessionData.find((lecture) => lecture.dow === dow+1 && lecture.period === period)}
		</template>
			<div style={item ? `background-color:hsla(${item.intance *30}, 50%, 50%, 0.3)` : "background-color: rgba(0,0,0,0.1)"} class="text-center p-1 rounded h-[14]">
				{#if item}
					<div class="flex flex-col">
						<span style={`color:hsla(${item.intance *30}, 80%, 90%, 1)`} class="text-[hsla(5, 50%, 50%, 0.3)]"> {item.course} </span>
						<span class="flex justify-between place-content-center place-items-center">
							<span>
								{item.name}
							</span>
							<Icon icon={icon[item.type]} />
						</span>
					</div>
				{/if}
			</div>
		{/each}
	{/each}
</div>
<div class="flex justify-center gap-6 mt-3">
	<span class="flex place-content-center place-items-center gap-1">
		<Icon icon="mdi:lecture" />
		<span>Lecture</span>
	</span>
	<span class="flex place-content-center place-items-center gap-1">
		<Icon icon="ph:chalkboard-teacher-fill" />
		<span>Tutorial</span>
	</span>
	<span class="flex place-content-center place-items-center gap-1">
		<Icon icon="icomoon-free:lab" />
		<span>Lab</span>
	</span>
</div>


