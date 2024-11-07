import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type ContentTypeVirtual = object;

export interface ContentTypeInstanceMethods {}
export type ContentTypeQueryHelpers = object;
export interface ContentTypeDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<ContentTypeDocument, ContentTypeI, ResolveSchemaOptions<ContentTypeSchemaOptions>>,
		ResolveSchemaOptions<ContentTypeSchemaOptions>
	> {}
export interface ContentTypeHydratedDocument
	extends HydratedDocument<
		FlatRecord<ContentTypeDocument>,
		ContentTypeInstanceMethods & ContentTypeVirtual,
		ContentTypeQueryHelpers
	> {}

export interface ContentTypeStaticMethods {
	// custom static methods here
}
export interface ContentTypeSchemaOptions {
	timestamps: true;
}
export interface ContentTypeModel
	extends Model<
			ContentTypeI,
			ContentTypeQueryHelpers,
			ContentTypeInstanceMethods,
			ContentTypeVirtual,
			ContentTypeHydratedDocument
		>,
		ContentTypeStaticMethods {}
