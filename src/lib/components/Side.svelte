<script>
	//@ts-nocheck
	import Icon from "@iconify/svelte";
	import Card from "$lib/components/Card.svelte";
	import { Avatar } from "@skeletonlabs/skeleton";
	import { page } from "$app/stores";
	import { afterUpdate } from "svelte";
	import { getDrawerStore } from "@skeletonlabs/skeleton";
	import Profile from "$lib/components/modals/Profile.svelte";
	import { getModalStore } from "@skeletonlabs/skeleton";
	
	const modalStore = getModalStore();
	const drawerStore = getDrawerStore();
	let route;

	afterUpdate(() => {
		route = $page.url.pathname;
		console.log(route);
	});

	const showProfile = () => {
		modalStore.trigger({
			type: "component",
			component: {
				ref: Profile,
			},
		});
	};
	const items = {
		Student: [
			{
				name: "Overview",
				href: "/",
				icon: "fluent:home-12-filled",
			},
			{
				name: "Actions",
				href: "/actions",
				icon: "file-icons:actionscript",
			},
			{
				name: "Performance",
				href: "/dashboard",
				icon: "ion:stats-chart",
			},

		],
		College: [
			{
				name: "About",
				href: "/about",
				icon: "mdi:about",
			},
			{
				name: "Faqs",
				href: "/faqs",
				icon: "pepicons-pop:question",
			},
		],
	};
</script>

<nav class="list-nav">
	<ul class="pt-5 gap-3 w-48 p-3 flex flex-col place-items-center h-full bg-neutral bg-surface-500/5 overflow-y-auto overflow-x-visible overscroll-y-none">
		<Card class="place-content-center grid justify-items-center ">
			<div class="relative grid place-items-center justify-center place-content-center p-2">
				<Avatar on:click={showProfile} src="/OIP.jpg" width="w-28" rounded="rounded-full" border="border-2" class="peer hover:blur-[2px] transition-all duration-200 ease-in-out" />
				<Icon icon="iconamoon:edit-bold" class="opacity-0 peer-hover:opacity-100 text-primary-500 flex rounded-full pointer-events-none transition-all duration-200 w-8 h-8  place-self-center justify-self-center absolute p-1 " />
			</div>
		</Card>
		{#each Object.entries(items) as [section, vals]}
			<p class="text-center w-full pt-3 pl-1 font-bold uppercase text-surface-200">--- {section} ---</p>
			{#each vals as { name, href, icon }}
				<a on:click={() => drawerStore.close()} {href} class="p-1 flex text-center place-items-center justify-center transition-all duration-300 ease-in-out rounded-lg overflow-visible w-full bg-[rgb(255,255,255,0.05)]" class:selected={href === route}>
					<div class="p-4 w-full h-full flex gap-2">
						<Icon class="w-6 h-6" {icon} />
						<span class="text-sm truncate">{name}</span>
					</div>
				</a>
			{/each}
		{/each}
	</ul>
</nav>

<style lang="postcss">
	.selected {
		@apply text-primary-400 bg-primary-500/30;
	}
</style>
