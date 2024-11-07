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

export type ReviewVirtual = object;

export interface ReviewInstanceMethods {
	toOptimizedObject: (this: ReviewHydratedDocument) => PublicReviewI;
}
export type ReviewQueryHelpers = object;
export interface ReviewDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<ReviewDocument, ReviewDocumentI<Types.ObjectId>, ResolveSchemaOptions<ReviewSchemaOptions>>,
		ResolveSchemaOptions<ReviewSchemaOptions>
	> {}
export interface ReviewHydratedDocument
	extends HydratedDocument<FlatRecord<ReviewDocument>, ReviewInstanceMethods & ReviewVirtual, ReviewQueryHelpers> {}

export interface ReviewStaticMethods {
	// custom static methods here
}
export interface ReviewSchemaOptions {
	timestamps: true;
}
export interface ReviewModel
	extends Model<
			ReviewDocumentI<Types.ObjectId>,
			ReviewQueryHelpers,
			ReviewInstanceMethods,
			ReviewVirtual,
			ReviewHydratedDocument
		>,
		ReviewStaticMethods {}
