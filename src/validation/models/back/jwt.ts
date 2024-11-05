import { type MyZodType, z } from "../../defaultZod";
import { mongoIDSchema } from "../../elements";

export const APP_JWT_PayloadSchema = ({
	id,
	pk,
	issAt,
	issBy,
}: Partial<Record<keyof APP_JWT_Payload, ErrorsSchemaMsgI>> = {}) =>
	z.object<MyZodType<APP_JWT_Payload>>({
		id: mongoIDSchema(id),
		issAt: z.number({
			required_error: issAt?.required || "issAt is required",
			invalid_type_error: issAt?.invalid || "issAt must be a number",
			description: issAt?.description || "The issue date of the token",
		}),
		pk: z.string({
			required_error: pk?.required || "pk is required",
			invalid_type_error: pk?.invalid || "pk must be a string",
			description: pk?.description || "The public key of the user",
		}),
		issBy: z.string({
			required_error: issBy?.required || "issBy is required",
			invalid_type_error: issBy?.invalid || "issBy must be a string",
			description: issBy?.description || "The issuer of the token",
		}),
	});
export const APP_OAUTH_JWT_PayloadSchema = ({
	issFor,
	...rest
}: Partial<Record<keyof APP_OAUTH_JWT_Payload, ErrorsSchemaMsgI>> = {}) =>
	APP_JWT_PayloadSchema({
		...rest,
	}).extend({
		issFor: z.string({
			required_error: issFor?.required || "issFor is required",
			invalid_type_error: issFor?.invalid || "issFor must be a string",
			description: issFor?.description || "The app for which the token is issued",
		}),
	});
