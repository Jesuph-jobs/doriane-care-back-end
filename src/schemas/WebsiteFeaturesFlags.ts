import { Schema } from 'mongoose';

import type {
	WebsiteFeaturesFlagsInstanceMethods,
	WebsiteFeaturesFlagsModel,
	WebsiteFeaturesFlagsQueryHelpers,
	WebsiteFeaturesFlagsSchemaOptions,
	WebsiteFeaturesFlagsStaticMethods,
	WebsiteFeaturesFlagsVirtual,
} from '../types/schemas/WebsiteFeaturesFlags';

const booleanSchema = { type: Boolean, default: true };
/* --------------------- Schema --------------------- */
const WebsiteFeaturesFlagsSchema = new Schema<
	WebsiteFeaturesFlagsI,
	WebsiteFeaturesFlagsModel,
	WebsiteFeaturesFlagsInstanceMethods,
	WebsiteFeaturesFlagsQueryHelpers,
	WebsiteFeaturesFlagsVirtual,
	WebsiteFeaturesFlagsStaticMethods,
	WebsiteFeaturesFlagsSchemaOptions
>(
	{
		// schema here
		'guest-review': booleanSchema,
		'display-reviews-on-homepage': booleanSchema,
		'costumer-wishlist': booleanSchema,
		'guest-checkout': booleanSchema,
		'price-filter': booleanSchema,
		'categories-filter': booleanSchema,
		'collections-filter': booleanSchema,
		'delivery-status-notification': booleanSchema,
		'price-drop-notification': booleanSchema,
		'image-zoom': booleanSchema,
		'in-product-checkout': booleanSchema,
		'website-blogs': booleanSchema,
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* WebsiteFeaturesFlagsSchema.pre('save', async function (next) {
	try {
	// hook here
		next();
	} catch (err) {
		next(err as Error);
	}
});
 */
/* --------------------- Methods ---------------------  */

/* --------------------- Exports ---------------------  */
export default WebsiteFeaturesFlagsSchema;
