import type {
	ApplySchemaOptions,
	FlatRecord,
	FlattenMaps,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	ResolveSchemaOptions,
	Types,
} from 'mongoose';

import type { UserHydratedDocument } from '!server/models/user';

export type VerifiableI = 'email' | 'phone';
export type OTPSessionKindsI = 'resetPassword' | 'emailVerification' | 'phoneVerification';
export interface OTPSessionDocumentI {
	userId: Types.ObjectId;
	hashedOtp: string;
	kind: OTPSessionKindsI;
	toValidate?: string;
}

export type OTPSessionVirtual = object;
export interface OTPSessionInstanceMethods {
	compareOTP: (this: OTPSessionDocument, OTPCode: string) => Promise<boolean>;
}
export type OTPSessionQueryHelpers = object;
export interface OTPSessionDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<OTPSessionDocument, OTPSessionDocumentI, ResolveSchemaOptions<OTPSessionSchemaOptions>>,
		ResolveSchemaOptions<OTPSessionSchemaOptions>
	> {}
export interface OTPSessionHydratedDocument
	extends HydratedDocument<
		FlatRecord<OTPSessionDocument>,
		OTPSessionInstanceMethods & OTPSessionVirtual,
		OTPSessionQueryHelpers
	> {}
export type OTPSessionLeanDocumentI = FlattenMaps<OTPSessionDocumentI> & {
	_id: Types.ObjectId;
};
export interface OTPSessionStaticMethods {
	// custom static methods here
	createRecoverySession: (
		this: OTPSessionModel,
		email: string,
		replaceUser?: boolean
	) => Promise<[string, OTPSessionHydratedDocument, UserHydratedDocument]>;
	createValidationSession: (
		this: OTPSessionModel,
		email: string,
		replaceUser?: boolean
	) => Promise<[string, OTPSessionHydratedDocument, UserHydratedDocument]>;

	getNecessarySession: (
		this: OTPSessionModel,
		sessionId: string,
		OTPCode: string,
		replaceUser?: boolean
	) => Promise<[OTPSessionHydratedDocument, NecessaryUserI]>;
	getSession: (
		this: OTPSessionModel,
		sessionId: string,
		OTPCode: string
	) => Promise<[OTPSessionHydratedDocument, UserHydratedDocument]>;
	resetPassword: (this: OTPSessionModel, sessionId: string, password: string, OTPCode: string) => Promise<void>;
	validateEmail: (this: OTPSessionModel, sessionId: string, OTPCode: string) => Promise<PublicUserI>;
}
export interface OTPSessionSchemaOptions {
	timestamps: true;
}
export interface OTPSessionModel
	extends Model<
			OTPSessionDocumentI,
			OTPSessionQueryHelpers,
			OTPSessionInstanceMethods,
			OTPSessionVirtual,
			OTPSessionHydratedDocument
		>,
		OTPSessionStaticMethods {}
