import { Schema, type Types } from 'mongoose';

import type {
	ProductsCartInstanceMethods,
	ProductsCartModel,
	ProductsCartQueryHelpers,
	ProductsCartSchemaOptions,
	ProductsCartStaticMethods,
	ProductsCartVirtual,
} from '../types/schemas/ProductsCart';

const required = true;
/* --------------------- Schema --------------------- */
const ProductsCartSchema = new Schema<
	ProductsCartI<Types.ObjectId>,
	ProductsCartModel,
	ProductsCartInstanceMethods,
	ProductsCartQueryHelpers,
	ProductsCartVirtual,
	ProductsCartStaticMethods,
	ProductsCartSchemaOptions
>(
	{
		// schema here
		id: { type: Schema.Types.ObjectId, required, ref: 'Product' },
		count: { type: Number, required },
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* ProductsCartSchema.pre('save', async function (next) {
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
export default ProductsCartSchema;
