import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type WebSettingsVirtual = object;

export interface WebSettingsInstanceMethods {
	toOptimizedObject: (this: WebSettingsHydratedDocument) => PublicWebSiteI;
}
export type WebSettingsQueryHelpers = object;
export interface WebSettingsDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<WebSettingsDocument, WebSiteDocumentI, ResolveSchemaOptions<WebSettingsSchemaOptions>>,
		ResolveSchemaOptions<WebSettingsSchemaOptions>
	> {}
export interface WebSettingsHydratedDocument
	extends HydratedDocument<
		FlatRecord<WebSettingsDocument>,
		WebSettingsInstanceMethods & WebSettingsVirtual,
		WebSettingsQueryHelpers
	> {}

export interface WebSettingsStaticMethods {
	// custom static methods here
}
export interface WebSettingsSchemaOptions {
	timestamps: true;
}
export interface WebSettingsModel
	extends Model<
			WebSiteDocumentI,
			WebSettingsQueryHelpers,
			WebSettingsInstanceMethods,
			WebSettingsVirtual,
			WebSettingsHydratedDocument
		>,
		WebSettingsStaticMethods {}
