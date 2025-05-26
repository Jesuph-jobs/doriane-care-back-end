import { productSortableFields } from '@common/data/sortables/product';
import { type MyZodType, z } from '@common/validations/defaultZod';
import { SortableQuerySearchSchema } from '^common/models/generals/SearchQuery';
import { ProductInformationISchema } from '^common/models/products';

export const GetProductsShape = z.object<MyZodType<GetProductsShapeI>>({
	// body must be empty
	body: SortableQuerySearchSchema(productSortableFields as unknown as MyEnum<ProductSortableFields>, 'en'),
	query: z.any().refine(query => !query || Object.keys(query).length === 0, {
		message: 'Query must be empty',
	}),
});

export const GetProductShape = z.object<MyZodType<GetProductShapeI>>({
	body: z.any().refine(query => !query || Object.keys(query).length === 0, {
		message: 'Body must be empty',
	}),
	query: z.any().refine(query => !query || Object.keys(query).length === 0, {
		message: 'Query must be empty',
	}),
	params: z.object({
		productId: z.string(),
	}),
});

export const UpdateProductInformationShape = z.object<MyZodType<UpdateProductInformationShapeI>>({
	body: ProductInformationISchema('en'),
	query: z.any().refine(query => !query || Object.keys(query).length === 0, {
		message: 'Query must be empty',
	}),
	params: z.object({
		productId: z.string(),
	}),
});
