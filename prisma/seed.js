// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import fs from "fs";
import csv from "csv-parser";
import { randomDate } from "../src/lib/utils/date.js";

const prisma = new PrismaClient();

const courses = {
	math1: 100,
	physics1: 100,
	statics: 75,
	history: 50,
	rights: 50,
	drawing1: 100,
	production: 125,
	math2: 100,
	physics2: 100,
	drawing2: 100,
	dynamics: 75,
	chemistry: 100,
	topics: 75,
};

async function addCourses(semester1, semester2, theProfessor) {
	let assignments = [];
	let instances = [];
	const courseKeys = Object.keys(courses);
	for (let i = 0; i < courseKeys.length; i++) {
		const sub = courseKeys[i];
		const total = courses[sub];
		const course = await prisma.course.create({
			data: {
				id: `MAT_${sub.toUpperCase()}`,
				name: sub,
				total: total,
			},
		});
		const semester = i <= 6 ? semester1 : semester2;
		const instance = await prisma.courseInstance.create({
			data: {
				id: 2021000 + i,
				courseId: course.id,
				semesterId: semester.id,
			},
		});
		await prisma.session.create({
			data: {
				instanceId: instance.id,
				period: Math.ceil(Math.random() * 5),
				dow: Math.ceil(Math.random() * 6),
				type: "Lecture",
			},
		});
		instances.push(instance);
		const day = randomDate("8/1/2023", "8/29/2023");
		const event = await prisma.event.create({
			data: {
				name: "Not Yet Determined",
				start: day,
				end: day,
				general: false,
			},
		});
		const ass = await prisma.assesment.create({
			data: {
				type: "Final",
				total: total,
				instanceId: instance.id,
				issuerId: theProfessor.id,
				eventId: event.id,
			},
		});
		assignments.push(ass);
	}
	return { assignments, instances };
}

async function main() {
	console.log(`Start seeding ...`);
	console.log(`Reading Data  ...`);
	// First I want to read the file
	const semester1 = await prisma.semester.create({
		data: {
			id: 20211,
			year: 2021,
			type: "Spring",
			running: false,
			start: new Date("2021-10-01"),
			end: new Date("2022-02-01"),
		},
	});
	const semester2 = await prisma.semester.create({
		data: {
			id: 20212,
			year: 2021,
			type: "Fall",
			running: false,
			start: new Date("2022-03-01"),
			end: new Date("2022-06-01"),
		},
	});

	const theProfessor = await prisma.staff.create({
		data: {
			id: 1234,
			name: "Professor",
			department: "Fresh",
		},
	});

	
	console.log(`Initializing all Courses.`);
	const { assignments, instances } = await addCourses(semester1, semester2, theProfessor);
	fs.createReadStream("./prisma/natiga.csv")
		.pipe(csv())
		.on("data", async (data) => {
			const student = await prisma.student.create({
				data: {
					id: Number(data.seat),
					name: data.name,
				},
			});
			Object.keys(courses).forEach(async (sub, index) => {
				const grade = data[sub];
				const ass = assignments[index];
				const instance = instances[index];
				const enrollment = await prisma.enrollment.create({
					data: {
						studentId: student.id,
						instanceId: instance.id,
					},
				});

				await prisma.grade.create({
					data: {
						enrollmentId: enrollment.id,
						assesmentId: ass.id,
						mark: Number(grade),
					},
				});
			});
		})
		.on("end", () => {
			console.log(`Done reading.`);
		});
	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

// pnpm prisma migrate dev --name init

/* 
	const subs = {
		// ... your subject mappings
	};


	async function main() {
		// First Semester
		const semester1 = await prisma.semester.create({
			data: {
				id: "20211",
				year: 2021,
				type: "Spring",
				running: false,
				start: new Date("2021-10-01"),
				end: new Date("2022-02-01"),
			},
		});

		// Second Semester
		const semester2 = await prisma.semester.create({
			data: {
				id: "20212",
				year: 2021,
				type: "Fall",
				running: false,
				start: new Date("2022-03-01"),
				end: new Date("2022-06-01"),
			},
		});

		// Initializing a single professor
		const theProfessor = await prisma.staff.create({
			data: {
				id: "1234",
				name: "Professor",
				department: "Fresh",
			},
		});

		// Creating Courses, CourseInstances, Assesments
		for (const [sub, total] of Object.entries(subs)) {
			const course_id = `MAT_${sub.toUpperCase()}`;
			const credits = ncredits[total];
			const course = await prisma.course.create({
				data: {
					id: course_id,
					name: sub,
					credits: credits,
				},
			});

			const semester = i <= 6 ? semester1 : semester2;
			const instance = await prisma.courseInstance.create({
				data: {
					id: `202100${i}`,
					courseId: course.id,
					semesterId: semester.id,
				},
			});

			const totalScore = calcTotal(instance.course.credits);
			const ass = await prisma.assessment.create({
				data: {
					name: "Final",
					total: totalScore,
					courseId: instance.course.id,
					issuerId: theProfessor.id,
					issueDate: new Date(),
					deadline: new Date(),
				},
			});
		}

		// Creating Students, Enrolling, and Grading
		for (const [i, data] of df.iterrows()) {
			const studentSeat = data["seat"];
			const studentName = data["name"];

			const student = await prisma.student.create({
				data: {
					id: studentSeat,
					name: studentName,
					password: "0",
				},
			});

			for (const [course, grade] of Object.entries(data).slice(2)) {
				const instance = await prisma.courseInstance.findFirst({
					where: { courseId: `MAT_${course.toUpperCase()}` },
				});

				const enrollment = await prisma.enrollment.create({
					data: {
						studentId: student.id,
						instanceId: instance.id,
					},
				});

				const assessment = await prisma.assessment.findFirst({
					where: { courseId: instance.course.id },
				});

				await prisma.grade.create({
					data: {
						enrollmentId: enrollment.id,
						assessmentId: assessment.id,
						mark: grade,
					},
				});
			}
		}
	}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
 */
