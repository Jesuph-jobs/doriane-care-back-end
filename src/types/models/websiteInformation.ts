import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type WebsiteInformationVirtual = object;

export interface WebsiteInformationInstanceMethods {}
export type WebsiteInformationQueryHelpers = object;
export interface WebsiteInformationDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			WebsiteInformationDocument,
			WebsiteInformationI,
			ResolveSchemaOptions<WebsiteInformationSchemaOptions>
		>,
		ResolveSchemaOptions<WebsiteInformationSchemaOptions>
	> {}
export interface WebsiteInformationHydratedDocument
	extends HydratedDocument<
		FlatRecord<WebsiteInformationDocument>,
		WebsiteInformationInstanceMethods & WebsiteInformationVirtual,
		WebsiteInformationQueryHelpers
	> {}

export interface WebsiteInformationStaticMethods {
	// custom static methods here
}
export interface WebsiteInformationSchemaOptions {
	timestamps: true;
}
export interface WebsiteInformationModel
	extends Model<
			WebsiteInformationI,
			WebsiteInformationQueryHelpers,
			WebsiteInformationInstanceMethods,
			WebsiteInformationVirtual,
			WebsiteInformationHydratedDocument
		>,
		WebsiteInformationStaticMethods {}
