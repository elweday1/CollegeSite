<script>
	//@ts-nocheck
	let time = new Date(0, 0, 0, 8, 0, 0);
	Date.prototype.addMinutes = function (m) {
		let time = new Date();
		time.setTime(this.getTime() + m * 60 * 1000);
		return time;
	};
	let selector = {
		shown: true,
		idx: 0,
	};
	let subjects = ["math", "physics", "chemistry", "electronics", "fuckery"];
	const shuffle = () => {
		selector.shown = Math.random() < 0.3;
		selector.idx = Math.floor(Math.random() * subjects.length);
		return true;
	};
</script>

<div class="grid grid-cols-8 gap-2">
	<div>Day/Time</div>
	{#each [0, 1, 2, 3, 4, 5, 6] as period}
		<div class="text-center p-1">
			{time
				.addMinutes(90 * period)
				.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
				.replace("AM", "")
				.replace("PM", "")}
		</div>
	{/each}
	{#each ["SAT", "SUN", "MON", "TUE", "WEN", "THU"] as day}
		<div class="text-center p-1">
			{day}
		</div>
		{#each [0, 1, 2, 3, 4, 5, 6] as period}
			<div style={`background-color:hsla(${selector.idx * 30}, 50%, 50%, 0.3)`} class="text-center p-1 rounded">
				{#if selector.shown}
					{subjects[selector.idx]}
				{/if}
			</div>
		{/each}
	{/each}
</div>
