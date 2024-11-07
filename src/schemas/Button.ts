import { Schema } from 'mongoose';

import {
	type ButtonInstanceMethods,
	type ButtonModel,
	type ButtonQueryHelpers,
	type ButtonSchemaOptions,
	type ButtonStaticMethods,
	type ButtonVirtual,
	buttonIconTypesEnum,
	buttonTypesEnum,
} from '../types/schemas/Button';
import linkSchema from './link';

const required = true;

/* --------------------- Schema --------------------- */
const ButtonSchema = new Schema<
	ButtonI,
	ButtonModel,
	ButtonInstanceMethods,
	ButtonQueryHelpers,
	ButtonVirtual,
	ButtonStaticMethods,
	ButtonSchemaOptions
>(
	{
		// schema here
		link: linkSchema,
		type: {
			type: String,
			required,
			enum: buttonTypesEnum,
		},
		icon: {
			left: {
				type: String,
				enum: buttonIconTypesEnum,
			},
			right: {
				type: String,
				enum: buttonIconTypesEnum,
			},
		},
		text: {
			type: String,
			required,
		},
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* ButtonSchema.pre('save', async function (next) {
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
export default ButtonSchema;
