<script>
	// @ts-nocheck
	export let title = "";
	let className = "";
	export { className as class };
</script>

<div class={` h-fit w-full  bg-[rgb(255,255,255,0.03)] p-3 rounded-xl place-items-stretch gap-1 text-center place-content-stretch grid ${className}`}>
	{#if title !== ""}
		<p class=" font-mono text-xl text-neutral-200">{title}</p>
	{/if}
	<slot />
</div>
