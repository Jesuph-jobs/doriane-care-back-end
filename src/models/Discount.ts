import { Schema, type Types, model } from 'mongoose';

import DiscountValueSchema from '@server/schemas/DiscountValue';
import type {
	DiscountInstanceMethods,
	DiscountModel,
	DiscountQueryHelpers,
	DiscountSchemaOptions,
	DiscountStaticMethods,
	DiscountVirtual,
} from '../types/models/Discount';

const required = true;

/* --------------------- Schema --------------------- */
const DiscountSchema = new Schema<
	DiscountDocumentI<Types.ObjectId>,
	DiscountModel,
	DiscountInstanceMethods,
	DiscountQueryHelpers,
	DiscountVirtual,
	DiscountStaticMethods,
	DiscountSchemaOptions
>(
	{
		// schema here
		website: {
			type: Schema.Types.ObjectId,
			ref: 'Website',
			required,
		},
		enabled: {
			type: Boolean,
			default: true,
		},
		code: {
			type: String,
			required,
			trim: true,
		},
		expiringDate: {
			type: Date,
			required,
		},
		value: {
			type: DiscountValueSchema,
			required,
		},
		maxValue: {
			type: DiscountValueSchema,
		},
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* DiscountSchema.pre('save', async function (next) {
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
const discountModel = model<DiscountDocumentI<Types.ObjectId>, DiscountModel, DiscountQueryHelpers>(
	'Discount',
	DiscountSchema
);
export default discountModel;
