import { Schema, type Types, model } from 'mongoose';

import MetaInformationSchema from '@server/schemas/MetaInformation';
import RatingAggregationSchema from '@server/schemas/RatingAggregation';
import { personalInformationSchema } from '../schemas/PersonalInformation';
import type {
	BlogInstanceMethods,
	BlogModel,
	BlogQueryHelpers,
	BlogSchemaOptions,
	BlogStaticMethods,
	BlogVirtual,
} from '../types/models/Blog';

const required = true;
const unique = true;
/* --------------------- Schema --------------------- */
const BlogSchema = new Schema<
	BlogDocumentI<Types.ObjectId>,
	BlogModel,
	BlogInstanceMethods,
	BlogQueryHelpers,
	BlogVirtual,
	BlogStaticMethods,
	BlogSchemaOptions
>(
	{
		// schema here
		website: {
			type: Schema.Types.ObjectId,
			ref: 'Website',
			required,
		},
		slug: {
			type: String,
			required,
			unique,
		},
		name: { type: String, required },
		description: { type: String, required },
		meta: {
			type: MetaInformationSchema,
			required,
		},
		tags: { type: [{ type: String, required }], required },
		enabled: {
			type: Boolean,
			default: true,
		},
		author: { type: personalInformationSchema, required },
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
			required,
		},
		content: { type: String, required },
		ratingAggregation: {
			type: RatingAggregationSchema,
			required,
		},
		views: { type: Number, default: 0 },
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* BlogSchema.pre('save', async function (next) {
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
const blogModel = model<BlogDocumentI<Types.ObjectId>, BlogModel, BlogQueryHelpers>('Blog', BlogSchema);
export default blogModel;
