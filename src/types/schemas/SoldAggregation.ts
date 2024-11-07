import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type SoldAggregationVirtual = object;

export interface SoldAggregationInstanceMethods {}
export type SoldAggregationQueryHelpers = object;
export interface SoldAggregationDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			SoldAggregationDocument,
			SoldAggregationI,
			ResolveSchemaOptions<SoldAggregationSchemaOptions>
		>,
		ResolveSchemaOptions<SoldAggregationSchemaOptions>
	> {}
export interface SoldAggregationHydratedDocument
	extends HydratedDocument<
		FlatRecord<SoldAggregationDocument>,
		SoldAggregationInstanceMethods & SoldAggregationVirtual,
		SoldAggregationQueryHelpers
	> {}

export interface SoldAggregationStaticMethods {
	// custom static methods here
}
export interface SoldAggregationSchemaOptions {
	timestamps: true;
}
export interface SoldAggregationModel
	extends Model<
			SoldAggregationI,
			SoldAggregationQueryHelpers,
			SoldAggregationInstanceMethods,
			SoldAggregationVirtual,
			SoldAggregationHydratedDocument
		>,
		SoldAggregationStaticMethods {}
