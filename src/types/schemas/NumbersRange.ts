import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type NumbersRangeVirtual = object;

export interface NumbersRangeInstanceMethods {}
export type NumbersRangeQueryHelpers = object;
export interface NumbersRangeDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<NumbersRangeDocument, NumbersRangeI, ResolveSchemaOptions<NumbersRangeSchemaOptions>>,
		ResolveSchemaOptions<NumbersRangeSchemaOptions>
	> {}
export interface NumbersRangeHydratedDocument
	extends HydratedDocument<
		FlatRecord<NumbersRangeDocument>,
		NumbersRangeInstanceMethods & NumbersRangeVirtual,
		NumbersRangeQueryHelpers
	> {}

export interface NumbersRangeStaticMethods {
	// custom static methods here
}
export interface NumbersRangeSchemaOptions {
	timestamps: true;
}
export interface NumbersRangeModel
	extends Model<
			NumbersRangeI,
			NumbersRangeQueryHelpers,
			NumbersRangeInstanceMethods,
			NumbersRangeVirtual,
			NumbersRangeHydratedDocument
		>,
		NumbersRangeStaticMethods {}
