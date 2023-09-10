// @ts-nocheck

export const load = async (loadEvent) => {
	const { fetch } = loadEvent;
	const students = await fetch("/api/students");
	const histData = await students.json();
	const grades = await fetch("/api/grades");
	const boxData = await grades.json();
	const notifications = await fetch("/api/notifications/808");
	const notificationsData = await notifications.json();
	const student = await fetch("/api/students/808");
	const studentData = await student.json();

	const data = { histData, boxData, notificationsData, studentData };
	return data;
};
