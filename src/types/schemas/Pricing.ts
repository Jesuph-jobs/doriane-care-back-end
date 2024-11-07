import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type PricingVirtual = object;

export interface PricingInstanceMethods {}
export type PricingQueryHelpers = object;
export interface PricingDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<PricingDocument, PricingI, ResolveSchemaOptions<PricingSchemaOptions>>,
		ResolveSchemaOptions<PricingSchemaOptions>
	> {}
export interface PricingHydratedDocument
	extends HydratedDocument<
		FlatRecord<PricingDocument>,
		PricingInstanceMethods & PricingVirtual,
		PricingQueryHelpers
	> {}

export interface PricingStaticMethods {
	// custom static methods here
}
export interface PricingSchemaOptions {
	timestamps: true;
}
export interface PricingModel
	extends Model<PricingI, PricingQueryHelpers, PricingInstanceMethods, PricingVirtual, PricingHydratedDocument>,
		PricingStaticMethods {}
