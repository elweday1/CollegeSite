<script>
	import Card from "$lib/components/Card.svelte";
	import Timetable from "$lib/components/Timetable.svelte";
	import { getModalStore } from "@skeletonlabs/skeleton";
	import News from "$lib/components/News.svelte";
	import Calendar from "$lib/components/Calendar.svelte";

	import { Table, tableMapperValues } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";
	export let data;
	let { notificationsData, sessionData } = data;
	let events = {
		"1/8/2023": ["Christmas Day"],
		"26/1/2023": ["January 25th Revolution and Police Day"],
		"17/4/2023": ["Sham El-Nessim"],
		"20/4/2023": ["Eid al-Fitr"],
		"21/4/2023": ["Eid al-Fitr"],
		"22/4/2023": ["Eid al-Fitr"],
		"23/4/2023": ["Eid al-Fitr"],
		"24/4/2023": ["Eid al-Fitr"],
		"25/4/2023": ["Sinai Liberation Day"],
		"4/5/2023": ["Labor Day"],
		"27/6/2023": ["Eid al-Adha"],
		"28/6/2023": ["Eid al-Adha"],
		"29/6/2023": ["Eid al-Adha"],
		"30/6/2023": ["Eid al-Adha"],
		"1/7/2023": ["Eid al-Adha"],
		"2/7/2023": ["Eid al-Adha"],
		"3/7/2023": ["Eid al-Adha"],
		"20/7/2023": ["Islamic New Year"],
		"23/7/2023": ["July 23rd Revolution Day"],
		"27/9/2023": ["Prophet Muhammad's Birthday"],
		"25/10/2023": ["Armed Forces Day"],
	};
	notificationsData
		.filter((item) => item.deadline)
		.forEach((item) => {
			const deadline = new Date(item.deadline);
			const date = [deadline.getDate(), deadline.getMonth(), deadline.getFullYear()].join("/");
			const title = item.course + " " + item.type;
			events[date] ??= [];
			events[date].push(title);
		});

	const modalStore = getModalStore();
	const showTT = () => {
		modalStore.trigger({
			type: "component",
			component: {
				ref: Timetable,
			},
		});
	};
</script>

<div class="flex flex-col gap-5">
	<Card title="News" class="">
		<article class="overflow-y-auto w-full p-4 gap-3">
			<News data={notificationsData} />
		</article>
	</Card>
	<Card title="Lecture Timetable" class="overflow-auto">
		<button on:click={showTT}>
			<Timetable  {sessionData}/>
		</button>
	</Card>
	<Card title="Calendar" class="w-full h-full">
		<Calendar {events} />
	</Card>
</div>
