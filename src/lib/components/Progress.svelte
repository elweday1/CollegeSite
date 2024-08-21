<script>
	// @ts-nocheck
	export let value = 0;
	export let outof = 100;
	export let title = "";
	import { popup } from "@skeletonlabs/skeleton";
</script>

<div class="h-10" use:popup={{ event: "click", target: "hover-item-progress" + title, placement: "top" }}>
	<div class="rounded p-4 bg-primary-400/30" data-popup={"hover-item-progress" + title}>
		<p>{`${value + " of " + outof}`}</p>
		<div class="arrow variant-filled-primary" />
	</div>
	<div class="w-full flex place-items-center gap-3 p-1">
		<span class="text-primary text-md">{title}</span>
		<div class="w-full bg-neutral-200 dark:bg-neutral-600 rounded h-2">
			<div class=" h-2 bg-primary-500 rounded fill" style={`width: ${(100 * value) / outof}%`} />
		</div>
	</div>
</div>

<style>
	.fill {
		animation: fill 1s forwards ease-in-out;
		animation-delay: 0.3s;
	}
	@keyframes fill {
		from {
			width: 0%;
		}
	}
</style>
