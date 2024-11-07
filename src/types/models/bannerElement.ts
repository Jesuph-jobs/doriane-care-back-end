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

export type BannerElementVirtual = object;

export interface BannerElementInstanceMethods {}
export type BannerElementQueryHelpers = object;
export interface BannerElementDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			BannerElementDocument,
			BannerElementI<Types.ObjectId>,
			ResolveSchemaOptions<BannerElementSchemaOptions>
		>,
		ResolveSchemaOptions<BannerElementSchemaOptions>
	> {}
export interface BannerElementHydratedDocument
	extends HydratedDocument<
		FlatRecord<BannerElementDocument>,
		BannerElementInstanceMethods & BannerElementVirtual,
		BannerElementQueryHelpers
	> {}

export interface BannerElementStaticMethods {
	// custom static methods here
}
export interface BannerElementSchemaOptions {
	timestamps: true;
	_id: false;
}
export interface BannerElementModel
	extends Model<
			BannerElementI<Types.ObjectId>,
			BannerElementQueryHelpers,
			BannerElementInstanceMethods,
			BannerElementVirtual,
			BannerElementHydratedDocument
		>,
		BannerElementStaticMethods {}
