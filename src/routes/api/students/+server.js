// @ts-nocheck
import { json, error } from "@sveltejs/kit";
import db from "$lib/prisma";

export async function GET() {
	const students = await db.student.findMany({
		select: {
			id: true,
			enrollments: {
				select: {
					instance: {
						select: {
							course: {
								select: {
									total: true,
								},
							},
						},
					},
					grades: {
						select: {
							mark: true,
						},
					},
				},
			},
		},
	});
	if (!students) {
		throw error(404, "Not found");
	}
	const sumGrades = (acc, curr) => acc + curr.grades[0].mark;
	const sumTotals = (acc, curr) => acc + curr.instance.course.total;
	return json(students.map((s) => Number((100 * s.enrollments.reduce(sumGrades, 0)) / s.enrollments.reduce(sumTotals, 0)).toFixed(2)).filter((value) => Number(value) > 20));
}
