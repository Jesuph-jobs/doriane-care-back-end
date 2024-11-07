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

export type CollectionVirtual = object;

export interface CollectionInstanceMethods {
	toOptimizedObject: (this: CollectionHydratedDocument) => PublicCollectionI;
}
export type CollectionQueryHelpers = object;
export interface CollectionDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			CollectionDocument,
			CollectionDocumentI<Types.ObjectId>,
			ResolveSchemaOptions<CollectionSchemaOptions>
		>,
		ResolveSchemaOptions<CollectionSchemaOptions>
	> {}
export interface CollectionHydratedDocument
	extends HydratedDocument<
		FlatRecord<CollectionDocument>,
		CollectionInstanceMethods & CollectionVirtual,
		CollectionQueryHelpers
	> {}

export interface CollectionStaticMethods {
	// custom static methods here
}
export interface CollectionSchemaOptions {
	timestamps: true;
}
export interface CollectionModel
	extends Model<
			CollectionDocumentI<Types.ObjectId>,
			CollectionQueryHelpers,
			CollectionInstanceMethods,
			CollectionVirtual,
			CollectionHydratedDocument
		>,
		CollectionStaticMethods {}
