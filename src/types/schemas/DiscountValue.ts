import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type DiscountValueVirtual = object;

export interface DiscountValueInstanceMethods {}
export type DiscountValueQueryHelpers = object;
export interface DiscountValueDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<DiscountValueDocument, DiscountValueI, ResolveSchemaOptions<DiscountValueSchemaOptions>>,
		ResolveSchemaOptions<DiscountValueSchemaOptions>
	> {}
export interface DiscountValueHydratedDocument
	extends HydratedDocument<
		FlatRecord<DiscountValueDocument>,
		DiscountValueInstanceMethods & DiscountValueVirtual,
		DiscountValueQueryHelpers
	> {}

export interface DiscountValueStaticMethods {
	// custom static methods here
}
export interface DiscountValueSchemaOptions {
	timestamps: true;
}
export interface DiscountValueModel
	extends Model<
			DiscountValueI,
			DiscountValueQueryHelpers,
			DiscountValueInstanceMethods,
			DiscountValueVirtual,
			DiscountValueHydratedDocument
		>,
		DiscountValueStaticMethods {}
export const DiscountValueEnums: DiscountValueType[] = ['P', 'V'];
