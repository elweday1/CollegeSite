<script>
	export let events = ["No events"];
	export let year = 2022;
	export let month = 1;
	export let day = 1;
	const title = "Events on " + new Date(year, month, day).toLocaleDateString("en-US", { day: "2-digit", year: "numeric", month: "long" });
</script>

<div class="card h-80 w-80">
	<h3 class="card-title h4 p-2 text-center">{title}</h3>
	<div class="card-body p-3">
		{#if events.length !==0}
			{#each events as event}
				<p>
					{event}
				</p>
			{/each}
		{:else}
			<p>No Events</p>
		{/if}
	</div>
</div>
