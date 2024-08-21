<script>
	// @ts-nocheck
	import { AppShell, AppBar } from "@skeletonlabs/skeleton";
	import { page } from "$app/stores";
	import Navigation from "$lib/components/Side.svelte";
	import { fly as transition, fade } from "svelte/transition";
	import { initializeStores, Drawer, getDrawerStore, Modal, getModalStore } from "@skeletonlabs/skeleton";
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";
	import { storePopup } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";
	import {eventStore} from "$lib/stores"; 
	export let data

	onMount(() => {
		const evtSource = new EventSource("api/sse");
	  	evtSource.onmessage = (e) => {
			$eventStore = [...$eventStore, e.data];
	  	}
	})

	initializeStores();
	const drawerStore = getDrawerStore();

	function drawerOpen() {
		drawerStore.open({});
	}


	
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });


</script>

<!-- App Shell -->
<Modal />
<Drawer class="lg:hidden" width="w-fit" transitionOut={fade} transitionOutParams={{ duration: 2000 }}>
	<Navigation />
</Drawer>
<AppShell slotSidebarLeft="w-0 lg:w-48">
	<!-- Drawer -->

	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar transitionOut={fade} transition={true} transitionOutParams={{ duration: 2000 }}>
			<svelte:fragment slot="lead">
				<button on:click={drawerOpen} class="text-xl uppercase lg:hidden cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</button>


			</svelte:fragment>
			<svelte:fragment slot="trail">
				<img src="Logo.svg" alt="omak" />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	{#key $page.url.pathname.split("/")[1]}
		<main class="p-5 h-full w-full" in:transition={{ x: "-100%", duration: 400 }}>
			{#await data}
				<p>...waiting</p>
			{:then data} 
				<slot data />
			{:catch error}
    			<p style="color: red">{error.message}</p>
			{/await}
		</main>
	{/key}
</AppShell>
