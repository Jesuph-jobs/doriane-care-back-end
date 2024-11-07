import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type WebsitePermissionsVirtual = object;

export interface WebsitePermissionsInstanceMethods {}
export type WebsitePermissionsQueryHelpers = object;
export interface WebsitePermissionsDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			WebsitePermissionsDocument,
			WebsiteFeaturesFlagsI,
			ResolveSchemaOptions<WebsitePermissionsSchemaOptions>
		>,
		ResolveSchemaOptions<WebsitePermissionsSchemaOptions>
	> {}
export interface WebsitePermissionsHydratedDocument
	extends HydratedDocument<
		FlatRecord<WebsitePermissionsDocument>,
		WebsitePermissionsInstanceMethods & WebsitePermissionsVirtual,
		WebsitePermissionsQueryHelpers
	> {}

export interface WebsitePermissionsStaticMethods {
	// custom static methods here
}
export interface WebsitePermissionsSchemaOptions {
	timestamps: true;
}
export interface WebsitePermissionsModel
	extends Model<
			WebsiteFeaturesFlagsI,
			WebsitePermissionsQueryHelpers,
			WebsitePermissionsInstanceMethods,
			WebsitePermissionsVirtual,
			WebsitePermissionsHydratedDocument
		>,
		WebsitePermissionsStaticMethods {}
