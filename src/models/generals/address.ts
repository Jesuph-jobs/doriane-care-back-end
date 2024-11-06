import { /* model, */ Schema } from 'mongoose';

import type {
	AddressInstanceMethods,
	AddressModel,
	AddressQueryHelpers,
	AddressSchemaOptions,
	AddressStaticMethods,
	AddressVirtual,
} from '!server/models/generals/Address';

const required = true;
/* --------------------- Schema --------------------- */
const addressSchema = new Schema<
	AddressI,
	AddressModel,
	AddressInstanceMethods,
	AddressQueryHelpers,
	AddressVirtual,
	AddressStaticMethods,
	AddressSchemaOptions
>(
	{
		province: {
			type: Number,
			required,
			min: 1,
			max: 58,
		},
		city: {
			type: Number,
			required,
			min: 0,
			max: 100000,
		},
		addresses: {
			type: [String],
			required,
			validate: {
				validator: (v: string[]) => v.length > 0,
				message: 'Address must have at least one element',
			},
		},
	},
	{ timestamps: false, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */
addressSchema.methods.toOptimizedObject = function () {
	return this.toObject();
};

/* --------------------- Query Helpers --------------------- */

/* --------------------- static methods --------------------- */

/* --------------------- Generate Model --------------------- */
/* const addressModel = model<AddressI, AddressModel, AddressQueryHelpers>('Address', addressSchema);
export default addressModel; */
export { addressSchema };
