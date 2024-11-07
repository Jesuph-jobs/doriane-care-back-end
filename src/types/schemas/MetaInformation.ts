import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type MetaInformationVirtual = object;

export interface MetaInformationInstanceMethods {}
export type MetaInformationQueryHelpers = object;
export interface MetaInformationDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			MetaInformationDocument,
			MetaInformationI,
			ResolveSchemaOptions<MetaInformationSchemaOptions>
		>,
		ResolveSchemaOptions<MetaInformationSchemaOptions>
	> {}
export interface MetaInformationHydratedDocument
	extends HydratedDocument<
		FlatRecord<MetaInformationDocument>,
		MetaInformationInstanceMethods & MetaInformationVirtual,
		MetaInformationQueryHelpers
	> {}

export interface MetaInformationStaticMethods {
	// custom static methods here
}
export interface MetaInformationSchemaOptions {
	timestamps: true;
}
export interface MetaInformationModel
	extends Model<
			MetaInformationI,
			MetaInformationQueryHelpers,
			MetaInformationInstanceMethods,
			MetaInformationVirtual,
			MetaInformationHydratedDocument
		>,
		MetaInformationStaticMethods {}
