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

export type ProductsCartVirtual = object;

export interface ProductsCartInstanceMethods {}
export type ProductsCartQueryHelpers = object;
export interface ProductsCartDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			ProductsCartDocument,
			ProductsCartI<Types.ObjectId>,
			ResolveSchemaOptions<ProductsCartSchemaOptions>
		>,
		ResolveSchemaOptions<ProductsCartSchemaOptions>
	> {}
export interface ProductsCartHydratedDocument
	extends HydratedDocument<
		FlatRecord<ProductsCartDocument>,
		ProductsCartInstanceMethods & ProductsCartVirtual,
		ProductsCartQueryHelpers
	> {}

export interface ProductsCartStaticMethods {
	// custom static methods here
}
export interface ProductsCartSchemaOptions {
	timestamps: true;
}
export interface ProductsCartModel
	extends Model<
			ProductsCartI<Types.ObjectId>,
			ProductsCartQueryHelpers,
			ProductsCartInstanceMethods,
			ProductsCartVirtual,
			ProductsCartHydratedDocument
		>,
		ProductsCartStaticMethods {}
