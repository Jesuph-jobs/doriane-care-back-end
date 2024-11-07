import { Schema, type Types, model } from 'mongoose';

import PaymentFeeSchema from '@server/schemas/PaymentFee';
import linkSchema from '@server/schemas/link';
import type {
	DeliverySettingsInstanceMethods,
	DeliverySettingsModel,
	DeliverySettingsQueryHelpers,
	DeliverySettingsSchemaOptions,
	DeliverySettingsStaticMethods,
	DeliverySettingsVirtual,
} from '../types/models/DeliverySettings';

const required = true;

/* --------------------- Schema --------------------- */
const DeliverySettingsSchema = new Schema<
	DeliverySettingsDocumentI<Types.ObjectId>,
	DeliverySettingsModel,
	DeliverySettingsInstanceMethods,
	DeliverySettingsQueryHelpers,
	DeliverySettingsVirtual,
	DeliverySettingsStaticMethods,
	DeliverySettingsSchemaOptions
>(
	{
		// schema here
		defaultFee: { type: PaymentFeeSchema, required },
		fees: {
			type: [PaymentFeeSchema],
			required,
		},
		zones: { type: [Number], required },
		link: { type: linkSchema, required },
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* DeliverySettingsSchema.pre('save', async function (next) {
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
const deliverySettingsModel = model<
	DeliverySettingsDocumentI<Types.ObjectId>,
	DeliverySettingsModel,
	DeliverySettingsQueryHelpers
>('DeliverySettings', DeliverySettingsSchema);
export default deliverySettingsModel;
