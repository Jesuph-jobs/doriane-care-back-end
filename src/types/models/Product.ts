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

export type ProductVirtual = object;

export interface ProductInstanceMethods {
	toOptimizedObject: (this: ProductHydratedDocument) => PublicProductI;
}
export type ProductQueryHelpers = object;
export interface ProductDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			ProductDocument,
			ProductDocumentI<Types.ObjectId>,
			ResolveSchemaOptions<ProductSchemaOptions>
		>,
		ResolveSchemaOptions<ProductSchemaOptions>
	> {}
export interface ProductHydratedDocument
	extends HydratedDocument<
		FlatRecord<ProductDocument>,
		ProductInstanceMethods & ProductVirtual,
		ProductQueryHelpers
	> {}

export interface ProductStaticMethods {
	// custom static methods here
}
export interface ProductSchemaOptions {
	timestamps: true;
}
export interface ProductModel
	extends Model<
			ProductDocumentI<Types.ObjectId>,
			ProductQueryHelpers,
			ProductInstanceMethods,
			ProductVirtual,
			ProductHydratedDocument
		>,
		ProductStaticMethods {}
