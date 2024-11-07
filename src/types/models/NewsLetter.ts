import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type NewsLetterVirtual = object;

export interface NewsLetterInstanceMethods {
	toOptimizedObject: (this: NewsLetterHydratedDocument) => PublicNewsLetterI;
}
export type NewsLetterQueryHelpers = object;
export interface NewsLetterDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<NewsLetterDocument, NewsLetterDocumentI, ResolveSchemaOptions<NewsLetterSchemaOptions>>,
		ResolveSchemaOptions<NewsLetterSchemaOptions>
	> {}
export interface NewsLetterHydratedDocument
	extends HydratedDocument<
		FlatRecord<NewsLetterDocument>,
		NewsLetterInstanceMethods & NewsLetterVirtual,
		NewsLetterQueryHelpers
	> {}

export interface NewsLetterStaticMethods {
	// custom static methods here
}
export interface NewsLetterSchemaOptions {
	timestamps: true;
}
export interface NewsLetterModel
	extends Model<
			NewsLetterDocumentI,
			NewsLetterQueryHelpers,
			NewsLetterInstanceMethods,
			NewsLetterVirtual,
			NewsLetterHydratedDocument
		>,
		NewsLetterStaticMethods {}
