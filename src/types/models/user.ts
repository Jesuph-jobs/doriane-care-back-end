import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
	Types,
} from 'mongoose';

export type UserVirtual = object;

export interface UserInstanceMethods {
	comparePassword: (this: UserHydratedDocument, password: string) => Promise<boolean>;
	comparePublicKey: (this: UserHydratedDocument, publicKey: string) => Promise<boolean>;
	generatePublicKey: (this: UserHydratedDocument) => Promise<string>;
	generateAuthToken: (this: UserHydratedDocument) => Promise<string>;
	toOptimizedObject: (this: UserHydratedDocument) => OptimizedUserI;
	toNecessaryUser: (this: UserHydratedDocument, replace?: boolean) => NecessaryUserI;
	toPublicUser: (this: UserHydratedDocument) => PublicUserI<BasicWebSiteI>;
}
/* QueryWithHelpers<UserHydratedDocument | null, UserHydratedDocument, UserQueryHelpers, UserDocumentI<ValidationHydratedDocument>,'findOne' >; */
export type UserQueryHelpers = object;
export interface UserDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<UserDocument, UserDocumentI<Types.ObjectId>, ResolveSchemaOptions<UserSchemaOptions>>,
		ResolveSchemaOptions<UserSchemaOptions>
	> {}
export interface UserHydratedDocument
	extends HydratedDocument<FlatRecord<UserDocument>, UserInstanceMethods & UserVirtual, UserQueryHelpers> {}

export interface UserStaticMethods {
	// custom static methods here
	createUser: (this: UserModel, user: UserI) => Promise<UserHydratedDocument>;
	findByCredentials: (this: UserModel, email: string, password: string) => Promise<UserHydratedDocument>;
	registerGoogleUser: (
		this: UserModel,
		userId: string | Types.ObjectId,
		user: UserGoogleRegistrationI
	) => Promise<UserHydratedDocument>;
	loginGoogleUser: (this: UserModel, googleId: string) => Promise<UserHydratedDocument>;
	findByUsername: (this: UserModel, username: string) => Promise<UserHydratedDocument | null>;
	findByEmail: (this: UserModel, email: string) => Promise<UserHydratedDocument | null>;
	findUnique: (this: UserModel, username: string) => Promise<UserHydratedDocument>;
	getUserFromToken: (this: UserModel, payload: JWT_Payload) => Promise<UserHydratedDocument>;
}
export interface UserSchemaOptions {
	timestamps: true;
}
export interface UserModel
	extends Model<
			UserDocumentI<Types.ObjectId>,
			UserQueryHelpers,
			UserInstanceMethods,
			UserVirtual,
			UserHydratedDocument
		>,
		UserStaticMethods {}
