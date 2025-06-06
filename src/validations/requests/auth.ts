import { type MyZodType, z } from '../../../common/validations/defaultZod';
import { emailSchema, usernameSchema } from '../../../common/validations/elements';
import { LoginRequestSchema } from '../../../common/validations/generated/user';

export const CheckAuthShapeSchema = z.object<MyZodType<CheckAuthShapeI>>({
	// body must be empty
	body: z.any().refine(query => !query || Object.keys(query).length === 0, {
		message: 'Body must be empty',
	}),
	query: z.any().refine(query => !query || Object.keys(query).length === 0, {
		message: 'Query must be empty',
	}),
});

export const CheckUsernameShapeSchema = z.object<MyZodType<CheckUsernameShapeI>>({
	body: z.any().refine(query => !query || Object.keys(query).length === 0, {
		message: 'Body must be empty',
	}),
	query: z.any().refine(query => !query || Object.keys(query).length === 0, {
		message: 'Query must be empty',
	}),
	params: z.object({
		username: usernameSchema('en'),
	}),
});

export const CheckEmailShapeSchema = z.object<MyZodType<CheckEmailShapeI>>({
	body: z.any().refine(query => !query || Object.keys(query).length === 0, {
		message: 'Body must be empty',
	}),
	query: z.any().refine(query => !query || Object.keys(query).length === 0, {
		message: 'Query must be empty',
	}),
	params: z.object({
		email: emailSchema('en'),
	}),
});

export const LoginRequestShapeSchema = z.object<MyZodType<LoginRequestShapeI>>({
	body: LoginRequestSchema,
	query: z.any().refine(query => !query || Object.keys(query).length === 0, {
		message: 'Query must be empty',
	}),
});

/* export const RegisterRequestShapeSchema = z.object<MyZodType<RegisterRequestShapeI>>({
	body: RegisterRequestSchema,
	query: z.any().refine(query => !query || Object.keys(query).length === 0, {
		message: 'Query must be empty',
	}),
}); */
export const GoogleLoginRequestSchema = z.object<MyZodType<GoogleLogOnI>>({
	code: z.string({
		description: 'The code received from Google',
		invalid_type_error: 'Invalid type',
		required_error: 'Required',
	}),
});
export const GoogleLoginRequestShapeSchema = z.object<MyZodType<GoogleLoginRequestShapeI>>({
	body: GoogleLoginRequestSchema,
	query: z.any().refine(query => !query || Object.keys(query).length === 0, {
		message: 'Query must be empty',
	}),
});

export const RequestGoogleUrlShapeSchema = z.object<MyZodType<RequestGoogleUrlShapeI>>({
	body: z.any().refine(query => !query || Object.keys(query).length === 0, {
		message: 'Body must be empty',
	}),
	query: z.any().refine(query => !query || Object.keys(query).length === 0, {
		message: 'Query must be empty',
	}),
});
