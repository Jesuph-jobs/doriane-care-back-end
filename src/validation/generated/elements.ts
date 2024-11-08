import {
	booleanSchema,
	emailSchema,
	errorSchema,
	mongoIDSchema,
	nameSchema,
	nullElementSchema,
	passwordSchema,
	phoneSchema,
	stringDateSchema,
	urlSchema,
	usernameSchema,
	uuidSchema,
} from '../../../common/validations/elements';

// username
export const defaultUsernameSchema = usernameSchema();
// email
export const defaultEmailSchema = emailSchema();
// password
export const defaultPasswordSchema = passwordSchema();
// phone
export const defaultPhoneSchema = phoneSchema();
// name
export const defaultNameSchema = nameSchema();
// string date
export const defaultStringDateSchema = stringDateSchema();
// mongodb id
export const defaultMongoIDSchema = mongoIDSchema();
export const defaultUuidSchema = uuidSchema();
export const defaultNullElementSchema = nullElementSchema();
export const defaultErrorSchema = errorSchema();
export const defaultBooleanSchema = booleanSchema();
export const defaultUrlSchema = urlSchema();
