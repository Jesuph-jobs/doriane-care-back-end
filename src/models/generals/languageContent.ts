import { Schema } from "mongoose";

const required = true;
/* --------------------- Schema --------------------- */
export const languageContentSchema = new Schema<LanguagesContentI>(
	{
		AR: {
			type: String,
			required,
		},
		FR: {
			type: String,
		},
		EN: {
			type: String,
		},
	},
	{ _id: false },
);
