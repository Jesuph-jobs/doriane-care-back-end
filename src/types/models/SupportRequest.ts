import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type SupportRequestVirtual = object;

export interface SupportRequestInstanceMethods {
	toOptimizedObject: (this: SupportRequestHydratedDocument) => PublicSupportRequestI;
}
export type SupportRequestQueryHelpers = object;
export interface SupportRequestDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			SupportRequestDocument,
			SupportRequestDocumentI,
			ResolveSchemaOptions<SupportRequestSchemaOptions>
		>,
		ResolveSchemaOptions<SupportRequestSchemaOptions>
	> {}
export interface SupportRequestHydratedDocument
	extends HydratedDocument<
		FlatRecord<SupportRequestDocument>,
		SupportRequestInstanceMethods & SupportRequestVirtual,
		SupportRequestQueryHelpers
	> {}

export interface SupportRequestStaticMethods {
	// custom static methods here
}
export interface SupportRequestSchemaOptions {
	timestamps: true;
}
export interface SupportRequestModel
	extends Model<
			SupportRequestDocumentI,
			SupportRequestQueryHelpers,
			SupportRequestInstanceMethods,
			SupportRequestVirtual,
			SupportRequestHydratedDocument
		>,
		SupportRequestStaticMethods {}
