import { Schema } from 'mongoose';

import { addressSchema } from '@server/schemas/address';
import {
	DeliveryChoiceEnums,
	type DeliveryInstanceMethods,
	type DeliveryModel,
	type DeliveryQueryHelpers,
	type DeliverySchemaOptions,
	type DeliveryStaticMethods,
	type DeliveryVirtual,
} from '../types/schemas/Delivery';

const required = true;

/* --------------------- Schema --------------------- */
const DeliverySchema = new Schema<
	DeliveryI,
	DeliveryModel,
	DeliveryInstanceMethods,
	DeliveryQueryHelpers,
	DeliveryVirtual,
	DeliveryStaticMethods,
	DeliverySchemaOptions
>(
	{
		// schema here
		cost: {
			type: Number,
			required,
		},
		address: {
			type: addressSchema,
			required,
		},
		deliveryChoice: {
			type: String,
			required,
			enum: DeliveryChoiceEnums,
		},
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* DeliverySchema.pre('save', async function (next) {
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
export default DeliverySchema;
