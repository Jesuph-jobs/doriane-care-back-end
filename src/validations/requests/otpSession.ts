import { type MyZodType, z } from '^common/defaultZod';
import { OTPSessionSchema, OTPSessionSendSchema, ResetPasswordSchema } from '^common/models/otpSession';

export const OTPSessionRequestSchema = () =>
	z.object<MyZodType<OTPSessionShapeI>>({
		// Body doit être vide
		body: OTPSessionSchema('en'),
		query: z.any().refine(query => !query || Object.keys(query).length === 0, {
			message: 'Query doit être vide',
		}),
	});
export const SendOTPSessionSchema = () =>
	z.object<MyZodType<OTPSessionSendShapeI>>({
		body: OTPSessionSendSchema('en'),
		query: z.any().refine(query => !query || Object.keys(query).length === 0, {
			message: 'Query doit être vide',
		}),
	});
export const SendOTPSessionGetSchema = () =>
	z.object<MyZodType<OTPSessionSendShapeI>>({
		query: OTPSessionSendSchema('en'),
		body: z.any().refine(query => !query || Object.keys(query).length === 0, {
			message: 'Body doit être vide',
		}),
	});
export const ValidateEmailSchema = () =>
	z.object<MyZodType<OTPSessionSendShapeI>>({
		query: z.any().refine(query => !query || Object.keys(query).length === 0, {
			message: 'Query doit être vide',
		}),
		body: OTPSessionSendSchema('en'),
	});
export const ResetPasswordRequestSchema = () =>
	z.object<MyZodType<ResetPasswordShapeI>>({
		body: ResetPasswordSchema('en'),
		query: z.any().refine(query => !query || Object.keys(query).length === 0, {
			message: 'Query doit être vide',
		}),
	});
