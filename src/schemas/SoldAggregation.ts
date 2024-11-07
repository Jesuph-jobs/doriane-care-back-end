import { Schema } from 'mongoose';

import type {
	SoldAggregationInstanceMethods,
	SoldAggregationModel,
	SoldAggregationQueryHelpers,
	SoldAggregationSchemaOptions,
	SoldAggregationStaticMethods,
	SoldAggregationVirtual,
} from '../types/schemas/SoldAggregation';

/* --------------------- Schema --------------------- */
const SoldAggregationSchema = new Schema<
	SoldAggregationI,
	SoldAggregationModel,
	SoldAggregationInstanceMethods,
	SoldAggregationQueryHelpers,
	SoldAggregationVirtual,
	SoldAggregationStaticMethods,
	SoldAggregationSchemaOptions
>(
	{
		// schema here
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* SoldAggregationSchema.pre('save', async function (next) {
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
export default SoldAggregationSchema;
