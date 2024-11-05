import { /* model, */ Schema } from "mongoose";

import type {
	PersonalInformationInstanceMethods,
	PersonalInformationModel,
	PersonalInformationQueryHelpers,
	PersonalInformationSchemaOptions,
	PersonalInformationStaticMethods,
	PersonalInformationVirtual,
} from "!server/models/generals/PersonalInformation";

import { addressSchema } from "./address";

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
		gender: { type: String, required, enum: ["M", "F"] },
		birthday: { type: Date },
		residence: { type: addressSchema, required },
		note: { type: String, default: "" },
	},
	{ timestamps: false, _id: false },
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */
personalInformationSchema.methods.toOptimizedObject = function () {
	return this.toObject();
};

/* --------------------- Query Helpers --------------------- */

/* --------------------- static methods --------------------- */

/* --------------------- Generate Model --------------------- */
/* const personalInformationModel = model<PersonalInformationI, PersonalInformationModel, PersonalInformationQueryHelpers>(
	'PersonalInformation',
	personalInformationSchema
);
export default personalInformationModel; */
export { personalInformationSchema };
