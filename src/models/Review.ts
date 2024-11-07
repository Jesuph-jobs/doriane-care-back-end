import { Schema, type Types, model } from 'mongoose';

import linkSchema from '@server/schemas/link';
import { personalInformationSchema } from '../schemas/PersonalInformation';
import type {
	ReviewInstanceMethods,
	ReviewModel,
	ReviewQueryHelpers,
	ReviewSchemaOptions,
	ReviewStaticMethods,
	ReviewVirtual,
} from '../types/models/Review';

const required = true;

/* --------------------- Schema --------------------- */
const ReviewSchema = new Schema<
	ReviewDocumentI<Types.ObjectId>,
	ReviewModel,
	ReviewInstanceMethods,
	ReviewQueryHelpers,
	ReviewVirtual,
	ReviewStaticMethods,
	ReviewSchemaOptions
>(
	{
		// schema here
		author: { type: personalInformationSchema, required },
		content: { type: String, required },
		createdBy: { type: linkSchema, required },
		link: { type: linkSchema, required },
		rating: { type: Number, required },
		website: { type: Schema.Types.ObjectId, ref: 'Website', required },
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* ReviewSchema.pre('save', async function (next) {
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
const reviewModel = model<ReviewDocumentI<Types.ObjectId>, ReviewModel, ReviewQueryHelpers>('Review', ReviewSchema);
export default reviewModel;
