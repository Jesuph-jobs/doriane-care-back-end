import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type DeliveryVirtual = object;

export interface DeliveryInstanceMethods {}
export type DeliveryQueryHelpers = object;
export interface DeliveryDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<DeliveryDocument, DeliveryI, ResolveSchemaOptions<DeliverySchemaOptions>>,
		ResolveSchemaOptions<DeliverySchemaOptions>
	> {}
export interface DeliveryHydratedDocument
	extends HydratedDocument<
		FlatRecord<DeliveryDocument>,
		DeliveryInstanceMethods & DeliveryVirtual,
		DeliveryQueryHelpers
	> {}

export interface DeliveryStaticMethods {
	// custom static methods here
}
export interface DeliverySchemaOptions {
	timestamps: true;
}
export interface DeliveryModel
	extends Model<DeliveryI, DeliveryQueryHelpers, DeliveryInstanceMethods, DeliveryVirtual, DeliveryHydratedDocument>,
		DeliveryStaticMethods {}
export const DeliveryChoiceEnums: DeliveryChoiceTypes[] = ['desk', 'door'];
