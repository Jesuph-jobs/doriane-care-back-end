import { Schema } from 'mongoose';

import type {
	ProductFlagsInstanceMethods,
	ProductFlagsModel,
	ProductFlagsQueryHelpers,
	ProductFlagsSchemaOptions,
	ProductFlagsStaticMethods,
	ProductFlagsVirtual,
} from '../types/schemas/ProductFlags';

/* --------------------- Schema --------------------- */
const ProductFlagsSchema = new Schema<
	ProductFlagsI,
	ProductFlagsModel,
	ProductFlagsInstanceMethods,
	ProductFlagsQueryHelpers,
	ProductFlagsVirtual,
	ProductFlagsStaticMethods,
	ProductFlagsSchemaOptions
>(
	{
		// schema here
		comingSoon: { type: Boolean, default: false },
		preOrder: { type: Boolean, default: false },
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* ProductFlagsSchema.pre('save', async function (next) {
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
export default ProductFlagsSchema;
