import { json, error } from "@sveltejs/kit";

import prisma from "$lib/prisma";

const removeKey = function (obj, key) {
	delete obj[key];
	return obj;
}
const grouper = function (xs, key) {
	return xs.reduce(function (rv, x) {
		(rv[x[key]] = rv[x[key]] || []).push(removeKey(x, key));
		return rv;
	}, {});
};
export async function GET() {
	const sessions = await prisma.session.findMany({
		include: {
		instance: {
			include: {
				course: true,
				staff: true,
			},
		}
		}
	});
	if (!sessions) {
		throw error(404, "Student not found");
	}
	
	let a = sessions.map((session) => ({
			period: session.period,
			dow: session.dow,
			course: session.instance.course.name,
			intance: session.instance.id,
			type: session.type,
			name: "Professor",
		}))

	return json(a);
}
