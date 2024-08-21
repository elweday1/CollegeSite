import db from "$lib/prisma";
import { error } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

export async function POST({ request, cookies }) {
	const data = await request.formData();
	const userid = data.get("userid");
	const user = await db.student.findFirst({
		where: { id: Number(userid) },
	});
	console.log("user", user);
	console.log("user", userid);
	if (user) {
		cookies.set("SESSION_STUDENT", userid, {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7,
			sameSite: "lax",
			path: "/",
		});
		throw redirect(302, "/");
	} else {
		throw error(404, "Student not found");
	}
}
