import { /*  model, */ Schema } from 'mongoose';

import {
	ContactInformationInstanceMethods,
	ContactInformationModel,
	ContactInformationQueryHelpers,
	ContactInformationSchemaOptions,
	ContactInformationStaticMethods,
	ContactInformationVirtual,
} from '!server/models/generals/ContactInformation';

import { phoneSchema } from './phone';
import { socialMediaUrlsSchema } from './SocialMediaUrls';

/* --------------------- Schema --------------------- */
const contactInformationSchema = new Schema<
	ContactInformationI,
	ContactInformationModel,
	ContactInformationInstanceMethods,
	ContactInformationQueryHelpers,
	ContactInformationVirtual,
	ContactInformationStaticMethods,
	ContactInformationSchemaOptions
>(
	{
		phones: {
			type: [phoneSchema],
		},
		faxes: {
			type: [phoneSchema],
		},
		emails: {
			type: [String],
			default: [],
		},
		validatedEmails: {
			type: [String],
			default: [],
		},
		websites: {
			type: [String],
		},

		socialMediaUrls: {
			type: socialMediaUrlsSchema,
		},
	},
	{ timestamps: false, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */
contactInformationSchema.methods.toOptimizedObject = function () {
	return this.toObject();
};

/* --------------------- Query Helpers --------------------- */

/* --------------------- static methods --------------------- */

/* --------------------- Generate Model --------------------- */
/* const contactInformationModel = model<ContactInformationI, ContactInformationModel, ContactInformationQueryHelpers>(
	'ContactInformation',
	contactInformationSchema
);
export default contactInformationModel; */
export { contactInformationSchema };
