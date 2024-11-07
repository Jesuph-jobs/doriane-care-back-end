import { Schema, type Types, model } from 'mongoose';

import type {
	GuestInstanceMethods,
	GuestModel,
	GuestQueryHelpers,
	GuestSchemaOptions,
	GuestStaticMethods,
	GuestVirtual,
} from '../types/models/Guest';

const required = true;
/* --------------------- Schema --------------------- */
const GuestSchema = new Schema<
	GuestDocumentI<Types.ObjectId>,
	GuestModel,
	GuestInstanceMethods,
	GuestQueryHelpers,
	GuestVirtual,
	GuestStaticMethods,
	GuestSchemaOptions
>(
	{
		name: {
			type: String,
			required,
			trim: true,
		},
		phone: {
			type: String,
			required,
			trim: true,
		},
		website: {
			type: Schema.Types.ObjectId,
			required,
		},
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */
GuestSchema.methods.toOptimizedObject = function () {
	return {
		id: this._id.toString(),
		name: this.name,
		phone: this.phone,
		website: this.website.toString(),
	};
};
/* --------------------- Query Helpers --------------------- */

/* --------------------- static methods --------------------- */

/* --------------------- Generate Model --------------------- */
const guestModel = model<GuestDocumentI<Types.ObjectId>, GuestModel, GuestQueryHelpers>('Guest', GuestSchema);
export default guestModel;
