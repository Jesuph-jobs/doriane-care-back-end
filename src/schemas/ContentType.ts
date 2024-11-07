import { Schema } from 'mongoose';

import type {
	ContentTypeInstanceMethods,
	ContentTypeModel,
	ContentTypeQueryHelpers,
	ContentTypeSchemaOptions,
	ContentTypeStaticMethods,
	ContentTypeVirtual,
} from '../types/schemas/ContentType';

/* --------------------- Schema --------------------- */
const ContentTypeSchema = new Schema<
	ContentTypeI,
	ContentTypeModel,
	ContentTypeInstanceMethods,
	ContentTypeQueryHelpers,
	ContentTypeVirtual,
	ContentTypeStaticMethods,
	ContentTypeSchemaOptions
>(
	{
		// schema here
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* ContentTypeSchema.pre('save', async function (next) {
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
export default ContentTypeSchema;
