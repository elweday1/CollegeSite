<script>
	import { fade as transition } from "svelte/transition";
	import { page } from "$app/stores";
	import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";

	const faqs = [
		{
			question: "What engineering programs are offered at Helwan University's Faculty of Engineering?",
			answer: "The Faculty of Engineering at Helwan University offers various engineering programs such as Civil Engineering, Mechanical Engineering, Electrical Engineering, Architectural Engineering, and more.",
		},
		{
			question: "How can I apply for admission to the Faculty of Engineering?",
			answer: "To apply for admission, you need to visit the official website of Helwan University and follow the application process outlined for the Faculty of Engineering. It usually involves submitting an application form and fulfilling specific requirements.",
		},
		{
			question: "What are the admission requirements for the engineering programs?",
			answer: "Admission requirements may vary based on the specific engineering program you are applying to. Generally, you will need to have a high school diploma or its equivalent, meet certain minimum grades, and possibly pass an entrance examination.",
		},
		{
			question: "How can I contact the Faculty of Engineering's administration or faculty members?",
			answer: "You can find contact information for the Faculty of Engineering on the official Helwan University website. They usually provide email addresses and phone numbers to reach out to the administration and faculty members.",
		},
		{
			question: "What research opportunities are available for engineering students at Helwan University?",
			answer: "The Faculty of Engineering at Helwan University often provides research opportunities for its students in various fields of engineering. You can inquire with your professors or visit the university's research center to explore available options.",
		},
		{
			question: "Are there any scholarships or financial aid available for engineering students?",
			answer: "Yes, Helwan University offers scholarships and financial aid programs for eligible engineering students. These scholarships may be based on academic performance or financial need.",
		},
		{
			question: "How is the faculty's internship and job placement support for engineering graduates?",
			answer: "The Faculty of Engineering often has a dedicated career services office that helps students with internship placements and job opportunities after graduation. They may organize job fairs and provide career counseling.",
		},
		{
			question: "What facilities and resources does the Faculty of Engineering offer to students?",
			answer: "The Faculty of Engineering typically provides state-of-the-art laboratories, well-equipped workshops, libraries, computer centers, and access to online resources to support students in their studies and research.",
		},
		{
			question: "Can engineering students participate in extracurricular activities and clubs?",
			answer: "Yes, engineering students at Helwan University are encouraged to participate in various extracurricular activities and join student clubs related to their interests. These activities can enhance their overall university experience.",
		},
		{
			question: "What is the duration of engineering programs at Helwan University?",
			answer: "The duration of engineering programs varies depending on the specific program and the level of study. Undergraduate programs usually last for four to five years, while master's programs take two years and doctoral programs take three to four years.",
		},
	];
</script>

<section class="flex flex-col w-full place-items-center">
	<h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Frequently Asked Questions</h1>
	<div class="flex flex-col gap-3 w-full">
		<Accordion autocollapse={true} spacing={"space-y-4"}>
			{#each faqs as { question, answer }, index}
				<AccordionItem class="bg-[rgb(255,255,255,0.03)] rounded">
					<svelte:fragment slot="summary">
						<p class="font-bold">{question}</p>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<p class="text-gray-200">{answer}</p>
					</svelte:fragment>
				</AccordionItem>
			{/each}
		</Accordion>
	</div>
</section>
