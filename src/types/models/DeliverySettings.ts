import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type DeliverySettingsVirtual = object;

export interface DeliverySettingsInstanceMethods {}
export type DeliverySettingsQueryHelpers = object;
export interface DeliverySettingsDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			DeliverySettingsDocument,
			DeliverySettingsDocumentI,
			ResolveSchemaOptions<DeliverySettingsSchemaOptions>
		>,
		ResolveSchemaOptions<DeliverySettingsSchemaOptions>
	> {}
export interface DeliverySettingsHydratedDocument
	extends HydratedDocument<
		FlatRecord<DeliverySettingsDocument>,
		DeliverySettingsInstanceMethods & DeliverySettingsVirtual,
		DeliverySettingsQueryHelpers
	> {}

export interface DeliverySettingsStaticMethods {
	// custom static methods here
}
export interface DeliverySettingsSchemaOptions {
	timestamps: true;
}
export interface DeliverySettingsModel
	extends Model<
			DeliverySettingsDocumentI,
			DeliverySettingsQueryHelpers,
			DeliverySettingsInstanceMethods,
			DeliverySettingsVirtual,
			DeliverySettingsHydratedDocument
		>,
		DeliverySettingsStaticMethods {}
