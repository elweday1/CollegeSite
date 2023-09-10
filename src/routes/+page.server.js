// @ts-nocheck

export const load = async (loadEvent) => {
	const { fetch } = loadEvent;
	const sessions = await fetch("/api/sessions");
	const sessionData = await sessions.json();
	const notifications = await fetch("/api/notifications/808");
	const notificationsData = await notifications.json();
	const data = { notificationsData, sessionData };
	return data;
};
