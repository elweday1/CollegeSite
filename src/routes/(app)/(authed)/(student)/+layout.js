// @ts-nocheck

export const load = async (loadEvent) => {
	const { fetch } = loadEvent;
	const sessions = await fetch("/api/sessions");
	const sessionData = await sessions.json();
	const students = await fetch("/api/students");
	const histData = await students.json();
	const grades = await fetch("/api/grades");
	const boxData = await grades.json();
	const notifications = await fetch("/api/notifications/808");
	const notificationsData = await notifications.json();
	const student = await fetch("/api/students/808");
	const studentData = await student.json();


	return { notificationsData, sessionData, histData, boxData, studentData };
};
