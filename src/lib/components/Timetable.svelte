<script>
	//@ts-nocheck
	import Icon from "@iconify/svelte";
	import Fullscreen from "svelte-fullscreen";

	export let sessionLength = 90;
	export let startHour = 9;
	export let sessionData 

	let isFullScreen = false
	let time = new Date(0, 0, 0, startHour, 0, 0);
	Date.prototype.addMinutes = function (m) {
		let time = new Date();
		time.setTime(this.getTime() + m * 60 * 1000);
		return time;
	};
	let icon = {Lecture:"mdi:lecture", Section:"ph:chalkboard-teacher-fill", Lab:"icomoon-free:lab"};
	let item
</script>


<Fullscreen  let:onExit let:onToggle >
	<button on:click={() => {onToggle(); isFullScreen = !isFullScreen} }  on:keydown|preventDefault={(e) => {(e.key === "Escape")? onExit():null; isFullScreen = false}} >
		<div class:isFullScreen class=" grid grid-cols-7 gap-1 md:gap-2 lg:gap-5  w-full ">
			<div />
			{#each [0, 1, 2, 3, 4, 5] as period}
			<div class="text-center p-1 ">
				{ 
				time
				.addMinutes(sessionLength * period)
				.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
				.replace("AM", "")
				.replace("PM", "")
			}
		</div>
		{/each}
		{#each ["SAT", "SUN", "MON", "TUE", "WEN", "THU"] as day, dow}
		<div class="text-center p-1 w-full">
			{day}
		</div>
		{#each [1, 2, 3, 4, 5, 6] as period}
			{@const item = sessionData.find((lecture) => lecture.dow === dow+1 && lecture.period === period)}		
			<div style={item ? `background-color:hsla(${item.intance *30}, 50%, 60%, 0.3)` : "background-color: rgba(0,0,0,0.1)"} class="text-center p-2 rounded w-full">
				{#if item}
					<div class="flex flex-col">
						<span style={`color:hsla(${item.intance *30}, 100%, 90%, 1)`} class="truncate text-[hsla(5, 50%, 50%, 0.3)]">
							 {item.course} 
						</span>
						<span class:hidden={!isFullScreen} class="md:flex justify-between place-content-center place-items-center " >
							<span style="font-size: 10px;">
								{item.name}
							</span>
							<Icon icon={icon[item.type]} />
							</span>
					</div>
				{/if}
			</div>
			{/each}
			{/each}
			<div class="flex justify-center gap-6 mt-3 col-span-7">
				{#each Object.entries(icon) as [name, icon]}
				<span class="flex place-content-center place-items-center gap-1">
					<Icon {icon} />
					<span>{name}</span>
				</span>
				{/each}
			</div>
		</div>
	</button>
		
	</Fullscreen>
	
	
	<style lang="postcss">
		.isFullScreen {
			@apply fixed left-0 top-0 bg-surface-700 p-2 ;
			height: 100%;
			width: 100%;
			place-self: stretch;
			justify-self: stretch;		

		}
	</style>