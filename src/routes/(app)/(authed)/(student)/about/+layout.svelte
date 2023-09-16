<script>
	import { TabGroup, Tab, TabAnchor } from "@skeletonlabs/skeleton";
	import { page } from "$app/stores";
	import { fly } from "svelte/transition";
	import Icon from "@iconify/svelte";
	let departments = [
		{
			name: "Computer",
			icon: "mdi:computer",
			href: "/about/computer",
		},
		{
			name: "Communications",
			icon: "fluent:communication-16-filled",
			href: "/about/communications",
		},
		{
			name: "Power",
			icon: "mdi:electricity",
			href: "/about/power",
		}
	]
</script>

<TabGroup justify="justify-center" active="variant-filled-primary" hover="hover:variant-soft-primary" flex="flex-1 lg:flex-none"  border="" class="bg-surface-100-800-token w-full rounded-lg">
	{#each departments as { name, icon, href }}
		
	<TabAnchor {href} selected={$page.url.pathname === href}>
		<svelte:fragment slot="lead">
			<div class="grid place-items-center place-content-center">
				<Icon icon={icon} class="w-6 h-6"/>
				<span>{name}</span>
			</div>
		</svelte:fragment>
	</TabAnchor>
	{/each}
</TabGroup>

{#key $page.url.pathname.split("/")[2]}
	<section class="p-5" in:fly={{ x: "-100%", duration: 400 }}>
		<slot />
	</section>
{/key}
