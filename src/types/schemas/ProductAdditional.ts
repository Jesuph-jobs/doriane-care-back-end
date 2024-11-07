import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type ProductAdditionalVirtual = object;

export interface ProductAdditionalInstanceMethods {}
export type ProductAdditionalQueryHelpers = object;
export interface ProductAdditionalDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			ProductAdditionalDocument,
			ProductAdditionalI,
			ResolveSchemaOptions<ProductAdditionalSchemaOptions>
		>,
		ResolveSchemaOptions<ProductAdditionalSchemaOptions>
	> {}
export interface ProductAdditionalHydratedDocument
	extends HydratedDocument<
		FlatRecord<ProductAdditionalDocument>,
		ProductAdditionalInstanceMethods & ProductAdditionalVirtual,
		ProductAdditionalQueryHelpers
	> {}

export interface ProductAdditionalStaticMethods {
	// custom static methods here
}
export interface ProductAdditionalSchemaOptions {
	timestamps: true;
}
export interface ProductAdditionalModel
	extends Model<
			ProductAdditionalI,
			ProductAdditionalQueryHelpers,
			ProductAdditionalInstanceMethods,
			ProductAdditionalVirtual,
			ProductAdditionalHydratedDocument
		>,
		ProductAdditionalStaticMethods {}

export const ProductAdditionalNumberEnums: ProductAdditionalNumberKeys[] = [
	'size',
	'weight',
	'dimensions',
	'expirationDate',
];
export const ProductAdditionalStringEnums: ProductAdditionalStringKeys[] = [
	'ingredients',
	'benefits',
	'usage',
	'careInstructions',
	'allergenInformation',
	'manufacturer',
	'material',
	'color',
	'features',
	'warranty',
	'countryOfOrigin',
	'storageInstructions',
	'nutritionalInformation',
	'note',
	'otherDetails',
];
export const ProductAdditionalEnums: ProductAdditionalKeys[] = [
	...ProductAdditionalNumberEnums,
	...ProductAdditionalStringEnums,
];
