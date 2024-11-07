import { Schema, type Types, model } from 'mongoose';

import { PublishableContentEnums } from '!server/models/Category';
import MetaInformationSchema from '@server/schemas/MetaInformation';
import type {
	CollectionInstanceMethods,
	CollectionModel,
	CollectionQueryHelpers,
	CollectionSchemaOptions,
	CollectionStaticMethods,
	CollectionVirtual,
} from '../types/models/Collection';

const required = true;
const unique = true;
/* --------------------- Schema --------------------- */
const CollectionSchema = new Schema<
	CollectionDocumentI<Types.ObjectId>,
	CollectionModel,
	CollectionInstanceMethods,
	CollectionQueryHelpers,
	CollectionVirtual,
	CollectionStaticMethods,
	CollectionSchemaOptions
>(
	{
		// schema here
		website: {
			type: Schema.Types.ObjectId,
			ref: 'Website',
			required,
		},
		slug: {
			type: String,
			required,
			unique,
		},
		name: { type: String, required },
		description: { type: String, required },
		meta: {
			type: MetaInformationSchema,
			required,
		},
		tags: { type: [{ type: String, required }], required },
		enabled: {
			type: Boolean,
			default: true,
		},
		for: { type: String, enum: PublishableContentEnums, required },
		isPublic: {
			type: Boolean,
			default: true,
		},
		products: {
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: 'Product',
					required,
				},
			],
			required,
		},
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* CollectionSchema.pre('save', async function (next) {
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
const collectionModel = model<CollectionDocumentI<Types.ObjectId>, CollectionModel, CollectionQueryHelpers>(
	'Collection',
	CollectionSchema
);
export default collectionModel;
