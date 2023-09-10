<script>
	import { TabGroup, Tab, TabAnchor } from "@skeletonlabs/skeleton";
	import { page } from "$app/stores";
	import { fly } from "svelte/transition";
</script>

<TabGroup justify="justify-center" active="variant-filled-primary" hover="hover:variant-soft-primary" flex="flex-1 lg:flex-none" rounded="" border="" class="bg-surface-100-800-token w-full">
	<TabAnchor href="/departments/power" selected={$page.url.pathname === "/departments/power"}>
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>(label)</span>
	</TabAnchor>
	<TabAnchor href="/departments/computer" selected={$page.url.pathname === "/departments/computer"}>
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>(label)</span>
	</TabAnchor>
	<TabAnchor href="/departments/communications" selected={$page.url.pathname === "/departments/communications"}>
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>(label)</span>
	</TabAnchor>
	<!-- ... -->
</TabGroup>

{#key $page.url.pathname.split("/")[2]}
	<section class="p-5" in:fly={{ x: "-100%", duration: 400 }}>
		<slot />
	</section>
{/key}
