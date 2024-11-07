import { passwordSchema } from '^server/elements';
import bcrypt from 'bcrypt';
import { Schema, type Types, model } from 'mongoose';
import type {
	CostumerInstanceMethods,
	CostumerModel,
	CostumerQueryHelpers,
	CostumerSchemaOptions,
	CostumerStaticMethods,
	CostumerVirtual,
} from '../types/models/Costumer';

const required = true;
const unique = true;
/* --------------------- Schema --------------------- */
const CostumerSchema = new Schema<
	CostumerDocumentI<Types.ObjectId>,
	CostumerModel,
	CostumerInstanceMethods,
	CostumerQueryHelpers,
	CostumerVirtual,
	CostumerStaticMethods,
	CostumerSchemaOptions
>(
	{
		// schema here
		name: {
			type: String,
			required,
		},
		email: {
			type: String,
			required,
			unique,
		},
		phone: {
			type: String,
			required,
		},
		password: {
			type: String,
			required,
		},
		ordersHistory: {
			type: [Schema.Types.ObjectId],
			ref: 'Order',
		},
		wishlist: {
			type: [Schema.Types.ObjectId],
			ref: 'Product',
		},
		website: {
			type: Schema.Types.ObjectId,
			ref: 'Website',
			required,
		},
		enabled: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
CostumerSchema.pre('save', async function (next) {
	try {
		// hook here
		if (this.isNew || this.isModified('password')) {
			passwordSchema().parse(this.password);
			this.password = await bcrypt.hash(this.password, 10);
		}
		next();
	} catch (err) {
		next(err as Error);
	}
});

/* --------------------- Methods ---------------------  */
CostumerSchema.methods.toOptimizedObject = function () {
	return {
		id: this._id.toString(),
		name: this.name,
		email: this.email,
		phone: this.phone,
		website: this.website.toString(),
		enabled: this.enabled,
	};
};
/* --------------------- Query Helpers --------------------- */

/* --------------------- static methods --------------------- */

/* --------------------- Generate Model --------------------- */
const costumerModel = model<CostumerDocumentI<Types.ObjectId>, CostumerModel, CostumerQueryHelpers>(
	'Costumer',
	CostumerSchema
);
export default costumerModel;
