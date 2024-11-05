import {
	AuthUserSchema,
	PublicUserSchema,
	UserDocumentSchema,
	userLoginSchema,
	userRegisterSchema,
} from '../models/user';

export const LoginRequestSchema = userLoginSchema();
export const RegisterRequestSchema = userRegisterSchema();
export const AuthResponseSchema = AuthUserSchema();
export const DefaultUserDocumentSchema = UserDocumentSchema();
export const DefaultPublicUserSchema = PublicUserSchema();
