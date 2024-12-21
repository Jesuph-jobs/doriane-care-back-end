import { Router } from 'express';

import {
	checkProductSlug,
	createProduct,
	deleteProducts,
	getDisabledProducts,
	getDraftProducts,
	getProductById,
	getProductReviews,
	getProducts,
	updateProductAdditional,
	updateProductCategory,
	updateProductImages,
	updateProductInformation,
	updateProductLabels,
	updateProductPricing,
	updateProductState,
} from '@server/handlers/products';
import { validateRequest } from '@server/utils/httpHandlers';
import { UpdateProductInformationShape } from '^server/requests/products';

const productsRouter = Router();

productsRouter.route('/').get(getProducts).post(createProduct).delete(deleteProducts);
productsRouter.route('/drafts').get(getDraftProducts);
productsRouter.route('/disabled').get(getDisabledProducts);
productsRouter.route('/slug').get(checkProductSlug);
productsRouter.route('/:productId/state').put(updateProductState);
productsRouter.route('/:productId/labels').put(updateProductLabels);
productsRouter.route('/:productId/category').put(updateProductCategory);
productsRouter.route('/:productId/images').put(updateProductImages);
productsRouter.route('/:productId/additional').put(updateProductAdditional);
productsRouter.route('/:productId/price').put(updateProductPricing);
productsRouter.route('/:productId/reviews').get(getProductReviews);
productsRouter
	.route('/:productId/information')
	.put(validateRequest(UpdateProductInformationShape), updateProductInformation);
productsRouter.route('/:productId').get(getProductById);

export default productsRouter;
