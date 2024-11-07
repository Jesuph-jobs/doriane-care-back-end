import { Schema, type Types } from 'mongoose';

import ButtonSchema from '@server/schemas/Button';
import type {
	BannerElementInstanceMethods,
	BannerElementModel,
	BannerElementQueryHelpers,
	BannerElementSchemaOptions,
	BannerElementStaticMethods,
	BannerElementVirtual,
} from '../types/models/bannerElement';

const required = true;

/* --------------------- Schema --------------------- */
export const bannerElementSchema = new Schema<
	BannerElementI<Types.ObjectId>,
	BannerElementModel,
	BannerElementInstanceMethods,
	BannerElementQueryHelpers,
	BannerElementVirtual,
	BannerElementStaticMethods,
	BannerElementSchemaOptions
>(
	{
		// schema here
		title: { type: String, required },
		content: { type: String, required },
		button: ButtonSchema,
	},
	{ timestamps: true, _id: false }
);
