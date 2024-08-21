<script>
	// @ts-nocheck
	export let data;
</script>

<table class=" text-sm font-light overflow-auto w-full">
	<thead class=" font-medium dark:border-neutral-500">
		<tr>
			{#each data.columns as column}
				<th scope="col">{column}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each data.rows as row}
			<tr class="border-b dark:border-neutral-500 hover:bg-[rgb(255,255,255,0.05)]">
				{#each row as cell, colIndex}
					{#if colIndex === 2}
						<th class=" whitespace-nowrap px-4 py-3">
							<span class="bg-primary rounded p-1">
								{cell}
							</span>
						</th>
					{:else}
						<td class="whitespace-nowrap px-4 py-3">{cell}</td>
					{/if}
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
</style>
