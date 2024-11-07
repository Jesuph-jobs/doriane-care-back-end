import { Schema, type Types, model } from 'mongoose';

import type {
	LogInstanceMethods,
	LogModel,
	LogQueryHelpers,
	LogSchemaOptions,
	LogStaticMethods,
	LogVirtual,
} from '../types/models/Log';

const required = true;

/* --------------------- Schema --------------------- */
const LogSchema = new Schema<
	LogI<Types.ObjectId>,
	LogModel,
	LogInstanceMethods,
	LogQueryHelpers,
	LogVirtual,
	LogStaticMethods,
	LogSchemaOptions
>(
	{
		// schema here
		website: {
			type: Schema.Types.ObjectId,
			ref: 'Website',
			required,
		},
		action: {
			type: String,
			required,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required,
		},
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* LogSchema.pre('save', async function (next) {
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
const logModel = model<LogI<Types.ObjectId>, LogModel, LogQueryHelpers>('Log', LogSchema);
export default logModel;
