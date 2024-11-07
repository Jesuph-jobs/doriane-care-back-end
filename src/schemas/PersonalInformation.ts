import { Schema } from 'mongoose';

import type {
	PersonalInformationInstanceMethods,
	PersonalInformationModel,
	PersonalInformationQueryHelpers,
	PersonalInformationSchemaOptions,
	PersonalInformationStaticMethods,
	PersonalInformationVirtual,
} from '!server/models/generals/PersonalInformation';

import { addressSchema } from './address';

const required = true;
/* --------------------- Schema --------------------- */
const personalInformationSchema = new Schema<
	PersonalInformationI,
	PersonalInformationModel,
	PersonalInformationInstanceMethods,
	PersonalInformationQueryHelpers,
	PersonalInformationVirtual,
	PersonalInformationStaticMethods,
	PersonalInformationSchemaOptions
>(
	{
		firstName: { type: String, required },
		lastName: { type: String, required },
		gender: { type: String, enum: ['M', 'F'] },
		birthday: { type: Date },
		residence: { type: addressSchema },
		note: { type: String },
	},
	{ timestamps: false, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */
personalInformationSchema.methods.toOptimizedObject = function () {
	return this.toObject();
};

export { personalInformationSchema };
