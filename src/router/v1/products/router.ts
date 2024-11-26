import { Router } from 'express';

import { createProduct, getProductById, getProducts } from '@server/handlers/products';
import { updateProductInformation } from '@server/handlers/products';
import { validateRequest } from '@server/utils/httpHandlers';
import { UpdateProductInformationShape } from '^common/requests/products';
// TODO: add request validation
const productsRouter = Router();

productsRouter.route('/').get(getProducts).post(createProduct);
productsRouter.route('/:productId').get(getProductById);
productsRouter
	.route('/:productId/information')
	.put(validateRequest(UpdateProductInformationShape), updateProductInformation);

export default productsRouter;
