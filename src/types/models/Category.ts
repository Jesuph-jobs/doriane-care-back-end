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

export type CategoryVirtual = object;

export interface CategoryInstanceMethods {
	toOptimizedObject: (this: CategoryHydratedDocument) => PublicCategoryI;
}
export type CategoryQueryHelpers = object;
export interface CategoryDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			CategoryDocument,
			CategoryDocumentI<Types.ObjectId>,
			ResolveSchemaOptions<CategorySchemaOptions>
		>,
		ResolveSchemaOptions<CategorySchemaOptions>
	> {}
export interface CategoryHydratedDocument
	extends HydratedDocument<
		FlatRecord<CategoryDocument>,
		CategoryInstanceMethods & CategoryVirtual,
		CategoryQueryHelpers
	> {}

export interface CategoryStaticMethods {
	// custom static methods here
}
export interface CategorySchemaOptions {
	timestamps: true;
}
export interface CategoryModel
	extends Model<
			CategoryDocumentI<Types.ObjectId>,
			CategoryQueryHelpers,
			CategoryInstanceMethods,
			CategoryVirtual,
			CategoryHydratedDocument
		>,
		CategoryStaticMethods {}
export const PublishableContentEnums: PublishableContentTypeI[] = ['b', 'p'];
