import { Schema } from 'mongoose';

import type {
	RatingAggregationInstanceMethods,
	RatingAggregationModel,
	RatingAggregationQueryHelpers,
	RatingAggregationSchemaOptions,
	RatingAggregationStaticMethods,
	RatingAggregationVirtual,
} from '../types/schemas/RatingAggregation';

/* --------------------- Schema --------------------- */
const RatingAggregationSchema = new Schema<
	RatingAggregationI,
	RatingAggregationModel,
	RatingAggregationInstanceMethods,
	RatingAggregationQueryHelpers,
	RatingAggregationVirtual,
	RatingAggregationStaticMethods,
	RatingAggregationSchemaOptions
>(
	{
		// schema here
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* RatingAggregationSchema.pre('save', async function (next) {
	try {
	// hook here
		next();
	} catch (err) {
		next(err as Error);
	}
});
 */
/* --------------------- Methods ---------------------  */
RatingAggregationSchema.methods.toOptimizedObject = () => ({
	// methods here
});
/* --------------------- Exports ---------------------  */
export default RatingAggregationSchema;
