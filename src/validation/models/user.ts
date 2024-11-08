import { type MyZodType, z } from '../../../common/validations/defaultZod';
import {
	arraySchema,
	booleanSchema,
	emailSchema,
	mongoIDSchema,
	passwordSchema,
	phoneSchema,
	stringDateSchema,
	urlSchema,
} from '../../../common/validations/elements';

import { ContactInformationSchema } from './generals/ContactInformation';
import { PersonalInformationSchema } from './generals/PersonalInformation';

/* --------------------------------- User Login Schema --------------------------------- */
export const userLoginSchema = ({ email, password, stay }: Partial<Record<keyof UserLogInI, ErrorsSchemaMsgI>> = {}) =>
	z
		.object<MyZodType<UserLogInI>>(
			{
				email: emailSchema(email),
				password: passwordSchema(password),
				stay: booleanSchema(stay).optional(),
			},
			{
				description: 'User Login Schema',
				invalid_type_error: 'Invalid User Login Schema',
				required_error: 'User Login Schema is required',
			}
		)
		.openapi('User_Login_Request', { description: 'User Login Schema' });

/* --------------------------------- User Apps Schema --------------------------------- */
export const EnabledUserAppsMap: EnabledUserAppsI = {
	google: 'google',
};
export const EnabledUserAppsList = Object.keys(EnabledUserAppsMap) as EnabledUserAppsEnum[];

export const DisabledUserAppsMap: DisabledUserAppsI = {
	facebook: 'facebook',
	twitter: 'twitter',
	github: 'github',
};

export const DisabledUserAppsList = Object.keys(DisabledUserAppsMap) as DisabledUserAppsEnum[];

export const UserAppsMap: UserAppsI = {
	...EnabledUserAppsMap,
	...DisabledUserAppsMap,
};
export const UserAppsList = Object.keys(UserAppsMap) as UserAppsEnum[];
export const isDisabledUserApp = (app: UserAppsEnum): app is DisabledUserAppsEnum =>
	DisabledUserAppsList.includes(app as DisabledUserAppsEnum);

export const AppDetailsSchema = z.object<MyZodType<AppDetailsI>>({
	id: z.string({
		description: 'App ID',
		invalid_type_error: 'Invalid App ID',
		required_error: 'App ID is required',
	}),
	username: z.string({
		description: 'App username',
		invalid_type_error: 'Invalid App username',
		required_error: 'App username is required',
	}),
});

export const EnabledUserAppsSchema = () =>
	z.object<MyZodType<EnabledUserAppsI<AppDetailsI>>>({
		google: AppDetailsSchema,
	});

/* --------------------------------- User Document Schema --------------------------------- */

export const UserDocumentSchema = (
	{
		email,
		phone,
		password,
		/* username, */
		lastLogin,
		enabled,
	}: Partial<Record<keyof UserDocumentI, ErrorsSchemaMsgI>> = {},
	DocumentUserMsg: ErrorsSchemaMsgI = {}
) => {
	return z
		.object<MyZodType<UserDocumentI>>(
			{
				/* username: usernameSchema(username), */
				email: emailSchema(email),
				personalInformation: PersonalInformationSchema(),
				password: passwordSchema(password),
				phone: phoneSchema(phone) /* .optional() */,
				enabled: booleanSchema(enabled),
				lastLogin: stringDateSchema(lastLogin),
				apps: EnabledUserAppsSchema(),
				contactInformation: ContactInformationSchema(),
				profilePicture: urlSchema().optional(),
				roles: arraySchema(mongoIDSchema()),
			},
			{
				description: DocumentUserMsg.description || 'User document Schema',
				invalid_type_error: DocumentUserMsg.invalid || 'Invalid User Schema',
				required_error: DocumentUserMsg.required || 'User document Schema is required',
			}
		)
		.openapi('User_Document', { description: 'User document Schema' });
};
/* --------------------------------- User Schema --------------------------------- */

export const GeneralUserSchema = ({
	email,
	phone,
	/* username, */
	password,
}: Partial<Record<Exclude<keyof UserI, 'personalInformation'>, ErrorsSchemaMsgI>> = {}) =>
	z
		.object<MyZodType<UserI>>(
			{
				/* username: usernameSchema(username), */
				email: emailSchema(email),
				phone: phoneSchema(phone) /* .optional() */,
				personalInformation: PersonalInformationSchema(),
				password: passwordSchema(password),
				profilePicture: urlSchema().optional(),
			},
			{
				description: 'General User Schema',
				invalid_type_error: 'Invalid User Schema',
				required_error: 'User Schema is required',
			}
		)
		.openapi('Public_User', { description: 'Public User Schema' });
export const PublicUserSchema = ({
	id,
	email,
	phone,
	/* username, */
}: Partial<Record<keyof PublicUserI, ErrorsSchemaMsgI>> = {}) =>
	z
		.object<MyZodType<PublicUserI>>(
			{
				/* username: usernameSchema(username), */
				email: emailSchema(email),
				phone: phoneSchema(phone) /* .optional() */,
				id: mongoIDSchema(id),
				personalInformation: PersonalInformationSchema(),
				emailValidated: booleanSchema(),
				profilePicture: urlSchema().optional(),
			},
			{
				description: 'Public User Schema',
				invalid_type_error: 'Invalid User Schema',
				required_error: 'User Schema is required',
			}
		)
		.openapi('Public_User', { description: 'Public User Schema' });

export const AuthUserSchema = (userMsgs: Partial<Record<keyof UserI, ErrorsSchemaMsgI>> = {}) =>
	z
		.object<MyZodType<UserAuthI>>(
			{
				user: PublicUserSchema(userMsgs),
				token: z
					.string({
						description: 'User token',
						invalid_type_error: 'Invalid token',
						required_error: 'Token is required',
					})
					.optional(),
				new: booleanSchema({
					description: 'If the user is new',
					invalid: 'Invalid new',
					required: 'New is required',
				}).optional(),
			},
			{
				description: 'User Auth Response Schema',
				invalid_type_error: 'Invalid User Auth Response Schema',
				required_error: 'User Auth Response Schema is required',
			}
		)
		.openapi('User_Auth_Response', { description: 'User Auth Response Schema' });

export const NecessaryUserSchema = (
	{ email, id, /* username, */ phone }: Partial<Record<keyof NecessaryUserI, ErrorsSchemaMsgI>> = {},
	NecessaryUserMsg: ErrorsSchemaMsgI = {}
) =>
	z
		.object<MyZodType<NecessaryUserI>>(
			{
				...PublicUserSchema({ email, id, /* username, */ phone }).shape,
			},
			{
				description: NecessaryUserMsg.description || 'Necessary User Schema',
				invalid_type_error: NecessaryUserMsg.invalid || 'Invalid Necessary User Schema',
				required_error: NecessaryUserMsg.required || 'Necessary User Schema is required',
			}
		)
		.openapi('Necessary_User', { description: 'Necessary User Schema' });
/* --------------------------------- User Register Schema --------------------------------- */
export const userRegisterSchema = ({
	/* username, */
	email,
	password,
	phone,
	/* confirmPassword: confirmPasswordMsg = { description: 'The password confirmation' }, */
}: Partial<Record<Exclude<keyof UserRegistrationI, 'personalInformation'>, ErrorsSchemaMsgI>> = {}) => {
	const schema = z
		.object<MyZodType<UserRegistrationI>>(
			{
				...GeneralUserSchema({ /* username, */ email, phone, password }).shape,
			},
			{
				description: 'User Registration Schema',
				invalid_type_error: 'Invalid User Registration Schema',
				required_error: 'User Registration Schema is required',
			}
		)
		.openapi('User_Registration_Request', { description: 'User Registration Schema' });
	/* schema.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: confirmPasswordMsg?.invalid || 'The passwords did not match',
			});
		}
	}); */
	return schema;
};

export const changePasswordSchema = ({
	confirmPassword,
	newPassword,
	oldPassword,
}: Partial<Record<keyof ChangePasswordI, ErrorsSchemaMsgI>> = {}) => {
	const schema = z
		.object<MyZodType<ChangePasswordI>>(
			{
				oldPassword: passwordSchema(
					oldPassword || {
						description: 'The old password',
						invalid: 'Invalid old password',
						required: 'Old password is required',
					}
				),
				newPassword: passwordSchema(
					newPassword || {
						description: 'The new password',
						invalid: 'Invalid new password',
						required: 'New password is required',
					}
				),
				confirmPassword: passwordSchema(
					confirmPassword || {
						description: 'The password confirmation',
						invalid: 'Invalid password confirmation',
						required: 'Password confirmation is required',
					}
				),
			},
			{
				description: 'Change Password Schema',
				invalid_type_error: 'Invalid Change Password Schema',
				required_error: 'Change Password Schema is required',
			}
		)
		.refine(({ confirmPassword, newPassword }) => confirmPassword === newPassword, {
			message: 'The passwords did not match',
			path: ['confirmPassword'],
		})
		.openapi('Change_Password_Request', { description: 'Change Password Schema' });

	return schema;
};
