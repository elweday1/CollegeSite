<script>
	// @ts-nocheck
	import Calendar from "$lib/components/Calendar.svelte";
	
	import createHistogramBins from "$lib/utils/histBins.js";
	import Card from "$lib/components/Card.svelte";
	import Chart from "$lib/components/Chart.svelte";
	import { Table, tableMapperValues } from "@skeletonlabs/skeleton";
	export let data;
	import {Color}  from "$lib/utils/colors.js";
    import {  afterUpdate } from "svelte";
	let color = new Color("15", "186", "129");
	afterUpdate(() => {
		color = new Color(...(localStorage.getItem("primaryColor").split(" ") ?? ["15", "186", "129"]) );
	})
	let { histData, boxData, studentData} = data;
	const sourceData = studentData.courses
	let header = [...Object.keys(sourceData[0])];
	const tableSimple = {
		head: header,
		body: tableMapperValues(sourceData, header),
		meta: tableMapperValues(sourceData, header),
	};

	const nCourses = [...Object.keys(boxData)].length;
	const variance = 10;
	const [labels, values] = createHistogramBins(histData, 25);
</script>

{#key color}
	
<div class="flex flex-col gap-5">
	<div class="flex flex-col gap-5 w-full">
		<div class="flex flex-col gap-5 w-full">
			<Card title="Students Curve">
				<Chart
				data={{
						labels: labels,
						datasets: [
							{
								type: "line",
								backgroundColor: color.rgba(0.2),
								borderColor: color.rgba(1),
								borderWidth: 2,
								data: values,
								fill: true,
								tension: 0.4,
							},
						],
					}}
				/>
			</Card>

			<Card title="Course Grade Distribution">
				<Chart
					data={{
						labels: Object.keys(boxData),
						datasets: [
							{
								type: "boxplot",
								backgroundColor: color.colorGradient(variance, nCourses, 0.2),
								borderColor: color.colorGradient(variance, nCourses, 1),
								data: Object.values(boxData),
							},
						],
					}}
				/>
			</Card>

			<div />
		</div>
	</div>

	<Card title="Table">
		<Table source={tableSimple} interactive={true} />
	</Card>
</div>
{/key}
