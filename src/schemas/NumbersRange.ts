import { Schema } from 'mongoose';

import type {
	NumbersRangeInstanceMethods,
	NumbersRangeModel,
	NumbersRangeQueryHelpers,
	NumbersRangeSchemaOptions,
	NumbersRangeStaticMethods,
	NumbersRangeVirtual,
} from '../types/schemas/NumbersRange';

const required = true;
/* --------------------- Schema --------------------- */
const NumbersRangeSchema = new Schema<
	NumbersRangeI,
	NumbersRangeModel,
	NumbersRangeInstanceMethods,
	NumbersRangeQueryHelpers,
	NumbersRangeVirtual,
	NumbersRangeStaticMethods,
	NumbersRangeSchemaOptions
>(
	{
		// schema here
		min: {
			type: Number,
			required,
		},
		max: {
			type: Number,
			required,
		},
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* NumbersRangeSchema.pre('save', async function (next) {
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
export default NumbersRangeSchema;
