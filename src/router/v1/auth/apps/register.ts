import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { StatusCodes } from "http-status-codes";

import { z } from "^server/defaultZod";
import { errorSchema } from "^server/elements";
import { AuthResponseSchema } from "^server/generated/user";
import { GoogleLoginRequestSchema } from "^server/requests/auth";

import { createApiRequest } from "~server/openAPIRequestBuilders";
import { createApiResponses } from "~server/openAPIResponseBuilders";

const appsRegistry = new OpenAPIRegistry();

appsRegistry.registerPath({
	method: "get",
	path: "/auth/apps/google",
	// request google url redirect link
	description: "Request google url redirect link",
	summary: "Request google url redirect link",
	tags: ["Auth", "Apps", "Google"],
	responses: createApiResponses([
		{
			statusCode: StatusCodes.OK,
			schema: z
				.string({
					description: "Google authorization url has been generated",
					invalid_type_error: "Invalid type",
					required_error: "Required",
				})
				.url("Google authorization must be a valid url")
				.openapi("GOOGLE_URL", {
					description: "Google authorization url has been generated",
					format: "url",
				}),
			description: "Google authorization url has been generated",
		},
	]),
});

appsRegistry.registerPath({
	method: "post",
	// login with google
	description: "Login with google code received from google",
	summary: "Login with google code received from google",
	path: "/auth/apps/google",
	tags: ["Auth", "Apps", "Google"],
	request: createApiRequest({
		body: {
			schema: GoogleLoginRequestSchema,
			required: true,
			description: "The username or email of the person wanting to apps his account",
		},
	}),
	responses: createApiResponses([
		{
			statusCode: StatusCodes.OK,
			schema: AuthResponseSchema,
			description: "User is logged in",
		},
		{
			statusCode: StatusCodes.BAD_REQUEST,
			schema: errorSchema({ message: { description: "Invalid credentials" } }),
			description: "Invalid credentials",
		},
	]),
});

export default appsRegistry;
