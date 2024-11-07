import { Schema } from 'mongoose';

import type {
	WebsitePermissionsInstanceMethods,
	WebsitePermissionsModel,
	WebsitePermissionsQueryHelpers,
	WebsitePermissionsSchemaOptions,
	WebsitePermissionsStaticMethods,
	WebsitePermissionsVirtual,
} from '../types/schemas/WebsitePermissions';

/* --------------------- Schema --------------------- */
const WebsitePermissionsSchema = new Schema<
	WebsiteFeaturesFlagsI,
	WebsitePermissionsModel,
	WebsitePermissionsInstanceMethods,
	WebsitePermissionsQueryHelpers,
	WebsitePermissionsVirtual,
	WebsitePermissionsStaticMethods,
	WebsitePermissionsSchemaOptions
>(
	{
		// schema here
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* WebsitePermissionsSchema.pre('save', async function (next) {
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
export default WebsitePermissionsSchema;
