import { Schema, type Types, model } from 'mongoose';

import MetaInformationSchema from '@server/schemas/MetaInformation';
import PricingSchema from '@server/schemas/Pricing';
import ProductAdditionalSchema from '@server/schemas/ProductAdditional';
import ProductFlagsSchema from '@server/schemas/ProductFlags';
import RatingAggregationSchema from '@server/schemas/RatingAggregation';
import SoldAggregationSchema from '@server/schemas/SoldAggregation';
import type {
	ProductInstanceMethods,
	ProductModel,
	ProductQueryHelpers,
	ProductSchemaOptions,
	ProductStaticMethods,
	ProductVirtual,
} from '../types/models/Product';

const required = true;
const unique = true;
/* --------------------- Schema --------------------- */
const ProductSchema = new Schema<
	ProductDocumentI<Types.ObjectId>,
	ProductModel,
	ProductInstanceMethods,
	ProductQueryHelpers,
	ProductVirtual,
	ProductStaticMethods,
	ProductSchemaOptions
>(
	{
		additional: { type: ProductAdditionalSchema, required },
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required,
		},
		description: { type: String, required },
		name: { type: String, required },
		flags: { type: ProductFlagsSchema, required },
		images: {
			type: [{ type: String, required }],
			required,
		},
		meta: { type: MetaInformationSchema, required },
		pricing: { type: PricingSchema, required },
		sku: { type: String, required },
		ratingAggregation: { type: RatingAggregationSchema, required },
		soldAggregation: { type: SoldAggregationSchema, required },
		website: {
			type: Schema.Types.ObjectId,
			ref: 'Website',
			required,
		},
		enabled: { type: Boolean, default: true },
		slug: { type: String, required, unique },
		tags: { type: [{ type: String, required }], required },
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* ProductSchema.pre('save', async function (next) {
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
const productModel = model<ProductDocumentI<Types.ObjectId>, ProductModel, ProductQueryHelpers>(
	'Product',
	ProductSchema
);
export default productModel;
