import { Schema } from 'mongoose';

import type {
	ServiceElementInstanceMethods,
	ServiceElementModel,
	ServiceElementQueryHelpers,
	ServiceElementSchemaOptions,
	ServiceElementStaticMethods,
	ServiceElementVirtual,
} from '../types/schemas/ServiceElement';

const required = true;

/* --------------------- Schema --------------------- */
const serviceElementSchema = new Schema<
	ServiceElementI,
	ServiceElementModel,
	ServiceElementInstanceMethods,
	ServiceElementQueryHelpers,
	ServiceElementVirtual,
	ServiceElementStaticMethods,
	ServiceElementSchemaOptions
>(
	{
		// schema here
		title: { type: String, required },
		description: { type: String, required },
		image: { type: String, required },
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* ServiceElementSchema.pre('save', async function (next) {
	try {
	// hook here
		next();
	} catch (err) {
		next(err as Error);
	}
});
 */
/* --------------------- Methods ---------------------  */

export default serviceElementSchema;
