import { Schema } from 'mongoose';

import type {
	FAQInstanceMethods,
	FAQModel,
	FAQQueryHelpers,
	FAQSchemaOptions,
	FAQStaticMethods,
	FAQVirtual,
} from '!server/models/faq';
const required = true;
/* --------------------- Schema --------------------- */
export const FAQSchema = new Schema<
	FAQI,
	FAQModel,
	FAQInstanceMethods,
	FAQQueryHelpers,
	FAQVirtual,
	FAQStaticMethods,
	FAQSchemaOptions
>(
	{
		// schema here
		question: { type: String, required },
		answer: { type: String, required },
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */
