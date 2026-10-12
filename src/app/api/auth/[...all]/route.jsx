import { toNextJsHandler } from "better-auth/next-js";
import { auth, isAuthConfigured } from "@/lib/auth";

const handlers = toNextJsHandler(auth);
const unavailable = () => Response.json({ message: "Authentication is not configured." }, { status: 503 });

export const GET = (request) => {
	if (isAuthConfigured()) return handlers.GET(request);
	if (new URL(request.url).pathname.endsWith("/get-session")) return Response.json(null);
	return unavailable();
};
export const POST = (request) => isAuthConfigured() ? handlers.POST(request) : unavailable();