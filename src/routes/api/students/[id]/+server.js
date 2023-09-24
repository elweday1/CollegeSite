import { json, error } from "@sveltejs/kit";
import db from "$lib/prisma";

const gradingSys = {
	90: "A+",
	85: "A",
	80: "B+",
	75: "B",
	70: "C+",
	65: "C",
	60: "D+",
	55: "D",
	50: "F",
}
const getNearest5 = (num) => {
	return Math.round(num / 5) * 5;
}

export async function GET(requestEvent) {
	const { params } = requestEvent;
	const { id } = params;
	const student = await db.student.findFirst({
		where: { id: Number(id) },
		select: {
			id: true,
			name: true,
			enrollments: {
				select: {
					instance: {
						select: {
							course: {
								select: {
									id: true,
									name: true,
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
	if (!student) {
		throw error(404, "Student not found");
	}
	return json({
		student_code: student.id,
		name: student.name,
		courses: student.enrollments.map((enrollment) => ({
			code: enrollment.instance.course.id,
			course: enrollment.instance.course.name,
			mark: enrollment.grades.reduce((a, b) => a + b.mark, 0),
			total: enrollment.instance.course.total,
			status: (enrollment.grades.reduce((a, b) => a + b.mark, 0) / enrollment.instance.course.total)>0.5?"Passed":"Failed",
			grade: (()=>{
				const mark = enrollment.grades.reduce((a, b) => a + b.mark, 0)
				const total = enrollment.instance.course.total
				const nearest5 = getNearest5((100*mark / total).toFixed(0))
				return nearest5 in gradingSys?gradingSys[nearest5]:"F"
			})(),

		})),
	});
}
