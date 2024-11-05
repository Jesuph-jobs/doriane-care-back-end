import {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export interface SocialMediaUrlsVirtual {}

export interface SocialMediaUrlsInstanceMethods {
	toOptimizedObject: (this: SocialMediaUrlsHydratedDocument) => SocialMediaUrlsI;
}
/* QueryWithHelpers<SocialMediaUrlsHydratedDocument | null, SocialMediaUrlsHydratedDocument, SocialMediaUrlsQueryHelpers, SocialMediaUrlsDocumentI<ValidationHydratedDocument>,'findOne' >; */
export interface SocialMediaUrlsQueryHelpers {}
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

export interface SocialMediaUrlsStaticMethods {
	// custom static methods here
}
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
