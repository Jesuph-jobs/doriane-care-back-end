import { Schema, type Types, model } from 'mongoose';

import type {
	NewsLetterInstanceMethods,
	NewsLetterModel,
	NewsLetterQueryHelpers,
	NewsLetterSchemaOptions,
	NewsLetterStaticMethods,
	NewsLetterVirtual,
} from '../types/models/NewsLetter';

const required = true;
const unique = true;
/* --------------------- Schema --------------------- */
const NewsLetterSchema = new Schema<
	NewsLetterDocumentI<Types.ObjectId>,
	NewsLetterModel,
	NewsLetterInstanceMethods,
	NewsLetterQueryHelpers,
	NewsLetterVirtual,
	NewsLetterStaticMethods,
	NewsLetterSchemaOptions
>(
	{
		// schema here
		website: {
			type: Schema.Types.ObjectId,
			ref: 'Website',
			required,
		},
		email: {
			type: String,
			required,
			unique,
		},
		subscribed: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* NewsLetterSchema.pre('save', async function (next) {
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
const newsLetterModel = model<NewsLetterDocumentI<Types.ObjectId>, NewsLetterModel, NewsLetterQueryHelpers>(
	'NewsLetter',
	NewsLetterSchema
);
export default newsLetterModel;
