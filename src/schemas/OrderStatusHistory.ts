import { Schema, type Types } from 'mongoose';

import { OrderStatusEnums } from '!server/models/Order';
import type {
	OrderStatusHistoryInstanceMethods,
	OrderStatusHistoryModel,
	OrderStatusHistoryQueryHelpers,
	OrderStatusHistorySchemaOptions,
	OrderStatusHistoryStaticMethods,
	OrderStatusHistoryVirtual,
} from '../types/schemas/OrderStatusHistory';

const required = true;
/* --------------------- Schema --------------------- */
const OrderStatusHistorySchema = new Schema<
	OrderStatusHistoryI<Types.ObjectId>,
	OrderStatusHistoryModel,
	OrderStatusHistoryInstanceMethods,
	OrderStatusHistoryQueryHelpers,
	OrderStatusHistoryVirtual,
	OrderStatusHistoryStaticMethods,
	OrderStatusHistorySchemaOptions
>(
	{
		// schema here
		changedBy: { type: Schema.Types.ObjectId, required, ref: 'User' },
		status: { type: String, required, enum: OrderStatusEnums },
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* OrderStatusHistorySchema.pre('save', async function (next) {
	try {
	// hook here
		next();
	} catch (err) {
		next(err as Error);
	}
});
 */
/* --------------------- Methods ---------------------  */

/* --------------------- Exports ---------------------  */
export default OrderStatusHistorySchema;
