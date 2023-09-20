<script>
	// @ts-nocheck
	import { Avatar } from "@skeletonlabs/skeleton";
</script>

<section class="card h-[40rem] w-80 flex p-5  flex-col">
	<div class="flex items-center justify-between">
		<span class="text-gray-400 text-sm">Staff Profile</span>
		<span class="text-primary-400">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
			</svg>
		</span>
	</div>
	<div class="mt-6 w-fit mx-auto">
		<Avatar src="/OIP.jpg" width="w-32" rounded="rounded-full" border="border-2" />
	</div>

	<h2 class="text-white font-bold text-lg tracking-wide text-center mt-2">Dr Folan Elfolany</h2>

	<p class="text-primary-400 font-semibold mt-2">Past Courses </p>
	<div class="flex flex-col gap-4 py-3">
		<span>Some Course</span> 
		<span>Some Course</span> 
		<span>Some Course</span> 
		<span>Some Course</span> 
		<span>Some Course</span> 
	</div>
</section>

<style>
</style>
