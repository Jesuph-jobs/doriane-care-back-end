import { Schema } from 'mongoose';

import {
	DiscountValueEnums,
	type DiscountValueInstanceMethods,
	type DiscountValueModel,
	type DiscountValueQueryHelpers,
	type DiscountValueSchemaOptions,
	type DiscountValueStaticMethods,
	type DiscountValueVirtual,
} from '../types/schemas/DiscountValue';

const required = true;

/* --------------------- Schema --------------------- */
const DiscountValueSchema = new Schema<
	DiscountValueI,
	DiscountValueModel,
	DiscountValueInstanceMethods,
	DiscountValueQueryHelpers,
	DiscountValueVirtual,
	DiscountValueStaticMethods,
	DiscountValueSchemaOptions
>(
	{
		// schema here
		type: {
			type: String,
			required,
			enum: DiscountValueEnums,
		},
		value: {
			type: Number,
			required,
		},
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* DiscountValueSchema.pre('save', async function (next) {
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
export default DiscountValueSchema;
