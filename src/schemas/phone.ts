import { Schema } from 'mongoose';

import type {
	PhoneInstanceMethods,
	PhoneModel,
	PhoneQueryHelpers,
	PhoneSchemaOptions,
	PhoneStaticMethods,
	PhoneVirtual,
} from '!server/models/generals/Phone';

const required = true;
/* --------------------- Schema --------------------- */
const phoneSchema = new Schema<
	PhoneI,
	PhoneModel,
	PhoneInstanceMethods,
	PhoneQueryHelpers,
	PhoneVirtual,
	PhoneStaticMethods,
	PhoneSchemaOptions
>(
	{
		number: {
			type: String,
			required,
		},
		code: {
			type: String,
		},
	},
	{ timestamps: true, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */
phoneSchema.methods.toOptimizedObject = function () {
	return this.toObject();
};

export { phoneSchema };
