import { Router } from 'express';

import {
	createOrder,
	deleteOrders,
	getOrderById,
	getOrderReviews,
	getOrders,
	updateOrderAdditional,
	updateOrderCategory,
	updateOrderImages,
	updateOrderInformation,
	updateOrderLabels,
	updateOrderPricing,
	updateOrderState,
} from '@server/handlers/orders';
// import { validateRequest } from '@server/utils/httpHandlers';

const ordersRouter = Router();

ordersRouter.route('/').get(getOrders).post(createOrder).delete(deleteOrders);
ordersRouter.route('/:orderId/state').put(updateOrderState);
ordersRouter.route('/:orderId/labels').put(updateOrderLabels);
ordersRouter.route('/:orderId/category').put(updateOrderCategory);
ordersRouter.route('/:orderId/images').put(updateOrderImages);
ordersRouter.route('/:orderId/additional').put(updateOrderAdditional);
ordersRouter.route('/:orderId/price').put(updateOrderPricing);
ordersRouter.route('/:orderId/reviews').get(getOrderReviews);
ordersRouter.route('/:orderId/information').put(updateOrderInformation);
ordersRouter.route('/:orderId').get(getOrderById);

export default ordersRouter;
