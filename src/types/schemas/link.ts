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

export type LinkVirtual = object;

export interface LinkInstanceMethods {}
export type LinkQueryHelpers = object;
export interface LinkDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<LinkDocument, LinkI<Types.ObjectId>, ResolveSchemaOptions<LinkSchemaOptions>>,
		ResolveSchemaOptions<LinkSchemaOptions>
	> {}
export interface LinkHydratedDocument
	extends HydratedDocument<FlatRecord<LinkDocument>, LinkInstanceMethods & LinkVirtual, LinkQueryHelpers> {}

export interface LinkStaticMethods {
	// custom static methods here
}
export interface LinkSchemaOptions {
	timestamps: true;
}
export interface LinkModel
	extends Model<LinkI<Types.ObjectId>, LinkQueryHelpers, LinkInstanceMethods, LinkVirtual, LinkHydratedDocument>,
		LinkStaticMethods {}
export const LinkEnums: LinkKeys[] = ['Website', 'Product', 'Collection', 'Category', 'Blog', 'Costumer', 'Guest'];
