import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type OrderVirtual = object;

export interface OrderInstanceMethods {
	toOptimizedObject: (this: OrderHydratedDocument) => PublicOrderI;
}
export type OrderQueryHelpers = object;
export interface OrderDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<OrderDocument, OrderDocumentI, ResolveSchemaOptions<OrderSchemaOptions>>,
		ResolveSchemaOptions<OrderSchemaOptions>
	> {}
export interface OrderHydratedDocument
	extends HydratedDocument<FlatRecord<OrderDocument>, OrderInstanceMethods & OrderVirtual, OrderQueryHelpers> {}

export interface OrderStaticMethods {
	// custom static methods here
}
export interface OrderSchemaOptions {
	timestamps: true;
}
export interface OrderModel
	extends Model<OrderDocumentI, OrderQueryHelpers, OrderInstanceMethods, OrderVirtual, OrderHydratedDocument>,
		OrderStaticMethods {}
export const OrderStatusEnums: OrderStatusTypes[] = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
