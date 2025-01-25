import { Router } from 'express';

import {
	deleteOrders,
	getCustomerOrders,
	getOrderById,
	getOrders,
	updateOrderDeliveryCost,
	updateOrderDeliveryInformation,
	updateOrderProductCount,
	updateOrderProductPrice,
	updateOrderState,
	updateOrderTotalPrice,
} from '@server/handlers/orders';
// import { validateRequest } from '@server/utils/httpHandlers';

const ordersRouter = Router();

ordersRouter
	.route('/')
	.get(getOrders) /* .post(createGuestOrder) */
	.delete(deleteOrders);
ordersRouter.route('/customer/:customerId').get(getCustomerOrders);
ordersRouter.route('/:orderId/state').put(updateOrderState);
ordersRouter.route('/:orderId/delivery').put(updateOrderDeliveryInformation);
ordersRouter.route('/:orderId/cost').put(updateOrderDeliveryCost);
ordersRouter.route('/:orderId/total-price').put(updateOrderTotalPrice);
ordersRouter.route('/:orderId/product-price').put(updateOrderProductPrice);
ordersRouter.route('/:orderId/product-count').put(updateOrderProductCount);
ordersRouter.route('/:orderId').get(getOrderById);

export default ordersRouter;
