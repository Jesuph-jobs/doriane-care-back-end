import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type FAQVirtual = object;

export interface FAQInstanceMethods {}
export type FAQQueryHelpers = object;
export interface FAQDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<FAQDocument, FAQI, ResolveSchemaOptions<FAQSchemaOptions>>,
		ResolveSchemaOptions<FAQSchemaOptions>
	> {}
export interface FAQHydratedDocument
	extends HydratedDocument<FlatRecord<FAQDocument>, FAQInstanceMethods & FAQVirtual, FAQQueryHelpers> {}

export interface FAQStaticMethods {}
export interface FAQSchemaOptions {
	timestamps: true;
}
export interface FAQModel
	extends Model<FAQI, FAQQueryHelpers, FAQInstanceMethods, FAQVirtual, FAQHydratedDocument>,
		FAQStaticMethods {}
