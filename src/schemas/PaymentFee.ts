import { Schema } from 'mongoose';

import type {
	PaymentFeeInstanceMethods,
	PaymentFeeModel,
	PaymentFeeQueryHelpers,
	PaymentFeeSchemaOptions,
	PaymentFeeStaticMethods,
	PaymentFeeVirtual,
} from '../types/schemas/PaymentFee';

const required = true;

/* --------------------- Schema --------------------- */
const PaymentFeeSchema = new Schema<
	PaymentFeeI,
	PaymentFeeModel,
	PaymentFeeInstanceMethods,
	PaymentFeeQueryHelpers,
	PaymentFeeVirtual,
	PaymentFeeStaticMethods,
	PaymentFeeSchemaOptions
>(
	{
		// schema here
		desk: {
			type: Number,
			required,
		},
		door: {
			type: Number,
			required,
		},
	},
	{ timestamps: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* PaymentFeeSchema.pre('save', async function (next) {
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
export default PaymentFeeSchema;
