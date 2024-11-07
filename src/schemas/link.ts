import { Schema, type Types } from 'mongoose';

import {
	LinkEnums,
	type LinkInstanceMethods,
	type LinkModel,
	type LinkQueryHelpers,
	type LinkSchemaOptions,
	type LinkStaticMethods,
	type LinkVirtual,
} from '../types/schemas/link';

const required = true;

/* --------------------- Schema --------------------- */
const linkSchema = new Schema<
	LinkI<Types.ObjectId>,
	LinkModel,
	LinkInstanceMethods,
	LinkQueryHelpers,
	LinkVirtual,
	LinkStaticMethods,
	LinkSchemaOptions
>(
	{
		// schema here
		ref: {
			type: Schema.Types.ObjectId,
			refPath: 'collection',
			required,
		},
		collection: {
			type: String,
			required,
			enum: LinkEnums,
		},
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* LinkSchema.pre('save', async function (next) {
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
export default linkSchema;
