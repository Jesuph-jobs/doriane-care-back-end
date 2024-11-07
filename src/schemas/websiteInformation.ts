import { Schema } from 'mongoose';

import { ProductAdditionalEnums } from '!server/schemas/ProductAdditional';
import WebsiteFeaturesFlagsSchema from '@server/schemas/WebsiteFeaturesFlags';
import type {
	WebsiteInformationInstanceMethods,
	WebsiteInformationModel,
	WebsiteInformationQueryHelpers,
	WebsiteInformationSchemaOptions,
	WebsiteInformationStaticMethods,
	WebsiteInformationVirtual,
} from '../types/models/websiteInformation';
import { contactInformationSchema } from './ContactInformation';
import { addressSchema } from './address';

const required = true;

/* --------------------- Schema --------------------- */
const websiteInformationSchema = new Schema<
	WebsiteInformationI,
	WebsiteInformationModel,
	WebsiteInformationInstanceMethods,
	WebsiteInformationQueryHelpers,
	WebsiteInformationVirtual,
	WebsiteInformationStaticMethods,
	WebsiteInformationSchemaOptions
>(
	{
		// schema here
		name: { type: String, required },
		description: { type: String, required },
		aboutUs: { type: String, required },
		addresses: addressSchema,
		contactInformation: contactInformationSchema,
		productsAttributes: {
			type: String,
			required,
			enum: ProductAdditionalEnums,
		},
		websitePermissions: {
			type: WebsiteFeaturesFlagsSchema,
			required,
		},
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* WebsiteInformationSchema.pre('save', async function (next) {
	try {
	// hook here
		next();
	} catch (err) {
		next(err as Error);
	}
});
 */
/* --------------------- Methods ---------------------  */

export default websiteInformationSchema;
