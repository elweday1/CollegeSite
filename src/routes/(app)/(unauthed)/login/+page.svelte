<script>
	// @ts-nocheck
	import Icon from "@iconify/svelte";
	import { TabGroup, Tab, TabAnchor } from "@skeletonlabs/skeleton";
	import { goto } from "$app/navigation";

	let options = {
		student: { placeholder: "StudentID", icon: "ph:student" },
		staff: { placeholder: "StaffID", icon: "fa-solid:university" },
		gardian: { placeholder: "Parent Email", icon: "vaadin:family" },
	};
	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	let iplaceholder = "StudentID";
	let selected = "";
	let tabSet = 0;
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	$: {
		selected = [...Object.entries(options)][tabSet];
	}
	let userid;
	async function login() {
		const res = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userid: userid,
			}),
		});
		const data = await res.json();
		if (res.ok) {
			dispatch("success");
		} else {
			dispatch("error");
		}
		console.log(data);
	}
</script>

<form method="post" action="/api/auth/login"  class="bg-[rgb(0,0,0,0.2)] grid w-[30rem] h-[30rem] rounded-xl place-content-center place-self-center gap-5 relative overflow-clip" on:success={() => goto("/")}>
	<h1 class="text-gray-400 font-bold text-center text-2xl">{selected[0]} Login</h1>
	<TabGroup class="w-full grid place-items-center">
		{#each Object.entries(options) as [name, { placeholder, icon }], index}
			<Tab bind:group={tabSet} {name} value={index}>
				<svelte:fragment slot="lead"><Icon {icon} class="  w-5 h-5" /></svelte:fragment>
			</Tab>
		{/each}
	</TabGroup>
	<!-- mdi-key -->
	<input type="hidden" name="auth-type" value={selected} />
	<span class="relative grid place-items-center place-content-center p-0 h-12 w-full">
		<input required name="userid" type="text" bind:value={userid} placeholder={selected[1].placeholder} class="input input-bordered input-primary w-full h-full text-start indent-6" />
		<Icon icon="mdi-user" class="absolute left-3 top-4 text-gray-300 " />
	</span>
	<button type="submit" on:click={login} class="btn variant-filled-primary uppercase font-sans font-bold hover:text-red-600">Login</button>
</form>

<style lang="postcss">
</style>
