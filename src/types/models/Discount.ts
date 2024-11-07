import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type DiscountVirtual = object;

export interface DiscountInstanceMethods {
	toOptimizedObject: (this: DiscountHydratedDocument) => PublicDiscountI;
}
export type DiscountQueryHelpers = object;
export interface DiscountDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<DiscountDocument, DiscountDocumentI, ResolveSchemaOptions<DiscountSchemaOptions>>,
		ResolveSchemaOptions<DiscountSchemaOptions>
	> {}
export interface DiscountHydratedDocument
	extends HydratedDocument<
		FlatRecord<DiscountDocument>,
		DiscountInstanceMethods & DiscountVirtual,
		DiscountQueryHelpers
	> {}

export interface DiscountStaticMethods {
	// custom static methods here
}
export interface DiscountSchemaOptions {
	timestamps: true;
}
export interface DiscountModel
	extends Model<
			DiscountDocumentI,
			DiscountQueryHelpers,
			DiscountInstanceMethods,
			DiscountVirtual,
			DiscountHydratedDocument
		>,
		DiscountStaticMethods {}
