import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type ProductFlagsVirtual = object;

export interface ProductFlagsInstanceMethods {}
export type ProductFlagsQueryHelpers = object;
export interface ProductFlagsDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<ProductFlagsDocument, ProductFlagsI, ResolveSchemaOptions<ProductFlagsSchemaOptions>>,
		ResolveSchemaOptions<ProductFlagsSchemaOptions>
	> {}
export interface ProductFlagsHydratedDocument
	extends HydratedDocument<
		FlatRecord<ProductFlagsDocument>,
		ProductFlagsInstanceMethods & ProductFlagsVirtual,
		ProductFlagsQueryHelpers
	> {}

export interface ProductFlagsStaticMethods {
	// custom static methods here
}
export interface ProductFlagsSchemaOptions {
	timestamps: true;
}
export interface ProductFlagsModel
	extends Model<
			ProductFlagsI,
			ProductFlagsQueryHelpers,
			ProductFlagsInstanceMethods,
			ProductFlagsVirtual,
			ProductFlagsHydratedDocument
		>,
		ProductFlagsStaticMethods {}
