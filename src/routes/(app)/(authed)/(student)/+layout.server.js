// @ts-nocheck


/**
 * Loads data from the API.
 *
 * @param {object} loadEvent - The load event object containing the fetch and event properties.
 * @return {object} An object containing the loaded data from the API.
 */
export async function load ({fetch, cookies}) {
	const studentId = cookies.get("SESSION_STUDENT");
	const sessions = await fetch("/api/sessions");
	const sessionData = await sessions.json();
	const students = await fetch("/api/students");
	const histData = await students.json();
	const grades = await fetch("/api/grades");
	const boxData = await grades.json();
	const notifications = await fetch("/api/notifications/" + studentId);
	const notificationsData = await notifications.json();
	const student = await fetch("/api/students/" + studentId);
	const studentData = await student.json();
	return { notificationsData, sessionData, histData, boxData, studentData, studentId };
};


