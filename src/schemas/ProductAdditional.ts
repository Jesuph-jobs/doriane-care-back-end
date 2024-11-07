import { Schema } from 'mongoose';

import {
	type ProductAdditionalInstanceMethods,
	type ProductAdditionalModel,
	ProductAdditionalNumberEnums,
	type ProductAdditionalQueryHelpers,
	type ProductAdditionalSchemaOptions,
	type ProductAdditionalStaticMethods,
	ProductAdditionalStringEnums,
	type ProductAdditionalVirtual,
} from '../types/schemas/ProductAdditional';
import UnitedValueSchema from './UnitedValue';

/* --------------------- Schema --------------------- */
const ProductAdditionalSchema = new Schema<
	ProductAdditionalI,
	ProductAdditionalModel,
	ProductAdditionalInstanceMethods,
	ProductAdditionalQueryHelpers,
	ProductAdditionalVirtual,
	ProductAdditionalStaticMethods,
	ProductAdditionalSchemaOptions
>(
	{
		// schema here
		...ProductAdditionalNumberEnums.reduce(
			(acc, key) => {
				acc[key] = { type: UnitedValueSchema };
				return acc;
			},
			{} as Record<ProductAdditionalNumberKeys, { type: typeof UnitedValueSchema }>
		),
		...ProductAdditionalStringEnums.reduce(
			(acc, key) => {
				acc[key] = { type: String };
				return acc;
			},
			{} as Record<ProductAdditionalStringKeys, { type: typeof String }>
		),
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* ProductAdditionalSchema.pre('save', async function (next) {
	try {
	// hook here
		next();
	} catch (err) {
		next(err as Error);
	}
});
 */
/* --------------------- Methods ---------------------  */
ProductAdditionalSchema.methods.toOptimizedObject = () => ({
	// methods here
});
/* --------------------- Exports ---------------------  */
export default ProductAdditionalSchema;
