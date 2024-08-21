import { redirect } from "@sveltejs/kit";
export const handle = async ({ event, resolve }) => {
    const access = event.cookies.get("SESSION_STUDENT");

    if (event.route.id?.includes("/(app)/(authed)/(student)") && !access) {
            throw redirect(302, "/login");
    }
    if (event.route.id?.includes("/(app)/(unauthed)/login") && access) {
            throw redirect(302, event.route.id);
    }
    const response = await resolve(event);
    return response;
}


