import { json } from '@sveltejs/kit';
export async function POST({ cookies }) {
	cookies.delete("SESSION_STUDENT", {
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 7,
		sameSite: "lax",
		path: "/",
	});
	return json({
		success: true
	})
}
