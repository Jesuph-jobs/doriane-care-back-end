import { Schema, type Types, model } from 'mongoose';

import MetaInformationSchema from '@server/schemas/MetaInformation';
import {
	type CategoryInstanceMethods,
	type CategoryModel,
	type CategoryQueryHelpers,
	type CategorySchemaOptions,
	type CategoryStaticMethods,
	type CategoryVirtual,
	PublishableContentEnums,
} from '../types/models/Category';

const required = true;
const unique = true;
/* --------------------- Schema --------------------- */
const CategorySchema = new Schema<
	CategoryDocumentI<Types.ObjectId>,
	CategoryModel,
	CategoryInstanceMethods,
	CategoryQueryHelpers,
	CategoryVirtual,
	CategoryStaticMethods,
	CategorySchemaOptions
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
		for: { type: String, enum: PublishableContentEnums, required },
		parentCategory: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
		},
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* CategorySchema.pre('save', async function (next) {
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
const categoryModel = model<CategoryDocumentI<Types.ObjectId>, CategoryModel, CategoryQueryHelpers>(
	'Category',
	CategorySchema
);
export default categoryModel;
