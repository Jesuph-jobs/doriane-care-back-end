import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type WebsiteFeaturesFlagsVirtual = object;

export interface WebsiteFeaturesFlagsInstanceMethods {}
export type WebsiteFeaturesFlagsQueryHelpers = object;
export interface WebsiteFeaturesFlagsDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			WebsiteFeaturesFlagsDocument,
			WebsiteFeaturesFlagsI,
			ResolveSchemaOptions<WebsiteFeaturesFlagsSchemaOptions>
		>,
		ResolveSchemaOptions<WebsiteFeaturesFlagsSchemaOptions>
	> {}
export interface WebsiteFeaturesFlagsHydratedDocument
	extends HydratedDocument<
		FlatRecord<WebsiteFeaturesFlagsDocument>,
		WebsiteFeaturesFlagsInstanceMethods & WebsiteFeaturesFlagsVirtual,
		WebsiteFeaturesFlagsQueryHelpers
	> {}

export interface WebsiteFeaturesFlagsStaticMethods {
	// custom static methods here
}
export interface WebsiteFeaturesFlagsSchemaOptions {
	timestamps: true;
}
export interface WebsiteFeaturesFlagsModel
	extends Model<
			WebsiteFeaturesFlagsI,
			WebsiteFeaturesFlagsQueryHelpers,
			WebsiteFeaturesFlagsInstanceMethods,
			WebsiteFeaturesFlagsVirtual,
			WebsiteFeaturesFlagsHydratedDocument
		>,
		WebsiteFeaturesFlagsStaticMethods {}
