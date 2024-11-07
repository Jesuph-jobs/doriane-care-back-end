import { Schema } from 'mongoose';

import type {
	PricingInstanceMethods,
	PricingModel,
	PricingQueryHelpers,
	PricingSchemaOptions,
	PricingStaticMethods,
	PricingVirtual,
} from '../types/schemas/Pricing';

const required = true;

/* --------------------- Schema --------------------- */
const PricingSchema = new Schema<
	PricingI,
	PricingModel,
	PricingInstanceMethods,
	PricingQueryHelpers,
	PricingVirtual,
	PricingStaticMethods,
	PricingSchemaOptions
>(
	{
		// schema here
		current: { type: Number, required },
		original: { type: Number },
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* PricingSchema.pre('save', async function (next) {
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
export default PricingSchema;
