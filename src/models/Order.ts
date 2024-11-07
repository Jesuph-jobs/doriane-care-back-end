import { Schema, type Types, model } from 'mongoose';

import DeliverySchema from '@server/schemas/Delivery';
import OrderStatusHistorySchema from '@server/schemas/OrderStatusHistory';
import ProductsCartSchema from '@server/schemas/ProductsCart';
import linkSchema from '@server/schemas/link';
import {
	type OrderInstanceMethods,
	type OrderModel,
	type OrderQueryHelpers,
	type OrderSchemaOptions,
	type OrderStaticMethods,
	OrderStatusEnums,
	type OrderVirtual,
} from '../types/models/Order';

const required = true;

/* --------------------- Schema --------------------- */
const OrderSchema = new Schema<
	OrderDocumentI<Types.ObjectId>,
	OrderModel,
	OrderInstanceMethods,
	OrderQueryHelpers,
	OrderVirtual,
	OrderStaticMethods,
	OrderSchemaOptions
>(
	{
		// schema here
		costumer: {
			type: linkSchema,
			required,
		},
		delivery: {
			type: DeliverySchema,
			required,
		},
		products: {
			type: [ProductsCartSchema],
			required,
		},
		totalPrice: {
			type: Number,
			required,
		},
		status: {
			type: String,
			required,
			enum: OrderStatusEnums,
		},
		statusHistory: {
			type: [OrderStatusHistorySchema],
			required,
		},
		website: {
			type: Schema.Types.ObjectId,
			required,
		},
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* OrderSchema.pre('save', async function (next) {
	try {
	// hook here
		next();
	} catch (err) {
		next(err as Error);
	}
});
 */
/* --------------------- Methods ---------------------  */

/* --------------------- Query Helpers --------------------- */

/* --------------------- static methods --------------------- */

/* --------------------- Generate Model --------------------- */
const orderModel = model<OrderDocumentI<Types.ObjectId>, OrderModel, OrderQueryHelpers>('Order', OrderSchema);
export default orderModel;
