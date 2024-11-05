import { type MyZodType, z } from "^server/defaultZod";
import { OTPSessionSchema, OTPSessionSendSchema, ResetPasswordSchema } from "^server/models/otpSession";

export const OTPSessionRequestSchema = ({
	email,
}: Partial<Record<keyof OTPSessionI | "email", ErrorsSchemaMsgI>> = {}) =>
	z.object<MyZodType<OTPSessionShapeI>>({
		// Body doit être vide
		body: OTPSessionSchema({ email }),
		query: z.any().refine((query) => !query || Object.keys(query).length === 0, {
			message: "Query doit être vide",
		}),
	});
export const SendOTPSessionSchema = () =>
	z.object<MyZodType<OTPSessionSendShapeI>>({
		body: OTPSessionSendSchema(),
		query: z.any().refine((query) => !query || Object.keys(query).length === 0, {
			message: "Query doit être vide",
		}),
	});
export const SendOTPSessionGetSchema = () =>
	z.object<MyZodType<OTPSessionSendShapeI>>({
		query: OTPSessionSendSchema(),
		body: z.any().refine((query) => !query || Object.keys(query).length === 0, {
			message: "Body doit être vide",
		}),
	});
export const ResetPasswordRequestSchema = () =>
	z.object<MyZodType<ResetPasswordShapeI>>({
		body: ResetPasswordSchema(),
		query: z.any().refine((query) => !query || Object.keys(query).length === 0, {
			message: "Query doit être vide",
		}),
	});
