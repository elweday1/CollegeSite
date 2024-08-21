<script>
	import Icon from "@iconify/svelte";
	let actions = {
		account: [
			{ title: "Change Password", icon: "mdi:password" },
			{ title: "Request email change", icon: "ic:baseline-email" },
			{ title: "File a complaint", icon: "mingcute:paper-fill" },
			{ title: "Report a bug", icon: "ri:bug-fill" },
		],
		Courses: [
			{ title: "Drop a course", icon: "ph:file-x-fill" },
			{ title: "Semester Registration", icon: "quill:paper" },
		],
	};
</script>

<section class="flex flex-col w-full place-items-center">
	<h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Student Actions</h1>
	<hr class="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100 col-span-2" />
	<div class="grid grid-cols-2 gap-3 w-full">
		{#each Object.entries(actions) as [section, items]}
			<span class="col-span-2 text-center font-bold text-primary-500 uppercase">{section}</span>
			{#each items as { title, icon }}
				<div class="p-4 w-full">
					<div class="bg-primary-500/10 hover:bg-primary-500/20 px-4 py-6 rounded-lg">
						<Icon class="text-primary w-12 h-12 mb-3 inline-block" {icon} />
						<h5 class="title-font font-medium h5 text-white">{title}</h5>
					</div>
				</div>
			{/each}
		{/each}
	</div>
</section>
