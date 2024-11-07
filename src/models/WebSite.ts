import { Schema, model } from 'mongoose';

import { ProductAdditionalEnums } from '!server/schemas/ProductAdditional';
import NumbersRangeSchema from '@server/schemas/NumbersRange';
import serviceElementSchema from '@server/schemas/ServiceElement';
import WebsiteFeaturesFlagsSchema from '@server/schemas/WebsiteFeaturesFlags';
import { FAQSchema } from '../schemas/FAQ';
import { bannerElementSchema } from '../schemas/bannerElement';
import websiteInformationSchema from '../schemas/websiteInformation';
import type {
	WebSettingsInstanceMethods,
	WebSettingsModel,
	WebSettingsQueryHelpers,
	WebSettingsSchemaOptions,
	WebSettingsStaticMethods,
	WebSettingsVirtual,
} from '../types/models/WebSite';

const required = true;
const unique = true;
/* --------------------- Schema --------------------- */
const WebSettingsSchema = new Schema<
	WebSiteDocumentI,
	WebSettingsModel,
	WebSettingsInstanceMethods,
	WebSettingsQueryHelpers,
	WebSettingsVirtual,
	WebSettingsStaticMethods,
	WebSettingsSchemaOptions
>(
	{
		// schema here
		domain: {
			type: String,
			required,
			unique,
		},
		banners: { type: [bannerElementSchema], required },
		faqs: { type: [FAQSchema], required },
		flags: { type: WebsiteFeaturesFlagsSchema, required },
		productAdditional: {
			type: [{ type: String, required, enum: ProductAdditionalEnums }],
			required,
		},
		services: { type: [serviceElementSchema], required },
		websiteInformation: { type: websiteInformationSchema, required },
		priceRange: { type: NumbersRangeSchema, required },
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* WebSettingsSchema.pre('save', async function (next) {
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
const webSettingsModel = model<WebSiteDocumentI, WebSettingsModel, WebSettingsQueryHelpers>(
	'WebSettings',
	WebSettingsSchema
);
export default webSettingsModel;
