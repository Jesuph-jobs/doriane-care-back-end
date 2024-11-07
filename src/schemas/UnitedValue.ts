import { Schema } from 'mongoose';

import type {
	UnitedValueInstanceMethods,
	UnitedValueModel,
	UnitedValueQueryHelpers,
	UnitedValueSchemaOptions,
	UnitedValueStaticMethods,
	UnitedValueVirtual,
} from '../types/schemas/UnitedValue';

const required = true;

/* --------------------- Schema --------------------- */
const UnitedValueSchema = new Schema<
	UnitedValueI,
	UnitedValueModel,
	UnitedValueInstanceMethods,
	UnitedValueQueryHelpers,
	UnitedValueVirtual,
	UnitedValueStaticMethods,
	UnitedValueSchemaOptions
>(
	{
		// schema here
		unit: { type: String },
		value: { type: Number, required },
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* UnitedValueSchema.pre('save', async function (next) {
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
export default UnitedValueSchema;
