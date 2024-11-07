import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type SocialMediaUrlsVirtual = object;

export interface SocialMediaUrlsInstanceMethods {
	toOptimizedObject: (this: SocialMediaUrlsHydratedDocument) => SocialMediaUrlsI;
}
export type SocialMediaUrlsQueryHelpers = object;
export interface SocialMediaUrlsDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			SocialMediaUrlsDocument,
			SocialMediaUrlsI,
			ResolveSchemaOptions<SocialMediaUrlsSchemaOptions>
		>,
		ResolveSchemaOptions<SocialMediaUrlsSchemaOptions>
	> {}
export interface SocialMediaUrlsHydratedDocument
	extends HydratedDocument<
		FlatRecord<SocialMediaUrlsDocument>,
		SocialMediaUrlsInstanceMethods & SocialMediaUrlsVirtual,
		SocialMediaUrlsQueryHelpers
	> {}

export type SocialMediaUrlsStaticMethods = object;
export interface SocialMediaUrlsSchemaOptions {
	timestamps: false;
	_id: false;
}
export interface SocialMediaUrlsModel
	extends Model<
			SocialMediaUrlsI,
			SocialMediaUrlsQueryHelpers,
			SocialMediaUrlsInstanceMethods,
			SocialMediaUrlsVirtual,
			SocialMediaUrlsHydratedDocument
		>,
		SocialMediaUrlsStaticMethods {}
