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

<main class="w-screen h-screen grid  p-6 max-w-3xl ">

	<form method="post" action="/api/auth/login"  class="bg-[rgb(0,0,0,0.2)] grid p-3 rounded-xl place-content-center justify-center   gap-5 relative overflow-clip" on:success={() => goto("/")}>
		<h1 class="text-gray-400 font-bold text-center text-2xl">{capitalizeFirstLetter(selected[0])} Login</h1>
<!-- 	<TabGroup class="w-full grid place-items-center ">
		{#each Object.entries(options) as [name, { placeholder, icon }], index}
			<Tab bind:group={tabSet} {name} value={index}>
				<svelte:fragment slot="lead"><Icon {icon} class="  w-5 h-5" /></svelte:fragment>
			</Tab>
			{/each}
	</TabGroup>
 -->	<input type="hidden" name="auth-type" value={selected} />
	<span class="relative grid p-0 h-12 w-full place-content-stretch align-middle">
		<input required name="userid" type="text" bind:value={userid} placeholder={selected[1].placeholder} class="input input-bordered input-primary w-full h-full text-start indent-6" />
		<Icon icon="mdi-user" class="absolute aspect-square h-12 left-3 text-gray-300   " />
	</span>
	<button type="submit" on:click={login} class="btn variant-filled-primary uppercase font-sans font-bold hover:text-red-600">Login</button>
	<ul class="marker:text-warning-400  list-disc list-inside text-warning-400 text-xs font-extralight">
		<li>This is a beta version, most features are still under development. </li>
		<li>The current design is a blueprint and may change.</li>
		<li>Please report any bugs in the <a class="text-primary-500 underline" href="https://github.com/Elweday/CollegeSite">github</a> page. </li>
	</ul>
</form>
</main>

<style lang="postcss">

</style>
