import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type PermissionVirtual = object;

export interface PermissionInstanceMethods {}
export type PermissionQueryHelpers = object;
export interface PermissionDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<PermissionDocument, PermissionI, ResolveSchemaOptions<PermissionSchemaOptions>>,
		ResolveSchemaOptions<PermissionSchemaOptions>
	> {}
export interface PermissionHydratedDocument
	extends HydratedDocument<
		FlatRecord<PermissionDocument>,
		PermissionInstanceMethods & PermissionVirtual,
		PermissionQueryHelpers
	> {}

export interface PermissionStaticMethods {
	// custom static methods here
}
export interface PermissionSchemaOptions {
	timestamps: true;
}
export interface PermissionModel
	extends Model<
			PermissionI,
			PermissionQueryHelpers,
			PermissionInstanceMethods,
			PermissionVirtual,
			PermissionHydratedDocument
		>,
		PermissionStaticMethods {}
