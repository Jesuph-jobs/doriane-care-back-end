import { Schema } from 'mongoose';

import type {
	MetaInformationInstanceMethods,
	MetaInformationModel,
	MetaInformationQueryHelpers,
	MetaInformationSchemaOptions,
	MetaInformationStaticMethods,
	MetaInformationVirtual,
} from '../types/schemas/MetaInformation';

const required = true;

/* --------------------- Schema --------------------- */
const MetaInformationSchema = new Schema<
	MetaInformationI,
	MetaInformationModel,
	MetaInformationInstanceMethods,
	MetaInformationQueryHelpers,
	MetaInformationVirtual,
	MetaInformationStaticMethods,
	MetaInformationSchemaOptions
>(
	{
		// schema here
		imageIndex: {
			type: Number,
			required,
		},
		keywords: {
			type: [String],
			required,
		},
		summery: {
			type: String,
			required,
		},
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* MetaInformationSchema.pre('save', async function (next) {
	try {
	// hook here
		next();
	} catch (err) {
		next(err as Error);
	}
});
 */
/* --------------------- Methods ---------------------  */
MetaInformationSchema.methods.toOptimizedObject = () => ({
	// methods here
});
/* --------------------- Exports ---------------------  */
export default MetaInformationSchema;
