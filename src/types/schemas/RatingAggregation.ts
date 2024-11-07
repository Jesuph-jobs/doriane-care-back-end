import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type RatingAggregationVirtual = object;

export interface RatingAggregationInstanceMethods {}
export type RatingAggregationQueryHelpers = object;
export interface RatingAggregationDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			RatingAggregationDocument,
			RatingAggregationI,
			ResolveSchemaOptions<RatingAggregationSchemaOptions>
		>,
		ResolveSchemaOptions<RatingAggregationSchemaOptions>
	> {}
export interface RatingAggregationHydratedDocument
	extends HydratedDocument<
		FlatRecord<RatingAggregationDocument>,
		RatingAggregationInstanceMethods & RatingAggregationVirtual,
		RatingAggregationQueryHelpers
	> {}

export interface RatingAggregationStaticMethods {
	// custom static methods here
}
export interface RatingAggregationSchemaOptions {
	timestamps: true;
}
export interface RatingAggregationModel
	extends Model<
			RatingAggregationI,
			RatingAggregationQueryHelpers,
			RatingAggregationInstanceMethods,
			RatingAggregationVirtual,
			RatingAggregationHydratedDocument
		>,
		RatingAggregationStaticMethods {}
