import { Schema, model } from 'mongoose';

import type {
	SupportRequestInstanceMethods,
	SupportRequestModel,
	SupportRequestQueryHelpers,
	SupportRequestSchemaOptions,
	SupportRequestStaticMethods,
	SupportRequestVirtual,
} from '../types/models/SupportRequest';

const required = true;

/* --------------------- Schema --------------------- */
const SupportRequestSchema = new Schema<
	SupportRequestDocumentI,
	SupportRequestModel,
	SupportRequestInstanceMethods,
	SupportRequestQueryHelpers,
	SupportRequestVirtual,
	SupportRequestStaticMethods,
	SupportRequestSchemaOptions
>(
	{
		// schema here
		website: { type: Schema.Types.ObjectId, ref: 'Website', required },
		costumerName: { type: String, required },
		phone: { type: String, required },
		report: { type: String, required },
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* SupportRequestSchema.pre('save', async function (next) {
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
const supportRequestModel = model<SupportRequestDocumentI, SupportRequestModel, SupportRequestQueryHelpers>(
	'SupportRequest',
	SupportRequestSchema
);
export default supportRequestModel;
