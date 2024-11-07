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

export type RoleVirtual = object;

export interface RoleInstanceMethods {
	toOptimizedObject: (this: RoleHydratedDocument) => PublicRoleI;
}
export type RoleQueryHelpers = object;
export interface RoleDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<RoleDocument, RoleDocumentI<Types.ObjectId>, ResolveSchemaOptions<RoleSchemaOptions>>,
		ResolveSchemaOptions<RoleSchemaOptions>
	> {}
export interface RoleHydratedDocument
	extends HydratedDocument<FlatRecord<RoleDocument>, RoleInstanceMethods & RoleVirtual, RoleQueryHelpers> {}

export interface RoleStaticMethods {
	// custom static methods here
}
export interface RoleSchemaOptions {
	timestamps: true;
}
export interface RoleModel
	extends Model<
			RoleDocumentI<Types.ObjectId>,
			RoleQueryHelpers,
			RoleInstanceMethods,
			RoleVirtual,
			RoleHydratedDocument
		>,
		RoleStaticMethods {}
