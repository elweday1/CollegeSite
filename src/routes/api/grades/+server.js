import { json, error } from "@sveltejs/kit";
import randomValues from "$lib/utils/randomArray";
import db from "$lib/prisma";

const groupBy = function (xs, key) {
	return xs.reduce(function (rv, x) {
		(rv[x[key]] = rv[x[key]] || []).push(x.mark);
		return rv;
	}, {});
};

// @ts-nocheck
export async function GET() {
	const enrollments = await db.enrollment.findMany({
		select: {
			instance: {
				select: {
					course: {
						select: {
							total: true,
							name: true,
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
	});
	if (!enrollments) {
		throw error(404, "Not found");
	}
	const allGrades = enrollments.map((e) => ({ name: e.instance.course.name, mark: e.grades.reduce((a, b) => a + b.mark, 0) / e.instance.course.total }))
	return json(groupBy(allGrades, 'name'));
}
