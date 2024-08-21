<script>
	import Icon from "@iconify/svelte";
	/**
	 * @type {any}
	 */
	export let data;
	import timeFormat from "$lib/utils/timeFormat";
	const options = { year: "numeric", month: "two-digit", day: "two-digit" };
</script>

<ol class="w-full flex">
	{#each data as news}
		<li class="border-t-2 border-primary-600">
			<div class="bg-primary-600 w-6 h-6 items-center justify-center rounded-full -mt-4 grid ml-[50%]">
				<svg aria-hidden="true" focusable="false" data-prefix="fas" class="text-white w-3 h-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
					<path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z" />
				</svg>
			</div>
			<div class="relative block p-4 rounded-lg shadow-lg bg-surface-700 w-[250px] min-w-[250px] mt-5 ml-5 mb-5">
				<div class="flex justify-between">
					<a href="#!" class="font-medium text-primary-600 hover:text-primary-500 focus:text-primary-600 duration-300 transition ease-in-out text-sm">{news.content} {news.action}</a>
				</div>
				<div class="flex gap-5">
					<p class="text-gray-100 mb-4">
						{news.issuer}
						{news.action} a {news.content}
						{news.course}
						{news.type}
						{#if news.content == "Grade"}
							<code class=" code">
								<span>{news.mark}/{news.total}</span>
							</code>
						{:else if news.content == "Assessment"}
							Due to {timeFormat(news.deadline)}
						{/if}
					</p>
				</div>
				<a href="#!" class="font-medium text-primary-500 hover:text-primary-600 focus:text-primary-700 duration-300 transition ease-in-out text-xs absolute right-2 bottom-2">{timeFormat(news.when)} </a>
				<a class="absolute right-1 top-1" href="#!">
					<Icon icon="material-symbols:link" class="w-7 h-7" />
				</a>
			</div>
		</li>
	{/each}
</ol>
