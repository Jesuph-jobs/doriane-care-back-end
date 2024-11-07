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

export type BlogVirtual = object;

export interface BlogInstanceMethods {
	toOptimizedObject: (this: BlogHydratedDocument) => PublicBlogI;
}
export type BlogQueryHelpers = object;
export interface BlogDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<BlogDocument, BlogDocumentI<Types.ObjectId>, ResolveSchemaOptions<BlogSchemaOptions>>,
		ResolveSchemaOptions<BlogSchemaOptions>
	> {}
export interface BlogHydratedDocument
	extends HydratedDocument<FlatRecord<BlogDocument>, BlogInstanceMethods & BlogVirtual, BlogQueryHelpers> {}

export interface BlogStaticMethods {
	// custom static methods here
}
export interface BlogSchemaOptions {
	timestamps: true;
}
export interface BlogModel
	extends Model<
			BlogDocumentI<Types.ObjectId>,
			BlogQueryHelpers,
			BlogInstanceMethods,
			BlogVirtual,
			BlogHydratedDocument
		>,
		BlogStaticMethods {}
