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
	
	const wrapColumnValues = (data, wrapFuncs) => {
		return data.map((row) => {
			for (let [column, wrap] of Object.entries(wrapFuncs)) {
				row[column] = !row[column].toString().includes("<") ? (typeof wrap === "string") ? `<span class="${wrap}">${row[column]}</span>` : wrap(row[column], row) : row[column]
			}
			return row
		})
	}
	const colorGrade = (value, {total}) => {
		const successGrade = total*0.6
		const color =  value>successGrade?140*(value-successGrade)/(total-successGrade):0
		return `<span style="color:hsla(${color},70%,40%,1)">${value}</span>`
	}
	const statusWrap = (value) => {
		const colorName = value=="Passed"?"success":"error"
		return `<span class="bg-${colorName}-500/30 text-${colorName}-300 p-1 rounded">${value}</span>` 
	}
	const sourceData = wrapColumnValues(studentData.courses, {
		status: statusWrap,
		mark: colorGrade
		
	})
	let header = [...Object.keys(sourceData[0])];
	const tableSimple = {
		head: header,
		body: tableMapperValues(sourceData, header),
		meta: tableMapperValues(sourceData, header),

	};
	

	const nCourses = [...Object.keys(boxData)].length;
	const variance = 8;
	const [labels, values] = createHistogramBins(histData, 25);
</script>

{#key color}
	
<div class="flex flex-col gap-5">

	<div class="flex flex-col gap-5 w-full ">
			<Card title="Students Curve">
				<Chart
				showLegend = true
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
								label: "grade", 

							},
							{
								// annotaion line
								type: "bar",
								backgroundColor: color.hsla(0.6,0),
								borderRadius: 10,
								data: Array(values.length).fill(0).map((_, i) => i==18? 100 : 0),
								fill: true,
								barThickness: 10,
								label: "you are here", 
								
							}
						],
					}}
				/>
			</Card>

			<Card title="Course Grade Distribution">
				<Chart
					maxHeight = "400px"
					direction="y"
					data={{
						labels: Object.keys(boxData),
						datasets: [
							{
								axis: 'y',
								type: "boxplot",
								backgroundColor: color.colorGradient(variance, nCourses, 0.2),
								borderColor: color.colorGradient(variance, nCourses, 1),
								data: Object.values(boxData),
								label: "",
							},
						],
					}}
				/>
			</Card>

	</div>

	<Card title="Grades">
		<Table source={tableSimple} interactive={true} />
	</Card>
</div>
{/key}



