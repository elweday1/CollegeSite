import { json, error } from "@sveltejs/kit";
import db from "$lib/prisma";
import { randomDate } from "$lib/utils/date.js";

export async function GET(requestEvent) {
	const { params } = requestEvent;
	const { id } = params;
	const grades = await db.grade.findMany({
		where: { enrollment: { studentId: Number(id) } },
		include: {
			assesment: {
				include: {
					issuer: true,
					instance: { include: { course: true } },
				},
			},
		},
	});
	const assesments = await db.assesment.findMany({
		where: {
			instance: {
				enrollments: { some: { studentId: Number(id) } },
			},
		},
		include: {
			issuer: true,
			instance: { include: { course: true } },
			event: true,
		},
	});
	const a = assesments.map((assesment) => ({
		total: assesment.total,
		issuer: assesment.issuer.name,
		type: "Final",
		course: assesment.instance.course.name,
		action: "Added",
		content: "Assessment",
		when: assesment.event.start,
		deadline: assesment.event.end
	}));
	const g = grades.map((grade) => ({
		mark: grade.mark,
		total: grade.assesment.total,
		issuer: grade.assesment.issuer.name,
		type: "Final",
		course: grade.assesment.instance.course.name,
		action: grade.markedAt === grade.updatedAt ? "Added" : "Updated",
		content: "Grade",
		when: grade.updatedAt,
	}));

	return json([...a, ...g].sort((a, b) => b.when.getTime() - a.when.getTime()));
}
