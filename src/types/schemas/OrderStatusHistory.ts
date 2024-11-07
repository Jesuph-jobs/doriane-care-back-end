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

export type OrderStatusHistoryVirtual = object;

export interface OrderStatusHistoryInstanceMethods {}
export type OrderStatusHistoryQueryHelpers = object;
export interface OrderStatusHistoryDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			OrderStatusHistoryDocument,
			OrderStatusHistoryI<Types.ObjectId>,
			ResolveSchemaOptions<OrderStatusHistorySchemaOptions>
		>,
		ResolveSchemaOptions<OrderStatusHistorySchemaOptions>
	> {}
export interface OrderStatusHistoryHydratedDocument
	extends HydratedDocument<
		FlatRecord<OrderStatusHistoryDocument>,
		OrderStatusHistoryInstanceMethods & OrderStatusHistoryVirtual,
		OrderStatusHistoryQueryHelpers
	> {}

export interface OrderStatusHistoryStaticMethods {
	// custom static methods here
}
export interface OrderStatusHistorySchemaOptions {
	timestamps: true;
}
export interface OrderStatusHistoryModel
	extends Model<
			OrderStatusHistoryI<Types.ObjectId>,
			OrderStatusHistoryQueryHelpers,
			OrderStatusHistoryInstanceMethods,
			OrderStatusHistoryVirtual,
			OrderStatusHistoryHydratedDocument
		>,
		OrderStatusHistoryStaticMethods {}
